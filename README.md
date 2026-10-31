# AgentClinic

AgentClinic is a small, responsive React and TypeScript landing page for agents who need a breather.

## Run locally

```sh
npm ci
npm run dev
```

## Build for production

```sh
npm run build
npm run preview
```

## Scaffold handoff

- `npm install` installs the checked-in lockfile successfully. `npm ci` was attempted but Windows returned `EPERM` while removing Vite's native binding from the existing `node_modules`; the subsequent `npm install` completed successfully.
- `npm run build` completes TypeScript checking and the Vite production build.
- `npm run dev -- --host 127.0.0.1` serves the page at `http://127.0.0.1:5173/`; the served document has the AgentClinic title and mounts `src/main.tsx`.
- The home page contains the clinic introduction and human-relief callout. Its CSS includes a narrow-screen layout breakpoint at 600px and uses system font fallbacks without external font requests.
- No dashboard navigation or clinic workflow is included.
- A browser automation tool is not available in this workspace, so narrow and wide rendering was not visually inspected.

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
