import { useLocation } from "wouter";
import type { PlatformRuntimeState } from "@/lib/feeds/types";

interface Segment {
  label: string;
  path: string;
  description: string;
  detail?: string;
  methodology?: string;
}

interface RightPanelProps {
  hoveredSegment: string | null;
  segments: Segment[];
  platform?: PlatformRuntimeState;
}

const SECTOR_DETAILS: Record<string, { tagline: string; points: string[] }> = {
  OVERVIEW: {
    tagline: "What INDEX is and how signal-to-structure works",
    points: [
      "INDEX is a structured data network — not a content platform or newsroom",
      "Signal intake, structuring, and record indexing form the core pipeline",
      "The public layer documents architecture; restricted layers exist beyond ACCESS",
      "Every sector maps a distinct layer of the signal-to-record flow",
    ],
  },
  SIGNALS: {
    tagline: "How monitored inputs enter the INDEX architecture",
    points: [
      "Signal categories are defined before monitoring begins — not after",
      "Sources are classified on intake by reliability, type, and recency",
      "High-volume sources are filtered by relevance before logging",
      "Dismissed signals are logged with reason — not silently discarded",
    ],
  },
  DATASETS: {
    tagline: "How structured data is organised into domain collections",
    points: [
      "Datasets are bounded collections with defined analytical scope",
      "Data grows as new signals are structured and appended to each domain",
      "Cross-domain signals require explicit classification before assignment",
      "Public datasets reflect structure only — restricted data requires ACCESS",
    ],
  },
  INDEX: {
    tagline: "The core searchable record layer — destination of the pipeline",
    points: [
      "The index is a structured, queryable record — not a file vault",
      "Each record carries defined scope, source attribution, and classification status",
      "Records are discrete — no open-ended notes or unsourced entries",
      "Once committed, records are versioned — not overwritten",
    ],
  },
  METHOD: {
    tagline: "How the operation collects, classifies, and synthesises",
    points: [
      "Collection discipline defines which sources are worth monitoring",
      "Classification logic determines how signals are routed into datasets",
      "Structuring rules govern what makes a valid record entry",
      "Synthesis flows from indexed records outward — not from raw signals",
    ],
  },
  ACCESS: {
    tagline: "Where the public layer ends and the operational layer begins",
    points: [
      "ACCESS is the boundary between public documentation and operation",
      "Deeper datasets, live feeds, and analytical tools exist behind this threshold",
      "Entry is not public — verification and individual review required",
      "Three tiers: public, restricted, and operator-level environments",
    ],
  },
};

const LIVE_SECTORS = new Set(["SIGNALS", "DATASETS", "INDEX"]);

