import { useLocation } from "wouter";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { SIGNAL_CATEGORIES, TRIAGE_CRITERIA } from "@/data/config";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { SOURCE_DEFINITIONS } from "@/lib/feeds/sources";
import { FEED_STATE_LABELS, FEED_STATE_COLORS, fmtRelative } from "@/lib/runtime";
import type { FeedState, SignalCategoryId, FeedItem } from "@/lib/feeds/types";

const INTAKE_TYPE_LABELS: Record<string, string> = {
  passive:   "Passive / continuous",
  active:    "Active / triggered",
  manual:    "Manual / operator",
  scheduled: "Scheduled / polled",
};

function SignalItem({ item, categoryId }: { item: FeedItem; categoryId: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 px-4"
      style={{ borderBottom: "1px solid rgba(245,158,11,0.04)" }}>
      <div className="flex-shrink-0 mt-0.5">
        <span className="font-mono-tactical rounded px-1.5 py-0.5"
          style={{ border: "1px solid rgba(245,158,11,0.2)", color: "rgba(245,158,11,0.62)", fontSize: "17px", letterSpacing: "0.1em", background: "rgba(245,158,11,0.04)" }}>
          {categoryId}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono-tactical leading-snug"
          style={{ color: "rgba(180,192,202,0.78)", fontSize: "15px", lineHeight: "1.72" }}>
          {item.title.length > 120 ? item.title.slice(0, 120) + "…" : item.title}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="font-mono-tactical truncate"
              style={{ color: "rgba(245,158,11,0.38)", fontSize: "12.5px", textDecoration: "none", maxWidth: 200 }}>
              {new URL(item.url).hostname}
            </a>
          )}
          {item.date && (
            <span className="font-mono-tactical flex-shrink-0"
              style={{ color: "rgba(127,142,155,0.38)", fontSize: "11.5px" }}>
              {fmtRelative(item.date)}
            </span>
          )}
          <span className="font-mono-tactical flex-shrink-0 italic"
            style={{ color: "rgba(127,142,155,0.35)", fontSize: "12.5px" }}>
            staged — awaiting classification
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SignalsPage() {
  const [, setLocation] = useLocation();

  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();

  const feedMap: Record<SignalCategoryId, typeof f0> = {
    OPN: f0,
    STR: f1,
    FLG: f2,
    MAN: f3,
  };

  const feeds = [f0, f1, f2, f3];
  const connectedCount = feeds.filter((f) => f.state === "connected").length;
  const totalItems = feeds.reduce((n, f) => n + f.items.length, 0);
  const isLoading = feeds.some((f) => f.state === "loading");

  const allItems: FeedItem[] = feeds
    .flatMap((f) => f.items)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.getTime() - a.date.getTime();
    });

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / SIGNALS"
          title="SIGNALS"
          subtitle="Signal capture, source triage, and intake classification — monitored input categories and their current binding state"
          badge={connectedCount > 0
            ? `${connectedCount} SOURCE${connectedCount > 1 ? "S" : ""} CONNECTED · ${totalItems} STAGED`
            : isLoading ? "CONNECTING..." : "READY — SOURCES UNBOUND"}
          badgeActive={connectedCount > 0}
        />

        {/* Source status summary band */}
        <div className="shrink-0 flex items-center gap-0 overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(245,158,11,0.06)", background: "rgba(0,0,0,0.2)" }}>
          {SIGNAL_CATEGORIES.map((cat, i) => {
            const feed = feedMap[cat.id as SignalCategoryId];
            const state = feed?.state ?? "unbound";
            const isConn = state === "connected";
            const itemCount = feed?.items.length ?? 0;
            return (
              <div key={cat.id} className="flex items-center gap-2.5 px-5 py-2.5 flex-shrink-0"
                style={{
                  borderRight: i < SIGNAL_CATEGORIES.length - 1 ? "1px solid rgba(245,158,11,0.06)" : undefined,
                  background: isConn ? "rgba(245,158,11,0.03)" : undefined,
                }}>
                <div className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{
                    background: FEED_STATE_COLORS[state],
                    boxShadow: isConn ? `0 0 3px ${FEED_STATE_COLORS[state]}` : undefined,
                  }} />
                <span className="font-mono-tactical"
                  style={{ color: "rgba(127,142,155,0.45)", fontSize: "11.5px", letterSpacing: "0.1em" }}>
                  {cat.id}
                </span>
                <span className="font-orbitron font-semibold tracking-wider"
                  style={{ color: isConn ? "rgba(245,158,11,0.72)" : "rgba(127,142,155,0.42)", fontSize: "12.5px" }}>
                  {cat.label}
                </span>
                <span className="font-mono-tactical"
                  style={{ color: isConn ? "rgba(245,158,11,0.55)" : "rgba(127,142,155,0.28)", fontSize: "12.5px" }}>
                  {isConn ? `${itemCount} staged` : FEED_STATE_LABELS[state]}
                </span>
              </div>
            );
          })}
          <div className="flex-1" />
          {totalItems > 0 && (
            <div className="px-5 py-2.5 flex items-center gap-2 flex-shrink-0">
              <div className="w-1 h-1 rounded-full" style={{ background: "rgba(245,158,11,0.55)", boxShadow: "0 0 3px rgba(245,158,11,0.4)" }} />
              <span className="font-mono-tactical" style={{ color: "rgba(245,158,11,0.5)", fontSize: "12.5px" }}>
                {totalItems} total staged — classification pending
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 p-6 md:p-7 space-y-4 overflow-y-auto">

            {/* Category cards — connected ones first, then unbound */}
            {[...SIGNAL_CATEGORIES]
              .sort((a, b) => {
                const aConn = (feedMap[a.id as SignalCategoryId]?.state === "connected") ? -1 : 1;
                const bConn = (feedMap[b.id as SignalCategoryId]?.state === "connected") ? -1 : 1;
                return aConn - bConn;
              })
              .map((cat) => {
                const feed      = feedMap[cat.id as SignalCategoryId];
                const feedState = feed?.state ?? "unbound";
                const source    = SOURCE_DEFINITIONS.find((s) => s.categoryId === cat.id);
                const lastChecked = feed?.health.lastChecked;
                const isConn    = feedState === "connected";

                return (
                  <div key={cat.id} className="rounded idx-card"
                    style={{
                      border: isConn ? "1px solid rgba(245,158,11,0.22)" : "1px solid rgba(245,158,11,0.08)",
                      background: isConn ? "rgba(28,42,53,0.52)" : "rgba(13,21,32,0.18)",
                    }}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5"
                      style={{
                        borderBottom: `1px solid ${isConn ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.06)"}`,
                        background: isConn ? "rgba(245,158,11,0.025)" : undefined,
                      }}>
                      <div className="flex items-center gap-3">
                        <div className="font-mono-tactical px-2 py-1 rounded flex-shrink-0"
                          style={{
                            border: `1px solid ${isConn ? "rgba(245,158,11,0.42)" : "rgba(245,158,11,0.2)"}`,
                            color: isConn ? "rgba(245,158,11,0.92)" : "rgba(245,158,11,0.68)",
                            fontSize: "13px", letterSpacing: "0.1em",
                            background: isConn ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.03)",
                          }}>
                          {cat.id}
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <div className="font-orbitron text-sm font-bold tracking-wider"
                              style={{ color: isConn ? "#F59E0B" : "rgba(200,210,220,0.7)" }}>
                              {cat.label}
                            </div>
                            {isConn && (
                              <div className="w-1.5 h-1.5 rounded-full"
                                style={{ background: "#F59E0B", boxShadow: "0 0 4px rgba(245,158,11,0.7)" }} />
                            )}
                          </div>
                          <div className="font-mono-tactical mt-0.5"
                            style={{ color: "rgba(127,142,155,0.52)", fontSize: "13px" }}>
                            {INTAKE_TYPE_LABELS[cat.intakeType]}
                          </div>
                        </div>
                      </div>

                      {/* Feed state */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tactical rounded px-2 py-1"
                            style={{
                              border: `1px solid ${isConn ? "rgba(245,158,11,0.28)" : "rgba(127,142,155,0.12)"}`,
                              color: FEED_STATE_COLORS[feedState],
                              fontSize: "12.5px", letterSpacing: "0.06em",
                              background: isConn ? "rgba(245,158,11,0.06)" : "rgba(0,0,0,0.3)",
                            }}>
                            {isConn && feed.items.length > 0
                              ? `${FEED_STATE_LABELS[feedState]} — ${feed.items.length} staged`
                              : FEED_STATE_LABELS[feedState]}
                          </span>
                        </div>
                        {lastChecked && (
                          <span className="font-mono-tactical"
                            style={{ color: "rgba(127,142,155,0.35)", fontSize: "12.5px" }}>
                            Checked {fmtRelative(lastChecked)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x"
                      style={{ borderColor: isConn ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.05)" }}>
                      {/* Left: description + intake logic */}
                      <div className="px-5 py-4 space-y-3">
                        <p className="font-mono-tactical leading-relaxed"
                          style={{ color: "rgba(180,192,202,0.72)", lineHeight: "2.0", fontSize: "15.5px" }}>
                          {cat.description}
                        </p>
                        <div className="flex items-start gap-2.5 pt-2"
                          style={{ borderTop: "1px solid rgba(245,158,11,0.07)" }}>
                          <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: "rgba(245,158,11,0.42)" }} />
                          <span className="font-mono-tactical italic"
                            style={{ color: "rgba(245,158,11,0.55)", fontSize: "15px", lineHeight: "2.02" }}>
                            {cat.intakeLogic}
                          </span>
                        </div>
                      </div>

                      {/* Right: source binding detail */}
                      <div className="px-5 py-4 space-y-3">
                        <div className="font-mono-tactical tracking-widest uppercase"
                          style={{ color: isConn ? "rgba(245,158,11,0.5)" : "rgba(127,142,155,0.38)", fontSize: "12.5px", letterSpacing: "0.16em" }}>
                          Source Binding
                        </div>
                        <div className="rounded px-3.5 py-3 space-y-2.5"
                          style={{
                            border: isConn ? "1px solid rgba(245,158,11,0.14)" : "1px solid rgba(127,142,155,0.08)",
                            background: isConn ? "rgba(13,21,32,0.28)" : "rgba(13,21,32,0.28)",
                          }}>
                          {[
                            {
                              label: "Feed State",
                              value: isConn && feed.items.length > 0
                                ? `Connected — ${feed.items.length} items staged`
                                : FEED_STATE_LABELS[feedState],
                              active: isConn,
                            },
                            { label: "Intake Type",  value: INTAKE_TYPE_LABELS[cat.intakeType], active: false },
                            { label: "Validation",   value: cat.validationRule, active: false },
                            { label: "Source ID",    value: source?.id ?? "—", active: !!source },
                            { label: "Last Checked", value: lastChecked ? fmtRelative(lastChecked) : "—", active: !!lastChecked },
                            {
                              label: "Latency",
                              value: feed?.health.latencyMs != null ? `${feed.health.latencyMs}ms` : "—",
                              active: false,
                            },
                          ].map((row) => (
                            <div key={row.label} className="flex items-start gap-2">
                              <span className="font-mono-tactical flex-shrink-0 w-28"
                                style={{ color: "rgba(127,142,155,0.45)", fontSize: "13px", letterSpacing: "0.04em" }}>
                                {row.label}
                              </span>
                              <span className="font-mono-tactical"
                                style={{
                                  color: row.active ? "rgba(180,192,202,0.82)" : "rgba(127,142,155,0.48)",
                                  fontSize: "14px",
                                  fontStyle: !row.active && row.value === "—" ? "italic" : "normal",
                                  lineHeight: "1.72",
                                }}>
                                {row.value}
                              </span>
                            </div>
                          ))}
                          {feed?.health.error && feedState !== "unbound" && (
                            <div className="flex items-start gap-2 pt-1"
                              style={{ borderTop: "1px solid rgba(220,80,80,0.1)" }}>
                              <span className="font-mono-tactical flex-shrink-0 w-28"
                                style={{ color: "rgba(220,80,80,0.5)", fontSize: "13px" }}>Error</span>
                              <span className="font-mono-tactical"
                                style={{ color: "rgba(220,80,80,0.62)", fontSize: "13px", lineHeight: "1.72" }}>
                                {feed.health.error.slice(0, 80)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Triage Gate */}
            <div className="rounded"
              style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(13,21,32,0.18)" }}>
              <div className="flex items-center gap-2.5 px-5 py-3"
                style={{ borderBottom: "1px solid rgba(245,158,11,0.07)" }}>
                <div className="w-1 h-1 rounded-full" style={{ background: "rgba(245,158,11,0.45)" }} />
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(245,158,11,0.52)", fontSize: "13px", letterSpacing: "0.18em" }}>
                  Triage Gate — Validation Criteria
                </span>
              </div>
              <div className="px-5 py-4 space-y-2.5">
                <p className="font-mono-tactical mb-3"
                  style={{ color: "rgba(180,192,202,0.62)", fontSize: "15px", lineHeight: "2.02" }}>
                  Signals pass through a triage gate before entering the structured pipeline. The following rules determine whether a signal advances.
                </p>
                {TRIAGE_CRITERIA.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono-tactical flex-shrink-0 w-6 text-right"
                      style={{ color: "rgba(245,158,11,0.32)", fontSize: "12.5px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-3.5 flex-shrink-0" style={{ background: "rgba(245,158,11,0.14)" }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(180,192,202,0.72)", fontSize: "15.5px", lineHeight: "2.02" }}>
                      {rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Intake Log */}
            <div className="rounded" style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(13,21,32,0.18)" }}>
              <div className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(245,158,11,0.07)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: connectedCount > 0 ? "#F59E0B" : "rgba(127,142,155,0.28)",
                      boxShadow: connectedCount > 0 ? "0 0 4px #22c55e" : undefined,
                    }} />
                  <span className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(245,158,11,0.55)", fontSize: "13px", letterSpacing: "0.16em" }}>
                    Live Intake Log
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {totalItems > 0 && (
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(245,158,11,0.52)", fontSize: "13px" }}>
                      {totalItems} items staged
                    </span>
                  )}
                  <span className="font-mono-tactical italic"
                    style={{ color: "rgba(127,142,155,0.3)", fontSize: "13px" }}>
                    public read-only
                  </span>
                </div>
              </div>

              {allItems.length > 0 ? (
                <div>
                  <div className="flex items-center gap-3 px-4 py-2"
                    style={{ borderBottom: "1px solid rgba(245,158,11,0.05)", background: "rgba(13,21,32,0.28)" }}>
                    {["CAT", "SIGNAL TITLE", "SOURCE / AGE", "STATUS"].map((h, i) => (
                      <span key={h} className="font-mono-tactical tracking-widest"
                        style={{
                          color: "rgba(245,158,11,0.38)", fontSize: "11.5px", letterSpacing: "0.14em",
                          flex: i === 1 ? 1 : undefined,
                          width: i === 0 ? 32 : i === 2 ? 160 : i === 3 ? 120 : undefined,
                          flexShrink: i !== 1 ? 0 : undefined,
                        }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  {allItems.slice(0, 15).map((item) => (
                    <SignalItem key={item.id} item={item} categoryId={item.categoryId} />
                  ))}
                  {allItems.length > 15 && (
                    <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(245,158,11,0.05)" }}>
                      <span className="font-mono-tactical italic"
                        style={{ color: "rgba(127,142,155,0.4)", fontSize: "14px" }}>
                        +{allItems.length - 15} additional staged items — visible in the operator layer
                      </span>
                    </div>
                  )}
                  <div className="px-4 py-2.5 flex items-center gap-2"
                    style={{ borderTop: "1px solid rgba(245,158,11,0.05)", background: "rgba(13,21,32,0.18)" }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: "rgba(127,142,155,0.25)" }} />
                    <span className="font-mono-tactical italic"
                      style={{ color: "rgba(127,142,155,0.4)", fontSize: "13px" }}>
                      Staged candidates only. Classification and commit controls exist in the operator layer.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-8 flex flex-col items-center gap-2">
                  <span className="font-orbitron text-xl" style={{ color: "rgba(245,158,11,0.14)" }}>◈</span>
                  <div className="font-mono-tactical" style={{ color: "rgba(127,142,155,0.5)", fontSize: "15px" }}>
                    {isLoading ? "Connecting to sources..." : "No live signals received"}
                  </div>
                  <div className="font-mono-tactical italic" style={{ color: "rgba(127,142,155,0.3)", fontSize: "14px" }}>
                    {isLoading
                      ? "Fetching intake sources — first poll in progress"
                      : "Intake layer ready — awaiting source binding"}
                  </div>
                </div>
              )}
            </div>

            {/* Cross-link to Datasets */}
            <div className="rounded px-5 py-4 flex items-center justify-between"
              style={{ border: "1px solid rgba(245,158,11,0.09)", background: "rgba(13,21,32,0.18)" }}>
              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-1"
                  style={{ color: "rgba(245,158,11,0.42)", fontSize: "12.5px", letterSpacing: "0.14em" }}>
                  Next Layer
                </div>
                <p className="font-mono-tactical"
                  style={{ color: "rgba(180,192,202,0.62)", fontSize: "15.5px" }}>
                  Classified signals become domain records in the DATASETS layer.
                </p>
              </div>
              <button onClick={() => setLocation("/datasets")}
                className="font-mono-tactical tracking-widest flex-shrink-0 ml-6 rounded px-3 py-2"
                style={{
                  color: "rgba(245,158,11,0.58)", fontSize: "12.5px", letterSpacing: "0.1em",
                  border: "1px solid rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.05)", cursor: "pointer",
                }}>
                DATASETS →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-56 xl:w-64 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(245,158,11,0.07)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(245,158,11,0.5)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Intake Status
              </div>
              <div className="space-y-2.5">
                {SIGNAL_CATEGORIES.map((cat) => {
                  const feed = feedMap[cat.id as SignalCategoryId];
                  const state = feed?.state ?? "unbound";
                  const isConn = state === "connected";
                  return (
                    <div key={cat.id} className="rounded px-3 py-2.5"
                      style={{
                        border: isConn ? "1px solid rgba(245,158,11,0.14)" : "1px solid rgba(127,142,155,0.08)",
                        background: isConn ? "rgba(13,21,32,0.28)" : "rgba(13,21,32,0.18)",
                      }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono-tactical"
                          style={{ fontSize: "11.5px", color: "rgba(127,142,155,0.45)", letterSpacing: "0.1em" }}>
                          {cat.id} — {cat.label.toUpperCase()}
                        </span>
                        <div className="w-1 h-1 rounded-full"
                          style={{
                            background: FEED_STATE_COLORS[state],
                            boxShadow: isConn ? `0 0 3px ${FEED_STATE_COLORS[state]}` : undefined,
                          }} />
                      </div>
                      <span className="font-mono-tactical"
                        style={{ color: FEED_STATE_COLORS[state], fontSize: "15px" }}>
                        {isConn
                          ? `${feed.items.length} items staged`
                          : FEED_STATE_LABELS[state]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(245,158,11,0.06)" }} />

            {/* State legend */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                style={{ color: "rgba(245,158,11,0.48)", fontSize: "13px", letterSpacing: "0.14em" }}>
                Feed State Key
              </div>
              <div className="space-y-2">
                {(Object.entries(FEED_STATE_LABELS) as [FeedState, string][]).map(([state, label]) => (
                  <div key={state} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: FEED_STATE_COLORS[state] }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(180,192,202,0.65)", fontSize: "15px" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(245,158,11,0.06)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(180,192,202,0.58)", fontSize: "15px", lineHeight: "2.02" }}>
              Signal feeds are bound per category. Each category operates independently.
              Same-origin proxy routing is active — no external API key required.
            </p>

            <div className="h-px" style={{ background: "rgba(245,158,11,0.06)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(245,158,11,0.42)", fontSize: "12.5px", letterSpacing: "0.14em" }}>
                Related Layers
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "DATASETS", path: "/datasets", note: "Domain collections" },
                  { label: "METHOD",   path: "/method",   note: "Collection logic" },
                  { label: "ACCESS",   path: "/access",   note: "Tier structure" },
                ].map((link) => (
                  <button key={link.path}
                    onClick={() => setLocation(link.path)}
                    className="w-full flex items-center justify-between py-1.5"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <span className="font-orbitron font-semibold tracking-wider"
                      style={{ color: "rgba(245,158,11,0.55)", fontSize: "12.5px" }}>
                      {link.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(127,142,155,0.38)", fontSize: "12.5px" }}>
                      {link.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
