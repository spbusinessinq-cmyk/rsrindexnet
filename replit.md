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

### Pacific Systems (`artifacts/rsr-intelligence`)
- **Type**: React + Vite frontend (no backend, self-hostable via Portainer/Docker)
- **Preview path**: `/`
- **Product**: Pacific Systems — RSR Intelligence Network, Data Systems Division (formerly "INDEX Data Network")
- **Tech**: React, Vite, Tailwind CSS, wouter (routing), Orbitron/Rajdhani/Share Tech Mono fonts

#### Architecture

**Route structure**
- `/` — Homepage (corporate intelligence web-page layout, 7-section scroll; CommandWheel kept as secondary "Navigate the Architecture" interactive module)
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

#### Release hardening pass (completed)
- **Live credibility**: home.tsx imports useFeed0-3, derivePlatformState, fmtRelative — bottom bar shows "N SOURCES ACTIVE · N STAGED · SYNCED Xs ago" from real feed state. No hardcoded counts.
- **LeftPanel.tsx**: Accepts optional `platform?: PlatformRuntimeState` prop. Shows live "Network State" card in footer (sources active count + staged items) instead of the weak "Hover a sector" hint. Platform Structure pillars replace placeholder copy.
- **RightPanel.tsx**: Sector Index list buttons show green dots on SIGNALS/DATASETS/INDEX only when live (networkIsLive). Default body text improved. Enter CTA button added.
- **signals.tsx**: Body text 0.72+, triage criteria readable, cross-link footer (→ DATASETS), sidebar "Related Layers" nav, improved Feed State Key presentation.
- **datasets.tsx**: Body text 0.72+, context block mentions live staged count, cross-link footer (→ INDEX), sidebar "Related Layers" nav, domain binding list in sidebar.
- **records.tsx**: Badge shows "35 STAGED — 0 COMMITTED" derived from real state. Staged candidates info card. Upstream cross-link buttons (← SIGNALS, ← DATASETS). Pipeline Position breadcrumb in sidebar.
- **overview.tsx**: Pipeline "VIEW →" buttons on each phase. Sector cards have → arrow affordance. RSRINTEL.COM link added. Body text brightened.
- **method.tsx**: Each phase has contextual cross-link button (SIGNALS → / DATASETS → / INDEX →). "Follow the Pipeline" footer nav. Body text 0.72+.
- **access.tsx**: Context block, sidebar, body text brightness bumped to 0.68–0.72.
- **Readability standard**: body 0.72–0.78, labels 0.48–0.55, meta 0.42–0.5. No copy below 0.42.

#### Visual system
- Color: black bg, green #22c55e active, steel rgba(155,175,170,*) passive
- Fonts: Orbitron (display), Share Tech Mono (tactical/mono), Rajdhani (body)
- All empty states are honest — no fake data, no invented counts
- LIVE_SECTORS = {SIGNALS, DATASETS, INDEX} — only these show live green dots when networkIsLive

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview path**: `/api`
- **Description**: Shared backend API server

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox`)
- **Type**: Design mockup sandbox
- **Preview path**: `/__mockup`
