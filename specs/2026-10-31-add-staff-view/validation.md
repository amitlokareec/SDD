# Validation: Add the staff view

## Implementation handoff

- `npm run build` — passed; TypeScript checking and Vite production build succeeded.
- Implemented a server-backed request list and detail view, newest first, with Requested, Confirmed, Declined, and Completed statuses.
- Status changes require an allowlisted staff identity through the OpenID Connect configuration; without it the control is disabled.
- Manual browser checks for list/detail interaction, keyboard use, and narrow/wide layouts have not been run.

## Ready to merge when

1. A fictional request appears in the staff list with patient, therapy, and requested time.
2. A request detail view shows its status.
3. Staff can update the status using the agreed options and see feedback.
4. The view is reachable through the staff navigation and works with a keyboard.
5. The list and detail remain readable at narrow and wide widths.
6. Data remains local; no server or persistence is introduced.
7. `npm run build` succeeds and its result is recorded above.
