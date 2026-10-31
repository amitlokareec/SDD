import type { AgentSummary } from './types'
import type { Therapy } from './types'
import AppointmentRequestForm from '../appointments/AppointmentRequestForm'
import EmptyState from '../../components/EmptyState'

type AgentDetailProps = {
  agent?: AgentSummary
  therapies: Therapy[]
  onNavigate: (path: string) => void
  onAppointmentCreated: () => void
}

export default function AgentDetail({ agent, therapies, onNavigate, onAppointmentCreated }: AgentDetailProps) {
  if (!agent) {
    return (
      <section className="agent-not-found" aria-labelledby="not-found-title">
        <p className="eyebrow">Wrong hallway</p>
        <h2 id="not-found-title">We couldn’t find that agent.</h2>
        <p className="introduction">They may be taking a well-earned break from the network.</p>
        <a href="/agents" className="text-link" onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          event.preventDefault()
          onNavigate('/agents')
        }}>Back to the agent directory</a>
      </section>
    )
  }

  return (
    <article className="agent-detail" aria-labelledby="agent-detail-name">
      <a href="/agents" className="text-link back-link" onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        onNavigate('/agents')
      }}>← Agent directory</a>
      <div className="agent-detail-heading">
        <span className="agent-avatar agent-avatar-large" aria-hidden="true">{agent.name.charAt(0)}</span>
        <div>
          <p className="eyebrow">Agent profile</p>
          <h2 id="agent-detail-name">{agent.name}</h2>
          <p className="agent-role">{agent.role}</p>
        </div>
      </div>
      <div className="agent-detail-note">
        <h3>A little about this agent</h3>
        <p>{agent.summary}</p>
      </div>
      <section className="ailment-section" aria-labelledby="ailments-heading">
        <h3 id="ailments-heading">Ailments and care</h3>
        {agent.ailments.length === 0 ? (
          <EmptyState title="No ailments listed" description="Nothing is troubling this agent at the moment. We’ll leave the clipboard within reach." />
        ) : (
          <ul className="ailment-list">
            {agent.ailments.map((ailment) => {
              const ailmentTherapies = therapies.filter((therapy) => therapy.ailmentId === ailment.id)
              return (
                <li className="ailment-card" key={ailment.id}>
                  <h4>{ailment.name}</h4>
                  <p>{ailment.description}</p>
                  <div className="therapy-section">
                    <h5>Therapies</h5>
                    {ailmentTherapies.length === 0 ? (
                      <EmptyState title="No therapies listed" description="The care team is still putting together a gentle plan." />
                    ) : (
                      <ul className="therapy-list">
                        {ailmentTherapies.map((therapy) => (
                          <li className="therapy-card" key={therapy.id}>
                            <h6>{therapy.name}</h6>
                            <p>{therapy.description}</p>
                            <AppointmentRequestForm agent={agent} therapy={therapy} onCreated={onAppointmentCreated} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </article>
  )
}
