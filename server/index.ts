import 'dotenv/config'
import Fastify from 'fastify'
import fastifySecureSession from '@fastify/secure-session'
import fastifyStatic from '@fastify/static'
import { randomBytes, randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import path from 'node:path'
import * as oidc from 'openid-client'
import {
  createAppointment,
  findAppointmentByIdempotencyKey,
  listAgents,
  listAppointments,
  listTherapies,
  therapyIsForAgent,
  updateAppointmentStatus,
  type AppointmentStatus,
} from './db.js'

type StaffUser = { email: string; name: string }
type OidcTransaction = { state: string; nonce: string; verifier: string; createdAt: number }
type SessionStore = {
  get<T>(key: string): T | undefined
  set(key: string, value: unknown): void
  delete(): void
}

const app = Fastify({ logger: true, trustProxy: process.env.TRUST_PROXY === 'true' })
const isProduction = process.env.NODE_ENV === 'production'
const sessionKeyHex = process.env.SESSION_KEY
if (isProduction && (!sessionKeyHex || !/^[0-9a-f]{64}$/i.test(sessionKeyHex))) {
  throw new Error('SESSION_KEY must be a 32-byte hex value in production.')
}
const sessionKey = sessionKeyHex ? Buffer.from(sessionKeyHex, 'hex') : randomBytes(32)
const oidcEnvironment = {
  issuer: process.env.OIDC_ISSUER,
  clientId: process.env.OIDC_CLIENT_ID,
  clientSecret: process.env.OIDC_CLIENT_SECRET,
  callbackUrl: process.env.OIDC_CALLBACK_URL,
}
const authConfigured = Object.values(oidcEnvironment).every(Boolean)
const allowedStaffEmails = new Set((process.env.STAFF_EMAILS ?? '').split(',').map((email) => email.trim().toLowerCase()).filter(Boolean))
if (isProduction && (!authConfigured || allowedStaffEmails.size === 0)) {
  throw new Error('Configure OIDC_ISSUER, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_CALLBACK_URL, and STAFF_EMAILS in production.')
}

await app.register(fastifySecureSession, {
  key: sessionKey,
  expiry: 8 * 60 * 60,
  cookieName: isProduction ? '__Host-agentclinic-session' : 'agentclinic-session',
  cookie: {
    path: '/',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 8 * 60 * 60,
  },
})

let oidcConfiguration: oidc.Configuration | undefined
if (authConfigured) {
  oidcConfiguration = await oidc.discovery(
    new URL(oidcEnvironment.issuer!),
    oidcEnvironment.clientId!,
    oidcEnvironment.clientSecret!,
  )
}

const publicOrigin = process.env.APP_ORIGIN
const allowedStatuses: AppointmentStatus[] = ['Requested', 'Confirmed', 'Declined', 'Completed']

function isSameOrigin(request: { headers: Record<string, string | string[] | undefined> }) {
  const originHeader = request.headers.origin
  if (typeof originHeader !== 'string') return false
  try {
    const origin = new URL(originHeader)
    const expected = publicOrigin ? new URL(publicOrigin) : undefined
    const host = typeof request.headers.host === 'string' ? request.headers.host : ''
    return expected ? origin.origin === expected.origin : origin.host === host
  } catch {
    return false
  }
}

function currentUser(request: { session: { get<T>(key: string): T | undefined } }): StaffUser | undefined {
  return (request.session as unknown as SessionStore).get<StaffUser>('staffUser')
}

function configuredCallbackUrl(request: { protocol: string; headers: Record<string, string | string[] | undefined> }) {
  if (oidcEnvironment.callbackUrl) return new URL(oidcEnvironment.callbackUrl)
  const host = typeof request.headers.host === 'string' ? request.headers.host : 'localhost:5173'
  return new URL('/api/auth/callback', publicOrigin ?? `${request.protocol}://${host}`)
}

app.addHook('onRequest', async (_request, reply) => {
  reply.header('X-Content-Type-Options', 'nosniff')
  reply.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  reply.header('X-Frame-Options', 'DENY')
  reply.header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'")
})

app.get('/api/health', async () => ({ status: 'ok' }))
app.get('/api/agents', async () => listAgents())
app.get('/api/therapies', async () => listTherapies())
app.get('/api/appointments', async () => listAppointments())
app.get('/api/auth/session', async (request) => ({
  enabled: Boolean(oidcConfiguration && allowedStaffEmails.size),
  user: currentUser(request) ?? null,
}))

app.get('/api/auth/login', async (request, reply) => {
  if (!oidcConfiguration || allowedStaffEmails.size === 0) {
    return reply.code(503).send({ error: 'Staff sign-in is not configured yet.' })
  }
  const state = oidc.randomState()
  const nonce = oidc.randomNonce()
  const verifier = oidc.randomPKCECodeVerifier()
  const challenge = await oidc.calculatePKCECodeChallenge(verifier)
  const callbackUrl = configuredCallbackUrl(request)
  const session = request.session as unknown as SessionStore
  session.set('oidcTransaction', { state, nonce, verifier, createdAt: Date.now() } satisfies OidcTransaction)
  const authorizationUrl = oidc.buildAuthorizationUrl(oidcConfiguration, {
    redirect_uri: callbackUrl.href,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  })
  return reply.redirect(authorizationUrl.href)
})

app.get('/api/auth/callback', async (request, reply) => {
  if (!oidcConfiguration) return reply.code(503).send({ error: 'Staff sign-in is not configured.' })
  const session = request.session as unknown as SessionStore
  const transaction = session.get<OidcTransaction>('oidcTransaction')
  request.session.regenerate()
  if (!transaction || Date.now() - transaction.createdAt > 10 * 60 * 1000) {
    return reply.code(400).send({ error: 'The sign-in request expired. Please try again.' })
  }
  try {
    const callbackUrl = configuredCallbackUrl(request)
    const currentUrl = new URL(request.raw.url ?? '/', callbackUrl.origin)
    const tokens = await oidc.authorizationCodeGrant(oidcConfiguration, currentUrl, {
      expectedState: transaction.state,
      expectedNonce: transaction.nonce,
      pkceCodeVerifier: transaction.verifier,
    })
    const claims = tokens.claims()
    if (!claims) return reply.code(403).send({ error: 'The identity provider did not return an identity.' })
    const email = typeof claims.email === 'string' ? claims.email.trim().toLowerCase() : ''
    if (!email || claims.email_verified !== true || !allowedStaffEmails.has(email)) {
      return reply.code(403).send({ error: 'This account is not authorized for AgentClinic staff access.' })
    }
    const name = typeof claims.name === 'string' && claims.name.trim() ? claims.name.trim() : email
    session.set('staffUser', { email, name } satisfies StaffUser)
    return reply.redirect('/staff')
  } catch (error) {
    request.log.warn({ err: error }, 'Staff sign-in callback failed')
    return reply.code(400).send({ error: 'Sign-in could not be completed. Please try again.' })
  }
})

app.post('/api/auth/logout', async (request, reply) => {
  if (!isSameOrigin(request)) return reply.code(403).send({ error: 'This request must come from AgentClinic.' })
  request.session.delete()
  return { ok: true }
})

app.post<{ Body: { agentId?: string; therapyId?: string; requestedAt?: string; note?: string } }>(
  '/api/appointments',
  async (request, reply) => {
    if (!isSameOrigin(request)) return reply.code(403).send({ error: 'This request must come from AgentClinic.' })
    const { agentId, therapyId, requestedAt, note = '' } = request.body ?? {}
    const idempotencyKey = request.headers['idempotency-key']
    if (typeof idempotencyKey !== 'string' || idempotencyKey.length < 16 || idempotencyKey.length > 128) {
      return reply.code(400).send({ error: 'A valid booking retry key is required.' })
    }
    const existing = findAppointmentByIdempotencyKey(idempotencyKey)
    if (existing) return reply.code(200).send(existing)
    if (typeof agentId !== 'string' || !agentId || typeof therapyId !== 'string' || !therapyId || typeof requestedAt !== 'string' || typeof note !== 'string') {
      return reply.code(400).send({ error: 'Choose an agent, therapy, and requested date and time.' })
    }
    if (note.length > 300) return reply.code(400).send({ error: 'The note must be 300 characters or fewer.' })
    const requestedDate = new Date(requestedAt)
    if (!Number.isFinite(requestedDate.getTime()) || requestedDate.getTime() <= Date.now()) {
      return reply.code(400).send({ error: 'Choose a date and time in the future.' })
    }
    if (!therapyIsForAgent(therapyId, agentId)) {
      return reply.code(400).send({ error: 'Choose a therapy listed for this agent.' })
    }
    try {
      const appointment = createAppointment({
        id: randomUUID(), agentId, therapyId, requestedAt: requestedDate.toISOString(), note: note.trim(),
        createdAt: new Date().toISOString(), idempotencyKey,
      })
      return reply.code(201).send(appointment)
    } catch (error) {
      const retry = findAppointmentByIdempotencyKey(idempotencyKey)
      if (retry) return reply.code(200).send(retry)
      throw error
    }
  },
)

app.patch<{ Params: { id: string }; Body: { status?: string } }>('/api/appointments/:id/status', async (request, reply) => {
  if (!isSameOrigin(request)) return reply.code(403).send({ error: 'This request must come from AgentClinic.' })
  const user = currentUser(request)
  if (!user || !allowedStaffEmails.has(user.email.toLowerCase())) {
    return reply.code(401).send({ error: 'Sign in as an authorized staff member to change request statuses.' })
  }
  const status = request.body?.status
  if (!allowedStatuses.includes(status as AppointmentStatus)) {
    return reply.code(400).send({ error: 'Choose a valid appointment status.' })
  }
  const appointment = updateAppointmentStatus(request.params.id, status as AppointmentStatus)
  if (!appointment) return reply.code(404).send({ error: 'Appointment request not found.' })
  return appointment
})

const builtClient = path.resolve('dist')
if (existsSync(path.join(builtClient, 'index.html'))) {
  await app.register(fastifyStatic, { root: builtClient, prefix: '/' })
  app.setNotFoundHandler(async (request, reply) => {
    if (request.url.startsWith('/api/')) return reply.code(404).send({ error: 'Not found.' })
    return reply.sendFile('index.html')
  })
}

const port = Number(process.env.PORT ?? 3000)
await app.listen({ port, host: process.env.HOST ?? '127.0.0.1' })
