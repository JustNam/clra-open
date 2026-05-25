# CLRA Open

An open source user research platform for learning React architecture patterns.

## What this is

A working scaffold for teaching how real React applications are structured. Auth is implemented. All feature pages are empty — students build the UI themselves.

## Architecture patterns demonstrated

- **Adapter pattern** — see `src/adapters/interview.adapter.js`
- **API service layer** — see `src/api/interviews.js`
- **Feature module structure** — see `src/modules/`
- **Route constants** — see `src/constants/routes.js`
- **Auth with Supabase** — see `src/components/AuthProvider.jsx`

For full architecture details see `docs/architecture/ARCHITECTURE-OPEN.md`.

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
3. Run the migration in `supabase/migrations/001_initial_schema.sql` against your Supabase project
4. `npm install && npm run dev`

## Supabase setup

Create a free project at [supabase.com](https://supabase.com), then run the SQL in `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.
