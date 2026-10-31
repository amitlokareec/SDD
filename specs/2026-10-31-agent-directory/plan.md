# Plan: Agent directory

## 1. Define local agent summaries

1. Add a TypeScript agent summary type with only the fields needed for this phase.
2. Add two clearly fictional agent records using the type.
3. Keep the data local to the client and separate from presentation where that matches the existing project structure.

## 2. Render the directory

1. Replace the Agents placeholder with a directory view.
2. Render each record as a readable row or card with an obvious agent name and concise summary information.
3. Keep the view responsive and use semantic markup.
4. Render the shared empty state when the data list is empty.

## 3. Add agent detail navigation

1. Add a detail view that identifies the selected agent and presents its available summary information clearly.
2. Link every directory entry to its corresponding detail view using keyboard-accessible navigation.
3. Handle an unknown or missing agent identifier with a clear, recoverable not-found state and a link back to Agents.
4. Preserve the shared dashboard frame and make the active Agents destination clear on both directory and detail views.

## 4. Validate and hand off

1. Check that both fictional agents appear in the directory and open the correct detail view.
2. Check the empty-list and unknown-agent states.
3. Check keyboard navigation, active navigation indication, semantic structure, and narrow/wide layouts.
4. Run the project build and record the command and result in the implementation handoff.
