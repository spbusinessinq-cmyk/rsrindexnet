import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { SOURCE_DEFINITIONS } from "@/lib/feeds/sources";
import { DATASET_DOMAINS } from "@/data/config";
import { ENV } from "@/lib/env";
import { derivePlatformState, deriveAllDomainBindings, FEED_STATE_COLORS, FEED_STATE_LABELS, fmtRelative, fmtTime } from "@/lib/runtime";
import type { FeedState, FeedItem, DomainId } from "@/lib/feeds/types";

/* ── Feed state display ──────────────────────────────────────── */
const STATE_COLOR: Record<FeedState, string> = {
  connected:         "#22c55e",
  disconnected:      "rgba(155,175,170,0.4)",
  staged:            "rgba(34,197,94,0.55)",
  error:             "rgba(220,80,80,0.65)",
  loading:           "rgba(34,197,94,0.38)",
  unbound:           "rgba(155,175,170,0.28)",
  "cors-restricted": "rgba(220,160,50,0.7)",
};

const STATE_LABEL: Record<FeedState, string> = {
  connected:         "Connected",
  disconnected:      "Disconnected",
  staged:            "Staged",
  error:             "Error",
  loading:           "Checking...",
  unbound:           "No source bound",
  "cors-restricted": "CORS — proxy required",
};

const INTERNAL_TOOLS = [
  { label: "Grafana",    desc: "Monitoring & dashboards", url: ENV.GRAFANA_URL,   icon: "◎" },
  { label: "Flowise",    desc: "AI pipeline studio",      url: ENV.FLOWISE_URL,   icon: "◈" },
  { label: "Open WebUI", desc: "Inference environment",   url: ENV.WEBUI_URL,     icon: "⊡" },
  { label: "Portainer",  desc: "Container management",    url: ENV.PORTAINER_URL, icon: "⊞" },
];

function FeedRow({ label, state, error, latencyMs, lastChecked, itemCount }: {
  label: string; state: FeedState; error: string | null;
  latencyMs: number | null; lastChecked: Date | null; itemCount: number;
}) {
  return (
    <div className="flex items-center gap-4 py-3 px-4"
      style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: STATE_COLOR[state], boxShadow: state === "connected" ? `0 0 4px ${STATE_COLOR[state]}` : undefined }} />
      <div className="font-mono-tactical flex-1 min-w-0" style={{ fontSize: "10px", color: "rgba(185,205,200,0.72)" }}>
        {label}
      </div>
      <div className="font-mono-tactical flex-shrink-0" style={{ fontSize: "9.5px", color: STATE_COLOR[state], width: 200 }}>
        {STATE_LABEL[state]}
        {error && state !== "unbound" && (
          <span style={{ color: "rgba(220,80,80,0.55)", fontSize: "8.5px", display: "block", marginTop: 2 }}>
            {error.slice(0, 60)}
          </span>
        )}
      </div>
      <div className="font-mono-tactical flex-shrink-0 text-right" style={{ fontSize: "9px", color: "rgba(155,175,170,0.42)", width: 64 }}>
        {itemCount > 0 ? `${itemCount} items` : "—"}
      </div>
      <div className="font-mono-tactical flex-shrink-0 text-right" style={{ fontSize: "9px", color: "rgba(155,175,170,0.38)", width: 64 }}>
        {latencyMs != null ? `${latencyMs}ms` : "—"}
      </div>
      <div className="font-mono-tactical flex-shrink-0 text-right hidden xl:block" style={{ fontSize: "9px", color: "rgba(155,175,170,0.3)", width: 110 }}>
        {lastChecked ? fmtTime(lastChecked) : "—"}
      </div>
    </div>
  );
}

