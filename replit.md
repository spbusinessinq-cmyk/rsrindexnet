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

### RSR Intelligence Network (`artifacts/rsr-intelligence`)
- **Type**: React + Vite frontend (no backend)
- **Preview path**: `/`
- **Description**: Black-first tactical command interface for RSR Intelligence Network
- **Tech**: React, Vite, Tailwind CSS, wouter (routing), Orbitron/Rajdhani/Share Tech Mono fonts
- **Features**:
  - Full-screen three-panel layout (left panel, center command wheel, right panel)
  - SVG segmented radial command wheel with 6 clickable segments: SYSTEMS, SIGNALS, TOOLS, FILES, BRIEFS, NETWORK
  - Center hub: CORE / RSR / Intelligence Network
  - Live tool links in left panel: Flowise, Intel Board, Open WebUI, Portainer
  - Tactical status indicators, module index, route map
  - Dark green-on-black aesthetic with subtle glow effects and tactical grid overlay
  - Hover interaction: segment glow + border enhancement + module context preview
  - Stub module pages at /systems, /signals, /tools, /files, /briefs, /network

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview path**: `/api`
- **Description**: Shared backend API server

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox`)
- **Type**: Design mockup sandbox
- **Preview path**: `/__mockup`
