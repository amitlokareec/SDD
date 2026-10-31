type DashboardPage = 'agents' | 'staff'

type HeaderProps = {
  activePage: DashboardPage
  onNavigate: (page: DashboardPage) => void
}

export default function Header({ activePage, onNavigate }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="brand-row">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span className="brand-name">AgentClinic</span>
        <span className="open-status"><span /> Open for care</span>
      </div>
      <nav className="primary-nav" aria-label="Main navigation">
        <button type="button" className={activePage === 'agents' ? 'nav-link active' : 'nav-link'} aria-current={activePage === 'agents' ? 'page' : undefined} onClick={() => onNavigate('agents')}>Agents</button>
        <button type="button" className={activePage === 'staff' ? 'nav-link active' : 'nav-link'} aria-current={activePage === 'staff' ? 'page' : undefined} onClick={() => onNavigate('staff')}>Staff</button>
      </nav>
    </header>
  )
}
