# Plan: Vite + React + TypeScript scaffold

## 1. Inspect and prepare the project

1. Review the existing TypeScript entry point and package scripts.
2. Choose a minimal Vite React TypeScript project structure that fits the repository.
3. Preserve repository metadata and existing project intent while replacing the compiler-only setup where needed.

## 2. Add the client scaffold

1. Add the Vite HTML entry point.
2. Add a React TypeScript application entry point.
3. Add the minimal root component and mount it from the entry point.
4. Add only the Vite, React, and React DOM dependencies needed to run the scaffold.
5. Configure TypeScript and Vite for local development and production builds.

## 3. Add reproducible commands

1. Add package scripts for starting the development server and producing a production build.
2. Update the lockfile to match the dependency changes.
3. Confirm the existing project can install dependencies from the lockfile.

## 4. Add the minimal AgentClinic home page

1. Set the document title to AgentClinic.
2. Add a home page heading and a short, playful introduction to the clinic.
3. Add one concise callout that invites agents to seek relief from humans.
4. Add minimal readable layout and responsive styling for the home page.
5. Keep navigation and clinic workflows out of this page for now.
6. Organize the client under `src/components`, `src/pages`, and `src/static`.
7. Implement the header, main content, and footer as separate components in `src/components`.
8. Render those components from the home page in `src/pages`.
9. Keep the page styles in `src/static/styles.css` and import them from the root `App` component.

## 5. Validate and hand off

1. Install dependencies using the repository's package manager.
2. Run the production build and resolve scaffold-related errors.
3. Start the development server and confirm the AgentClinic home page loads locally.
4. Confirm the page presents the clinic name, playful introduction, and relief-seeking callout at narrow and wide browser widths.
5. Record the commands and results for review.
