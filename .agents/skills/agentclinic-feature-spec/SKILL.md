---
name: agentclinic-feature-spec
description: Draft or revise AgentClinic feature specifications that follow the repository's mission, roadmap, and dated requirement, plan, and validation format.
---

# AgentClinic Feature Specs

Use this skill when a user asks to define, clarify, or revise an AgentClinic feature before implementation. Create product and implementation handoff documents under `specs/`; do not implement the feature unless the user also asks for implementation.

## Ground the spec in the project

- Read `specs/mission.md`, `specs/roadmap.md`, and `specs/tech-stack.md` for product commitments, sequencing, and documented technical choices.
- Inspect relevant existing feature code and nearby specs to avoid proposing already shipped behavior or contradicting established interfaces and data models.
- Treat `package.json` as evidence of installed tooling, not as a feature request or a complete architecture description.
- Keep AgentClinic's fictional, satirical clinic premise, while specifying clear and respectful user-facing behavior.

## Choose scope and resolve unknowns

- A feature request must identify the desired user outcome. If it does not, ask what feature to specify; do not invent a product feature from package metadata or roadmap context.
- Separate in-scope behavior from explicit non-goals. Keep a phase small and reviewable, consistent with the roadmap's nano-phase approach.
- Record material assumptions and decisions. Ask only about missing choices that change user-visible behavior, data handling, security, or scope; otherwise state a reasonable default for review.
- Preserve established access boundaries. In particular, staff appointment status changes require an authorized signed-in staff member, and server mutations validate inputs and origin.

## Write the handoff

Create a folder named `specs/YYYY-MM-DD-short-feature-slug/` using the current local date, unless the user gives a date or an existing folder should be revised. Follow the established three-document convention:

- `requirement.md`: context, initial scope, important behavior and constraints, non-goals, and unresolved questions or confirmed direction.
- `plan.md`: a minimal ordered implementation plan with independently reviewable steps; point to likely existing files only when repository inspection supports it.
- `validation.md`: observable acceptance checks for the feature, including relevant success, error, empty/loading, accessibility, persistence, and authorization behavior. Include only checks applicable to the scope.

Write requirements as user-observable outcomes and decisions, not premature code prescriptions. Make validation checks concrete enough that someone can determine pass or fail. Keep all three documents consistent; do not claim a decision is approved unless the user or repository records that approval.

When the user asks only for a feature spec, deliver the documents and summarize assumptions or open decisions. Do not modify `specs/roadmap.md`, `specs/tech-stack.md`, application code, or package configuration unless that change is requested or required by the stated feature.
