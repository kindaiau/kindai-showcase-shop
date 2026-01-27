# Testing & QA

## Run the site locally
```bash
npm install
npm run dev
```

## End-to-end tests (Playwright)
```bash
npm run test:e2e
```

## Lighthouse CI (performance/accessibility/SEO)
```bash
npm run lighthouse:ci
```

## Notes
- Playwright uses the dev server on `http://localhost:4173`.
- Lighthouse CI runs against the Vite preview build and enforces 90+ scores for
  performance, accessibility, SEO, and best practices.
