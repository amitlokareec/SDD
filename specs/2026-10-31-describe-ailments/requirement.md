# Requirement: Describe ailments

## Context

The roadmap's next feature phase after the agent directory is phase 4, “Describe ailments.” It adds the first clinical domain content to agent profiles. The mission calls for clear, respectful presentation of agent maladies with playful satire, and the technology direction recommends TypeScript and the existing React application structure.

## Initial scope

- Define a TypeScript type for an ailment.
- Associate one fictional ailment with an agent.
- Show the ailment name and a short description on that agent's detail view.
- Show an empty state for agents with no listed ailments.

## Initial decisions

- Treat this as a small, local-data increment in the existing React and TypeScript app.
- Use fictional ailment content consistent with the mission's playful but welcoming tone.
- Keep therapies, booking, server endpoints, persistence, and staff workflows out of scope.
- Reuse existing detail-view patterns and shared empty-state components where appropriate.
- Use an `agent_ailments` relationship so an ailment can later be shared; the initial seed associates one ailment with one agent.
- Keep the initial ailment fields to name and short description.
- Use a general no-ailments empty state and seed “Recursive meeting exposure” for Otto Promptwell.

## Implementation direction

Phase 8 moves this fictional domain data into SQLite while preserving these initial fields and relationships.
