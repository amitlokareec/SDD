# Validation: Shared dashboard frame

## Implementation handoff

- `npm run build` — passed on 2026-10-31. TypeScript compilation and the Vite production build completed successfully.
- Agents and Staff are available as keyboard-operable buttons in the semantic Main navigation; the selected destination exposes `aria-current="page"` and has a visible active style.
- Both destinations render through the shared page content container and reusable empty-state component.
- Responsive layout rules stack the brand and navigation at narrow widths and allow the content card to use available width on larger screens.
- No domain data, workflows, server, persistence, or authentication were added.

Manual browser checks at narrow and wide widths have not been run.

The feature is ready to merge when all of the following are true:

1. Agents and Staff appear as primary navigation destinations.
2. Selecting each destination opens its placeholder view and clearly indicates the active destination.
3. A keyboard user can reach and activate each navigation destination, with a visible focus indicator.
4. Navigation and page content use appropriate semantic structure.
5. The reusable page content container and empty-state component render clearly at narrow and wide browser widths.
6. Empty-state copy is concise, welcoming, lightly satirical, and reusable for future views.
7. No agent, ailment, therapy, appointment, server, persistence, or authentication workflow has been added as part of this phase.
8. The project builds successfully, and the implementation handoff records the validation commands and results.
