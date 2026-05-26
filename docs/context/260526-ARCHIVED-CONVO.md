# Archived Conversation — 2026-05-26

## What we built

`clra-open` — an open source teaching scaffold of the CLRA product, for a React course focused on architecture patterns in the AI age.

Repo: https://github.com/JustNam/clra-open

---

## Key decisions made

### Goal
Teach React architecture patterns (not AI features, not full-stack). Students learn *why* code is structured the way it is — structure and causality over reading intent vs. implementation.

### What's in scope
- Auth (login, signup, middleware) — fully implemented
- All feature routes as empty `page.js` stubs — students implement the UI
- Feature module folder structure (interviews, problems, highlights)
- Supabase DB migrations (4 tables)
- Supabase browser client setup
- Plain Axios instance
- Route constants (`src/constants/routes.js`)
- One example adapter (`interview.adapter.js`) demonstrating the pattern
- `PageLayout` shared component
- `AuthProvider` + `useAuth` hook

### What's excluded
- TypeScript → JavaScript only
- RxJS / global state store → plain React `useState`
- Yup validation → removed entirely
- Yoopta editor → replaced with plain textarea (student exercise)
- AI features (chat, assistant, canvas, ai-limits, graphify)
- Workspace / multi-tenancy → single-tenant, no `workspace_id`
- Axios interceptors → plain axios
- Prioritization module → removed
- MUI theme system → removed
- Storybook → removed
- SSR Supabase client → browser client only

### Domain
Kept CLRA's real domain (interviews, problems, highlights) — basic enough without AI features.

---

## Architecture

**Stack:** Next.js 15, React 19, JavaScript, Supabase JS v2, Axios, TailwindCSS v4, SCSS Modules, ESLint

**5 key patterns demonstrated in scaffold:**
1. **Adapter pattern** — `src/adapters/interview.adapter.js` (snake_case ↔ camelCase)
2. **API service layer** — `src/api/` (no axios in components)
3. **Feature module boundary** — `src/modules/` (organized by feature)
4. **Route constants** — `src/constants/routes.js`
5. **Side effects in React** — auth state in `useEffect`

**Data models (Supabase, no workspace_id):**
- `question_templates` — id, name, questions JSONB, created_at
- `interviews` — id, title, interviewee, notes TEXT, question_template_id FK, created_at
- `problems` — id, title, description, status (default 'open'), created_at
- `highlights` — id, interview_id FK, problem_id FK, quote TEXT, created_at

**Highlights design:** A highlight is a plain text quote connecting an interview to a problem. No offsets, no block IDs. `window.getSelection()` is the student implementation exercise.

---

## What's implemented in the scaffold

```
src/
  app/
    (public)/
      login/page.js         ← implemented
      signup/page.js        ← implemented
    (authenticated)/
      layout.js             ← implemented (auth guard)
      interviews/list/page.js           ← empty stub
      interviews/create/page.js         ← empty stub
      interviews/[id]/page.js           ← empty stub
      interviews/question-templates/list/page.js    ← empty stub
      interviews/question-templates/create/page.js  ← empty stub
      interviews/question-templates/[id]/page.js    ← empty stub
      problems/list/page.js             ← empty stub
      problems/create/page.js           ← empty stub
      problems/[id]/page.js             ← empty stub
    layout.js               ← implemented (root layout + AuthProvider)
    page.js                 ← implemented (redirects to /interviews/list)
  api/
    interviews.js           ← stub with commented example
    problems.js             ← stub
    highlights.js           ← stub
  adapters/
    interview.adapter.js    ← implemented (the teaching example)
    problem.adapter.js      ← stub (student exercise)
    highlight.adapter.js    ← stub (student exercise)
  components/
    AuthProvider.jsx        ← implemented
    PageLayout.jsx          ← implemented
    PageLayout.module.scss  ← implemented
  hooks/
    useAuth.js              ← implemented
  lib/supabase/
    client.js               ← implemented (browser client)
  constants/
    routes.js               ← implemented (all routes)
  modules/
    interviews/             ← empty folder
    problems/               ← empty folder
    highlights/             ← empty folder
  middleware.js             ← implemented (route protection)
supabase/
  migrations/
    001_initial_schema.sql  ← all 4 tables + RLS policies
```

---

## Screens (for student reference — not implemented)

**Auth** — login, signup

**Interviews**
- List: table (title, interviewee, date, template)
- Create: form (title, interviewee, select question template)
- Detail: plain textarea for notes, list of linked highlights

**Question Templates**
- List: table of templates
- Create: form (name + list of questions, add/remove)
- Detail: view/edit template questions

**Problems**
- List: table (title, status, highlight count)
- Create: form (title, description)
- Detail: problem info, linked highlights, resolve/reopen

**Highlights** — no dedicated page; created from interview detail (select text → pick problem → save quote)

---

## Deployment / setup for students

One shared Supabase project (owned by instructor). Students just:
1. Clone repo
2. Copy `.env.example` → `.env.local`, paste instructor-provided URL + anon key
3. `npm install && npm run dev`

No Supabase account or local setup required for students.

---

## Open decision: Val Town + dual backend

At end of conversation, discussed supporting **both Supabase and Val Town** via an env var switch (`NEXT_PUBLIC_BACKEND=supabase|val`).

**Rationale:** Val Town removes all backend setup (no Supabase account needed at all), letting students focus purely on FE. No auth needed for Val Town backend.

**Proposed switch mechanism:**
```js
// src/lib/backend.js
export const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'supabase'
```

- Auth: `AuthProvider` conditionally loaded in root layout based on `BACKEND`
- API layer: each service (`src/api/interviews.js`) exports the right implementation based on `BACKEND`
- Middleware: skips auth checks when `BACKEND === 'val'`

**Status:** Not implemented yet. Next step is to spec this out properly as a new brainstorm/design session.

---

## Docs in repo

- `docs/superpowers/specs/2026-05-25-clra-open-design.md` — full design spec
- `docs/superpowers/plans/2026-05-25-clra-open-scaffold.md` — implementation plan
- `docs/architecture/ARCHITECTURE-OPEN.md` — architecture reference for students
