/* ── INDEX Data Network — Environment Configuration ─────────────────────────
   All runtime configuration is read here.
   Set variables in .env (copy from .env.example).
   Never import import.meta.env directly in components — use this module.
   ──────────────────────────────────────────────────────────────────────────── */

export const ENV = {
  /* Operator authentication passphrase.
     Required for /operator access. If unset, operator login is blocked. */
  OPERATOR_KEY: import.meta.env.VITE_OPERATOR_KEY ?? "",

  /* Base URL for internal data feeds.
     Point to your self-hosted API or proxy endpoint.
     e.g. http://192.168.12.228:4000
     If empty, all sources are unbound. */
  SOURCE_BASE: (import.meta.env.VITE_SOURCE_BASE_URL ?? "").replace(/\/$/, ""),

  /* Feed polling interval in milliseconds. Default: 30s */
  POLL_INTERVAL: Number(import.meta.env.VITE_POLL_INTERVAL_MS ?? 30_000),

  /* Internal operational tool URLs (operator layer only) */
  GRAFANA_URL:   import.meta.env.VITE_GRAFANA_URL   ?? "",
  FLOWISE_URL:   import.meta.env.VITE_FLOWISE_URL   ?? "",
  WEBUI_URL:     import.meta.env.VITE_WEBUI_URL     ?? "",
  PORTAINER_URL: import.meta.env.VITE_PORTAINER_URL ?? "",

  /* Development-only auth bypass — ONLY usable when DEV === true.
     Never set this in a production .env. */
  DEV_AUTH_BYPASS:
    import.meta.env.DEV === true &&
    import.meta.env.VITE_DEV_AUTH_BYPASS === "true",
} as const;

export type EnvConfig = typeof ENV;
