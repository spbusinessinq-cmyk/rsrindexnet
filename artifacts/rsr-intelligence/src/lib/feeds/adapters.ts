/* ── INDEX Data Network — Feed Adapters ──────────────────────────────────────
   Normalises raw source responses into typed FeedItem shapes.
   Each adapter handles a different source format.
   Raw data is never stored directly — always normalised on ingestion.
   ──────────────────────────────────────────────────────────────────────────── */

import type { FeedItem, SignalCategoryId, SourceType } from "./types";

/* ── JSON array adapter ───────────────────────────────────────── */
function fromJsonArray(raw: unknown[], sourceId: string, categoryId: SignalCategoryId): FeedItem[] {
  return raw
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item, i) => ({
      id: String(item.id ?? item._id ?? `${sourceId}-${i}`),
      title: String(item.title ?? item.subject ?? item.name ?? "Untitled"),
      summary: item.summary != null ? String(item.summary) : undefined,
      content: item.content != null ? String(item.content) : undefined,
      url: item.url != null ? String(item.url) : undefined,
      date: parseDate(item.date ?? item.created_at ?? item.timestamp ?? null),
      sourceId,
      categoryId,
      raw: item,
    }));
}

/* ── JSON object with items key ───────────────────────────────── */
function fromJsonItems(raw: unknown, sourceId: string, categoryId: SignalCategoryId): FeedItem[] {
  if (typeof raw !== "object" || raw === null) return [];
  const obj = raw as Record<string, unknown>;
  const items = obj.items ?? obj.data ?? obj.results ?? obj.entries ?? [];
  if (!Array.isArray(items)) return [];
  return fromJsonArray(items, sourceId, categoryId);
}

/* ── Date parser helper ───────────────────────────────────────── */
function parseDate(val: unknown): Date | null {
  if (!val) return null;
  const d = new Date(String(val));
  return isNaN(d.getTime()) ? null : d;
}

/* ── Main normalisation entry point ──────────────────────────── */
export function normalizeResponse(
  raw: unknown,
  sourceId: string,
  categoryId: SignalCategoryId = "OPN",
  parser: SourceType | "json-array" | "json-items" | "rss" | "atom" = "json-array"
): FeedItem[] {
  try {
    if (parser === "json-array" || Array.isArray(raw)) {
      return fromJsonArray(Array.isArray(raw) ? raw : [], sourceId, categoryId);
    }
    if (parser === "json-items") {
      return fromJsonItems(raw, sourceId, categoryId);
    }
    /* RSS/Atom would require server-side parsing — flag as needing proxy */
    return [];
  } catch {
    return [];
  }
}
