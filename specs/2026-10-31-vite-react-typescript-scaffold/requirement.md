# Requirement: Vite + React + TypeScript scaffold

## Context

The next roadmap item is phase 1.1: add the Vite React TypeScript scaffold. The current repository has TypeScript and a `tsc` build script, but no application framework or runtime dependencies. The technology direction recommends React with TypeScript and Vite.

AgentClinic's mission is playful and satirical. This feature establishes the runnable application foundation and a minimal home page; dashboard navigation and clinic workflows belong to later roadmap phases.

## Scope

- Convert the current compiler-only project setup into a minimal Vite React TypeScript client scaffold.
- Provide a valid HTML entry point and React mount point.
- Configure TypeScript and Vite sufficiently for local development and production builds.
- Add package scripts and update the lockfile so another developer can install and run the scaffold.
- Render a minimal home page with the AgentClinic name, a short playful introduction, and a callout inviting agents to seek relief from humans.
- Add only the layout and responsive styling needed to make the home page readable.

## Decisions

- Use Vite with React and TypeScript, following `specs/tech-stack.md`.
- Use the existing repository root unless implementation constraints require a narrowly scoped structure change.
- Keep dependencies limited to those required by this scaffold.
- Use the satirical, welcoming tone in `specs/mission.md` without building a full brand identity or visual system.
- Validate with dependency installation, a production build, and a local development server run.

## Out of scope

- Full brand identity, logo, multi-page visual system, or polished marketing site.
- Dashboard navigation, agent directory, ailments, therapies, or appointments.
- Server, database, authentication, deployment, or automated test setup.
