# AgentClinic implementation roadmap

Build in nano phases: each phase should make one small, reviewable change with an obvious result. Keep the app buildable after each step. Avoid bundling unrelated interface, data, and infrastructure work into one phase.

## 1. Establish the app shell

1. Add the Vite React TypeScript scaffold.
2. Start the development server and confirm the starter page loads.
3. Replace the starter title with AgentClinic.
4. Add a single page heading and short clinic introduction.
5. Add a primary navigation bar with placeholder destinations.
6. Set the page width, spacing, and base typography.
7. Check the shell at narrow and wide browser widths.

## 2. Add the shared dashboard frame

1. Add an Agents navigation destination.
2. Add a Staff navigation destination.
3. Make the active destination visually clear.
4. Ensure navigation works with a keyboard.
5. Add a reusable page content container.
6. Add a reusable empty-state component.

## 3. Show the agent directory

1. Define a TypeScript type for an agent summary.
2. Add one fictional agent record in local data.
3. Render the record as a readable agent row or card.
4. Add a second fictional agent record.
5. Show the empty state when the agent list is empty.
6. Add a route or view for one agent's details.
7. Link each agent row to its detail view.

## 4. Describe ailments

1. Define a TypeScript type for an ailment.
2. Associate one fictional ailment with an agent.
3. Show ailment names on the agent detail view.
4. Show a short description for each ailment.
5. Add an empty state for agents with no listed ailments.

## 5. Describe therapies

1. Define a TypeScript type for a therapy.
2. Add one fictional therapy to local data.
3. Show the therapy name and description.
4. Associate a therapy with a relevant ailment.
5. Add an empty state when no therapies are available.

## 6. Create an appointment request

1. Define a TypeScript type for an appointment request.
2. Add an appointment form entry point from a therapy.
3. Add a date and time input.
4. Add a short optional note field.
5. Mark required fields and validate them.
6. Show an inline message for invalid input.
7. Show a confirmation view after submission.
8. Keep the initial request in local app state.

## 7. Add the staff view

1. Add one fictional appointment request to local data.
2. Render a staff list of appointment requests.
3. Show patient, therapy, and requested time in each row.
4. Add a detail view for one request.
5. Show the request status.
6. Add a status control for staff.
7. Show feedback when the status changes.

## 8. Introduce the server and persistence

1. Choose and document the server framework.
2. Add a minimal TypeScript server entry point.
3. Add a health endpoint.
4. Choose and document the database.
5. Create the first migration for agents.
6. Add one fictional agent through a seed script.
7. Add a read endpoint for the agent list.
8. Load the agent list from the endpoint in the UI.
9. Repeat the migration and endpoint steps for ailments, therapies, and appointments as needed.

## 9. Connect booking to persisted appointments

1. Add a server endpoint that accepts an appointment request.
2. Validate the request on the server.
3. Save one valid request to the database.
4. Connect the booking form to the endpoint.
5. Show a loading state while saving.
6. Show a success state after saving.
7. Show a useful error state if saving fails.
8. Load persisted requests in the staff view.

## 10. Prepare for real use

1. Choose and document how staff sign in.
2. Protect one staff-only action.
3. Add a visible sign-in and sign-out path.
4. Review the agent list with a keyboard.
5. Review booking form labels and error messages.
6. Check responsive layout in modern browsers.
7. Document local setup.
8. Document required configuration.
9. Document how to build and release the app.
