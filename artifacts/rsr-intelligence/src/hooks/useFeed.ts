/* ── INDEX Data Network — useFeed Hook ────────────────────────────────────────
   Polls a single source definition and returns live health state + items.
   Handles CORS, network errors, timeouts, and unbound sources gracefully.
   ──────────────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useCallback, useRef } from "react";
import type { SourceDefinition, FeedState, SourceHealth, FeedItem, FeedResult } from "@/lib/feeds/types";
import { normalizeResponse } from "@/lib/feeds/adapters";

const INIT_HEALTH = (source: SourceDefinition): SourceHealth => ({
  sourceId: source.id,
  state: source.endpoint ? "loading" : "unbound",
  lastChecked: null,
  lastSuccess: null,
  error: null,
  latencyMs: null,
  itemCount: 0,
});

export function useFeed(source: SourceDefinition): FeedResult {
  const [state, setState] = useState<FeedState>(source.endpoint ? "loading" : "unbound");
  const [items, setItems] = useState<FeedItem[]>([]);
  const [health, setHealth] = useState<SourceHealth>(INIT_HEALTH(source));
  const abortRef = useRef<AbortController | null>(null);

  const doFetch = useCallback(async () => {
    if (!source.endpoint) {
      const now = new Date();
      setState("unbound");
      setHealth((h) => ({ ...h, state: "unbound", lastChecked: now }));
      return;
    }

    /* Cancel any in-flight request */
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState("loading");
    const start = Date.now();

    try {
      const res = await fetch(source.endpoint, {
        headers: source.headers ?? {},
        signal: abortRef.current.signal,
      });

      const latencyMs = Date.now() - start;

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

      let raw: unknown = null;
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("json")) {
        raw = await res.json();
      } else {
        raw = await res.text();
      }

      const fetched = raw
        ? normalizeResponse(raw, source.id, source.categoryId, source.parser ?? "json-array")
        : [];

      const now = new Date();
      setItems(fetched);
      setState("connected");
      setHealth({
        sourceId: source.id,
        state: "connected",
        lastChecked: now,
        lastSuccess: now,
        error: null,
        latencyMs,
        itemCount: fetched.length,
      });
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") return;

      const msg = String(err instanceof Error ? err.message : err);
      const isCors =
        msg.includes("NetworkError") ||
        msg.includes("Failed to fetch") ||
        msg.includes("CORS") ||
        msg.includes("Load failed");

      const nextState: FeedState = isCors ? "cors-restricted" : "error";
      const now = new Date();

      setState(nextState);
      setHealth((h) => ({
        ...h,
        state: nextState,
        lastChecked: now,
        error: isCors
          ? "Network error — proxy required for cross-origin source"
          : msg,
        latencyMs: null,
      }));
    }
  }, [source.id, source.endpoint, source.categoryId, source.parser]);

  useEffect(() => {
    doFetch();
    if (!source.endpoint) return;
    const id = setInterval(doFetch, source.pollingMs);
    return () => {
      clearInterval(id);
      abortRef.current?.abort();
    };
  }, [doFetch, source.endpoint, source.pollingMs]);

  return { state, items, health, refresh: doFetch };
}

/* ── All sources at once (fixed 4-source registry) ────────────── */
import { SOURCE_DEFINITIONS } from "@/lib/feeds/sources";

export interface AllFeedsResult {
  feeds: FeedResult[];
  hasAnyConnected: boolean;
  hasAnyLoading: boolean;
}

/* Call this at component level with a fixed count (not in loops) */
export function useFeed0(): FeedResult { return useFeed(SOURCE_DEFINITIONS[0]); }
export function useFeed1(): FeedResult { return useFeed(SOURCE_DEFINITIONS[1]); }
export function useFeed2(): FeedResult { return useFeed(SOURCE_DEFINITIONS[2]); }
export function useFeed3(): FeedResult { return useFeed(SOURCE_DEFINITIONS[3]); }