export default function RightPanel({ hoveredSegment, segments, platform }: RightPanelProps) {
  const [, setLocation] = useLocation();
  const activeSegment = segments.find((s) => s.label === hoveredSegment);
  const sectorDetail  = hoveredSegment ? SECTOR_DETAILS[hoveredSegment] : null;
  const networkIsLive = platform && platform.sourcesConnected > 0;
  const isLiveSector  = hoveredSegment ? LIVE_SECTORS.has(hoveredSegment) : false;

  return (
    <div className="hidden lg:flex flex-col shrink-0"
      style={{ borderLeft: "1px solid rgba(34,197,94,0.08)", width: 284, background: "rgba(0,0,0,0.12)" }}>

      {activeSegment && sectorDetail ? (
        /* ── Sector inspection panel ──────────────────────────── */
        <div key={activeSegment.label} className="panel-fade-in flex flex-col h-full">
          {/* Header */}
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "8px", letterSpacing: "0.22em" }}>
                Sector
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.06)" }} />
              {isLiveSector && networkIsLive && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full"
                    style={{ background: "rgba(34,197,94,0.65)", boxShadow: "0 0 3px rgba(34,197,94,0.5)" }} />
                  <span className="font-mono-tactical"
                    style={{ color: "rgba(34,197,94,0.5)", fontSize: "7.5px", letterSpacing: "0.1em" }}>
                    LIVE
                  </span>
                </div>
              )}
            </div>
            <div className="font-orbitron text-base font-bold tracking-wide leading-snug mb-1"
              style={{ color: "#22c55e", textShadow: "0 0 14px rgba(34,197,94,0.12)" }}>
              {activeSegment.label}
            </div>
            <div className="font-mono-tactical italic"
              style={{ color: "rgba(185,205,200,0.62)", fontSize: "10px", lineHeight: "1.7" }}>
              {sectorDetail.tagline}
            </div>
          </div>

          {/* Detail body */}
          <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
            {activeSegment.detail && (
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(185,205,200,0.78)", lineHeight: "1.95", fontSize: "10.5px" }}>
                {activeSegment.detail}
              </p>
            )}

            <div className="rounded px-3.5 py-3.5 space-y-2.5"
              style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.22)" }}>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(34,197,94,0.38)", fontSize: "7.5px", letterSpacing: "0.16em" }}>
                Key Points
              </div>
              {sectorDetail.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.45)" }} />
                  <span className="font-mono-tactical leading-relaxed"
                    style={{ color: "rgba(185,205,200,0.72)", lineHeight: "1.85", fontSize: "10px" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {activeSegment.methodology && (
              <div className="rounded px-3.5 py-2.5"
                style={{ border: "1px solid rgba(34,197,94,0.07)", background: "rgba(34,197,94,0.025)" }}>
                <div className="font-mono-tactical tracking-widest uppercase mb-1.5"
                  style={{ color: "rgba(34,197,94,0.38)", fontSize: "7.5px", letterSpacing: "0.14em" }}>
                  Methodology
                </div>
                <div className="font-mono-tactical italic"
                  style={{ color: "rgba(34,197,94,0.55)", fontSize: "10px", lineHeight: "1.7" }}>
                  {activeSegment.methodology}
                </div>
              </div>
            )}
          </div>

          {/* Enter CTA */}
          <div className="px-6 py-4 shrink-0" style={{ borderTop: "1px solid rgba(34,197,94,0.08)" }}>
            <button onClick={() => setLocation(activeSegment.path)}
              className="w-full rounded px-4 py-3 flex items-center justify-between"
              style={{ border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.08)", cursor: "pointer" }}>
              <span className="font-orbitron font-bold tracking-wider"
                style={{ color: "rgba(34,197,94,0.82)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
                ENTER {activeSegment.label}
              </span>
              <span className="font-mono-tactical"
                style={{ color: "rgba(34,197,94,0.52)", fontSize: "11px" }}>
                →
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* ── Default panel ────────────────────────────────────── */
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Default header */}
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
            <div className="font-mono-tactical tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.42)", fontSize: "8.5px", letterSpacing: "0.22em" }}>
              Network Architecture
            </div>
            <div className="font-orbitron text-sm font-bold tracking-wide leading-snug"
              style={{ color: "rgba(34,197,94,0.72)" }}>
              INDEX — data layer of the RSR Intelligence Network
            </div>
          </div>

          <div className="flex-1 px-6 py-5 space-y-5 overflow-y-auto">
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.75)", lineHeight: "1.95", fontSize: "10.5px" }}>
              INDEX is the structured data division of the RSR Intelligence Network — not the editorial
              or investigative arm. It handles signal intake, dataset structuring, and record indexing.
            </p>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />

            {/* Pipeline state */}
            {platform && (
              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                  style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.18em" }}>
                  Pipeline State
                </div>
                <div className="rounded"
                  style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.25)" }}>
                  {[
                    {
                      phase: "01",
                      label: "Signal Intake",
                      detail: platform.sourcesConnected > 0
                        ? `${platform.sourcesConnected} source${platform.sourcesConnected !== 1 ? "s" : ""} · ${platform.totalLiveItems} staged`
                        : "Sources initialising",
                      live: platform.sourcesConnected > 0,
                    },
                    {
                      phase: "02",
                      label: "Domain Routing",
                      detail: platform.domainsBound > 0
                        ? `${platform.domainsBound}/${platform.domainsTotal} domains bound`
                        : `${platform.domainsTotal} domains defined — unbound`,
                      live: platform.domainsBound > 0,
                    },
                    {
                      phase: "03",
                      label: "Index Layer",
                      detail: "0 records committed",
                      live: false,
                    },
                  ].map((p, idx, arr) => (
                    <div key={p.phase} className="flex items-center gap-3 px-4 py-3"
                      style={{ borderBottom: idx < arr.length - 1 ? "1px solid rgba(34,197,94,0.05)" : undefined }}>
                      <span className="font-mono-tactical flex-shrink-0"
                        style={{ color: "rgba(34,197,94,0.22)", fontSize: "8px", width: 16 }}>
                        {p.phase}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono-tactical font-semibold"
                          style={{ color: p.live ? "rgba(34,197,94,0.72)" : "rgba(155,175,170,0.45)", fontSize: "9.5px" }}>
                          {p.label}
                        </div>
                        <div className="font-mono-tactical"
                          style={{ color: p.live ? "rgba(185,205,200,0.58)" : "rgba(155,175,170,0.3)", fontSize: "8.5px" }}>
                          {p.detail}
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: p.live ? "#22c55e" : "rgba(155,175,170,0.18)",
                          boxShadow: p.live ? "0 0 5px rgba(34,197,94,0.55)" : undefined,
                        }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />

            {/* Sector index */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.18em" }}>
                Sector Index
              </div>
              <div className="space-y-0.5">
                {segments.map((seg, i) => {
                  const isLive = LIVE_SECTORS.has(seg.label) && networkIsLive;
                  return (
                    <button key={seg.label} onClick={() => setLocation(seg.path)}
                      className="w-full flex items-center gap-2.5 text-left rounded px-2.5 py-2"
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        transition: "background 0.12s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "rgba(34,197,94,0.04)")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "none")}>
                      <span className="font-mono-tactical flex-shrink-0"
                        style={{ color: "rgba(155,175,170,0.3)", fontSize: "8px", width: 16 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.06)" }} />
                      {isLive && (
                        <div className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "rgba(34,197,94,0.65)", boxShadow: "0 0 3px rgba(34,197,94,0.5)" }} />
                      )}
                      <span className="font-orbitron font-semibold tracking-wider flex-shrink-0"
                        style={{ color: isLive ? "rgba(34,197,94,0.75)" : "rgba(34,197,94,0.48)", fontSize: "8.5px" }}>
                        {seg.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />

            {/* Hover hint */}
            <div className="rounded px-3.5 py-3 flex items-center gap-2.5"
              style={{ border: "1px solid rgba(34,197,94,0.07)", background: "rgba(0,0,0,0.18)" }}>
              <div className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "rgba(34,197,94,0.3)" }} />
              <span className="font-mono-tactical italic"
                style={{ color: "rgba(155,175,170,0.42)", fontSize: "9.5px", lineHeight: "1.7" }}>
                Hover a sector on the wheel for details. Click to enter.
              </span>
            </div>

            {/* Live channel */}
            <a href="https://x.com/RSRIntel" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between rounded px-3.5 py-2.5"
              style={{ border: "1px solid rgba(155,175,170,0.1)", background: "rgba(0,0,0,0.22)", textDecoration: "none" }}>
              <div>
                <div className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(155,175,170,0.38)", fontSize: "7.5px", letterSpacing: "0.14em", marginBottom: 2 }}>
                  Live Channel
                </div>
                <div className="font-mono-tactical"
                  style={{ color: "rgba(185,205,200,0.62)", fontSize: "9.5px" }}>
                  @RSRIntel on X
                </div>
              </div>
              <span style={{ color: "rgba(155,175,170,0.3)", fontSize: "12px" }}>↗</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
