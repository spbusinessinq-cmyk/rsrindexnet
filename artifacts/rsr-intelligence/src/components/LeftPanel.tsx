import type { PlatformRuntimeState } from "@/lib/feeds/types";

interface Segment {
  label: string;
  path: string;
  description: string;
  detail?: string;
  methodology?: string;
}

interface LeftPanelProps {
  hoveredSegment: string | null;
  segments: Segment[];
  platform?: PlatformRuntimeState;
}

const PILLARS = [
  {
    id: "01",
    label: "Signal Intake",
    text: "Monitored sources deliver signals into INDEX continuously. Sources are classified, signals are logged, and triage determines what enters the record.",
  },
  {
    id: "02",
    label: "Data Structuring",
    text: "Validated signals are structured into datasets and indexed records — scope is defined, attribution is applied, and data is assigned to its domain.",
  },
  {
    id: "03",
    label: "Record Index",
    text: "Structured data accumulates into a searchable, traversable index. Records are discrete, scoped entries with defined status and source attribution.",
  },
];

export default function LeftPanel({ hoveredSegment, segments, platform }: LeftPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);
  const networkIsLive = platform && platform.sourcesConnected > 0;

  return (
    <div className="hidden lg:flex flex-col shrink-0 overflow-y-auto"
      style={{ borderRight: "1px solid rgba(34,197,94,0.07)", width: 272 }}>

      {/* ── Identity block ─────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
        <div className="font-mono-tactical tracking-widest uppercase mb-1"
          style={{ color: "rgba(34,197,94,0.45)", letterSpacing: "0.2em", fontSize: "9px" }}>
          RSR Intelligence Network
        </div>
        <h2 className="font-orbitron text-4xl font-bold tracking-wide leading-none mb-1"
          style={{ color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.16)", letterSpacing: "0.04em" }}>
          INDEX
        </h2>
        <div className="font-mono-tactical mb-3.5"
          style={{ color: "rgba(155,175,170,0.55)", fontSize: "9px", letterSpacing: "0.16em" }}>
          Data Systems Division
        </div>
        <p className="font-mono-tactical leading-relaxed"
          style={{ color: "rgba(185,205,200,0.75)", lineHeight: "1.9", fontSize: "11px" }}>
          The public-facing data network of the RSR Intelligence Network. INDEX monitors signals,
          structures them into classified datasets, and builds a traversable record index.
        </p>
      </div>

      {/* ── Dynamic content — adapts on segment hover ──────────── */}
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        {activeSegment ? (
          <div key={activeSegment.label} className="panel-fade-in space-y-4">
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.52)", fontSize: "9px", letterSpacing: "0.2em" }}>
              Sector Preview
            </div>
            <div>
              <div className="font-orbitron text-sm font-bold tracking-wider mb-2"
                style={{ color: "#22c55e" }}>
                {activeSegment.label}
              </div>
              <div className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(185,205,200,0.78)", lineHeight: "1.92", fontSize: "11px" }}>
                {activeSegment.description}
              </div>
            </div>
            {activeSegment.detail && (
              <div className="rounded px-3.5 py-3"
                style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.22)" }}>
                <p className="font-mono-tactical leading-relaxed"
                  style={{ color: "rgba(185,205,200,0.68)", lineHeight: "1.88", fontSize: "10px" }}>
                  {activeSegment.detail}
                </p>
              </div>
            )}
            {activeSegment.methodology && (
              <div className="pt-1">
                <div className="h-px mb-3" style={{ background: "rgba(34,197,94,0.07)" }} />
                <div className="font-mono-tactical italic"
                  style={{ color: "rgba(34,197,94,0.5)", fontSize: "10px", lineHeight: "1.75" }}>
                  {activeSegment.methodology}
                </div>
              </div>
            )}
            <div className="rounded px-3 py-2.5 flex items-center gap-2"
              style={{ border: "1px solid rgba(34,197,94,0.18)", background: "rgba(34,197,94,0.05)" }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#22c55e", boxShadow: "0 0 5px rgba(34,197,94,0.7)" }} />
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.72)", fontSize: "9px", letterSpacing: "0.12em" }}>
                CLICK TO ENTER {activeSegment.label}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Live metrics mini-block — only shown when platform is connected */}
            {platform && (
              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                  style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.2em" }}>
                  Network Live State
                </div>
                <div className="rounded px-3.5 py-3"
                  style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.22)" }}>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                    {[
                      { label: "Sources", value: `${platform.sourcesConnected}/${platform.sourcesTotal}`, live: platform.sourcesConnected > 0 },
                      { label: "Staged", value: String(platform.totalLiveItems), live: platform.totalLiveItems > 0 },
                      { label: "Domains", value: `${platform.domainsBound}/${platform.domainsTotal}`, live: platform.domainsBound > 0 },
                      { label: "Committed", value: "0", live: false },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col gap-0.5">
                        <span className="font-mono-tactical"
                          style={{ color: "rgba(155,175,170,0.4)", fontSize: "8px", letterSpacing: "0.1em" }}>
                          {m.label.toUpperCase()}
                        </span>
                        <span className="font-mono-tactical font-bold"
                          style={{ color: m.live ? "rgba(34,197,94,0.78)" : "rgba(155,175,170,0.4)", fontSize: "14px" }}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {networkIsLive && platform.totalLiveItems > 0 && (
                    <div className="mt-2.5 pt-2.5 font-mono-tactical"
                      style={{ borderTop: "1px solid rgba(34,197,94,0.06)", color: "rgba(155,175,170,0.42)", fontSize: "9px" }}>
                      {platform.totalLiveItems} items staged — classification pending
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Platform Structure pillars */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.2em" }}>
                Platform Structure
              </div>
              <div className="space-y-4">
                {PILLARS.map((p) => (
                  <div key={p.id} className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-tactical flex-shrink-0"
                        style={{ color: "rgba(34,197,94,0.32)", fontSize: "8.5px" }}>{p.id}</span>
                      <div className="w-px h-3 flex-shrink-0" style={{ background: "rgba(34,197,94,0.35)" }} />
                      <span className="font-orbitron font-semibold tracking-wider"
                        style={{ color: "rgba(34,197,94,0.75)", fontSize: "9.5px" }}>{p.label}</span>
                    </div>
                    <p className="font-mono-tactical leading-relaxed pl-7"
                      style={{ color: "rgba(185,205,200,0.68)", lineHeight: "1.88", fontSize: "10.5px" }}>
                      {p.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer: ecosystem links ─────────────────────────────── */}
      <div className="px-6 py-4 space-y-2.5 shrink-0" style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
        <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded px-3 py-2.5"
          style={{ border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.04)", textDecoration: "none" }}>
          <div>
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.45)", fontSize: "8px", letterSpacing: "0.14em", marginBottom: 2 }}>
              RSR Intelligence
            </div>
            <div className="font-orbitron font-bold"
              style={{ color: "rgba(34,197,94,0.72)", fontSize: "9.5px" }}>
              Intel Site ↗
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span style={{ color: "rgba(34,197,94,0.35)", fontSize: "11px" }}>↗</span>
          </div>
        </a>
        <a href="https://x.com/RSRIntel" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded px-3 py-2"
          style={{ border: "1px solid rgba(155,175,170,0.1)", background: "rgba(0,0,0,0.2)", textDecoration: "none" }}>
          <div>
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(155,175,170,0.4)", fontSize: "8px", letterSpacing: "0.14em", marginBottom: 2 }}>
              Live Channel
            </div>
            <div className="font-mono-tactical"
              style={{ color: "rgba(185,205,200,0.62)", fontSize: "9.5px" }}>
              @RSRIntel on X
            </div>
          </div>
          <span style={{ color: "rgba(155,175,170,0.28)", fontSize: "12px" }}>↗</span>
        </a>
      </div>
    </div>
  );
}
