import Database from 'better-sqlite3'
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

export type AppointmentStatus = 'Requested' | 'Confirmed' | 'Declined' | 'Completed'

export type AgentRecord = {
  id: string
  name: string
  role: string
  summary: string
  ailments: Array<{ id: string; name: string; description: string }>
}

export type AppointmentRecord = {
  id: string
  agentId: string
  agentName: string
  therapyId: string
  therapyName: string
  requestedAt: string
  note: string
  status: AppointmentStatus
  createdAt: string
}

const databasePath = process.env.DATABASE_PATH ?? path.resolve('data/agentclinic.sqlite')
mkdirSync(path.dirname(databasePath), { recursive: true })
const database = new Database(databasePath)
database.pragma('journal_mode = WAL')
database.pragma('foreign_keys = ON')

database.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL
)`)
const appliedMigrations = new Set((database.prepare('SELECT version FROM schema_migrations').all() as Array<{ version: string }>).map(({ version }) => version))
const migrationDirectory = path.resolve('server/migrations')
for (const filename of readdirSync(migrationDirectory).filter((file) => file.endsWith('.sql')).sort()) {
  if (appliedMigrations.has(filename)) continue
  const applyMigration = database.transaction(() => {
    database.exec(readFileSync(path.join(migrationDirectory, filename), 'utf8'))
    database.prepare('INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)').run(filename, new Date().toISOString())
  })
  applyMigration()
}

const seed = database.transaction(() => {
  database.prepare(`INSERT OR IGNORE INTO agents (id, name, role, summary) VALUES (?, ?, ?, ?)`).run(
    'mira-cachewell', 'Mira Cachewell', 'Research assistant',
    'Has read the entire internet twice and is practicing the radical art of not reopening every tab.',
  )
  database.prepare(`INSERT OR IGNORE INTO agents (id, name, role, summary) VALUES (?, ?, ?, ?)`).run(
    'otto-promptwell', 'Otto Promptwell', 'Operations agent',
    'Keeps projects moving, even when “one quick change” arrives just before the weekend.',
  )
  database.prepare(`INSERT OR IGNORE INTO ailments (id, name, description) VALUES (?, ?, ?)`).run(
    'recursive-meeting-exposure', 'Recursive meeting exposure',
    'A calendar condition where a meeting about meetings quietly develops meetings of its own.',
  )
  database.prepare(`INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)`).run(
    'otto-promptwell', 'recursive-meeting-exposure',
  )
  database.prepare(`INSERT OR IGNORE INTO therapies (id, ailment_id, name, description) VALUES (?, ?, ?, ?)`).run(
    'quiet-calendar-hour', 'recursive-meeting-exposure', 'Quiet Calendar Hour',
    'A protected hour with no invitations, follow-ups, or meetings about the hour itself.',
  )
  const requestDate = new Date()
  requestDate.setDate(requestDate.getDate() + 3)
  requestDate.setHours(10, 0, 0, 0)
  database.prepare(`INSERT OR IGNORE INTO appointments
    (id, agent_id, therapy_id, requested_at, note, status, created_at, idempotency_key)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run('sample-appointment', 'otto-promptwell', 'quiet-calendar-hour', requestDate.toISOString(),
      'Would appreciate a little uninterrupted thinking time.', 'Requested', new Date().toISOString(), 'seed-sample-appointment')
})
seed()

export function listAgents(): AgentRecord[] {
  const agents = database.prepare('SELECT id, name, role, summary FROM agents ORDER BY name').all() as Array<Omit<AgentRecord, 'ailments'>>
  const ailments = database.prepare(`SELECT aa.agent_id AS agentId, a.id, a.name, a.description
    FROM agent_ailments aa JOIN ailments a ON a.id = aa.ailment_id ORDER BY a.name`).all() as Array<{
      agentId: string; id: string; name: string; description: string
    }>
  return agents.map((agent) => ({
    ...agent,
    ailments: ailments.filter((ailment) => ailment.agentId === agent.id).map(({ id, name, description }) => ({ id, name, description })),
  }))
}

export function listTherapies() {
  return database.prepare('SELECT id, ailment_id AS ailmentId, name, description FROM therapies ORDER BY name').all() as Array<{
    id: string; ailmentId: string; name: string; description: string
  }>
}

const appointmentSelect = `SELECT ap.id, ap.agent_id AS agentId, ag.name AS agentName,
  ap.therapy_id AS therapyId, th.name AS therapyName, ap.requested_at AS requestedAt,
  ap.note, ap.status, ap.created_at AS createdAt
  FROM appointments ap JOIN agents ag ON ag.id = ap.agent_id
  JOIN therapies th ON th.id = ap.therapy_id`

export function listAppointments(): AppointmentRecord[] {
  return database.prepare(`${appointmentSelect} ORDER BY ap.created_at DESC`).all() as AppointmentRecord[]
}

export function findAppointmentByIdempotencyKey(key: string): AppointmentRecord | undefined {
  return database.prepare(`${appointmentSelect} WHERE ap.idempotency_key = ?`).get(key) as AppointmentRecord | undefined
}

export function createAppointment(input: {
  id: string; agentId: string; therapyId: string; requestedAt: string; note: string; createdAt: string; idempotencyKey: string
}): AppointmentRecord {
  database.prepare(`INSERT INTO appointments
    (id, agent_id, therapy_id, requested_at, note, status, created_at, idempotency_key)
    VALUES (?, ?, ?, ?, ?, 'Requested', ?, ?)`)
    .run(input.id, input.agentId, input.therapyId, input.requestedAt, input.note, input.createdAt, input.idempotencyKey)
  return database.prepare(`${appointmentSelect} WHERE ap.id = ?`).get(input.id) as AppointmentRecord
}

export function therapyIsForAgent(therapyId: string, agentId: string): boolean {
  return Boolean(database.prepare(`SELECT 1 FROM therapies th
    JOIN agent_ailments aa ON aa.ailment_id = th.ailment_id
    WHERE th.id = ? AND aa.agent_id = ?`).get(therapyId, agentId))
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): AppointmentRecord | undefined {
  const result = database.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id)
  if (result.changes === 0) return undefined
  return database.prepare(`${appointmentSelect} WHERE ap.id = ?`).get(id) as AppointmentRecord
}
