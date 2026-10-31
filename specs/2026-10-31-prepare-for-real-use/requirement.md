# Requirement: Prepare for real use

## Context

Roadmap phase 10 prepares AgentClinic for real use by adding staff sign-in, protecting a staff-only action, reviewing accessibility and browser behavior, and documenting setup and release. The mission commits to a reliable site and easy-access dashboard; the technology direction defers authentication and deployment decisions until this phase.

## Initial scope

- Choose and document staff sign-in.
- Protect one staff-only action.
- Provide visible sign-in and sign-out paths.
- Review keyboard use of the agent list and booking form labels/errors.
- Check responsive layout in current major browsers.
- Document local setup, required configuration, build, and release.

## Initial decisions

- Choose an established approach that fits the existing server and deployment direction.
- Keep access behavior understandable and provide feedback for signed-out users.
- Avoid expanding the phase into a full permissions system unless required by the chosen approach.
- Use an external identity provider for staff sign-in.
- Protect appointment status changes as the first staff-only action.
- Select the provider to fit the deployment platform chosen for release; use current major browser versions as the compatibility target.

## Confirmed direction

The approved direction selects external staff identity and protects appointment status changes. Choose the concrete provider and deployment platform together during implementation, then document their rationale and configuration in `specs/tech-stack.md`.
