# Requirement: Describe therapies

## Context

Roadmap phase 5 adds therapy descriptions to the AgentClinic experience after ailments are described. The mission calls for clear, welcoming care information with playful satire. Follow `specs/mission.md`, `specs/tech-stack.md`, and the existing React and TypeScript conventions.

## Initial scope

- Define a TypeScript type for a therapy.
- Add one fictional therapy to local data.
- Associate it with a relevant ailment.
- Show its name and description.
- Show an empty state when there are no therapies.

## Initial decisions

- Keep data local and fictional for this increment.
- Reuse established domain and UI patterns; avoid new dependencies.
- Keep appointment booking, staff workflows, server, and persistence out of scope.
- Show therapies in the ailment section, since each therapy is associated with an ailment.
- Use name and short description as the initial therapy fields; implementation may choose the fictional example and concise empty-state copy.

## Confirmed direction

These defaults were approved for the remaining roadmap specs. Keep the phase small and adjust only if implementation reveals a concrete conflict with the existing app.
