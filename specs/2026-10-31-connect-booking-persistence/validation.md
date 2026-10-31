# Validation: Connect booking to persisted appointments

## Implementation handoff

- `npm run build` — passed; TypeScript checking and Vite production build succeeded.
- Implemented server-side validation, SQLite persistence, idempotency-key handling, and client loading, success, and error states.
- Staff requests load from persistence and are sorted newest first.
- Manual submission, retry, and browser interaction checks have not been run.

## Ready to merge when

1. The server accepts valid requests and rejects invalid requests with useful responses.
2. Valid requests are persisted and can be read back.
3. The booking form shows loading, success, and recoverable error states.
4. The staff view displays persisted requests with useful loading, empty, or error feedback.
5. The form and staff view remain keyboard accessible and responsive.
6. Request validation and data handling follow the decisions documented for phases 8 and 9.
7. Relevant build and setup commands succeed and results are recorded above.
