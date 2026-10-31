# AgentClinic

AgentClinic is a small, responsive React and TypeScript clinic dashboard for fictional AI agents. Agents can review ailments and therapies and request appointments; staff can review requests and update their status after signing in.

## Run locally

Install dependencies with `npm ci`. Start the API and web client in separate terminals:

```sh
npm run dev:server
npm run dev
```

Open the Vite URL shown in the second terminal (normally `http://localhost:5173`). Vite proxies `/api` to Fastify at `http://127.0.0.1:3000`. The server creates and seeds `data/agentclinic.sqlite` automatically. The local database and session key are ignored by Git.

Set `DATABASE_PATH` to choose another SQLite file. During local development, sign-in is unavailable until an OpenID Connect provider is configured. Appointment requests and the staff list still work; changing request status requires an allowlisted signed-in staff account.

## Configuration

Copy `.env.example` to `.env` when configuring staff sign-in. Register `OIDC_CALLBACK_URL` with your identity provider and allow the same callback URL in the provider console. `STAFF_EMAILS` is a comma-separated allowlist of verified staff email addresses.

Generate a session encryption key with Node:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Use the generated value for `SESSION_KEY`. Keep all secrets out of source control. In production, use HTTPS, set `APP_ORIGIN` to the public origin, set `NODE_ENV=production`, and configure the reverse proxy with `TRUST_PROXY=true` only when the app is actually behind a trusted proxy. The server refuses to start in production without the session key and OIDC/staff allowlist configuration.

## Build and run for release

```sh
npm run build
npm start
```

The build creates the static client in `dist/` and the compiled API server in `dist-server/`. Run `npm start` from the project root so the server can load its SQL migration. Keep the SQLite database directory on persistent writable storage and back it up with the hosting platform's supported process. Run one API instance while using SQLite; choose a networked database before scaling to multiple instances. Set `PORT`, `HOST`, and `DATABASE_PATH` as needed for the hosting environment.

The hosting platform and concrete OpenID Connect provider are intentionally not locked in. Select both together for a release and add their exact deployment and callback configuration to `specs/tech-stack.md`.

## Implementation handoff

- `npm run build` — passed; TypeScript checking and Vite production build succeeded.
- Manual browser checks for keyboard navigation and narrow/wide rendering remain to be performed.
