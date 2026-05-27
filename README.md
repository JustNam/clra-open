# CLRA Open

An open source user research platform for learning React architecture patterns.

## What this is

A working scaffold for teaching how real React applications are structured. Auth is implemented. All feature pages are empty — students build the UI themselves.

The backend is a [Val Town](https://val.town) API (`minhthanh3145/clra`): a Hono + SQLite REST service providing auth and CRUD for question templates, interviews, highlights, and problems.

## Architecture patterns demonstrated

- **Adapter pattern** — see `src/adapters/interview.adapter.js`
- **API service layer** — see `src/api/interviews.js` (facade) and `src/api/providers/` (per-backend impls; all share `src/lib/api/client.js`)
- **Pluggable backend** — see `src/config/backend.js`, `src/auth/strategy.js`
- **Feature module structure** — see `src/modules/`
- **Route constants** — see `src/constants/routes.js`
- **Token auth against a REST backend** — see `src/components/AuthProvider.jsx`, `src/lib/auth/token.js`, `src/middleware.js`

For full architecture details see `docs/architecture/ARCHITECTURE-OPEN.md`.

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_API_URL` already points at the deployed Val Town backend — change it only if you run your own copy of the val.
3. `npm install && npm run dev`

## Backend

The API lives in the val `minhthanh3145/clra`. Endpoints:

- `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`
- `/api/templates`, `/api/interviews`, `/api/highlights`, `/api/problems` (CRUD)

All `/api/*` routes except `/api/auth/*` require a `Bearer` token, issued on signup/login. The frontend stores it in the `clra_token` cookie so the Next.js middleware can gate routes.

## Switching backends

The app can target either backend via a build-time flag in `.env.local`:

```
NEXT_PUBLIC_BACKEND=valtown   # default; the val above
NEXT_PUBLIC_BACKEND=supabase  # stubbed — not implemented yet
```

Components import from the facades (`src/api/*.js`, `src/auth/strategy.js`), which pick a provider based on the flag. Both backends return the **same column shapes**, so they share the adapters in `src/adapters/`.

- Val Town providers (working): `src/api/providers/valtown/`, `src/auth/providers/valtown.js`
- Supabase providers (stubs that throw `not implemented`): `src/api/providers/supabase/`, `src/auth/providers/supabase.js`

Selecting `supabase` today will throw a clear error on first call. To implement it, fill in those provider files (reusing the existing adapters) and re-add `@supabase/supabase-js`. Changing the flag requires restarting `npm run dev`.
