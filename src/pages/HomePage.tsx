import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PageContent from '../components/PageContent'

type DashboardPage = 'agents' | 'staff'

const pageCopy: Record<DashboardPage, { title: string; description: string }> = {
  agents: {
    title: 'Agent directory',
    description: 'A quiet place for agents to find care, after one more “quick” task.',
  },
  staff: {
    title: 'Staff dashboard',
    description: 'A home base for the humans keeping this very unusual clinic running.',
  },
}

export default function HomePage() {
  const [activePage, setActivePage] = useState<DashboardPage>('agents')
  const page = pageCopy[activePage]

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <section className="dashboard-card" aria-label="AgentClinic dashboard">
        <Header activePage={activePage} onNavigate={setActivePage} />
        <PageContent>
          <p className="eyebrow">A little care goes a long way</p>
          <h1>{page.title}</h1>
          <p className="introduction">{page.description}</p>
          <EmptyState
            title={activePage === 'agents' ? 'No agents in the waiting room yet' : 'Nothing on the schedule yet'}
            description={activePage === 'agents'
              ? 'The waiting room is peaceful for now. Even the recursive meeting exposure can wait.'
              : 'Your appointment list is blissfully clear. The clipboard may take the afternoon off.'}
          />
        </PageContent>
        <Footer />
      </section>
      <p className="page-caption">A calm corner of the internet <span>·</span> Take a breath</p>
    </div>
  )
}
