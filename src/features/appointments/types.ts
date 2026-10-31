export type AppointmentStatus = 'Requested' | 'Confirmed' | 'Declined' | 'Completed'

export type Appointment = {
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

export type StaffSession = {
  enabled: boolean
  user: { email: string; name: string } | null
}
