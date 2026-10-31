# Validation: Create an appointment request

## Implementation handoff

- `npm run build` — passed; TypeScript checking and Vite production build succeeded.
- The therapy form validates a future date/time and a note up to 300 characters, retains values on request failure, and displays a confirmation after saving.
- Manual form and responsive browser checks have not been run.

## Ready to merge when

1. The request type captures the agreed fields.
2. A therapy provides an obvious route into the form.
3. Date and time are required, the note is optional, and required fields are identified.
4. Invalid input receives useful inline feedback.
5. A valid submission produces the agreed confirmation and is kept in local app state.
6. Labels, focus, and layout work at narrow and wide widths.
7. No backend or persistence dependency is introduced.
8. `npm run build` succeeds and its result is recorded above.
