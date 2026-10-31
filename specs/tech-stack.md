# AgentClinic technology direction

This document records the recommended implementation baseline. TypeScript is the language, not a web framework; the recommendation is React with TypeScript, built with Vite. The repository currently contains TypeScript and a `tsc` build script, but no application framework or runtime dependencies. Adopt the stack in small steps as the roadmap needs it.

## Proposed stack

- **Language:** TypeScript throughout the application.
- **Web client:** React with TypeScript, using Vite for the development server and production build. This is a widely used, well-supported choice for a dashboard-heavy interface.
- **Server:** Node.js with TypeScript. Choose a small, established HTTP framework when the first server endpoint is needed; keep the API independent of UI components.
- **Persistence:** Start with a relational data model for agents, ailments, therapies, staff, and appointments. Select a database and migration approach when persistence is introduced.
- **Browser support:** Target current versions of major browsers, with responsive layouts and accessible semantic HTML.

## Engineering principles

- Prefer established, maintained tools with TypeScript support.
- Keep client, server, and domain responsibilities easy to understand and change.
- Add dependencies only when a roadmap phase requires them.
- Keep configuration reproducible and builds deterministic.
- Treat appointment changes and persisted data as operations that need clear validation and error handling.
- Make keyboard access, readable contrast, and useful loading and error states part of the interface.

## Decisions to revisit

Choose the server framework, database, data-access layer, authentication approach, and deployment platform when the corresponding roadmap work is about to begin. Record the selected options and the reason here before implementation depends on them.
