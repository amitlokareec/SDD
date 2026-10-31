# Plan: Shared dashboard frame

## 1. Add dashboard destinations

1. Add Agents and Staff destinations to the primary navigation.
2. Make each destination open a simple placeholder view so navigation has a visible result.
3. Show which destination is active.
4. Keep agent records, staff workflows, and clinic data out of the placeholder views.

## 2. Make the frame reusable and accessible

1. Add a reusable page content container for dashboard views.
2. Ensure the navigation can be used with a keyboard.
3. Use semantic navigation and clear active-state indication.
4. Keep the shared frame responsive at narrow and wide browser widths.

## 3. Add the shared empty state

1. Add a reusable empty-state component.
2. Give it a clear heading and concise supporting text.
3. Use welcoming, lightly satirical copy consistent with AgentClinic's mission.
4. Keep copy adaptable to the directory and staff views that will use it later.

## 4. Validate and hand off

1. Confirm Agents and Staff navigation each opens the expected placeholder view.
2. Confirm the active destination is visible and navigation works by keyboard.
3. Confirm the page container and empty state render clearly at narrow and wide widths.
4. Record validation commands and results in the implementation handoff.
