# Validation: Describe therapies

## Implementation handoff

- `npm run build` — passed; TypeScript checking and Vite production build succeeded.
- The initial therapy is displayed inside its ailment section with an appointment-request entry point.
- The no-therapy state is implemented; manual keyboard and narrow/wide browser checks have not been run.

## Ready to merge when

1. A TypeScript therapy type captures the agreed fields.
2. One fictional therapy is associated with a relevant ailment.
3. The agreed view shows the therapy name and description clearly.
4. The agreed no-therapy empty state is shown when applicable.
5. The experience remains keyboard accessible and responsive.
6. No appointment, server, persistence, or staff workflow is introduced.
7. `npm run build` succeeds and its result is recorded above.
