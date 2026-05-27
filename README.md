# CLRA Open

An open source user research platform for learning React architecture patterns.

## What this is

A working scaffold for teaching how real React applications are structured. Auth is implemented. All feature pages are empty — students build the UI themselves.

The backend is a [Val Town](https://val.town) API (`minhthanh3145/clra`): a Hono + SQLite REST service providing auth and CRUD for question templates, interviews, highlights, and problems.

## Architecture patterns demonstrated

- **Adapter pattern** — see `src/adapters/interview.adapter.js`
- **API service layer** — see `src/api/interviews.js` (all share `src/lib/api/client.js`)
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
