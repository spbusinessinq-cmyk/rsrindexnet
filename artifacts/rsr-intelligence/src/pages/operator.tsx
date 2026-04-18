import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { SOURCE_DEFINITIONS } from "@/lib/feeds/sources";
import { DATASET_DOMAINS } from "@/data/config";
import { ENV } from "@/lib/env";
import type { FeedState } from "@/lib/feeds/types";

/* ── Feed state display helpers ──────────────────────────────── */
const STATE_COLOR: Record<FeedState, string> = {
  connected:        "#22c55e",
  disconnected:     "rgba(155,175,170,0.4)",
  error:            "rgba(220,80,80,0.65)",
  loading:          "rgba(34,197,94,0.38)",
  unbound:          "rgba(155,175,170,0.28)",
  "cors-restricted": "rgba(220,160,50,0.7)",
};

const STATE_LABEL: Record<FeedState, string> = {
  connected:        "Connected",
  disconnected:     "Disconnected",
  error:            "Error",
  loading:          "Checking...",
  unbound:          "No source bound",
  "cors-restricted": "CORS — proxy required",
};

const INTERNAL_TOOLS = [
  { label: "Grafana",    desc: "Monitoring & dashboards",  url: ENV.GRAFANA_URL,   icon: "◎" },
  { label: "Flowise",    desc: "AI pipeline studio",       url: ENV.FLOWISE_URL,   icon: "◈" },
  { label: "Open WebUI", desc: "Inference environment",    url: ENV.WEBUI_URL,     icon: "⊡" },
  { label: "Portainer",  desc: "Container management",     url: ENV.PORTAINER_URL, icon: "⊞" },
];

function FeedRow({ label, state, error, latencyMs, lastChecked, itemCount }: {
  label: string;
  state: FeedState;
  error: string | null;
  latencyMs: number | null;
  lastChecked: Date | null;
  itemCount: number;
}) {
  return (
    <div className="flex items-center gap-4 py-3 px-4"
      style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: STATE_COLOR[state] }} />
      <div className="font-mono-tactical flex-1 min-w-0" style={{ fontSize: "10px", color: "rgba(185,205,200,0.7)" }}>
        {label}
      </div>
      <div className="font-mono-tactical flex-shrink-0" style={{ fontSize: "9.5px", color: STATE_COLOR[state], width: 170 }}>
        {STATE_LABEL[state]}
        {error && state !== "unbound" && (
          <span style={{ color: "rgba(220,80,80,0.55)", fontSize: "8.5px", display: "block", marginTop: 2 }}>
            {error.slice(0, 50)}
          </span>
        )}
      </div>
      <div className="font-mono-tactical flex-shrink-0 text-right" style={{ fontSize: "9px", color: "rgba(155,175,170,0.38)", width: 50 }}>
        {itemCount > 0 ? `${itemCount} items` : "—"}
      </div>
      <div className="font-mono-tactical flex-shrink-0 text-right" style={{ fontSize: "9px", color: "rgba(155,175,170,0.35)", width: 60 }}>
        {latencyMs != null ? `${latencyMs}ms` : "—"}
      </div>
      <div className="font-mono-tactical flex-shrink-0 text-right hidden xl:block" style={{ fontSize: "9px", color: "rgba(155,175,170,0.3)", width: 110 }}>
        {lastChecked ? lastChecked.toLocaleTimeString() : "—"}
      </div>
    </div>
  );
}

