/* ── INDEX Data Network — Feed Proxy Routes ───────────────────────────────────
   Server-side proxies for live data sources.
   Handles CORS, normalization, and error isolation on the backend.

   Routes (all under /api prefix via app.use):
     GET /feeds/osint       → HackerNews top stories  (OPN category)
     GET /feeds/structured  → HackerNews Ask HN        (STR category)
     GET /feeds/patterns    → Pattern queue             (FLG category — empty until detection runs)
     GET /intake            → Manual intake queue       (MAN category — operator-submitted)
     GET /status            → Platform status summary
   ──────────────────────────────────────────────────────────────────────────── */

import { Router, type IRouter, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/* ── HN Firebase API helpers ─────────────────────────────────── */

const HN_BASE = "https://hacker-news.firebaseio.com/v0";
const FETCH_TIMEOUT_MS = 8_000;

interface HNItem {
  id: number;
  title?: string;
  type?: string;
  url?: string;
  score?: number;
  by?: string;
  time?: number;
  text?: string;
  descendants?: number;
}

async function hnFetch<T>(path: string): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${HN_BASE}${path}`, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HN API ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

async function fetchHNItems(ids: number[], count: number): Promise<HNItem[]> {
  const slice = ids.slice(0, count);
  const settled = await Promise.allSettled(
    slice.map((id) => hnFetch<HNItem>(`/item/${id}.json`))
  );
  return settled
    .filter((r): r is PromiseFulfilledResult<HNItem> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((item): item is HNItem => !!item && !!item.id);
}

function toFeedItem(
  item: HNItem,
  sourceId: string,
  categoryId: string
): Record<string, unknown> {
  return {
    id: String(item.id),
    title: item.title ?? `HN Item ${item.id}`,
    summary: item.text
      ? item.text.replace(/<[^>]+>/g, "").slice(0, 280)
      : undefined,
    url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
    date: item.time ? new Date(item.time * 1000).toISOString() : null,
    sourceId,
    categoryId,
    meta: {
      score: item.score ?? 0,
      author: item.by ?? "unknown",
      comments: item.descendants ?? 0,
    },
  };
}

/* ── GET /feeds/osint ─────────────────────────────────────────── */
/* Open Source Intelligence — HN top stories                      */
router.get("/feeds/osint", async (_req: Request, res: Response) => {
  const fetchedAt = new Date().toISOString();
  try {
    const ids = await hnFetch<number[]>("/topstories.json");
    const items = await fetchHNItems(ids, 20);
    const normalized = items.map((i) => toFeedItem(i, "osint-primary", "OPN"));

    res.json({
      items: normalized,
      meta: {
        source: "hacker-news-top",
        category: "OPN",
        count: normalized.length,
        fetched_at: fetchedAt,
      },
    });
  } catch (err) {
    logger.error({ err }, "feeds/osint fetch failed");
    res.status(502).json({
      items: [],
      meta: {
        source: "hacker-news-top",
        category: "OPN",
        count: 0,
        fetched_at: fetchedAt,
        error: err instanceof Error ? err.message : String(err),
      },
    });
  }
});

/* ── GET /feeds/structured ────────────────────────────────────── */
/* Structured Feed — HN Ask HN (structured questions with content) */
router.get("/feeds/structured", async (_req: Request, res: Response) => {
  const fetchedAt = new Date().toISOString();
  try {
    const ids = await hnFetch<number[]>("/askstories.json");
    const items = await fetchHNItems(ids, 15);
    const normalized = items.map((i) => toFeedItem(i, "structured-primary", "STR"));

    res.json({
      items: normalized,
      meta: {
        source: "hacker-news-ask",
        category: "STR",
        count: normalized.length,
        fetched_at: fetchedAt,
      },
    });
  } catch (err) {
    logger.error({ err }, "feeds/structured fetch failed");
    res.status(502).json({
      items: [],
      meta: {
        source: "hacker-news-ask",
        category: "STR",
        count: 0,
        fetched_at: fetchedAt,
        error: err instanceof Error ? err.message : String(err),
      },
    });
  }
});

/* ── GET /feeds/patterns ──────────────────────────────────────── */
/* Pattern flags — no patterns generated yet. Honest empty state.  */
router.get("/feeds/patterns", (_req: Request, res: Response) => {
  res.json({
    items: [],
    meta: {
      source: "pattern-monitor",
      category: "FLG",
      count: 0,
      fetched_at: new Date().toISOString(),
      notice: "Pattern detection not yet active — cross-source threshold monitoring not running",
    },
  });
});

/* ── GET /intake ──────────────────────────────────────────────── */
/* Manual intake queue — empty until operator submits.             */
router.get("/intake", (_req: Request, res: Response) => {
  res.json({
    items: [],
    meta: {
      source: "manual-queue",
      category: "MAN",
      count: 0,
      fetched_at: new Date().toISOString(),
      notice: "Manual intake queue is empty — no operator-submitted signals pending",
    },
  });
});

/* ── GET /status ──────────────────────────────────────────────── */
/* Platform status — derived from running state.                   */
router.get("/status", (_req: Request, res: Response) => {
  res.json({
    system: "online",
    layer: "public",
    sources_defined: 4,
    sources_active: 2,
    domains_defined: 6,
    domains_bound: 1,
    committed_records: 0,
    staged_candidates: 0,
    timestamp: new Date().toISOString(),
  });
});

export default router;
