# Requirement: Agent directory

## Context

The shared dashboard frame is in place. Roadmap phase 3, “Show the agent directory,” makes the Agents destination useful by showing fictional agent summaries and allowing a user to open an agent detail view. The mission calls for a clear, welcoming experience for agents seeking care. Follow `specs/mission.md` and `specs/tech-stack.md`; the project uses React, TypeScript, and Vite.

## Scope

- Define a TypeScript type for an agent summary.
- Add two fictional agent records in local application data.
- Render each record as a readable row or card in the Agents view.
- Show the reusable empty state when the agent list is empty.
- Provide a detail view for an individual agent and link each directory entry to it.
- Keep directory and detail views usable with keyboard navigation and responsive layouts.

## Decisions

- Treat this as roadmap phase 3 and keep the work limited to the agent directory and its detail view.
- Use local fictional data; do not introduce an API, persistence, or new dependencies.
- Keep the summary type limited to fields needed by the directory and detail view. Use the existing project conventions and UI frame.
- Reuse the shared empty-state and page-content components where appropriate.
- Use semantic links for agent navigation and show a useful page heading and agent identity on the detail view.
- Preserve the mission’s playful, respectful tone. Use fictional identities and avoid real personal information.

## Out of scope

- Ailments and therapies, except any minimal placeholder necessary to keep the detail view clear.
- Appointment booking, staff workflows, authentication, server endpoints, persistence, and search/filtering.
- Editing or creating agent records.
- Changes to the shared dashboard frame beyond what is needed to integrate the Agents view and agent detail navigation.