function StagedItem({ item, idx }: { item: FeedItem; idx: number }) {
  return (
    <div className="flex items-start gap-3 py-2.5 px-4"
      style={{ borderBottom: "1px solid rgba(34,197,94,0.05)" }}>
      <span className="font-mono-tactical flex-shrink-0 mt-0.5"
        style={{ color: "rgba(34,197,94,0.28)", fontSize: "8.5px", width: 24 }}>
        {String(idx + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="font-mono-tactical leading-snug"
          style={{ color: "rgba(185,205,200,0.8)", fontSize: "10px" }}>
          {item.title.length > 100 ? item.title.slice(0, 100) + "…" : item.title}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-tactical rounded px-1.5 py-0.5"
            style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.55)", fontSize: "7.5px", background: "rgba(34,197,94,0.04)" }}>
            {item.categoryId}
          </span>
          {item.date && (
            <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.32)", fontSize: "8.5px" }}>
              {fmtRelative(item.date)}
            </span>
          )}
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="font-mono-tactical truncate"
              style={{ color: "rgba(34,197,94,0.3)", fontSize: "8.5px", textDecoration: "none", maxWidth: 180 }}>
              {new URL(item.url).hostname}
            </a>
          )}
        </div>
      </div>
      <div className="font-mono-tactical flex-shrink-0 italic"
        style={{ color: "rgba(155,175,170,0.28)", fontSize: "8.5px", width: 80, textAlign: "right" }}>
        staged
      </div>
    </div>
  );
}

function PipelineEvent({ text, ts, type }: { text: string; ts: string; type: "info" | "success" | "warn" }) {
  const colors = { info: "rgba(155,175,170,0.5)", success: "#22c55e", warn: "rgba(220,160,50,0.65)" };
  const dots   = { info: "rgba(155,175,170,0.3)", success: "rgba(34,197,94,0.65)", warn: "rgba(220,160,50,0.6)" };
  return (
    <div className="flex items-start gap-3 py-2 px-4"
      style={{ borderBottom: "1px solid rgba(34,197,94,0.04)" }}>
      <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
        style={{ background: dots[type] }} />
      <span className="font-mono-tactical flex-1" style={{ color: colors[type], fontSize: "9.5px", lineHeight: "1.5" }}>
        {text}
      </span>
      <span className="font-mono-tactical flex-shrink-0" style={{ color: "rgba(155,175,170,0.25)", fontSize: "8.5px" }}>
        {ts}
      </span>
    </div>
  );
}

