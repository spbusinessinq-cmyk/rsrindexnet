/* ── INDEX Data Network — Runtime State Derivation ────────────────────────────
   Derives live platform state from feed health.
   Consumed by Datasets, Signals, and Operator pages.
   Components never hard-code counts — everything derives from real state.
   ──────────────────────────────────────────────────────────────────────────── */

import type { FeedResult, FeedState, PlatformRuntimeState, DatasetBinding, DomainId } from "@/lib/feeds/types";
import { SOURCE_DEFINITIONS, getSourcesForDomain } from "@/lib/feeds/sources";
import { DATASET_DOMAINS } from "@/data/config";

/* ── Derive platform-wide runtime state from all feeds ─────────── */
export function derivePlatformState(feeds: FeedResult[]): PlatformRuntimeState {
  const sourcesConnected = feeds.filter((f) => f.state === "connected").length;
  const sourcesUnbound   = feeds.filter((f) => f.state === "unbound").length;
  const sourcesError     = feeds.filter((f) => f.state === "error" || f.state === "cors-restricted").length;
  const totalLiveItems   = feeds.reduce((n, f) => n + f.items.length, 0);

  /* A domain is "bound" if at least one of its source definitions is currently connected */
  const domainsBound = DATASET_DOMAINS.filter((domain) => {
    const domainSources = getSourcesForDomain(domain.id);
    if (domainSources.length === 0) return false;
    return domainSources.some((src) => {
      const feed = feeds.find((f) => f.health.sourceId === src.id);
      return feed?.state === "connected";
    });
  }).length;

  const lastSync = feeds
    .map((f) => f.health.lastSuccess)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? null;

  return {
    sourcesTotal:     SOURCE_DEFINITIONS.length,
    sourcesConnected,
    sourcesUnbound,
    sourcesError,
    totalLiveItems,
    domainsTotal:     DATASET_DOMAINS.length,
    domainsBound,
    committedRecords: 0,   // no commit pipeline yet — honest zero
    lastSync,
  };
}

/* ── Derive binding state for a single domain ─────────────────── */
export function deriveDomainBinding(domainId: DomainId, feeds: FeedResult[]): DatasetBinding {
  const domainSources = getSourcesForDomain(domainId);

  if (domainSources.length === 0) {
    return {
      domainId,
      sourceId: "",
      state: "unbound",
      lastSync: null,
      recordCount: 0,
      stagedCount: 0,
    };
  }

  /* Use the first connected source, or the first defined source */
  const connectedSource = domainSources.find((src) => {
    const feed = feeds.find((f) => f.health.sourceId === src.id);
    return feed?.state === "connected";
  });

  const primarySource = connectedSource ?? domainSources[0];
  const feed = feeds.find((f) => f.health.sourceId === primarySource.id);

  const state: FeedState = feed?.state ?? "unbound";
  const stagedCount = feed?.items.length ?? 0;

  return {
    domainId,
    sourceId: primarySource.id,
    state,
    lastSync: feed?.health.lastSuccess ?? null,
    recordCount: 0,   // no committed records yet
    stagedCount,
  };
}

/* ── Derive all domain bindings ────────────────────────────────── */
export function deriveAllDomainBindings(feeds: FeedResult[]): Map<DomainId, DatasetBinding> {
  const map = new Map<DomainId, DatasetBinding>();
  for (const domain of DATASET_DOMAINS) {
    map.set(domain.id as DomainId, deriveDomainBinding(domain.id as DomainId, feeds));
  }
  return map;
}

/* ── Feed state display labels & colours ───────────────────────── */
export const FEED_STATE_LABELS: Record<FeedState, string> = {
  connected:         "Connected",
  disconnected:      "Disconnected",
  staged:            "Staged",
  error:             "Error",
  unbound:           "No source bound",
  loading:           "Checking...",
  "cors-restricted": "CORS — proxy required",
};

export const FEED_STATE_COLORS: Record<FeedState, string> = {
  connected:         "rgba(245,158,11,0.82)",
  disconnected:      "rgba(155,175,170,0.38)",
  staged:            "rgba(245,158,11,0.52)",
  error:             "rgba(220,80,80,0.65)",
  unbound:           "rgba(155,175,170,0.28)",
  loading:           "rgba(245,158,11,0.38)",
  "cors-restricted": "rgba(220,160,50,0.65)",
};

export const DOMAIN_BINDING_LABELS: Record<string, string> = {
  unbound: "No source bound",
  bound:   "Source bound",
  partial: "Partially bound",
};

/* ── Format helpers ────────────────────────────────────────────── */
export function fmtTime(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function fmtRelative(d: Date | null): string {
  if (!d) return "—";
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 5)   return "just now";
  if (sec < 60)  return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  return `${Math.floor(sec / 3600)}h ago`;
}
