/* ── INDEX Data Network — Environment Configuration ─────────────────────────
   All runtime configuration is resolved here.
   Never import import.meta.env directly in components — use this module.

   Deployment:
     Copy .env.example to .env and populate the values relevant to your setup.

   Source routing:
     If VITE_SOURCE_BASE_URL is set, all feed endpoints use it as the base URL.
     This is the recommended approach for Portainer/Docker deployments where
     the API server runs as a separate container on a known internal address.

     If VITE_SOURCE_BASE_URL is NOT set, the frontend falls back to relative
     paths (/api/...) — this works when the API server and frontend are served
     behind the same reverse proxy (Replit dev, nginx, Traefik, etc).

   Portainer example:
     VITE_SOURCE_BASE_URL=http://api:4000
     where "api" is the API server service name in docker-compose.
   ──────────────────────────────────────────────────────────────────────────── */

const rawSourceBase = (import.meta.env.VITE_SOURCE_BASE_URL ?? "").replace(/\/$/, "");

export const ENV = {
  /* Operator authentication passphrase.
     Required for /operator access. If unset, login page shows "locked" state.
     Set a strong passphrase — this is the only auth layer for the operator console. */
  OPERATOR_KEY: import.meta.env.VITE_OPERATOR_KEY ?? "",

  /* Base URL for the INDEX API server.
     If set: all feed requests use this as origin (e.g. http://api:4000)
     If unset: requests use /api/... (relative, same-origin via reverse proxy)
     This is the primary configuration for activating real data sources. */
  SOURCE_BASE: rawSourceBase,

  /* API base — resolved automatically.
     Components and sources import this, not SOURCE_BASE directly.
     Empty string means "same-origin" — fetch("/api/feeds/...") */
  API_BASE: rawSourceBase || "",

  /* Feed polling interval in milliseconds.
     Default: 60s. Lower values increase API server load.
     Recommended production minimum: 30000 */
  POLL_INTERVAL: Number(import.meta.env.VITE_POLL_INTERVAL_MS ?? 60_000),

  /* Internal operational tool URLs — operator console only.
     Leave empty if the tool is not deployed. The operator UI shows "not configured".
     Example: VITE_GRAFANA_URL=http://grafana:3000 */
  GRAFANA_URL:   import.meta.env.VITE_GRAFANA_URL   ?? "",
  FLOWISE_URL:   import.meta.env.VITE_FLOWISE_URL   ?? "",
  WEBUI_URL:     import.meta.env.VITE_WEBUI_URL     ?? "",
  PORTAINER_URL: import.meta.env.VITE_PORTAINER_URL ?? "",

  /* Development-only auth bypass.
     NEVER set this in production or any non-dev environment.
     Only functions when import.meta.env.DEV === true. */
  DEV_AUTH_BYPASS:
    import.meta.env.DEV === true &&
    import.meta.env.VITE_DEV_AUTH_BYPASS === "true",
} as const;

export type EnvConfig = typeof ENV;
