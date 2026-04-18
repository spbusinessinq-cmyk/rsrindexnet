/* ── INDEX Data Network — Feed & Source Types ───────────────────────────────
   Typed interfaces for the source/feed architecture.
   All signal ingestion flows through these shapes.
   ──────────────────────────────────────────────────────────────────────────── */

export type FeedState =
  | "connected"        // source responding, items normalised
  | "disconnected"     // source was connected, lost connection
  | "staged"           // items received, awaiting classification
  | "error"            // fetch or parse failure
  | "loading"          // initial fetch in progress
  | "unbound"          // no endpoint configured
  | "cors-restricted"; // cross-origin block — proxy required

export type SourceType = "rss" | "json" | "atom" | "api" | "internal";
export type SignalCategoryId = "OPN" | "STR" | "FLG" | "MAN";
export type TriageState = "pending" | "committed" | "dismissed" | "held" | "staged";
export type DomainId = "POL" | "ECO" | "INF" | "ORG" | "MED" | "GEO";

/* ── Source definition — how a source is configured ──────────── */
export interface SourceDefinition {
  id: string;
  label: string;
  description?: string;
  type: SourceType;
  categoryId: SignalCategoryId;
  domainIds: DomainId[];      // which dataset domains this source feeds into
  endpoint: string | null;   // null = unbound / not yet configured
  pollingMs: number;
  headers?: Record<string, string>;
  parser?: "json-array" | "json-items" | "rss" | "atom";
}

/* ── Source health — live runtime state of a source ──────────── */
export interface SourceHealth {
  sourceId: string;
  state: FeedState;
  lastChecked: Date | null;
  lastSuccess: Date | null;
  error: string | null;
  latencyMs: number | null;
  itemCount: number;
}

/* ── Feed item — a single normalised unit from any source ─────── */
export interface FeedItem {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  url?: string;
  date: Date | null;
  sourceId: string;
  categoryId: SignalCategoryId;
  meta?: Record<string, unknown>;
  raw?: unknown;
}

/* ── Ingested signal — a feed item after triage classification ── */
export interface IngestedSignal {
  id: string;
  sourceId: string;
  categoryId: SignalCategoryId;
  domainId?: DomainId;
  receivedAt: Date;
  item: FeedItem;
  triageState: TriageState;
}

/* ── Dataset binding — relationship between source and domain ─── */
export interface DatasetBinding {
  domainId: DomainId;
  sourceId: string;
  state: FeedState;
  lastSync: Date | null;
  recordCount: number;
  stagedCount: number;
}

/* ── Combined feed result returned by useFeed hook ────────────── */
export interface FeedResult {
  state: FeedState;
  items: FeedItem[];
  health: SourceHealth;
  refresh: () => void;
}

/* ── Runtime derived state for the platform ──────────────────── */
export interface PlatformRuntimeState {
  sourcesTotal: number;
  sourcesConnected: number;
  sourcesUnbound: number;
  sourcesError: number;
  totalLiveItems: number;
  domainsTotal: number;
  domainsBound: number;
  committedRecords: number;
  lastSync: Date | null;
}
