import type { AgentSummary, Therapy } from '../features/agents/types'
import type { Appointment, AppointmentStatus, StaffSession } from '../features/appointments/types'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
  })
  const body = await response.json().catch(() => ({})) as { error?: string }
  if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status}).`)
  return body as T
}

export const clinicApi = {
  agents: () => request<AgentSummary[]>('/api/agents'),
  therapies: () => request<Therapy[]>('/api/therapies'),
  appointments: () => request<Appointment[]>('/api/appointments'),
  session: () => request<StaffSession>('/api/auth/session'),
  createAppointment: (input: { agentId: string; therapyId: string; requestedAt: string; note: string }, idempotencyKey: string) =>
    request<Appointment>('/api/appointments', {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(input),
    }),
  updateAppointmentStatus: (id: string, status: AppointmentStatus) =>
    request<Appointment>(`/api/appointments/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  logout: () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
}
