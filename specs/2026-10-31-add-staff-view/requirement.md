# Requirement: Add the staff view

## Context

Roadmap phase 7 gives clinic staff a view of appointment requests. The mission calls for a clear dashboard to support patients and keep the clinic running. Follow the mission, technology direction, and existing app conventions.

## Initial scope

- Add one fictional appointment request to local data.
- Render patient, therapy, and requested time in a staff list.
- Provide a detail view showing request status.
- Let staff change status and see feedback.

## Initial decisions

- Use local fictional data and local state in this phase.
- Keep server persistence and staff sign-in for later roadmap phases.
- Reuse the shared dashboard frame and accessible semantic UI patterns.
- Use `Requested`, `Confirmed`, `Declined`, and `Completed` as the initial statuses, with new requests starting as `Requested`.
- Identify the patient by the selected agent and show that agent's name in the list.
- Show all requests, newest first. Status changes can be reversed by selecting another valid status and should produce concise visible feedback.

## Confirmed direction

These defaults were approved for the remaining roadmap specs. Keep this phase in local state; phase 9 will connect requests to persistence.
