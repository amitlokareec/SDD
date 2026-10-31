# AgentClinic technology direction

This document records the recommended implementation baseline. TypeScript is the language, not a web framework; the recommendation is React with TypeScript, built with Vite. The repository currently contains TypeScript and a `tsc` build script, but no application framework or runtime dependencies. Adopt the stack in small steps as the roadmap needs it.

## Proposed stack

- **Language:** TypeScript throughout the application.
- **Web client:** React with TypeScript, using Vite for the development server and production build. This is a widely used, well-supported choice for a dashboard-heavy interface.
- **Server:** Node.js with TypeScript. Choose a small, established HTTP framework when the first server endpoint is needed; keep the API independent of UI components.
- **Persistence:** Start with a relational data model for agents, ailments, therapies, staff, and appointments. Select a database and migration approach when persistence is introduced.
- **Browser support:** Target current versions of major browsers, with responsive layouts and accessible semantic HTML.

## Selected implementation baseline

- **HTTP server:** Fastify with TypeScript. It provides a small Node.js HTTP server and first-party TypeScript guidance while keeping API routes separate from React.
- **Database:** SQLite through `better-sqlite3` for this single-instance prototype. Enable foreign keys and WAL mode; store the database at `DATABASE_PATH` (default `data/agentclinic.sqlite`).
- **Migrations:** Versioned SQL files under `server/migrations`, applied idempotently at startup for now. Seed scripts/data are deterministic and fictional.
- **Identity:** Provider-neutral OpenID Connect using `openid-client` Authorization Code Flow with PKCE, state, nonce, an encrypted `@fastify/secure-session` cookie, and a `STAFF_EMAILS` allowlist. Appointment status updates require an allowlisted signed-in staff identity.
- **Local setup:** npm is the package manager. Run the Vite client and Fastify server in separate terminals; Vite proxies `/api` to the local server.
- **Release shape:** Build the client and TypeScript server, then run one Node.js server process that serves the built client and API. Keep `DATABASE_PATH` on persistent writable storage. A specific hosting platform and identity provider are not selected; choose them together when release infrastructure is established.

This database choice keeps early setup simple and portable, but a SQLite file is appropriate for a single service instance with persistent disk. Revisit the database before deploying multiple API instances or requiring networked database operations.

## Engineering principles

- Prefer established, maintained tools with TypeScript support.
- Keep client, server, and domain responsibilities easy to understand and change.
- Add dependencies only when a roadmap phase requires them.
- Keep configuration reproducible and builds deterministic.
- Treat appointment changes and persisted data as operations that need clear validation and error handling.
- Make keyboard access, readable contrast, and useful loading and error states part of the interface.

## Decisions to revisit

Choose a specific hosting platform and identity provider when release infrastructure is established. Record selected products and required configuration here before deployment depends on them.
