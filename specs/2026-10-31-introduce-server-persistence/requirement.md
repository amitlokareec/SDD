# Requirement: Introduce the server and persistence

## Context

Roadmap phase 8 introduces a TypeScript server and relational persistence. The technology direction explicitly defers choosing the HTTP framework, database, and migration approach until this phase. Reliable, reproducible setup and clear separation between client, server, and domain responsibilities are required.

## Initial scope

- Select and document the server framework.
- Add a minimal TypeScript server and health endpoint.
- Select and document a relational database and migration approach.
- Create an agents migration and seed one fictional agent.
- Add an agent-list read endpoint and load it in the UI.
- Extend migrations/endpoints for ailments, therapies, and appointments as required by the agreed model.

## Initial decisions

- Use TypeScript throughout and keep the API independent of UI components.
- Select maintained tools with reproducible setup and migration behavior.
- Include useful loading and error states when the UI reads the endpoint.
- Avoid auth and appointment submission integration, which belong to later phases.
- Use a small established TypeScript HTTP framework and a relational database; keep the data model portable and local setup reproducible.
- Persist the domain records needed by the app: agents, ailments, therapies, and appointments.
- Follow the repository's existing package manager and document a local database setup that works with it.

## Confirmed direction

The approved direction selects a TypeScript server and relational persistence, without naming specific products. Before implementation, choose the concrete framework, database, migration tool, and local setup based on the repository and record them with rationale in `specs/tech-stack.md`.
