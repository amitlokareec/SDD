# Validation: Introduce the server and persistence

## Implementation handoff

- `npm run build` — passed; client and server TypeScript builds and Vite production build succeeded.
- Fastify endpoints, SQLite schema initialization, and deterministic fictional seed data are implemented.
- Local commands and production configuration are documented in `README.md`; live endpoint checks have not been run.

## Ready to merge when

1. `specs/tech-stack.md` records the selected framework, database, and migration approach with rationale.
2. The TypeScript server starts reproducibly and its health endpoint returns the documented response.
3. The agent migration and seed produce a fictional agent using the documented setup.
4. The read endpoint returns the agent list and the UI loads it with useful loading/error feedback.
5. Any additional domain migrations and endpoints match the agreed scope and have clear relationships.
6. Local setup instructions work from a clean checkout, and the project build succeeds.
7. No authentication or booking submission integration is added ahead of its roadmap phase.
