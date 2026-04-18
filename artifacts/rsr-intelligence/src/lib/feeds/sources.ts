/* ── INDEX Data Network — Source Definitions ─────────────────────────────────
   Canonical source registry for the INDEX signal intake system.
   Endpoints are read from environment variables via ENV.SOURCE_BASE.
   Sources with null endpoints are "unbound" — healthy but not yet connected.

   To bind a source:
   1. Set VITE_SOURCE_BASE_URL in your .env
   2. Ensure the endpoint responds with the expected schema
   3. Optionally configure a proxy if CORS is a constraint
   ──────────────────────────────────────────────────────────────────────────── */

import { ENV } from "@/lib/env";
import type { SourceDefinition } from "./types";

const BASE = ENV.SOURCE_BASE;

/* Helper — returns an endpoint only if SOURCE_BASE is configured */
function ep(path: string): string | null {
  return BASE ? `${BASE}${path}` : null;
}

export const SOURCE_DEFINITIONS: SourceDefinition[] = [
  /* ── Open Source Intelligence ─────────────────────────────── */
  {
    id: "osint-primary",
    label: "OSINT Primary",
    description: "Primary open-source intelligence feed — monitored public sources classified on intake",
    type: "json",
    categoryId: "OPN",
    endpoint: ep("/feeds/osint"),
    pollingMs: ENV.POLL_INTERVAL,
    parser: "json-array",
  },

  /* ── Structured Data Feed ─────────────────────────────────── */
  {
    id: "structured-primary",
    label: "Structured Data Feed",
    description: "Schema-validated JSON data stream from defined endpoint — ingested on schedule",
    type: "json",
    categoryId: "STR",
    endpoint: ep("/feeds/structured"),
    pollingMs: ENV.POLL_INTERVAL,
    parser: "json-array",
  },

  /* ── Pattern Detection Feed ───────────────────────────────── */
  {
    id: "pattern-monitor",
    label: "Pattern Monitor",
    description: "Cross-source pattern flag feed — only fires when threshold criteria are met",
    type: "json",
    categoryId: "FLG",
    endpoint: ep("/feeds/patterns"),
    pollingMs: ENV.POLL_INTERVAL * 2,
    parser: "json-array",
  },

  /* ── Manual Intake Queue ──────────────────────────────────── */
  {
    id: "manual-queue",
    label: "Manual Intake Queue",
    description: "Operator-submitted signals awaiting classification before commit",
    type: "api",
    categoryId: "MAN",
    endpoint: ep("/api/intake"),
    pollingMs: ENV.POLL_INTERVAL,
    parser: "json-array",
  },
];

/* Returns sources for a given signal category */
export function getSourcesForCategory(categoryId: string): SourceDefinition[] {
  return SOURCE_DEFINITIONS.filter((s) => s.categoryId === categoryId);
}

/* Returns a source by ID */
export function getSourceById(id: string): SourceDefinition | undefined {
  return SOURCE_DEFINITIONS.find((s) => s.id === id);
}

/* Returns true if any sources have configured endpoints */
export function hasAnySources(): boolean {
  return SOURCE_DEFINITIONS.some((s) => s.endpoint !== null);
}
