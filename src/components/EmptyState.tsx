import { useId } from 'react'

type EmptyStateProps = {
  title: string
  description: string
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  const titleId = useId()
  return (
    <section className="empty-state" aria-labelledby={titleId}>
      <span className="empty-state-icon" aria-hidden="true">✿</span>
      <h2 id={titleId}>{title}</h2>
      <p>{description}</p>
    </section>
  )
}
