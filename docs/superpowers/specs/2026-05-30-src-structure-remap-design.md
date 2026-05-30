# Source Structure Remap — Design Spec

**Date:** 2026-05-30  
**Project:** pitch-pick-ui  
**Status:** Approved (brainstorming)

## Summary

Remap the early-stage Vite + React scaffold into a domain-oriented `src/` layout with a minimal app shell: React Router v7, TanStack Query provider, dual layouts (auth vs app), and stub pages for all product areas. Remove the Vite starter UI while keeping `src/assets/` for future branding.

## Goals

- Establish the target folder structure before feature work.
- Wire a runnable app shell (option **B**): router, providers, layouts, stub routes.
- Align shadcn with `@/utils` (no `lib/` folder).
- Pass `pnpm build` and `pnpm lint` after changes.

## Non-goals (this pass)

- Authentication guards or session handling
- Real API integration
- Error boundaries / route `errorElement`
- 404 page
- Moving demo assets to `public/`
- Tests (no test runner configured yet)

## Decisions (from brainstorming)

| Topic | Choice |
|-------|--------|
| Deliverable depth | **B** — full tree + minimal shell + stub routes |
| Utilities | **B** — `src/utils/`, update `components.json` to `@/utils` |
| Layouts | **B** — `AuthLayout` for `/auth/*`, `AppLayout` for app routes |
| Vite starter | **B + C** — delete `App.tsx` / `App.css`; keep `src/assets/` unused |
| Router organization | **Approach 1** — domain route modules under `app/router/routes/` |

## Target directory structure

```
src/
├── main.tsx
├── index.css
├── assets/                     # unchanged; demo logos unused until branding
│
├── app/
│   ├── App.tsx
│   ├── router/
│   │   ├── index.tsx
│   │   └── routes/
│   │       ├── auth.routes.tsx
│   │       └── app.routes.tsx
│   ├── providers/
│   │   ├── index.tsx
│   │   └── query-provider.tsx
│   └── layouts/
│       ├── auth-layout.tsx
│       └── app-layout.tsx
│
├── pages/
│   ├── auth/login-page.tsx
│   ├── dashboard/dashboard-page.tsx
│   ├── leagues/leagues-page.tsx
│   ├── draft/draft-page.tsx
│   └── team/team-page.tsx
│
├── components/
│   ├── common/                 # .gitkeep
│   ├── forms/                  # .gitkeep
│   └── ui/button.tsx           # existing
│
├── services/
│   ├── api/client.ts
│   ├── auth/index.ts
│   └── draft/index.ts
│
├── store/index.ts
├── hooks/                      # .gitkeep
├── types/index.ts
├── constants/routes.ts
└── utils/
    └── index.ts                # exports cn() (moved from lib/utils.ts)
```

### Files removed

- `src/App.tsx`
- `src/App.css`
- `src/lib/` (after moving `cn` to `utils/`)

## Routing and layouts

### Path constants (`constants/routes.ts`)

| Export | Path |
|--------|------|
| `ROUTES.ROOT` | `/` |
| `ROUTES.AUTH.LOGIN` | `/auth/login` |
| `ROUTES.DASHBOARD` | `/dashboard` |
| `ROUTES.LEAGUES` | `/leagues` |
| `ROUTES.DRAFT` | `/draft` |
| `ROUTES.TEAM` | `/team` |

### Redirects

- `/` → `/dashboard`
- `/auth` → `/auth/login`

### Route modules

- **`auth.routes.tsx`:** `AuthLayout` parent; child `login-page` at `/auth/login`.
- **`app.routes.tsx`:** `AppLayout` parent; children for dashboard, leagues, draft, team.

All routes are public (no guards).

### Layouts

**AuthLayout:** Centered column, minimal “Pitch Pick” header, `<Outlet />`, no app navigation.

**AppLayout:** App title, horizontal nav using `ROUTES` constants and React Router `NavLink`, `<Outlet />` for page content.

### Stub pages

Each page: title heading, short placeholder copy, optional display of current path for dev clarity. No data fetching.

## Bootstrap and providers

```
main.tsx → app/App.tsx → AppProviders → RouterProvider
```

**`AppProviders` (outer → inner):**

1. `QueryClientProvider` with default `QueryClient`
2. Children: `RouterProvider` with router from `app/router/index.tsx`

No Zustand provider required. No theme provider in this pass.

## Layer stubs

### `services/api/client.ts`

- `baseUrl` from `import.meta.env.VITE_API_URL` (empty string fallback)
- Minimal `get` / `post` wrappers around `fetch`
- Generics deferred; return types can be refined when API contracts exist

### `services/auth/index.ts` and `services/draft/index.ts`

Empty module placeholders (export `{}` or comment-only barrel) for future domain services.

### `store/index.ts`

Minimal Zustand store (e.g. `useAppStore` with trivial state) to validate the folder.

### `types/index.ts`

Placeholder shared types (e.g. `ApiError` interface) for future API error handling.

### `hooks/`

`.gitkeep` only; satisfies shadcn alias `@/hooks`.

## Configuration changes

### `components.json`

```json
"aliases": {
  "components": "@/components",
  "utils": "@/utils",
  "ui": "@/components/ui",
  "hooks": "@/hooks"
}
```

Remove `"lib": "@/lib"` entry.

### Import updates

- `components/ui/button.tsx`: `@/lib/utils` → `@/utils`
- Any new shadcn components use `@/utils` for `cn`

### Unchanged

- Vite alias `@` → `./src`
- `tsconfig.app.json` paths `@/*` → `./src/*`
- `index.css` remains at `src/index.css` (shadcn tailwind css path)

## Verification

1. `pnpm build` — zero TypeScript errors
2. `pnpm lint` — pass
3. Manual smoke:
   - `/` redirects to `/dashboard`
   - `/auth/login` renders under `AuthLayout`
   - Nav links reach leagues, draft, team

## Future work (out of scope)

- Auth guards and protected route groups
- `errorElement` and 404 route
- Domain-specific Zustand slices under `store/`
- Real `services/auth` and `services/draft` implementations
- `components/common` and `components/forms` population
