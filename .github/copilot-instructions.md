# Copilot Instructions

## Commands

```bash
npm i                  # install dependencies
npm run dev            # start dev server (port 8080)
npm run build          # production build
npm run lint           # ESLint (must pass with 0 errors)
npm run test:e2e       # Playwright e2e tests
npm run lighthouse:ci  # build + Lighthouse CI audit
```

## Path Aliases

- `@` → `./src`  (configured in `vite.config.ts`)

## TypeScript / React Conventions

- All source files use `.ts` or `.tsx`; no plain `.js` in `src/`
- Use named exports for components; default export only for pages
- Prefer functional components with explicit prop interfaces
- State management: `@tanstack/react-query` for server state; `useState`/`useReducer` for local state
- Form handling: `react-hook-form` + `zod` for validation
- Routing: `react-router-dom` v7
- Styling: Tailwind CSS utility classes; use `cn()` from `@/lib/utils` to merge classes
- UI primitives: Radix UI via shadcn components in `@/components/ui/`

## Security Rules

- **Never commit secrets** – use `Deno.env.get()` in Edge Functions and `.env` (git-ignored) locally
- **Edge Functions are security boundaries** – always validate and sanitise every field before touching the database
- **Validate all untrusted input** – check type, length, and format; reject early with a 400 if invalid
- **Honeypot pattern** – silently succeed (200) when a bot-trap field (`website`) is populated
- **CORS** – only whitelist headers actually needed; restrict origins in production

## PR Format Rules

Every PR description must include:

1. **Commands run** – paste the exact commands executed
2. **Results** – copy/paste exit codes or summary output (e.g. `0 errors`, `3 passed`)
3. **Tests added or updated** – list any new/changed test files and what they cover
