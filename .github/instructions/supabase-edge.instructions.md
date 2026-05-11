---
applyTo: "supabase/functions/**"
---

# Supabase Edge Function Instructions

## Runtime

- Deno runtime; use `https://deno.land/std@0.190.0/http/server.ts` `serve()`
- Import Supabase client from `https://esm.sh/@supabase/supabase-js@2`
- Shared utilities live in `supabase/functions/_shared/`

## Security Boundaries

- Every function is a public HTTP endpoint – treat all incoming data as untrusted
- Validate **every** field: type check, trim strings, enforce max lengths, reject disallowed characters
- Use `SUPABASE_SERVICE_ROLE_KEY` only server-side; never expose it to the browser
- Read secrets exclusively via `Deno.env.get()`; never hard-code values

## Input Validation Pattern

```ts
const value = typeof body.field === "string" ? body.field.trim() : "";
if (value.length === 0 || value.length > MAX) {
  return errorResponse(400, "Invalid field");
}
```

## Response Helpers

- Always include `corsHeaders` on every response, including errors
- Return `{ status: "ok" }` on success and `{ error: "<message>" }` on failure
- Use HTTP 400 for validation errors, 500 for unexpected server errors

## CORS

- Respond to `OPTIONS` pre-flight requests immediately with `null` body + CORS headers
- Restrict `Access-Control-Allow-Origin` to known origins in production

## Rate-Limiting & Idempotency

- Check for honeypot fields and return a silent 200 to thwart bots
- For webhook handlers, verify the source signature before processing
- Ensure insert operations are idempotent where possible (use `upsert` or unique constraints)

## Logging

- Use `console.error()` for unexpected errors; include a short context message
- Never log PII (email, name) or secret values
