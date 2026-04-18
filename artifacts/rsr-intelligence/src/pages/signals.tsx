import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { SIGNAL_CATEGORIES, TRIAGE_CRITERIA } from "@/data/config";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { SOURCE_DEFINITIONS } from "@/lib/feeds/sources";
import type { FeedState, SignalCategoryId } from "@/lib/feeds/types";

const FILTERS = ["ALL", "ACTIVE", "STAGED", "DISMISSED"];

const INTAKE_TYPE_LABELS: Record<string, string> = {
  passive:   "Passive / continuous",
  active:    "Active / triggered",
  manual:    "Manual / operator",
  scheduled: "Scheduled / polled",
};

const FEED_STATE_LABELS: Record<FeedState, string> = {
  connected:        "Connected",
  disconnected:     "Disconnected",
  staged:           "Staged",
  error:            "Error",
  unbound:          "No source bound",
  loading:          "Checking...",
  "cors-restricted": "CORS — proxy required",
};

const FEED_STATE_COLORS: Record<FeedState, string> = {
  connected:        "rgba(34,197,94,0.75)",
  disconnected:     "rgba(155,175,170,0.38)",
  staged:           "rgba(34,197,94,0.45)",
  error:            "rgba(220,80,80,0.65)",
  unbound:          "rgba(155,175,170,0.28)",
  loading:          "rgba(34,197,94,0.35)",
  "cors-restricted": "rgba(220,160,50,0.65)",
};

