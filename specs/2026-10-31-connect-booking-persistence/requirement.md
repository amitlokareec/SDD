# Requirement: Connect booking to persisted appointments

## Context

Roadmap phase 9 connects the local appointment request flow to the server and database introduced in phase 8. Appointment changes and persisted data need clear validation and error handling, consistent with the technology direction and mission.

## Initial scope

- Add a server endpoint to accept appointment requests.
- Validate requests on the server and persist valid requests.
- Connect the booking form to the endpoint.
- Provide loading, success, and useful error states.
- Load persisted requests in the staff view.

## Initial decisions

- Reuse the phase 8 framework, database, migration, and domain model choices.
- Treat server-side validation as authoritative.
- Keep status management consistent with the existing staff view and scope decisions.
- Do not introduce staff authentication here; it belongs to phase 10.
- Require the selected agent, therapy, and a future requested date/time; the note remains optional and bounded as in phase 6.
- On failure, retain entered values and allow retry with a clear error message.
- Show all persisted requests newest first in the staff view.
- Guard against accidental duplicate submissions; use an idempotency mechanism if retry behavior could otherwise create duplicates.

## Confirmed direction

These defaults were approved for the remaining roadmap specs. Implement details consistently with the concrete server and database choices recorded for phase 8.
