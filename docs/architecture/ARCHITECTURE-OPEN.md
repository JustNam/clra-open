# Architecture

## Stack

- **Next.js 15** (App Router, React 19)
- **JavaScript** (no TypeScript)
- **SCSS Modules** + **TailwindCSS**
- **Supabase** (Auth + Postgres, browser client only)
- **Axios** (plain, no interceptors)
- **ESLint** (2 spaces, single quotes, no semicolons)

## Directory Structure

```
src/
  app/              # Next.js pages + API routes
  api/              # API service classes — no axios in components
  adapters/         # snake_case ↔ camelCase conversion
  components/       # App-wide shared components
  hooks/            # Custom React hooks
  lib/supabase/     # Supabase browser client
  constants/        # Route constants, enums
  modules/          # Feature modules (empty — students implement)
  styles/           # Global CSS
  middleware.js     # Route protection
```

## Key Patterns

### 1. Feature Module Boundary
Each feature lives in `src/modules/<feature>/`. Organize by feature, not by type.

### 2. Adapter Pattern
Database returns `snake_case`. UI uses `camelCase`. Every API response passes through `src/adapters/` before reaching a component. See `src/adapters/interview.adapter.js` for the example.

### 3. API Service Layer
No `axios` calls inside components. All HTTP lives in `src/api/`. Components call service methods.

### 4. Route Constants
All route paths defined once in `src/constants/routes.js`. Never hardcode strings like `'/interviews/list'` in components.

### 5. Side Effects in React
Data fetching and auth state use `useEffect`. The three core concepts: state, props, side effects.

## Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Component | PascalCase | `PageLayout.jsx` |
| Hook | camelCase, use* | `useAuth.js` |
| Adapter | kebab-case | `interview.adapter.js` |
| API service | kebab-case | `interviews.js` |
| Folder | kebab-case | `question-templates/` |
| SCSS Module | `style.module.scss` | `PageLayout.module.scss` |
| Route constant | UPPER_SNAKE_CASE | `ROUTES.INTERVIEWS.LIST` |
