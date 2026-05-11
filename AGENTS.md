# AGENTS.md

Quick reference for AI coding agents and contributors working in this repo.

---

## Before Opening a PR

Run these commands in order and confirm each passes:

```bash
npm i                  # install / sync deps
npm run lint           # must exit 0 (no errors)
npm run build          # must complete without TypeScript errors
npm run test:e2e       # all Playwright tests must pass
npm run lighthouse:ci  # all four Lighthouse scores must be ≥ 0.9
```

---

## Evidence to Include in the PR Description

| Item | What to paste |
|------|---------------|
| Lint | `eslint .` exit code and error/warning count |
| Build | `vite build` exit code and bundle size summary |
| Playwright | Pass/fail counts, e.g. `3 passed (12s)` |
| Lighthouse | Scores for Performance / Accessibility / SEO / Best Practices |
| Tests added | List new test files and the scenarios they cover |

---

## Security Review Notes

Before merging, confirm each of the following:

- **No secrets committed** – grep for `SERVICE_ROLE_KEY`, `API_KEY`, etc.; none should appear outside `.env` (which is git-ignored)
- **Data handling** – PII (names, emails) is stored only in Supabase via service-role key; never logged or sent to third-party analytics in plain text
- **Auth** – public Edge Functions validate input before touching the database; authenticated routes check the JWT
- **Rate-limiting** – honeypot field in forms silently drops bot submissions; webhook handlers verify source signatures
- **Idempotency** – repeated identical requests produce the same outcome without duplicate side-effects
