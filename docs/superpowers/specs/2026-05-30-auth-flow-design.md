# Auth Page Flow — Design Spec

**Date:** 2026-05-30  
**Project:** pitch-pick-ui  
**Status:** Approved (brainstorming)

## Summary

Implement a stub Google sign-in flow using a temporary session cookie (1-hour expiry), cookie-aware routing from `/`, route guards for all app pages, logout from the app header, and a responsive split login layout. Theme switching lives in the app header only with `localStorage` persistence; the login page follows the OS color scheme.

## Goals

- Google-only sign-in stub that sets a session cookie and navigates to dashboard
- Logout clears cookie and returns to login
- `/` redirects to login or dashboard based on cookie validity
- Protect all `AppLayout` routes when unauthenticated
- Light and dark themes with app-header switcher (persisted)
- Responsive login layout with tagline “Draft. Compete. Dominate.” on large screens
- UI aligned with existing brand tokens in `index.css`

## Non-goals

- Real Google OAuth / backend auth
- `httpOnly` or secure server-side sessions
- Auth on non-app routes beyond `/auth/*`
- Theme switcher on login page
- Toasts, error boundaries, or 404 handling for auth edge cases

## Decisions (brainstorming)

| Topic | Choice |
|-------|--------|
| Protected routes | **A** — all app routes under `AppLayout` |
| Theme switcher placement | **C** — app header only; login uses system/default |
| Theme persistence | **A** — `localStorage` (`pitch-pick-theme`) |
| Authed user on `/auth/*` | **A** — redirect to `/dashboard` |
| Auth pattern | **Approach 1** — route guard components + cookie helpers |

## Cookie contract

| Property | Value |
|----------|--------|
| Name | `pitch-pick-session` (`constants/auth.ts`) |
| Value | `stub` (placeholder until real OAuth) |
| Max-Age | `3600` (1 hour) |
| Path | `/` |
| SameSite | `Lax` |

### Helpers (`services/auth/session-cookie.ts`)

- `setSessionCookie()` — write cookie with 1h `Max-Age`
- `clearSessionCookie()` — expire immediately (`Max-Age=0`)
- `hasValidSession()` — cookie name present in `document.cookie` (sufficient for stub)

### Auth service (`services/auth/index.ts`)

- `signInWithGoogleStub()` — `setSessionCookie()` then caller navigates to dashboard
- `signOut()` — `clearSessionCookie()` then caller navigates to login

## User flows

1. **Sign in** — Click “Continue with Google” → set cookie → `navigate(ROUTES.DASHBOARD)`
2. **Logout** — App header → `signOut()` → `navigate(ROUTES.AUTH.LOGIN)`
3. **Root `/`** — `RootRedirect`: valid session → `/dashboard`, else → `/auth/login`
4. **Protected app routes** — `RequireAuth`: no session → `/auth/login` (`replace`)
5. **Auth routes** — `GuestOnly`: valid session → `/dashboard` (`replace`)

## Routing

| Route | Handler | Guard |
|-------|---------|-------|
| `/` | `RootRedirect` | Cookie-based redirect |
| `/auth`, `/auth/login` | `AuthLayout` + pages | `GuestOnly` |
| `/dashboard`, `/leagues`, `/draft`, `/team` | `AppLayout` + pages | `RequireAuth` |

Remove unconditional `/` → `/dashboard` redirect in `app/router/index.tsx`.

## Theme system

| Surface | Behavior |
|---------|----------|
| Login (`/auth/*`) | System preference via existing `prefers-color-scheme` CSS; strip forced `html.dark` on enter |
| App (`AppLayout`) | `ThemeProvider` reads `pitch-pick-theme` from `localStorage` (`light` \| `dark`); default from OS if unset |

### Components

- `app/providers/theme-provider.tsx` — apply/remove `dark` on `document.documentElement`
- `components/common/theme-switcher.tsx` — toggle in app header; writes `localStorage`
- `hooks/use-theme.ts` (optional) — consumed by switcher/provider

On auth layout mount: remove `dark` class so login respects OS. On app layout mount: re-apply stored theme.

## Login UI

### Layout (`AuthLayout` + `login-page.tsx`)

| Breakpoint | Layout |
|------------|--------|
| `< lg` | Vertical stack: compact brand panel, then sign-in card |
| `≥ lg` | Two columns ~50/50: brand left, sign-in right |

### Left panel (`components/common/auth-brand-panel.tsx`)

- Wordmark: “Pitch Pick”
- Tagline: **“Draft. Compete. Dominate.”**
- Optional muted subline
- Background using `bg-muted/30` or subtle primary/secondary tint

### Right panel

- Card: `bg-card`, `border`, `rounded-lg`
- Heading: “Sign in to continue”
- `components/forms/google-sign-in-button.tsx` — full-width stub, uses `Button` + icon

### Styling

Use semantic tokens (`bg-background`, `text-foreground`, `primary`, etc.). No hardcoded brand hex in components.

### CSS cleanup

Update `#root` in `index.css` to full width (remove `1126px` / centered constraints) so auth and app layouts are full-bleed.

## App header

- Existing nav links unchanged
- Right cluster: `ThemeSwitcher` + **Logout** (`signOut` + navigate to login)

## New / updated files

| File | Purpose |
|------|---------|
| `constants/auth.ts` | Cookie name, max-age |
| `services/auth/session-cookie.ts` | Cookie CRUD + validation |
| `services/auth/index.ts` | Stub sign-in / sign-out |
| `components/routing/root-redirect.tsx` | `/` handler |
| `components/routing/require-auth.tsx` | App route guard |
| `components/routing/guest-only.tsx` | Auth route guard |
| `components/common/theme-switcher.tsx` | Header toggle |
| `components/common/auth-brand-panel.tsx` | Tagline panel |
| `components/forms/google-sign-in-button.tsx` | Google stub button |
| `app/providers/theme-provider.tsx` | Theme context + DOM class |
| `app/providers/index.tsx` | Add `ThemeProvider` |
| `app/layouts/auth-layout.tsx` | Split shell; strip theme class on mount |
| `app/layouts/app-layout.tsx` | Logout + theme switcher |
| `pages/auth/login-page.tsx` | Compose panels + button |
| `app/router/index.tsx` | `RootRedirect` |
| `app/router/routes/auth.routes.tsx` | Wrap with `GuestOnly` |
| `app/router/routes/app.routes.tsx` | Wrap with `RequireAuth` |
| `index.css` | `#root` full-width fix |

## Error handling

- Missing/expired session on protected route → silent redirect to login
- Stub sign-in has no failure path in this pass

## Verification

1. `pnpm build` — pass
2. `pnpm lint` — pass
3. Manual checklist:
   - `/` without cookie → `/auth/login`
   - Google stub → cookie → `/dashboard`
   - Refresh within 1h → still authenticated
   - Logout → cookie cleared → login
   - `/` with cookie → `/dashboard`
   - `/auth/login` with cookie → `/dashboard`
   - `/leagues` (etc.) without cookie → login
   - App theme toggle persists after refresh
   - Login page follows OS light/dark (no switcher)
   - Large viewport: side-by-side tagline + sign-in; small: stacked

## Future work

- Real Google OAuth and backend session
- `httpOnly` secure cookies
- User profile in store
- Theme switcher on login (if product asks)
- Route-level `errorElement` and session expiry UX
