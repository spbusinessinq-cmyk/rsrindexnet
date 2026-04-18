import type { PlatformRuntimeState } from "@/lib/feeds/types";
import { fmtRelative } from "@/lib/runtime";

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
    text: "Monitored sources deliver signals continuously. Each signal is classified, timestamped, and held in the triage queue before advancing.",
  },
  {
    id: "02",
    label: "Data Structuring",
    text: "Validated signals are structured into domain records — scope defined, attribution applied, entry assigned to its dataset.",
  },
  {
    id: "03",
    label: "Record Index",
    text: "Structured entries are committed to the INDEX layer — a discrete, scoped, searchable record with source attribution and versioning.",
  },
];

export default function LeftPanel({ hoveredSegment, segments, platform }: LeftPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);
  const networkIsLive = platform && platform.sourcesConnected > 0;
  const hasStaged     = platform && platform.totalLiveItems > 0;

  return (
    <div className="hidden lg:flex flex-col shrink-0"
      style={{ borderRight: "1px solid rgba(34,197,94,0.08)", width: 276, background: "rgba(0,0,0,0.12)" }}>

      {/* ── Identity block ─────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-5" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
        <div className="font-mono-tactical tracking-widest uppercase mb-1"
          style={{ color: "rgba(34,197,94,0.38)", letterSpacing: "0.22em", fontSize: "8px" }}>
          RSR Intelligence Network
        </div>
        <h2 className="font-orbitron font-bold tracking-wide leading-none mb-1"
          style={{ color: "#22c55e", textShadow: "0 0 28px rgba(34,197,94,0.18)", letterSpacing: "0.04em", fontSize: "36px" }}>
          INDEX
        </h2>
        <div className="font-mono-tactical mb-4"
          style={{ color: "rgba(155,175,170,0.5)", fontSize: "8.5px", letterSpacing: "0.18em" }}>
          DATA SYSTEMS DIVISION
        </div>
        <p className="font-mono-tactical leading-relaxed"
          style={{ color: "rgba(185,205,200,0.72)", lineHeight: "1.88", fontSize: "10.5px" }}>
          The structured data layer of the RSR Intelligence Network. INDEX monitors signals,
          structures them into classified datasets, and builds a traversable record index.
        </p>
      </div>

      {/* ── Dynamic content — adapts on segment hover ──────────── */}
      <div className="flex-1 px-6 py-5 overflow-y-auto space-y-5">
        {activeSegment ? (
          <div key={activeSegment.label} className="panel-fade-in space-y-4">
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.22em" }}>
              Sector Preview
            </div>

            <div className="rounded px-4 py-4 space-y-3"
              style={{ border: "1px solid rgba(34,197,94,0.18)", background: "rgba(34,197,94,0.03)" }}>
              <div className="font-orbitron text-sm font-bold tracking-wider"
                style={{ color: "#22c55e" }}>
                {activeSegment.label}
              </div>
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(185,205,200,0.78)", lineHeight: "1.92", fontSize: "10.5px" }}>
                {activeSegment.description}
              </p>
              {activeSegment.detail && (
                <p className="font-mono-tactical leading-relaxed"
                  style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.88", fontSize: "10px",
                    borderTop: "1px solid rgba(34,197,94,0.07)", paddingTop: 10, marginTop: 10 }}>
                  {activeSegment.detail}
                </p>
              )}
              {activeSegment.methodology && (
                <div className="font-mono-tactical italic pt-1"
                  style={{ color: "rgba(34,197,94,0.52)", fontSize: "9.5px", lineHeight: "1.7",
                    borderTop: "1px solid rgba(34,197,94,0.07)", paddingTop: 10 }}>
                  {activeSegment.methodology}
                </div>
              )}
            </div>

            {/* Enter CTA */}
            <div className="rounded px-4 py-3 flex items-center justify-between"
              style={{ border: "1px solid rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.07)", cursor: "pointer" }}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#22c55e", boxShadow: "0 0 5px rgba(34,197,94,0.7)" }} />
                <span className="font-orbitron font-bold tracking-wider"
                  style={{ color: "rgba(34,197,94,0.82)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
                  ENTER SECTOR
                </span>
              </div>
              <span className="font-mono-tactical"
                style={{ color: "rgba(34,197,94,0.55)", fontSize: "10px" }}>
                {activeSegment.label} →
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Live network state */}
            {platform && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-1 rounded-full"
                    style={{
                      background: networkIsLive ? "#22c55e" : "rgba(155,175,170,0.25)",
                      boxShadow: networkIsLive ? "0 0 4px rgba(34,197,94,0.6)" : undefined,
                    }} />
                  <div className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(34,197,94,0.5)", fontSize: "8.5px", letterSpacing: "0.22em" }}>
                    Network Live State
                  </div>
                </div>
                <div className="rounded"
                  style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.28)" }}>
                  <div className="grid grid-cols-2 gap-0 divide-x divide-y"
                    style={{ borderColor: "rgba(34,197,94,0.06)" }}>
                    {[
                      {
                        label: "SOURCES",
                        value: `${platform.sourcesConnected}/${platform.sourcesTotal}`,
                        sub: platform.sourcesConnected > 0 ? "active" : "connecting",
                        live: platform.sourcesConnected > 0,
                      },
                      {
                        label: "STAGED",
                        value: String(platform.totalLiveItems),
                        sub: platform.totalLiveItems > 0 ? "in pipeline" : "none yet",
                        live: platform.totalLiveItems > 0,
                      },
                      {
                        label: "DOMAINS",
                        value: `${platform.domainsBound}/${platform.domainsTotal}`,
                        sub: platform.domainsBound > 0 ? "source-bound" : "defined",
                        live: platform.domainsBound > 0,
                      },
                      {
                        label: "COMMITTED",
                        value: "0",
                        sub: "none yet",
                        live: false,
                      },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col gap-0.5 px-4 py-3">
                        <span className="font-mono-tactical"
                          style={{ color: "rgba(155,175,170,0.38)", fontSize: "7.5px", letterSpacing: "0.12em" }}>
                          {m.label}
                        </span>
                        <span className="font-mono-tactical font-bold"
                          style={{ color: m.live ? "rgba(34,197,94,0.85)" : "rgba(155,175,170,0.38)", fontSize: "22px", lineHeight: 1.1 }}>
                          {m.value}
                        </span>
                        <span className="font-mono-tactical"
                          style={{ color: m.live ? "rgba(34,197,94,0.42)" : "rgba(155,175,170,0.28)", fontSize: "8.5px" }}>
                          {m.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                  {platform.lastSync && (
                    <div className="flex items-center gap-2 px-4 py-2"
                      style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "rgba(34,197,94,0.4)" }} />
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(155,175,170,0.42)", fontSize: "8.5px" }}>
                        Last sync {fmtRelative(platform.lastSync)}
                      </span>
                      {hasStaged && (
                        <span className="font-mono-tactical ml-auto"
                          style={{ color: "rgba(34,197,94,0.38)", fontSize: "8.5px" }}>
                          classification pending
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Platform structure pillars */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.22em" }}>
                Platform Structure
              </div>
              <div className="space-y-3.5">
                {PILLARS.map((p) => (
                  <div key={p.id} className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-tactical flex-shrink-0"
                        style={{ color: "rgba(34,197,94,0.28)", fontSize: "8px" }}>
                        {p.id}
                      </span>
                      <div className="w-px h-3 flex-shrink-0" style={{ background: "rgba(34,197,94,0.32)" }} />
                      <span className="font-orbitron font-semibold tracking-wider"
                        style={{ color: "rgba(34,197,94,0.72)", fontSize: "9px" }}>
                        {p.label}
                      </span>
                    </div>
                    <p className="font-mono-tactical leading-relaxed pl-7"
                      style={{ color: "rgba(185,205,200,0.65)", lineHeight: "1.85", fontSize: "10px" }}>
                      {p.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Footer: ecosystem links ─────────────────────────────── */}
      <div className="px-6 py-4 space-y-2 shrink-0" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
        <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded px-3.5 py-2.5"
          style={{ border: "1px solid rgba(34,197,94,0.18)", background: "rgba(34,197,94,0.05)", textDecoration: "none" }}>
          <div>
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.45)", fontSize: "7.5px", letterSpacing: "0.14em", marginBottom: 2 }}>
              RSR Intelligence
            </div>
            <div className="font-orbitron font-bold"
              style={{ color: "rgba(34,197,94,0.72)", fontSize: "9.5px" }}>
              rsrintel.com ↗
            </div>
          </div>
          <span style={{ color: "rgba(34,197,94,0.35)", fontSize: "12px" }}>↗</span>
        </a>
        <a href="https://x.com/RSRIntel" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded px-3.5 py-2.5"
          style={{ border: "1px solid rgba(155,175,170,0.1)", background: "rgba(0,0,0,0.22)", textDecoration: "none" }}>
          <div>
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(155,175,170,0.38)", fontSize: "7.5px", letterSpacing: "0.14em", marginBottom: 2 }}>
              Live Channel
            </div>
            <div className="font-mono-tactical"
              style={{ color: "rgba(185,205,200,0.6)", fontSize: "9.5px" }}>
              @RSRIntel on X ↗
            </div>
          </div>
          <span style={{ color: "rgba(155,175,170,0.28)", fontSize: "12px" }}>↗</span>
        </a>
      </div>
    </div>
  );
}
