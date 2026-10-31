# Requirement: Create an appointment request

## Context

Roadmap phase 6 introduces appointment requests after the app can describe agents, ailments, and therapies. The mission emphasizes making the next useful action easy to find. Follow the mission, technology direction, and established React and TypeScript patterns.

## Initial scope

- Define a TypeScript appointment request type.
- Provide a form entry point from a therapy.
- Collect a date and time and an optional short note.
- Validate required fields and show inline errors.
- Show a confirmation after submission.
- Keep the request in local app state.

## Initial decisions

- This phase does not add a server or persistence; those are later roadmap phases.
- Keep the form focused and accessible, with explicit labels and useful validation feedback.
- Do not introduce unrelated staff workflows or authentication.
- The selected agent identifies the requester; do not add a separate free-text patient name.
- Permit a requested date and time in the future; do not add availability-slot scheduling in this prototype.
- Show the selected agent, therapy, requested date/time, and note (if present) in the confirmation. Keep the request in app state; no edit or cancel flow is required in this phase.
- Keep the optional note short with a reasonable implementation-defined limit and clear guidance.

## Confirmed direction

These defaults were approved for the remaining roadmap specs. Keep the phase local-state-only; phase 9 will add server-side validation and persistence.
