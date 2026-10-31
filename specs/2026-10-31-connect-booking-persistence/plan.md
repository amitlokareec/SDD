# Plan: Connect booking to persisted appointments

## 1. Accept and validate requests

1. Add a server endpoint that accepts an appointment request.
2. Validate the request on the server using the agreed request model and rules.
3. Save one valid request to the database.

## 2. Connect the client booking flow

1. Submit the booking form to the endpoint.
2. Show a loading state while saving.
3. Show a success state after saving.
4. Show a useful error state if saving fails.

## 3. Load requests for staff

1. Load persisted requests in the staff view.
2. Present loading, empty, and error states as appropriate.
3. Keep status behavior aligned with the agreed persisted workflow.

## 4. Validate and hand off

1. Check accepted and rejected submissions, database persistence, and staff loading.
2. Check feedback and keyboard/responsive behavior.
3. Run relevant build and service setup commands and record results in the implementation handoff.
