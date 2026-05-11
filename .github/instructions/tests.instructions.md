---
applyTo: "tests/**,playwright.config.ts,lighthouserc.json"
---

# Test Instructions

## Running Tests

```bash
npm run test:e2e       # Playwright e2e (spins up dev server on port 4173)
npm run lighthouse:ci  # Lighthouse CI (builds first, then audits http://localhost:4173/)
```

## Playwright Conventions

- Test files live in `tests/`; name them `<feature>.spec.ts`
- Use `page.getByRole()` and `page.getByLabel()` selectors (accessible queries preferred over CSS/XPath)
- Mock all Supabase Edge Function calls via `page.route("**/functions/v1/<name>", ...)` to keep tests deterministic
- Group related tests with `test.describe("<feature>", () => { ... })`
- Each test must assert at least one visible element after the action

## What to Test

- Happy path: successful form submission, expected UI state
- Error path: simulated 4xx/5xx responses → user-visible error message
- Accessibility: use Playwright's built-in accessibility snapshot where relevant

## Lighthouse Thresholds (`lighthouserc.json`)

All four categories must score ≥ 0.9:

| Category       | Min Score |
|----------------|-----------|
| Performance    | 0.9       |
| Accessibility  | 0.9       |
| SEO            | 0.9       |
| Best Practices | 0.9       |

Do not lower these thresholds without an explicit justification comment in the PR.
