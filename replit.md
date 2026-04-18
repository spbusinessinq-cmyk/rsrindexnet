# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### INDEX Data Network (`artifacts/rsr-intelligence`)
- **Type**: React + Vite frontend (no backend, self-hostable via Portainer/Docker)
- **Preview path**: `/`
- **Product**: INDEX Data Network — RSR Intelligence Network, Data Systems Division
- **Tech**: React, Vite, Tailwind CSS, wouter (routing), Orbitron/Rajdhani/Share Tech Mono fonts

#### Architecture

**Route structure**
- `/` — Homepage (command wheel, 6-segment)
- `/overview` — What INDEX is + where it fits in RSR
- `/signals` — Signal categories + live feed binding state
- `/datasets` — Dataset domains + binding status
- `/records` — Indexed record layer (empty state)
- `/method` — Platform methodology
- `/access` — Public access tiers + subtle operator login link
- `/login` — Operator authentication gate
- `/operator` — Protected operator console (requires auth)

**Public vs Operator separation**
- Public layer: all routes above except /login and /operator
- Operator layer: /login and /operator, wrapped in ProtectedRoute
- Separation enforced in routing via `ProtectedRoute` component

**Feed / Source architecture** (`src/lib/feeds/`, `src/hooks/`)
- `src/lib/env.ts` — All environment config in one place (VITE_ vars)
- `src/lib/feeds/types.ts` — Typed interfaces: SourceDefinition, SourceHealth, FeedItem, IngestedSignal, DatasetBinding, FeedResult
- `src/lib/feeds/sources.ts` — 4 source definitions (OPN/STR/FLG/MAN), endpoints from ENV.SOURCE_BASE
- `src/lib/feeds/adapters.ts` — Normalises raw source responses to FeedItem shape
- `src/hooks/useFeed.ts` — Polls a single source, returns live state + items. Exports useFeed0/1/2/3 to avoid hooks-in-loops
- Feed states: connected | disconnected | error | loading | unbound | cors-restricted

**Auth architecture** (`src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`)
- `AuthContext` — passphrase auth against VITE_OPERATOR_KEY, stored in sessionStorage
- If VITE_OPERATOR_KEY unset → status = "locked" (operator access blocked entirely)
- Dev bypass: VITE_DEV_AUTH_BYPASS=true (only when Vite DEV=true)
- `ProtectedRoute` — wraps /operator, redirects to /login or shows locked state

**Data config** (`src/data/`)
- `src/data/types.ts` — DatasetDomain, SignalCategory, etc.
- `src/data/config.ts` — DATASET_DOMAINS, SIGNAL_CATEGORIES, TRIAGE_CRITERIA, ACCESS_TIERS, METHOD_PHASES

#### Environment Variables

Copy `.env.example` to `.env` and configure:
- `VITE_OPERATOR_KEY` — operator passphrase (required for /operator access)
- `VITE_SOURCE_BASE_URL` — base URL of internal data feed API/proxy (e.g. `http://192.168.12.228:4000`)
- `VITE_POLL_INTERVAL_MS` — feed polling interval in ms (default: 30000)
- `VITE_GRAFANA_URL` — Grafana monitoring (operator tool)
- `VITE_FLOWISE_URL` — Flowise AI pipeline (operator tool)
- `VITE_WEBUI_URL` — Open WebUI inference (operator tool)
- `VITE_PORTAINER_URL` — Portainer container management (operator tool)
- `VITE_DEV_AUTH_BYPASS` — dev only, never set true in production

#### Visual system
- Color: black bg, green #22c55e active, steel rgba(155,175,170,*) passive
- Fonts: Orbitron (display), Share Tech Mono (tactical/mono), Rajdhani (body)
- All empty states are honest — no fake data, no invented counts

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview path**: `/api`
- **Description**: Shared backend API server

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox`)
- **Type**: Design mockup sandbox
- **Preview path**: `/__mockup`
