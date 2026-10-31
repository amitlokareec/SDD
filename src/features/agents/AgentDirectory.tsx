import EmptyState from '../../components/EmptyState'
import type { AgentSummary } from './types'

type AgentDirectoryProps = {
  agents: AgentSummary[]
  onNavigate: (path: string) => void
}

export default function AgentDirectory({ agents, onNavigate }: AgentDirectoryProps) {
  if (agents.length === 0) {
    return (
      <EmptyState
        title="No agents in the waiting room yet"
        description="The waiting room is peaceful for now. Even the recursive meeting exposure can wait."
      />
    )
  }

  return (
    <ul className="agent-list" aria-label="Agents">
      {agents.map((agent) => {
        const path = `/agents/${agent.id}`
        return (
          <li className="agent-card" key={agent.id}>
            <a className="agent-link" href={path} onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
              event.preventDefault()
              onNavigate(path)
            }}>
              <span className="agent-avatar" aria-hidden="true">{agent.name.charAt(0)}</span>
              <span className="agent-card-copy">
                <span className="agent-name">{agent.name}</span>
                <span className="agent-role">{agent.role}</span>
                <span className="agent-summary">{agent.summary}</span>
              </span>
              <span className="agent-card-arrow" aria-hidden="true">→</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
