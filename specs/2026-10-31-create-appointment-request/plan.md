# Plan: Create an appointment request

## 1. Define request and entry point

1. Define a TypeScript type for an appointment request using the agreed fields.
2. Add an appointment form entry point from the agreed therapy context.
3. Keep the initial request in local application state.

## 2. Build and validate the form

1. Add date and time inputs.
2. Add a short optional note field.
3. Mark required fields clearly and validate them.
4. Show inline, accessible feedback for invalid input.
5. Show a confirmation view after a successful submission.

## 3. Validate and hand off

1. Check required and optional input behavior and invalid values.
2. Check successful submission and confirmation.
3. Check keyboard access and narrow/wide layouts.
4. Run the project build and record the command and result in the implementation handoff.
