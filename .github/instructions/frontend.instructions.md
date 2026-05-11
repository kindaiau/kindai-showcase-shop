---
applyTo: "**/*.ts,**/*.tsx"
---

# Frontend Instructions

## Imports

- Use the `@` alias for all imports from `src/`; never use relative `../` paths that cross feature boundaries
- Keep import order: external packages → `@/components` → `@/hooks` → `@/lib` → local

## Components

- One component per file; file name matches the exported component name
- Co-locate styles inside the component using Tailwind; no inline `style` props
- Use `cn()` from `@/lib/utils` whenever class names are conditional
- Prefer composition over prop drilling; use React context only for global/cross-cutting concerns

## Types

- Declare prop interfaces above the component function; suffix with `Props`
- Avoid `any`; use `unknown` and narrow with type guards when the shape is truly unknown

## Hooks

- Custom hooks live in `src/hooks/`; name them `use<Feature>.ts`
- Do not call hooks inside conditions or loops

## Data Fetching

- Use `@tanstack/react-query` (`useQuery`, `useMutation`) for all remote data
- Define query keys as `const` arrays in the same file as the hook

## Error Handling

- Show user-facing errors via `sonner` toasts; do not log sensitive data to the console
