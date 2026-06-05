# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # tsc + vite build (production)
npm run lint      # ESLint on all .ts/.tsx
npm run preview   # Serve production build locally
```

There is no test suite. Firebase Hosting deployment targets the `dist/` output folder.

## Architecture

BrisbeProfiles is a read-only player profile viewer for "The Archipelago" gaming community. It consumes Firebase Realtime Database data written by the companion RPelago app.

**Routing**: A single route `/p/:identifier` handles both Discord UIDs (`discord_\d+`) and plain handles (lowercase, dots-as-underscores).

**Data flow**:
1. `usePlayerProfile` hook detects identifier type, resolves handles via `handleIndex/{encoded}` → UID, then subscribes to `profiles/players/{uid}` with `onValue` for real-time updates.
2. Returns a discriminated union `{status: 'loading' | 'not_found' | 'loaded', data?}`.
3. `ProfilePage` renders loading/not-found states, then passes the record to `ProfileShell`.
4. `ProfileShell` composes `IdentityCard`, `BadgeCase`, `CampaignCard` (one per participated event), and `GamesCard`.

**Firebase database shape**:
```
profiles/
  players/{uid}           → ProfileRecord
  handleIndex/{handle}    → uid string
```
Handles are encoded with `encodeHandle()` (lowercase, `.` → `_`).

**Events registry** (`src/lib/events.ts`): The `EVENTS` array is hardcoded—new seasons require adding an entry here. Each event has `id`, `name`, dates, badge image path, accent color, and `status: 'active' | 'upcoming' | 'complete'`.

**Styling**: All theming is done via CSS custom properties on `.ap-shell` in `profile.css`. Components reference these tokens (`--ap-*`) rather than hardcoding values. The accent color per event is applied inline from `events.ts`.

**Animations**: Cards are wrapped in `<FadeIn delay={ms}>` for staggered entrance. `HoverTilt` adds a 3D tilt on badges. `AnimatedNumber` counts up stat values on render.

**Avatar**: Prefers Discord CDN (`avatarHash` → CDN URL). Falls back to a generated gradient avatar using initials and a hue derived from the display name's character sum.

## Environment

Copy `.env.example` to `.env` and fill in the 8 `VITE_FIREBASE_*` variables. Firebase is only initialized when `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_DATABASE_URL` are both present.
