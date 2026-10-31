import { useState, type FormEvent } from 'react'
import { clinicApi } from '../../lib/api'
import type { AgentSummary, Therapy } from '../agents/types'

type Props = { agent: AgentSummary; therapy: Therapy; onCreated: () => void }

function minimumLocalDateTime() {
  const date = new Date(Date.now() + 60_000)
  date.setSeconds(0, 0)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 16)
}

export default function AppointmentRequestForm({ agent, therapy, onCreated }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [requestedAt, setRequestedAt] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID())
  const [confirmation, setConfirmation] = useState<{ requestedAt: string; note: string }>()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const date = new Date(requestedAt)
    if (!requestedAt || !Number.isFinite(date.getTime()) || date.getTime() <= Date.now()) {
      setError('Choose a date and time in the future.')
      return
    }
    if (note.length > 300) {
      setError('Keep the note to 300 characters or fewer.')
      return
    }
    setIsSaving(true)
    try {
      await clinicApi.createAppointment({
        agentId: agent.id,
        therapyId: therapy.id,
        requestedAt: date.toISOString(),
        note: note.trim(),
      }, idempotencyKey)
      setConfirmation({ requestedAt: date.toISOString(), note: note.trim() })
      setRequestedAt('')
      setNote('')
      setIdempotencyKey(crypto.randomUUID())
      onCreated()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'The request could not be saved. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (confirmation) {
    return (
      <section className="booking-confirmation" aria-live="polite" aria-labelledby={`booking-confirmation-${therapy.id}`}>
        <h6 id={`booking-confirmation-${therapy.id}`}>Request received</h6>
        <p>{agent.name} requested {therapy.name} for <time dateTime={confirmation.requestedAt}>{new Date(confirmation.requestedAt).toLocaleString()}</time>.</p>
        {confirmation.note && <p>Note: {confirmation.note}</p>}
      </section>
    )
  }

  if (!isOpen) return <button className="secondary-button" type="button" onClick={() => setIsOpen(true)}>Request this therapy</button>

  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      <h6>Request {therapy.name}</h6>
      <label htmlFor={`requested-at-${therapy.id}`}>Requested date and time <span aria-hidden="true">*</span></label>
      <input
        id={`requested-at-${therapy.id}`}
        type="datetime-local"
        min={minimumLocalDateTime()}
        required
        value={requestedAt}
        onChange={(event) => setRequestedAt(event.currentTarget.value)}
        aria-invalid={Boolean(error && !requestedAt)}
        aria-describedby={error ? `booking-error-${therapy.id}` : undefined}
      />
      <label htmlFor={`booking-note-${therapy.id}`}>A short note <span className="optional-label">(optional, up to 300 characters)</span></label>
      <textarea id={`booking-note-${therapy.id}`} maxLength={300} rows={3} value={note} onChange={(event) => setNote(event.currentTarget.value)} />
      {error && <p className="form-error" id={`booking-error-${therapy.id}`} role="alert">{error}</p>}
      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={isSaving}>{isSaving ? 'Saving request…' : 'Send request'}</button>
        <button className="quiet-button" type="button" onClick={() => { setIsOpen(false); setError('') }} disabled={isSaving}>Cancel</button>
      </div>
    </form>
  )
}
