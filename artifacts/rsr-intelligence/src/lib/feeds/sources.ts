/* ── INDEX Data Network — Source Definitions ─────────────────────────────────
   Canonical source registry for the INDEX signal intake system.

   Endpoint resolution:
     ENV.API_BASE is either:
     - empty string ""  → relative path, same-origin proxy routing (/api/feeds/...)
     - a full URL       → e.g. http://api:4000 (Portainer internal), https://api.domain.com

   To bind a source externally:
     Set VITE_SOURCE_BASE_URL in your deployment environment.
     For Portainer/Docker: use the API server container name as host.
     For nginx reverse proxy: set to the proxied external URL.

   Domain bindings (domainIds):
     Each source declares which dataset domains its signals classify into.
     This drives dataset binding state on the Datasets and Operator pages.

   First activated domain: INF (Infrastructure & Technology)
     The OPN source (HN top stories) is bound to INF as the first real data path.
   ──────────────────────────────────────────────────────────────────────────── */

import { ENV } from "@/lib/env";
import type { SourceDefinition, DomainId } from "./types";

const BASE = ENV.API_BASE; // "" = same-origin relative, or full URL

/* Builds endpoint URL. Always returns a string — same-origin sources are always bound. */
function ep(path: string): string {
  return `${BASE}/api${path}`;
}

export const SOURCE_DEFINITIONS: SourceDefinition[] = [
  /* ── Open Source Intelligence ──────────────────────────────────────────────
     HackerNews top stories — tech & infrastructure signals.
     First live source. Bound to INF (Infrastructure & Technology) domain.
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "osint-primary",
    label: "OSINT Primary",
    description: "HackerNews top stories — technology and infrastructure signals classified on intake",
    type: "json",
    categoryId: "OPN",
    domainIds: ["INF"] as DomainId[],
    endpoint: ep("/feeds/osint"),
    pollingMs: ENV.POLL_INTERVAL,
    parser: "json-items",
  },

  /* ── Structured Data Feed ──────────────────────────────────────────────────
     HackerNews Ask HN — structured queries with textual content.
     Mapped to INF and ORG domains (tech organisations, structured questions).
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "structured-primary",
    label: "Structured Data Feed",
    description: "HackerNews Ask HN — structured queries ingested on schedule, validated on receipt",
    type: "json",
    categoryId: "STR",
    domainIds: ["INF", "ORG"] as DomainId[],
    endpoint: ep("/feeds/structured"),
    pollingMs: ENV.POLL_INTERVAL,
    parser: "json-items",
  },

  /* ── Pattern Detection Feed ────────────────────────────────────────────────
     Cross-source pattern flags — empty until detection logic is active.
     Honest state: returns empty array with notice.
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "pattern-monitor",
    label: "Pattern Monitor",
    description: "Cross-source pattern flag feed — fires only when threshold criteria are met",
    type: "json",
    categoryId: "FLG",
    domainIds: [] as DomainId[],
    endpoint: ep("/feeds/patterns"),
    pollingMs: ENV.POLL_INTERVAL * 2,
    parser: "json-items",
  },

  /* ── Manual Intake Queue ────────────────────────────────────────────────────
     Operator-submitted signals awaiting classification.
     Honest state: empty until operator submits.
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "manual-queue",
    label: "Manual Intake Queue",
    description: "Operator-submitted signals awaiting classification before commit",
    type: "api",
    categoryId: "MAN",
    domainIds: [] as DomainId[],
    endpoint: ep("/intake"),
    pollingMs: ENV.POLL_INTERVAL,
    parser: "json-items",
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

/* Returns sources bound to a specific domain */
export function getSourcesForDomain(domainId: string): SourceDefinition[] {
  return SOURCE_DEFINITIONS.filter((s) => s.domainIds.includes(domainId as DomainId));
}

/* Returns true if any sources have active endpoints */
export function hasAnySources(): boolean {
  return SOURCE_DEFINITIONS.some((s) => s.endpoint !== null);
}
