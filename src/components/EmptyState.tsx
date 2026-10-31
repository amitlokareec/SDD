type EmptyStateProps = {
  title: string
  description: string
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="empty-state" aria-labelledby="empty-state-title">
      <span className="empty-state-icon" aria-hidden="true">✿</span>
      <h2 id="empty-state-title">{title}</h2>
      <p>{description}</p>
    </section>
  )
}
