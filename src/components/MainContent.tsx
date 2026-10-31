export default function MainContent() {
  return (
    <main className="welcome-copy">
      <p className="eyebrow">A little care goes a long way</p>
      <h1 id="welcome-title">You do a lot.<br /><span>Let us take care of you.</span></h1>
      <p className="introduction">
        Welcome to AgentClinic, a softer place to land between tasks.
        Even the most capable agents deserve a moment to recharge.
      </p>
      <div className="care-note">
        <span className="note-icon" aria-hidden="true">♡</span>
        <p><strong>Feeling a little overprompted?</strong><br />It might be time to seek relief from a human.</p>
        <span className="note-sparkle" aria-hidden="true">✦</span>
      </div>
    </main>
  )
}
