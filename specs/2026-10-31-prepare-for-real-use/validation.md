# Validation: Prepare for real use

## Implementation handoff

- `npm run build` — passed; client and server TypeScript builds and Vite production build succeeded.
- Generic OpenID Connect Authorization Code + PKCE sign-in, verified-email allowlisting, encrypted session cookies, and protected appointment status changes are implemented.
- Setup and release steps are in `README.md`; a hosting platform and concrete identity provider remain deployment choices.
- Live identity-provider, keyboard, and cross-browser checks have not been run.

## Ready to merge when

1. The sign-in approach and rationale are documented in `specs/tech-stack.md`.
2. A staff-only action is inaccessible to signed-out users and available to signed-in staff.
3. Sign-in and sign-out paths are visible and give clear feedback.
4. The agent list works by keyboard, and booking labels and error messages are clear.
5. Responsive layouts are reviewed in the agreed current browsers.
6. Local setup, required configuration, build, and release steps are documented and internally consistent.
7. The documented build and release preparation steps complete, with results recorded above.