export default function OperatorPage() {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();
  const feeds = [f0, f1, f2, f3];

  const platform  = derivePlatformState(feeds);
  const bindings  = deriveAllDomainBindings(feeds);

  /* Staged candidates — all items from all connected sources */
  const stagedItems: FeedItem[] = feeds
    .flatMap((f) => f.items)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.getTime() - a.date.getTime();
    });

  /* Build pipeline events from live feed health */
  const pipelineEvents: Array<{ text: string; ts: string; type: "info" | "success" | "warn" }> = [];
  feeds.forEach((f, i) => {
    const src = SOURCE_DEFINITIONS[i];
    if (f.state === "connected" && f.health.lastSuccess) {
      pipelineEvents.push({
        text: `${src.label} connected — ${f.health.itemCount} items received, staged for classification`,
        ts: fmtTime(f.health.lastSuccess),
        type: "success",
      });
    } else if (f.state === "error" || f.state === "cors-restricted") {
      pipelineEvents.push({
        text: `${src.label} error — ${f.health.error ?? "fetch failed"}`,
        ts: f.health.lastChecked ? fmtTime(f.health.lastChecked) : "—",
        type: "warn",
      });
    } else if (f.state === "loading") {
      pipelineEvents.push({
        text: `${src.label} — connecting, initial fetch in progress`,
        ts: "now",
        type: "info",
      });
    }
  });

  if (platform.committedRecords === 0) {
    pipelineEvents.push({
      text: "No records committed — commit pipeline ready, awaiting classification and commit decisions",
      ts: "—",
      type: "info",
    });
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full bg-background grid-overlay flex flex-col">
      {/* ── Operator top bar ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,8,4,0.6)" }}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full status-pulse"
            style={{ background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
          <span className="font-orbitron font-bold tracking-widest"
            style={{ color: "rgba(127,174,158,0.72)", fontSize: "11px", letterSpacing: "0.2em" }}>
            PACIFIC SYSTEMS
          </span>
          <div className="h-3.5 w-px" style={{ background: "rgba(34,197,94,0.2)" }} />
          <span className="font-mono-tactical tracking-widest uppercase"
            style={{ color: "rgba(34,197,94,0.52)", fontSize: "9px", letterSpacing: "0.18em" }}>
            Operator Console
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded"
          style={{ border: "1px solid rgba(220,80,80,0.2)", background: "rgba(40,8,8,0.5)" }}>
          <div className="w-1 h-1 rounded-full" style={{ background: "rgba(220,80,80,0.55)" }} />
          <span className="font-mono-tactical tracking-widest"
            style={{ color: "rgba(220,80,80,0.55)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
            RESTRICTED — OPERATOR LAYER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/")}
            className="font-mono-tactical tracking-widest"
            style={{ color: "rgba(155,175,170,0.38)", fontSize: "9px", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}>
            ← PUBLIC LAYER
          </button>
          <button onClick={handleLogout}
            className="font-mono-tactical rounded px-3 py-1.5 tracking-widest"
            style={{ border: "1px solid rgba(155,175,170,0.15)", color: "rgba(155,175,170,0.45)", background: "transparent", fontSize: "9px", letterSpacing: "0.12em", cursor: "pointer" }}>
            LOGOUT
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* ── System overview ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "ACTIVE SOURCES",
              value: platform.sourcesConnected > 0
                ? `${platform.sourcesConnected} / ${platform.sourcesTotal}`
                : feeds.some((f) => f.state === "loading") ? "Connecting..." : "0 / " + platform.sourcesTotal },
            { label: "STAGED SIGNALS",
              value: platform.totalLiveItems > 0 ? String(platform.totalLiveItems) : "—" },
            { label: "DOMAINS BOUND",
              value: platform.domainsBound > 0
                ? `${platform.domainsBound} / ${platform.domainsTotal}`
                : `0 / ${platform.domainsTotal}` },
            { label: "COMMITTED RECORDS",
              value: "0" },
          ].map((item) => (
            <div key={item.label} className="rounded px-4 py-3.5"
              style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.3)" }}>
              <div className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(155,175,170,0.42)", fontSize: "8.5px", letterSpacing: "0.12em", marginBottom: 4 }}>
                {item.label}
              </div>
              <div className="font-orbitron font-bold"
                style={{ color: "rgba(185,205,200,0.78)", fontSize: "18px" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Source health monitor ─────────────────────────────────── */}
        <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full"
                style={{ background: platform.sourcesConnected > 0 ? "#22c55e" : "rgba(155,175,170,0.3)" }} />
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.68)", fontSize: "10px" }}>
                Source Health Monitor
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.38)", fontSize: "9px" }}>
                {SOURCE_DEFINITIONS.length} sources defined
              </span>
              <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.32)", fontSize: "9px" }}>
                {ENV.SOURCE_BASE
                  ? `base: ${ENV.SOURCE_BASE}`
                  : "Using same-origin proxy routing"}
              </span>
            </div>
          </div>
          {/* Column headers */}
          <div className="flex items-center gap-4 px-4 py-2"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.05)", background: "rgba(0,0,0,0.2)" }}>
            {[
              { label: "SOURCE",      w: "flex-1"                    },
              { label: "STATE",       w: "w-52"                      },
              { label: "ITEMS",       w: "w-16 text-right"           },
              { label: "LATENCY",     w: "w-16 text-right"           },
              { label: "LAST CHECK",  w: "w-28 text-right hidden xl:block" },
            ].map((c) => (
              <div key={c.label} className={`font-mono-tactical tracking-widest ${c.w}`}
                style={{ color: "rgba(34,197,94,0.38)", fontSize: "8px", letterSpacing: "0.14em" }}>
                {c.label}
              </div>
            ))}
          </div>
          {SOURCE_DEFINITIONS.map((src, i) => (
            <FeedRow
              key={src.id}
              label={src.label}
              state={feeds[i].state}
              error={feeds[i].health.error}
              latencyMs={feeds[i].health.latencyMs}
              lastChecked={feeds[i].health.lastChecked}
              itemCount={feeds[i].health.itemCount}
            />
          ))}
          {platform.lastSync && (
            <div className="px-4 py-2.5" style={{ borderTop: "1px solid rgba(34,197,94,0.05)" }}>
              <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.35)", fontSize: "9px" }}>
                Last successful sync: {fmtTime(platform.lastSync)} ({fmtRelative(platform.lastSync)})
              </span>
            </div>
          )}
        </div>

        {/* ── Staged signal candidates ─────────────────────────────── */}
        <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full"
                style={{ background: stagedItems.length > 0 ? "rgba(34,197,94,0.65)" : "rgba(155,175,170,0.3)" }} />
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.65)", fontSize: "10px" }}>
                Staged Signal Candidates
              </span>
            </div>
            <div className="flex items-center gap-3">
              {stagedItems.length > 0 && (
                <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px" }}>
                  {stagedItems.length} received — none classified
                </span>
              )}
              <span className="font-mono-tactical rounded px-2 py-1 italic"
                style={{ border: "1px solid rgba(155,175,170,0.1)", color: "rgba(155,175,170,0.3)", fontSize: "8.5px", background: "rgba(0,0,0,0.3)" }}>
                classification + commit controls — not yet implemented
              </span>
            </div>
          </div>

          {stagedItems.length > 0 ? (
            <div>
              <div className="flex items-center gap-3 px-4 py-2"
                style={{ borderBottom: "1px solid rgba(34,197,94,0.05)", background: "rgba(0,0,0,0.2)" }}>
                {["#", "TITLE", "CAT / AGE / SOURCE", "STATE"].map((h, i) => (
                  <span key={h} className="font-mono-tactical tracking-widest"
                    style={{
                      color: "rgba(34,197,94,0.35)", fontSize: "8px", letterSpacing: "0.14em",
                      flex: i === 1 ? 1 : undefined,
                      width: i === 0 ? 24 : i === 3 ? 80 : undefined,
                      flexShrink: i !== 1 ? 0 : undefined,
                    }}>
                    {h}
                  </span>
                ))}
              </div>
              {stagedItems.slice(0, 20).map((item, i) => (
                <StagedItem key={item.id} item={item} idx={i} />
              ))}
              {stagedItems.length > 20 && (
                <div className="px-4 py-2.5" style={{ borderTop: "1px solid rgba(34,197,94,0.05)" }}>
                  <span className="font-mono-tactical italic"
                    style={{ color: "rgba(155,175,170,0.35)", fontSize: "9.5px" }}>
                    +{stagedItems.length - 20} additional staged items
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-5 flex items-center justify-center">
              <p className="font-mono-tactical italic"
                style={{ color: "rgba(155,175,170,0.38)", fontSize: "10px" }}>
                {feeds.some((f) => f.state === "loading")
                  ? "Fetching staged candidates — initial poll in progress..."
                  : "No staged items — sources unbound or empty"}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* ── Dataset binding ─────────────────────────────────────── */}
          <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.65)", fontSize: "10px" }}>
                Dataset Binding Status
              </span>
            </div>
            {DATASET_DOMAINS.map((domain) => {
              const binding = bindings.get(domain.id as DomainId);
              const state   = binding?.state ?? "unbound";
              return (
                <div key={domain.id} className="flex items-center gap-3 px-4 py-2.5"
                  style={{ borderBottom: "1px solid rgba(34,197,94,0.05)" }}>
                  <div className="font-mono-tactical flex-shrink-0"
                    style={{ border: "1px solid rgba(34,197,94,0.18)", color: "rgba(34,197,94,0.62)", fontSize: "8.5px", padding: "1px 6px", borderRadius: 3 }}>
                    {domain.id}
                  </div>
                  <div className="flex-1 font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.65)", fontSize: "10px" }}>
                    {domain.label}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full"
                      style={{ background: FEED_STATE_COLORS[state] }} />
                    <span className="font-mono-tactical"
                      style={{ color: FEED_STATE_COLORS[state], fontSize: "9px" }}>
                      {state === "connected"
                        ? `Connected — ${binding?.stagedCount ?? 0} staged`
                        : state === "loading" ? "Connecting..." : "No source bound"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Internal tools ───────────────────────────────────────── */}
          <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.65)", fontSize: "10px" }}>
                Internal Tools — RSR Operator Environment
              </span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {INTERNAL_TOOLS.map((tool) => (
                <a
                  key={tool.label}
                  href={tool.url || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-3.5 flex flex-col gap-1.5"
                  style={{
                    border: tool.url ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(100,120,115,0.12)",
                    background: tool.url ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)",
                    textDecoration: "none",
                    cursor: tool.url ? "pointer" : "default",
                    opacity: tool.url ? 1 : 0.5,
                  }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: tool.url ? "rgba(34,197,94,0.55)" : "rgba(155,175,170,0.3)", fontSize: "14px" }}>
                      {tool.icon}
                    </span>
                    <span className="font-orbitron font-bold"
                      style={{ color: tool.url ? "rgba(34,197,94,0.75)" : "rgba(155,175,170,0.38)", fontSize: "10px" }}>
                      {tool.label}
                    </span>
                  </div>
                  <div className="font-mono-tactical"
                    style={{ color: tool.url ? "rgba(185,205,200,0.52)" : "rgba(155,175,170,0.28)", fontSize: "9px" }}>
                    {tool.url ? tool.desc : "URL not configured"}
                  </div>
                </a>
              ))}
            </div>
            {INTERNAL_TOOLS.every((t) => !t.url) && (
              <div className="px-4 pb-4">
                <p className="font-mono-tactical italic"
                  style={{ color: "rgba(155,175,170,0.38)", fontSize: "10px", lineHeight: "1.7" }}>
                  Set VITE_GRAFANA_URL, VITE_FLOWISE_URL, VITE_WEBUI_URL, VITE_PORTAINER_URL
                  in your deployment environment to activate tool links.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Pipeline activity log ───────────────────────────────── */}
        <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.15)" }}>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
            <span className="font-orbitron font-bold tracking-wider"
              style={{ color: "rgba(34,197,94,0.62)", fontSize: "10px" }}>
              Pipeline Activity Log
            </span>
            <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.35)", fontSize: "9px" }}>
              {pipelineEvents.length} event{pipelineEvents.length !== 1 ? "s" : ""}
            </span>
          </div>
          {pipelineEvents.length > 0 ? (
            <div>
              {pipelineEvents.map((ev, i) => (
                <PipelineEvent key={i} text={ev.text} ts={ev.ts} type={ev.type} />
              ))}
            </div>
          ) : (
            <div className="px-4 py-4">
              <p className="font-mono-tactical italic"
                style={{ color: "rgba(155,175,170,0.35)", fontSize: "10px" }}>
                No pipeline events — sources connecting...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-5 py-1.5 shrink-0"
        style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
        <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.22)", fontSize: "9px" }}>
          PACIFIC SYSTEMS — OPERATOR CONSOLE
        </span>
        <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.2)", fontSize: "9px" }}>
          RSR Data Systems Division — Restricted Layer
        </span>
      </div>
    </div>
  );
}
