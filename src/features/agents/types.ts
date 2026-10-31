export type AgentSummary = {
  id: string
  name: string
  role: string
  summary: string
  ailments: Ailment[]
}

export type Ailment = {
  id: string
  name: string
  description: string
}

export type Therapy = {
  id: string
  ailmentId: string
  name: string
  description: string
}
