import { useState } from 'react'
import EmptyState from '../../components/EmptyState'
import { clinicApi } from '../../lib/api'
import type { Appointment, AppointmentStatus, StaffSession } from './types'

const statuses: AppointmentStatus[] = ['Requested', 'Confirmed', 'Declined', 'Completed']

type Props = {
  appointments: Appointment[]
  session: StaffSession | null
  loading: boolean
  error: string
  selectedAppointmentId?: string
  onNavigate: (path: string) => void
  onReload: () => void
}

function localLink(event: React.MouseEvent<HTMLAnchorElement>, navigate: (path: string) => void, path: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  navigate(path)
}

export default function StaffDashboard({ appointments, session, loading, error, selectedAppointmentId, onNavigate, onReload }: Props) {
  const [statusMessage, setStatusMessage] = useState('')
  const [statusError, setStatusError] = useState('')
  const [savingStatus, setSavingStatus] = useState(false)
  const selected = appointments.find((appointment) => appointment.id === selectedAppointmentId)

  async function changeStatus(status: AppointmentStatus) {
    if (!selected) return
    setSavingStatus(true)
    setStatusError('')
    setStatusMessage('')
    try {
      await clinicApi.updateAppointmentStatus(selected.id, status)
      setStatusMessage(`Request status changed to ${status}.`)
      onReload()
    } catch (updateError) {
      setStatusError(updateError instanceof Error ? updateError.message : 'The status could not be updated.')
    } finally {
      setSavingStatus(false)
    }
  }

  async function signOut() {
    try {
      await clinicApi.logout()
      onReload()
    } catch (logoutError) {
      setStatusError(logoutError instanceof Error ? logoutError.message : 'Sign-out could not be completed.')
    }
  }

  return (
    <section className="staff-dashboard" aria-label="Appointment requests">
      <div className="staff-toolbar">
        <div>
          <p className="eyebrow">Clinic staff</p>
          <p className="staff-caption">Requests stay in date order, so the next appointment is easy to spot.</p>
        </div>
        {session?.user ? (
          <div className="staff-session"><span>Signed in as {session.user.name}</span><button className="quiet-button" type="button" onClick={signOut}>Sign out</button></div>
        ) : session?.enabled ? (
          <a className="primary-button button-link" href="/api/auth/login">Staff sign in</a>
        ) : (
          <span className="auth-note">Staff sign-in needs configuration.</span>
        )}
      </div>

      {statusMessage && <p className="status-message" role="status">{statusMessage}</p>}
      {statusError && <p className="form-error" role="alert">{statusError}</p>}
      {loading ? <p className="loading-message" role="status">Loading appointment requests…</p>
        : error ? <div className="load-error" role="alert"><p>{error}</p><button className="secondary-button" type="button" onClick={onReload}>Try again</button></div>
        : selected ? (
          <article className="appointment-detail" aria-labelledby="appointment-detail-title">
            <a className="text-link back-link" href="/staff" onClick={(event) => localLink(event, onNavigate, '/staff')}>← All requests</a>
            <p className="eyebrow">Request details</p>
            <h2 id="appointment-detail-title">{selected.agentName} · {selected.therapyName}</h2>
            <dl className="appointment-facts">
              <div><dt>Patient</dt><dd>{selected.agentName}</dd></div>
              <div><dt>Therapy</dt><dd>{selected.therapyName}</dd></div>
              <div><dt>Requested time</dt><dd><time dateTime={selected.requestedAt}>{new Date(selected.requestedAt).toLocaleString()}</time></dd></div>
              <div><dt>Status</dt><dd><span className={`status-pill status-${selected.status.toLowerCase()}`}>{selected.status}</span></dd></div>
              {selected.note && <div><dt>Note</dt><dd>{selected.note}</dd></div>}
            </dl>
            <label className="status-control" htmlFor="appointment-status">Update request status
              <select id="appointment-status" value={selected.status} disabled={!session?.user || savingStatus} onChange={(event) => changeStatus(event.currentTarget.value as AppointmentStatus)}>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
            {!session?.user && <p className="auth-note">Sign in as staff to change this request’s status.</p>}
          </article>
        ) : appointments.length === 0 ? (
          <EmptyState title="Nothing on the schedule yet" description="Your appointment list is blissfully clear. The clipboard may take the afternoon off." />
        ) : (
          <ul className="appointment-list">
            {appointments.map((appointment) => (
              <li className="appointment-row" key={appointment.id}>
                <a href={`/staff/appointments/${appointment.id}`} onClick={(event) => localLink(event, onNavigate, `/staff/appointments/${appointment.id}`)}>
                  <span className="appointment-main"><strong>{appointment.agentName}</strong><span>{appointment.therapyName}</span><time dateTime={appointment.requestedAt}>{new Date(appointment.requestedAt).toLocaleString()}</time></span>
                  <span className={`status-pill status-${appointment.status.toLowerCase()}`}>{appointment.status}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
    </section>
  )
}
