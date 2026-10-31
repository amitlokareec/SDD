# Plan: Introduce the server and persistence

## 1. Select the backend baseline

1. Choose and document a small established TypeScript HTTP framework.
2. Choose and document a relational database and migration approach.
3. Record the reasons and local configuration needs in `specs/tech-stack.md` before implementation depends on them.

## 2. Add a minimal server

1. Add a minimal TypeScript server entry point.
2. Add a health endpoint with a simple, documented response.
3. Keep API responsibilities independent of UI components.

## 3. Persist and read agents

1. Create the first agent migration.
2. Add one fictional agent through a seed script.
3. Add an endpoint that reads the agent list.
4. Load the list from that endpoint in the UI with useful loading and error states.

## 4. Extend the data model

1. Repeat the migration and endpoint pattern for ailments, therapies, and appointments as needed by the agreed scope.
2. Preserve clear relationships and deterministic local setup.

## 5. Validate and hand off

1. Follow documented setup to start the service and initialize the database.
2. Check health, seed, and read flows.
3. Run the project's build and record commands and results in the implementation handoff.
