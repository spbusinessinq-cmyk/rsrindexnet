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
      style={{ borderBottom: "1px solid rgba(34,197,94,0.05)" }}>
      <div className="flex-shrink-0 mt-0.5">
        <span className="font-mono-tactical rounded px-1.5 py-0.5"
          style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.65)", fontSize: "7.5px", letterSpacing: "0.1em", background: "rgba(34,197,94,0.04)" }}>
          {categoryId}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono-tactical leading-snug"
          style={{ color: "rgba(185,205,200,0.78)", fontSize: "10px", lineHeight: "1.5" }}>
          {item.title.length > 120 ? item.title.slice(0, 120) + "…" : item.title}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="font-mono-tactical truncate"
              style={{ color: "rgba(34,197,94,0.4)", fontSize: "8.5px", textDecoration: "none", maxWidth: 200 }}>
              {new URL(item.url).hostname}
            </a>
          )}
          {item.date && (
            <span className="font-mono-tactical flex-shrink-0"
              style={{ color: "rgba(155,175,170,0.38)", fontSize: "8px" }}>
              {fmtRelative(item.date)}
            </span>
          )}
          <span className="font-mono-tactical flex-shrink-0 italic"
            style={{ color: "rgba(155,175,170,0.38)", fontSize: "8.5px" }}>
            staged — awaiting classification
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SignalsPage() {
  const [, setLocation] = useLocation();

  const f0 = useFeed0(); // OPN
  const f1 = useFeed1(); // STR
  const f2 = useFeed2(); // FLG
  const f3 = useFeed3(); // MAN

  const feedMap: Record<SignalCategoryId, typeof f0> = {
    OPN: f0,
    STR: f1,
    FLG: f2,
    MAN: f3,
  };

  const feeds = [f0, f1, f2, f3];
  const connectedCount = feeds.filter((f) => f.state === "connected").length;
  const totalItems = feeds.reduce((n, f) => n + f.items.length, 0);

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
            ? `${connectedCount} SOURCE${connectedCount > 1 ? "S" : ""} CONNECTED`
            : "SOURCES CONNECTING"}
          badgeActive={connectedCount > 0}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 p-6 md:p-7 space-y-4 overflow-y-auto">
            {/* Category cards */}
            {SIGNAL_CATEGORIES.map((cat) => {
              const feed      = feedMap[cat.id as SignalCategoryId];
              const feedState = feed?.state ?? "unbound";
              const source    = SOURCE_DEFINITIONS.find((s) => s.categoryId === cat.id);
              const lastChecked = feed?.health.lastChecked;
              const isConn    = feedState === "connected";

              return (
                <div key={cat.id} className="rounded idx-card"
                  style={{
                    border: isConn ? "1px solid rgba(34,197,94,0.18)" : "1px solid rgba(34,197,94,0.09)",
                    background: isConn ? "rgba(6,14,9,0.45)" : "rgba(0,0,0,0.18)",
                  }}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5"
                    style={{ borderBottom: `1px solid ${isConn ? "rgba(34,197,94,0.11)" : "rgba(34,197,94,0.07)"}` }}>
                    <div className="flex items-center gap-3">
                      <div className="font-mono-tactical px-2 py-1 rounded flex-shrink-0"
                        style={{
                          border: `1px solid ${isConn ? "rgba(34,197,94,0.38)" : "rgba(34,197,94,0.22)"}`,
                          color: isConn ? "rgba(34,197,94,0.9)" : "rgba(34,197,94,0.72)",
                          fontSize: "9px", letterSpacing: "0.1em",
                          background: isConn ? "rgba(34,197,94,0.07)" : "rgba(34,197,94,0.04)",
                        }}>
                        {cat.id}
                      </div>
                      <div>
                        <div className="font-orbitron text-sm font-bold tracking-wider"
                          style={{ color: isConn ? "#22c55e" : "rgba(200,220,215,0.75)" }}>
                          {cat.label}
                        </div>
                        <div className="font-mono-tactical mt-0.5"
                          style={{ color: "rgba(155,175,170,0.55)", fontSize: "9px" }}>
                          {INTAKE_TYPE_LABELS[cat.intakeType]}
                        </div>
                      </div>
                    </div>

                    {/* Feed state */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: FEED_STATE_COLORS[feedState],
                            boxShadow: isConn ? `0 0 4px ${FEED_STATE_COLORS[feedState]}` : undefined,
                          }} />
                        <span className="font-mono-tactical"
                          style={{ color: FEED_STATE_COLORS[feedState], fontSize: "9px", letterSpacing: "0.08em" }}>
                          {isConn && feed.items.length > 0
                            ? `${FEED_STATE_LABELS[feedState]} — ${feed.items.length} items staged`
                            : FEED_STATE_LABELS[feedState]}
                        </span>
                      </div>
                      {lastChecked && (
                        <span className="font-mono-tactical"
                          style={{ color: "rgba(155,175,170,0.38)", fontSize: "8.5px" }}>
                          Checked {fmtRelative(lastChecked)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x"
                    style={{ borderColor: isConn ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.06)" }}>
                    {/* Left: description + intake logic */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="font-mono-tactical leading-relaxed"
                        style={{ color: "rgba(185,205,200,0.72)", lineHeight: "1.9", fontSize: "10.5px" }}>
                        {cat.description}
                      </p>
                      <div className="flex items-start gap-2.5 pt-1"
                        style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
                        <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: "rgba(34,197,94,0.42)" }} />
                        <span className="font-mono-tactical italic"
                          style={{ color: "rgba(34,197,94,0.55)", fontSize: "10px", lineHeight: "1.7" }}>
                          {cat.intakeLogic}
                        </span>
                      </div>
                    </div>

                    {/* Right: source binding */}
                    <div className="px-5 py-4 space-y-3">
                      <div className="font-mono-tactical tracking-widest uppercase"
                        style={{ color: "rgba(34,197,94,0.48)", fontSize: "8.5px", letterSpacing: "0.16em" }}>
                        Source Binding
                      </div>
                      <div className="rounded px-3.5 py-3 space-y-2.5"
                        style={{ border: "1px solid rgba(155,175,170,0.1)", background: "rgba(0,0,0,0.25)" }}>
                        {[
                          {
                            label: "Feed State",
                            value: isConn && feed.items.length > 0
                              ? `Connected — ${feed.items.length} items staged`
                              : FEED_STATE_LABELS[feedState],
                            dim: !isConn,
                          },
                          { label: "Intake Type",  value: INTAKE_TYPE_LABELS[cat.intakeType], dim: false },
                          { label: "Validation",   value: cat.validationRule, dim: false },
                          { label: "Source ID",    value: source?.id ?? "—", dim: !source },
                          { label: "Last Checked", value: lastChecked ? fmtRelative(lastChecked) : "—", dim: !lastChecked },
                          {
                            label: "Latency",
                            value: feed?.health.latencyMs != null ? `${feed.health.latencyMs}ms` : "—",
                            dim: true,
                          },
                        ].map((row) => (
                          <div key={row.label} className="flex items-start gap-2">
                            <span className="font-mono-tactical flex-shrink-0 w-28"
                              style={{ color: "rgba(155,175,170,0.48)", fontSize: "9px", letterSpacing: "0.05em" }}>
                              {row.label}
                            </span>
                            <span className="font-mono-tactical"
                              style={{
                                color: row.dim ? "rgba(155,175,170,0.48)" : "rgba(185,205,200,0.78)",
                                fontSize: "9.5px",
                                fontStyle: row.dim ? "italic" : "normal",
                                lineHeight: "1.5",
                              }}>
                              {row.value}
                            </span>
                          </div>
                        ))}
                        {feed?.health.error && feedState !== "unbound" && (
                          <div className="flex items-start gap-2 pt-1"
                            style={{ borderTop: "1px solid rgba(220,80,80,0.1)" }}>
                            <span className="font-mono-tactical flex-shrink-0 w-28"
                              style={{ color: "rgba(220,80,80,0.5)", fontSize: "9px" }}>Error</span>
                            <span className="font-mono-tactical"
                              style={{ color: "rgba(220,80,80,0.65)", fontSize: "9px", lineHeight: "1.5" }}>
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

            {/* Triage criteria */}
            <div className="rounded p-5"
              style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.15)" }}>
              <div className="font-mono-tactical tracking-widest uppercase mb-3.5"
                style={{ color: "rgba(34,197,94,0.5)", fontSize: "9.5px", letterSpacing: "0.18em" }}>
                Triage Criteria
              </div>
              <div className="space-y-2">
                {TRIAGE_CRITERIA.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono-tactical flex-shrink-0 w-6 text-right"
                      style={{ color: "rgba(34,197,94,0.35)", fontSize: "8.5px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-3.5 flex-shrink-0" style={{ background: "rgba(34,197,94,0.15)" }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(185,205,200,0.72)", fontSize: "10.5px", lineHeight: "1.7" }}>
                      {rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Intake Log */}
            <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.15)" }}>
              <div className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: connectedCount > 0 ? "#22c55e" : "rgba(155,175,170,0.28)",
                      boxShadow: connectedCount > 0 ? "0 0 4px #22c55e" : undefined,
                    }} />
                  <span className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(34,197,94,0.52)", fontSize: "9px", letterSpacing: "0.16em" }}>
                    Live Intake Log
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {totalItems > 0 && (
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px" }}>
                      {totalItems} items staged
                    </span>
                  )}
                  <span className="font-mono-tactical italic"
                    style={{ color: "rgba(155,175,170,0.32)", fontSize: "9px" }}>
                    public read-only
                  </span>
                </div>
              </div>

              {allItems.length > 0 ? (
                <div>
                  <div className="flex items-center gap-3 px-4 py-2"
                    style={{ borderBottom: "1px solid rgba(34,197,94,0.05)", background: "rgba(0,0,0,0.2)" }}>
                    {["CAT", "SIGNAL TITLE", "SOURCE / AGE", "STATUS"].map((h, i) => (
                      <span key={h} className="font-mono-tactical tracking-widest"
                        style={{
                          color: "rgba(34,197,94,0.38)", fontSize: "8px", letterSpacing: "0.14em",
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
                    <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(34,197,94,0.05)" }}>
                      <span className="font-mono-tactical italic"
                        style={{ color: "rgba(155,175,170,0.4)", fontSize: "9.5px" }}>
                        +{allItems.length - 15} additional staged items — visible in the operator layer
                      </span>
                    </div>
                  )}
                  <div className="px-4 py-2.5 flex items-center gap-2"
                    style={{ borderTop: "1px solid rgba(34,197,94,0.05)", background: "rgba(0,0,0,0.15)" }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: "rgba(155,175,170,0.28)" }} />
                    <span className="font-mono-tactical italic"
                      style={{ color: "rgba(155,175,170,0.42)", fontSize: "9px" }}>
                      Items shown are staged candidates. None have been classified or committed to the index.
                      Classification controls exist in the operator layer.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-8 flex flex-col items-center gap-2">
                  <span className="font-orbitron text-xl" style={{ color: "rgba(34,197,94,0.15)" }}>◈</span>
                  <div className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.5)", fontSize: "10px" }}>
                    {feeds.some((f) => f.state === "loading") ? "Connecting to sources..." : "No live signals received"}
                  </div>
                  <div className="font-mono-tactical italic" style={{ color: "rgba(155,175,170,0.32)", fontSize: "9.5px" }}>
                    {feeds.some((f) => f.state === "loading")
                      ? "Fetching intake sources — first poll in progress"
                      : "Intake layer ready — awaiting source binding"}
                  </div>
                </div>
              )}
            </div>

            {/* Cross-link to Datasets */}
            <div className="rounded px-5 py-4 flex items-center justify-between"
              style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.12)" }}>
              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-1"
                  style={{ color: "rgba(34,197,94,0.42)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
                  Next Layer
                </div>
                <p className="font-mono-tactical"
                  style={{ color: "rgba(185,205,200,0.62)", fontSize: "10.5px" }}>
                  Classified signals become domain records in the DATASETS layer.
                </p>
              </div>
              <button
                onClick={() => setLocation("/datasets")}
                className="font-mono-tactical tracking-widest flex-shrink-0 ml-6 rounded px-3 py-2"
                style={{
                  color: "rgba(34,197,94,0.55)",
                  fontSize: "8.5px",
                  letterSpacing: "0.1em",
                  border: "1px solid rgba(34,197,94,0.18)",
                  background: "rgba(34,197,94,0.04)",
                  cursor: "pointer",
                }}>
                DATASETS →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-56 xl:w-64 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Intake Status
              </div>
              <div className="space-y-3">
                {SIGNAL_CATEGORIES.map((cat) => {
                  const feed = feedMap[cat.id as SignalCategoryId];
                  const state = feed?.state ?? "unbound";
                  const isConn = state === "connected";
                  return (
                    <div key={cat.id} className="flex flex-col gap-0.5">
                      <span className="font-mono-tactical"
                        style={{ fontSize: "8.5px", color: "rgba(155,175,170,0.5)", letterSpacing: "0.1em" }}>
                        {cat.label.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full"
                          style={{
                            background: FEED_STATE_COLORS[state],
                            boxShadow: isConn ? `0 0 3px ${FEED_STATE_COLORS[state]}` : undefined,
                          }} />
                        <span className="font-mono-tactical"
                          style={{ color: FEED_STATE_COLORS[state], fontSize: "10.5px" }}>
                          {isConn
                            ? `${FEED_STATE_LABELS[state]} — ${feed.items.length} staged`
                            : FEED_STATE_LABELS[state]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            {/* State legend */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                style={{ color: "rgba(34,197,94,0.48)", fontSize: "9px", letterSpacing: "0.14em" }}>
                Feed State Key
              </div>
              <div className="space-y-2">
                {(Object.entries(FEED_STATE_LABELS) as [FeedState, string][]).map(([state, label]) => (
                  <div key={state} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: FEED_STATE_COLORS[state] }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(185,205,200,0.65)", fontSize: "10px" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.58)", fontSize: "10px", lineHeight: "1.85" }}>
              Signal feeds are bound per category. Each category operates independently.
              Same-origin proxy routing is active — no external API key required.
            </p>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            {/* Cross-link */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(34,197,94,0.42)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
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
                      style={{ color: "rgba(34,197,94,0.55)", fontSize: "8.5px" }}>
                      {link.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(155,175,170,0.38)", fontSize: "8.5px" }}>
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
