# Requirement: Shared dashboard frame

## Context

The Vite, React, and TypeScript scaffold is in place. The next roadmap phase is phase 2, “Add the shared dashboard frame.” The mission calls for an easy-access dashboard for agents and clinic staff, and the technology direction recommends semantic, accessible, responsive browser experiences.

## Scope

- Add Agents and Staff as primary navigation destinations.
- Make each destination navigate to a simple placeholder view with a visible active state.
- Add a reusable page content container.
- Ensure navigation is keyboard accessible and uses semantic HTML.
- Add a reusable empty-state component with clear, welcoming copy and a lightly satirical tone.
- Keep the shared frame usable at narrow and wide browser widths.

## Decisions

- Follow roadmap phase 2 as a single, reviewable increment.
- Use placeholder views so each navigation destination has an observable result before the agent directory and staff workflows are implemented.
- Use concise, welcoming copy consistent with `specs/mission.md`; the empty state should be reusable and should not depend on future domain data.
- Follow the existing React and TypeScript structure and avoid adding dependencies for this phase.
- Keep implementation choices small and aligned with accessible semantic HTML.

## Out of scope

- Agent records, directory content, and agent detail views.
- Staff appointment lists, appointment details, or status controls.
- Ailments, therapies, booking, server, persistence, or authentication.
- A complete visual identity or navigation system beyond the shared dashboard frame.