export default function SignalsPage() {
  /* Live feed state — one hook per source (fixed order, no loops) */
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

  const connectedCount = [f0, f1, f2, f3].filter(f => f.state === "connected").length;
  const hasSources = connectedCount > 0;

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / SIGNALS"
          title="SIGNALS"
          subtitle="Signal capture, source triage, and intake classification — monitored input categories and their current binding state"
          badge={hasSources ? `${connectedCount} SOURCE CONNECTED` : "NO FEEDS BOUND"}
          badgeActive={hasSources}
        >
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button key={f} data-testid={`filter-${f.toLowerCase()}`}
                className="font-mono-tactical idx-filter-btn rounded px-2.5 py-1"
                style={{
                  border: f === "ALL" ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(34,197,94,0.1)",
                  color: f === "ALL" ? "#22c55e" : "rgba(155,175,170,0.45)",
                  background: f === "ALL" ? "rgba(34,197,94,0.07)" : "transparent",
                  fontSize: "9.5px",
                  letterSpacing: "0.1em",
                }}>
                {f}
              </button>
            ))}
          </div>
        </PageHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 p-6 md:p-7 space-y-4 overflow-y-auto">
            {/* Category cards */}
            {SIGNAL_CATEGORIES.map((cat) => {
              const feed = feedMap[cat.id as SignalCategoryId];
              const feedState = feed?.state ?? "unbound";
              const source = SOURCE_DEFINITIONS.find(s => s.categoryId === cat.id);
              const lastChecked = feed?.health.lastChecked;

              return (
                <div key={cat.id} className="rounded idx-card"
                  style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.18)" }}>
                  {/* Category header */}
                  <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5"
                    style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
                    <div className="flex items-center gap-3">
                      <div className="font-mono-tactical px-2 py-1 rounded flex-shrink-0"
                        style={{
                          border: "1px solid rgba(34,197,94,0.22)",
                          color: "rgba(34,197,94,0.72)",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          background: "rgba(34,197,94,0.04)",
                        }}>
                        {cat.id}
                      </div>
                      <div>
                        <div className="font-orbitron text-sm font-bold tracking-wider"
                          style={{ color: "#22c55e" }}>
                          {cat.label}
                        </div>
                        <div className="font-mono-tactical mt-0.5"
                          style={{ color: "rgba(155,175,170,0.5)", fontSize: "9px" }}>
                          {INTAKE_TYPE_LABELS[cat.intakeType]}
                        </div>
                      </div>
                    </div>
                    {/* Live feed state */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full"
                          style={{ background: FEED_STATE_COLORS[feedState] }} />
                        <span className="font-mono-tactical"
                          style={{ color: FEED_STATE_COLORS[feedState], fontSize: "9px", letterSpacing: "0.08em" }}>
                          {FEED_STATE_LABELS[feedState]}
                        </span>
                      </div>
                      {lastChecked && (
                        <span className="font-mono-tactical"
                          style={{ color: "rgba(155,175,170,0.3)", fontSize: "8.5px" }}>
                          Checked {lastChecked.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category body — 2 column */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x"
                    style={{ borderColor: "rgba(34,197,94,0.06)" }}>
                    {/* Left: description + intake logic */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="font-mono-tactical leading-relaxed"
                        style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.9", fontSize: "10.5px" }}>
                        {cat.description}
                      </p>
                      <div className="flex items-start gap-2.5 pt-1"
                        style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
                        <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: "rgba(34,197,94,0.4)" }} />
                        <span className="font-mono-tactical italic"
                          style={{ color: "rgba(34,197,94,0.48)", fontSize: "10px", lineHeight: "1.7" }}>
                          {cat.intakeLogic}
                        </span>
                      </div>
                    </div>

                    {/* Right: source binding — now from live feed state */}
                    <div className="px-5 py-4 space-y-3">
                      <div className="font-mono-tactical tracking-widest uppercase"
                        style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.16em" }}>
                        Source Binding
                      </div>
                      <div className="rounded px-3.5 py-3 space-y-2.5"
                        style={{
                          border: "1px solid rgba(155,175,170,0.1)",
                          background: "rgba(0,0,0,0.25)",
                        }}>
                        {[
                          { label: "Feed State",      value: FEED_STATE_LABELS[feedState],              dim: feedState === "unbound" },
                          { label: "Intake Type",     value: INTAKE_TYPE_LABELS[cat.intakeType],         dim: false },
                          { label: "Validation Rule", value: cat.validationRule,                         dim: false },
                          { label: "Source ID",       value: source?.id ?? "—",                          dim: !source },
                          { label: "Last Checked",    value: lastChecked ? lastChecked.toLocaleTimeString() : "—", dim: !lastChecked },
                          { label: "Intake Count",    value: feed?.items?.length > 0 ? String(feed.items.length) : "0", dim: true },
                        ].map((row) => (
                          <div key={row.label} className="flex items-start gap-2">
                            <span className="font-mono-tactical flex-shrink-0 w-28"
                              style={{ color: "rgba(155,175,170,0.42)", fontSize: "9px", letterSpacing: "0.05em" }}>
                              {row.label}
                            </span>
                            <span className="font-mono-tactical"
                              style={{
                                color: row.dim ? "rgba(155,175,170,0.42)" : "rgba(185,205,200,0.68)",
                                fontSize: "9.5px",
                                fontStyle: row.dim ? "italic" : "normal",
                                lineHeight: "1.5",
                              }}>
                              {row.value}
                            </span>
                          </div>
                        ))}
                        {/* Error state */}
                        {feed?.health.error && feedState !== "unbound" && (
                          <div className="flex items-start gap-2 pt-1" style={{ borderTop: "1px solid rgba(220,80,80,0.1)" }}>
                            <span className="font-mono-tactical flex-shrink-0 w-28"
                              style={{ color: "rgba(220,80,80,0.45)", fontSize: "9px" }}>
                              Error
                            </span>
                            <span className="font-mono-tactical"
                              style={{ color: "rgba(220,80,80,0.6)", fontSize: "9px", lineHeight: "1.5" }}>
                              {feed.health.error}
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
                style={{ color: "rgba(34,197,94,0.48)", fontSize: "9.5px", letterSpacing: "0.18em" }}>
                Triage Criteria
              </div>
              <div className="space-y-2">
                {TRIAGE_CRITERIA.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono-tactical flex-shrink-0 w-6 text-right"
                      style={{ color: "rgba(34,197,94,0.3)", fontSize: "8.5px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-3.5 flex-shrink-0"
                      style={{ background: "rgba(34,197,94,0.15)" }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(185,205,200,0.62)", fontSize: "10.5px", lineHeight: "1.7" }}>
                      {rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live feed shell */}
            <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.07)", background: "rgba(0,0,0,0.12)" }}>
              <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.16em" }}>
                  Live Signal Feed
                </span>
              </div>
              <EmptyState
                icon="◈"
                title="No live signals"
                subtitle="Intake layer ready — awaiting source binding. Signal log will populate on first intake."
                statusLine="Feed state: unbound across all categories"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-56 xl:w-64 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.48)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Intake Status
              </div>
              <div className="space-y-3">
                {SIGNAL_CATEGORIES.map((cat) => {
                  const feed = feedMap[cat.id as SignalCategoryId];
                  return (
                    <div key={cat.id} className="flex flex-col gap-0.5">
                      <span className="font-mono-tactical"
                        style={{ fontSize: "8.5px", color: "rgba(155,175,170,0.42)", letterSpacing: "0.1em" }}>
                        {cat.label.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full"
                          style={{ background: FEED_STATE_COLORS[feed?.state ?? "unbound"] }} />
                        <span className="font-mono-tactical"
                          style={{ color: FEED_STATE_COLORS[feed?.state ?? "unbound"], fontSize: "10.5px" }}>
                          {FEED_STATE_LABELS[feed?.state ?? "unbound"]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.14em" }}>
                Feed States
              </div>
              <div className="space-y-2">
                {(Object.entries(FEED_STATE_LABELS) as [FeedState, string][]).map(([state, label]) => (
                  <div key={state} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: FEED_STATE_COLORS[state] }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(185,205,200,0.52)", fontSize: "10px" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.45)", fontSize: "10px", lineHeight: "1.85" }}>
              Signal feeds are bound per source category. Each category operates independently.
              Set <span style={{ color: "rgba(34,197,94,0.45)", fontStyle: "normal" }}>VITE_SOURCE_BASE_URL</span> to activate.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
