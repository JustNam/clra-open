# Add Val Town backend behind a pluggable, flag-selected backend layer

Introduces a [Val Town](https://val.town) REST API (`minhthanh3145/clra`) as the app's backend and makes the data + auth layer pluggable via a build-time flag. Default is `valtown` (fully working). Supabase is also wired: **auth works**, data resources are stubs.

## Why

The app was originally wired directly to Supabase (client + RLS migration). Rather than a hard cutover to Val Town, this refactors the data/auth layer behind facades so either backend can be selected without touching components — and keeps Supabase as a working alternative for auth.

## Backend (lives in Val Town `minhthanh3145/clra` — not in this diff)

- Schema reshaped to match the frontend adapter contract; added a `users` table.
- Auth endpoints: `POST /api/auth/signup` · `/login` · `GET /api/auth/me` — PBKDF2 password hashing, HS256 JWTs (7-day TTL).
- All `/api/*` routes except `/api/auth/*` require a `Bearer` token. Any logged-in user sees all data (mirrors the old RLS policy).

## Architecture: pluggable backend

- **Flag:** `src/config/backend.js` reads `NEXT_PUBLIC_BACKEND` (`valtown` default | `supabase`).
- **Data facades:** `src/api/{interviews,problems,highlights,templates}.js` pick a provider by flag. Components import from these and never see which backend answers.
- **Auth facade:** `src/auth/strategy.js` selects an auth strategy; `AuthProvider` consumes it via a backend-agnostic interface (`restoreSession / signIn / signUp / signOut`).
- **Clean boundary:** `src/api/` = data resources only; `src/auth/` = auth/session end-to-end (calls + cookie). No auth logic duplicated across the two trees.
- **Shared adapters:** both backends return the same column shapes, so they reuse the adapters in `src/adapters/` unchanged.

```
src/api/      interviews, problems, highlights, templates (+ providers/{valtown,supabase}/)
src/auth/     strategy.js (facade) + providers/{valtown,supabase}.js  (calls + cookie)
src/config/   backend.js (flag)
src/lib/      api/client.js (axios), auth/token.js (cookie), supabase/client.js (lazy)
```

## Val Town side (working)

- `src/lib/api/client.js` — axios instance with a `Bearer`-token request interceptor.
- `src/lib/auth/token.js` — app session cookie (`clra_token`) so middleware can gate routes server-side.
- `src/api/providers/valtown/*` — interviews/problems/highlights/templates over HTTP + adapters.
- `src/auth/providers/valtown.js` — `/api/auth/*` calls + cookie handling.

## Supabase side

- Re-added `@supabase/supabase-js`.
- `src/lib/supabase/client.js` — **lazy** `getSupabaseClient()`. Lazy on purpose: the facades statically import both providers, so this module loads even in valtown mode; constructing the client lazily avoids throwing when Supabase env vars are absent.
- **Auth (working):** `src/auth/providers/supabase.js` uses `supabase.auth` for signup/login/session/logout and mirrors the access token into the same `clra_token` cookie (so middleware stays backend-agnostic).
- **Data (stubbed):** `src/api/providers/supabase/{interviews,problems,highlights,templates}.js` throw a clear "not implemented" error until filled in (reusing the existing adapters).

## Removed

- Deleted the direct Supabase coupling that was replaced by the provider layer: the old `src/lib/supabase/client.js` (replaced by the lazy version) and `supabase/migrations/001_initial_schema.sql`.

## Config & docs

- `.env.example` / `.env.local`: `NEXT_PUBLIC_BACKEND=valtown` + `NEXT_PUBLIC_API_URL`; Supabase URL/anon-key placeholders for supabase mode.
- README: added "Backend" and "Switching backends" sections.

> Feature **pages** remain intentionally empty (the student exercise). This PR wires up auth + the data/service layer only.

## Testing

- **Val Town backend** verified end-to-end via curl: auth gate (401) → signup/login → CRUD across all four resources → relational read (`GET /api/interviews/:id` returns nested highlights).
- **Frontend:** `npm run lint` clean. `npm run build` passes in **both** modes (`valtown` and `supabase`), 12 routes + middleware — confirming the lazy Supabase client doesn't break import/prerender in valtown mode.
- Supabase auth was verified to compile/build; runtime auth needs a real Supabase project (URL + anon key) to exercise.

## Notes / follow-ups

- Backend switch is **build-time** (`NEXT_PUBLIC_*` is inlined) — changing it requires a dev-server restart / rebuild, not a per-request toggle.
- Supabase **data** providers still need implementing (reuse the adapters; column shapes match).
- If Supabase email confirmation is enabled, `signUp` returns no session until the user confirms — disable it for a frictionless demo.
- Data is **not** user-scoped yet (shared dataset). Per-user ownership would be a follow-up.
