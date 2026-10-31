import { useCallback, useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageContent from '../components/PageContent'
import AgentDetail from '../features/agents/AgentDetail'
import AgentDirectory from '../features/agents/AgentDirectory'
import type { AgentSummary, Therapy } from '../features/agents/types'
import StaffDashboard from '../features/appointments/StaffDashboard'
import type { Appointment, StaffSession } from '../features/appointments/types'
import { clinicApi } from '../lib/api'

type DashboardPage = 'agents' | 'staff'

function readPath() {
  return window.location.pathname
}

export default function HomePage() {
  const [path, setPath] = useState(readPath)
  const [agents, setAgents] = useState<AgentSummary[]>([])
  const [therapies, setTherapies] = useState<Therapy[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [session, setSession] = useState<StaffSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const isStaffPage = path === '/staff' || path.startsWith('/staff/')
  const activePage: DashboardPage = isStaffPage ? 'staff' : 'agents'
  const agentId = path.match(/^\/agents\/([^/]+)\/?$/)?.[1]
  const appointmentId = path.match(/^\/staff\/appointments\/([^/]+)\/?$/)?.[1]
  const selectedAgent = agentId ? agents.find((agent) => agent.id === agentId) : undefined

  const loadClinicData = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    try {
      const [nextAgents, nextTherapies, nextAppointments, nextSession] = await Promise.all([
        clinicApi.agents(), clinicApi.therapies(), clinicApi.appointments(), clinicApi.session(),
      ])
      setAgents(nextAgents)
      setTherapies(nextTherapies)
      setAppointments(nextAppointments)
      setSession(nextSession)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'AgentClinic could not load its clinic data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const syncPath = () => setPath(readPath())
    window.addEventListener('popstate', syncPath)
    void loadClinicData()
    return () => window.removeEventListener('popstate', syncPath)
  }, [loadClinicData])

  function navigate(nextPath: string) {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  function navigateToPage(page: DashboardPage) {
    navigate(page === 'agents' ? '/agents' : '/staff')
  }

  const title = isStaffPage
    ? appointmentId ? 'Appointment request' : 'Staff dashboard'
    : agentId ? (selectedAgent ? 'Agent profile' : 'Agent not found') : 'Agent directory'
  const description = isStaffPage
    ? appointmentId ? 'A little detail helps every request find its next step.' : 'A home base for the humans keeping this very unusual clinic running.'
    : agentId
      ? selectedAgent ? `${selectedAgent.role} · AgentClinic profile` : 'That profile is not available.'
      : 'A quiet place for agents to find care, after one more “quick” task.'

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <section className="dashboard-card" aria-label="AgentClinic dashboard">
        <Header activePage={activePage} onNavigate={navigateToPage} />
        <PageContent>
          <p className="eyebrow">A little care goes a long way</p>
          <h1>{title}</h1>
          <p className="introduction">{description}</p>
          {loadError ? (
            <div className="load-error" role="alert">
              <p>{loadError}</p>
              <button className="secondary-button" type="button" onClick={() => void loadClinicData()}>Try again</button>
            </div>
          ) : isStaffPage ? (
            <StaffDashboard
              appointments={appointments}
              session={session}
              loading={loading}
              error={loadError}
              selectedAppointmentId={appointmentId}
              onNavigate={navigate}
              onReload={() => { void loadClinicData() }}
            />
          ) : agentId ? (
            <AgentDetail agent={selectedAgent} therapies={therapies} onNavigate={navigate} onAppointmentCreated={() => { void loadClinicData() }} />
          ) : loading ? (
            <p className="loading-message" role="status">Loading the agent directory…</p>
          ) : agents.length === 0 ? (
            <EmptyState title="No agents in the waiting room yet" description="The waiting room is peaceful for now. Even the recursive meeting exposure can wait." />
          ) : (
            <AgentDirectory agents={agents} onNavigate={navigate} />
          )}
        </PageContent>
        <Footer />
      </section>
      <p className="page-caption">A calm corner of the internet <span>·</span> Take a breath</p>
    </div>
  )
}