export default function OperatorPage() {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  /* Fixed 4-source feed state */
  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();
  const feeds = [f0, f1, f2, f3];

  const connectedCount = feeds.filter(f => f.state === "connected").length;
  const totalItems = feeds.reduce((sum, f) => sum + f.items.length, 0);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full bg-background grid-overlay flex flex-col">
      {/* Operator top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,8,4,0.6)" }}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full status-pulse"
            style={{ background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
          <span className="font-orbitron font-bold tracking-widest"
            style={{ color: "rgba(34,197,94,0.7)", fontSize: "11px", letterSpacing: "0.2em" }}>
            INDEX
          </span>
          <div className="h-3.5 w-px" style={{ background: "rgba(34,197,94,0.2)" }} />
          <span className="font-mono-tactical tracking-widest uppercase"
            style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.18em" }}>
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
            style={{
              border: "1px solid rgba(155,175,170,0.15)",
              color: "rgba(155,175,170,0.45)",
              background: "transparent",
              fontSize: "9px",
              letterSpacing: "0.12em",
              cursor: "pointer",
            }}>
            LOGOUT
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* ── System overview grid ─────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "ACTIVE SOURCES",  value: connectedCount === 0 ? "None" : `${connectedCount} / ${SOURCE_DEFINITIONS.length}` },
            { label: "SIGNAL ITEMS",    value: totalItems === 0 ? "—" : String(totalItems) },
            { label: "DOMAINS DEFINED", value: String(DATASET_DOMAINS.length) },
            { label: "COMMITTED RECORDS", value: "—" },
          ].map((item) => (
            <div key={item.label} className="rounded px-4 py-3.5"
              style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.3)" }}>
              <div className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(155,175,170,0.42)", fontSize: "8.5px", letterSpacing: "0.12em", marginBottom: 4 }}>
                {item.label}
              </div>
              <div className="font-orbitron font-bold"
                style={{ color: "rgba(185,205,200,0.75)", fontSize: "18px" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Source health monitor ────────────────────────── */}
        <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ background: connectedCount > 0 ? "#22c55e" : "rgba(155,175,170,0.3)" }} />
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.65)", fontSize: "10px" }}>
                Source Health Monitor
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.38)", fontSize: "9px" }}>
                {SOURCE_DEFINITIONS.length} sources defined
              </span>
              <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.32)", fontSize: "9px" }}>
                {ENV.SOURCE_BASE ? `base: ${ENV.SOURCE_BASE}` : "VITE_SOURCE_BASE_URL not set"}
              </span>
            </div>
          </div>
          {/* Column headers */}
          <div className="flex items-center gap-4 px-4 py-2"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.05)", background: "rgba(0,0,0,0.2)" }}>
            {[
              { label: "SOURCE", w: "flex-1" },
              { label: "STATE", w: "w-44" },
              { label: "ITEMS", w: "w-12 text-right" },
              { label: "LATENCY", w: "w-16 text-right" },
              { label: "LAST CHECK", w: "w-28 text-right hidden xl:block" },
            ].map(c => (
              <div key={c.label} className={`font-mono-tactical tracking-widest ${c.w}`}
                style={{ color: "rgba(34,197,94,0.38)", fontSize: "8px", letterSpacing: "0.14em" }}>
                {c.label}
              </div>
            ))}
          </div>
          <div>
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
          </div>
          {!ENV.SOURCE_BASE && (
            <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
              <p className="font-mono-tactical italic"
                style={{ color: "rgba(155,175,170,0.4)", fontSize: "10px", lineHeight: "1.7" }}>
                Set <span style={{ color: "rgba(34,197,94,0.55)", fontStyle: "normal" }}>VITE_SOURCE_BASE_URL</span> in your deployment environment to bind source endpoints.
                All sources are unbound until a base URL is configured.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* ── Dataset binding state ──────────────────────── */}
          <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.65)", fontSize: "10px" }}>
                Dataset Binding Status
              </span>
            </div>
            <div>
              {DATASET_DOMAINS.map((domain) => (
                <div key={domain.id} className="flex items-center gap-3 px-4 py-2.5"
                  style={{ borderBottom: "1px solid rgba(34,197,94,0.05)" }}>
                  <div className="font-mono-tactical flex-shrink-0"
                    style={{ border: "1px solid rgba(34,197,94,0.18)", color: "rgba(34,197,94,0.6)", fontSize: "8.5px", padding: "1px 6px", borderRadius: 3 }}>
                    {domain.id}
                  </div>
                  <div className="flex-1 font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.65)", fontSize: "10px" }}>
                    {domain.label}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full" style={{ background: "rgba(155,175,170,0.28)" }} />
                    <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.38)", fontSize: "9px" }}>
                      {domain.bindingStatus === "unbound" ? "No source bound" : domain.bindingStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Internal tools ─────────────────────────────── */}
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
                  data-unavailable={!tool.url || undefined}
                  className="rounded p-3.5 flex flex-col gap-1.5"
                  style={{
                    border: tool.url ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(100,120,115,0.12)",
                    background: tool.url ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)",
                    textDecoration: "none",
                    cursor: tool.url ? "pointer" : "default",
                    opacity: tool.url ? 1 : 0.5,
                    transition: "border-color 0.15s ease",
                  }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: tool.url ? "rgba(34,197,94,0.55)" : "rgba(155,175,170,0.3)", fontSize: "14px" }}>
                      {tool.icon}
                    </span>
                    <span className="font-orbitron font-bold"
                      style={{ color: tool.url ? "rgba(34,197,94,0.72)" : "rgba(155,175,170,0.38)", fontSize: "10px" }}>
                      {tool.label}
                    </span>
                  </div>
                  <div className="font-mono-tactical"
                    style={{ color: tool.url ? "rgba(185,205,200,0.48)" : "rgba(155,175,170,0.28)", fontSize: "9px" }}>
                    {tool.url ? tool.desc : "URL not configured"}
                  </div>
                </a>
              ))}
            </div>
            {INTERNAL_TOOLS.every(t => !t.url) && (
              <div className="px-4 pb-4">
                <p className="font-mono-tactical italic"
                  style={{ color: "rgba(155,175,170,0.38)", fontSize: "10px", lineHeight: "1.7" }}>
                  Configure tool URLs in your deployment environment (VITE_GRAFANA_URL, VITE_FLOWISE_URL, etc.)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Pipeline activity log (empty) ─────────────────── */}
        <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.15)" }}>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
            <span className="font-orbitron font-bold tracking-wider"
              style={{ color: "rgba(34,197,94,0.6)", fontSize: "10px" }}>
              Pipeline Activity Log
            </span>
            <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.35)", fontSize: "9px" }}>
              No entries
            </span>
          </div>
          <div className="px-4 py-5 flex items-center justify-center">
            <p className="font-mono-tactical italic"
              style={{ color: "rgba(155,175,170,0.35)", fontSize: "10px", lineHeight: "1.7" }}>
              Pipeline log is empty — no signals have been ingested, structured, or committed.
              Activity will appear here when sources are bound and intake begins.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-5 py-1.5 shrink-0"
        style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
        <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.22)", fontSize: "9px" }}>
          INDEX DATA NETWORK — OPERATOR CONSOLE
        </span>
        <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.2)", fontSize: "9px" }}>
          RSR Data Systems Division — Restricted Layer
        </span>
      </div>
    </div>
  );
}
