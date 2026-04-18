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
}

const SECTOR_DETAILS: Record<string, { tagline: string; points: string[] }> = {
  OVERVIEW: {
    tagline: "What the INDEX Data Network is and how it works",
    points: [
      "INDEX is a structured data network — not a content platform or newsroom",
      "Signal intake, structuring, and record indexing form the core pipeline",
      "The public interface documents architecture; deeper layers exist behind ACCESS",
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
    tagline: "The core searchable record layer of the platform",
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
    tagline: "Where the public interface ends and the operational layer begins",
    points: [
      "ACCESS is the boundary between public documentation and operation",
      "Deeper datasets, live feeds, and analytical tools exist behind this threshold",
      "Entry is not public — verification and individual review required",
      "Designed to support tiered access: public, restricted, operator",
    ],
  },
};

export default function RightPanel({ hoveredSegment, segments }: RightPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);
  const sectorDetail = hoveredSegment ? SECTOR_DETAILS[hoveredSegment] : null;

  return (
    <div
      className="hidden lg:flex flex-col shrink-0 overflow-y-auto"
      style={{ borderLeft: "1px solid rgba(34,197,94,0.07)", width: 280 }}
    >
      {activeSegment && sectorDetail ? (
        <div key={activeSegment.label} className="panel-fade-in flex flex-col h-full">
          {/* Sector header */}
          <div className="px-6 pt-7 pb-5" style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
            <div className="font-mono-tactical tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.2em" }}>
              Sector — {activeSegment.label}
            </div>
            <div className="font-orbitron text-sm font-bold tracking-wide leading-snug"
              style={{ color: "#22c55e", textShadow: "0 0 14px rgba(34,197,94,0.12)" }}>
              {sectorDetail.tagline}
            </div>
          </div>

          {/* Detail body */}
          <div className="flex-1 px-6 py-5 space-y-4">
            {activeSegment.detail && (
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(185,205,200,0.76)", lineHeight: "1.95", fontSize: "11px" }}>
                {activeSegment.detail}
              </p>
            )}
            <div className="space-y-2.5">
              {sectorDetail.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.45)" }} />
                  <span className="font-mono-tactical leading-relaxed"
                    style={{ color: "rgba(185,205,200,0.72)", lineHeight: "1.85", fontSize: "10.5px" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
            {activeSegment.methodology && (
              <div className="pt-1">
                <div className="h-px mb-3" style={{ background: "rgba(34,197,94,0.07)" }} />
                <div className="font-mono-tactical italic"
                  style={{ color: "rgba(34,197,94,0.4)", fontSize: "10px" }}>
                  {activeSegment.methodology}
                </div>
              </div>
            )}
          </div>

          {/* Enter CTA */}
          <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
            <div className="rounded px-4 py-2.5 flex items-center justify-between"
              style={{ border: "1px solid rgba(34,197,94,0.16)", background: "rgba(34,197,94,0.04)" }}>
              <span className="font-mono-tactical tracking-widest"
                style={{ color: "rgba(34,197,94,0.58)", fontSize: "9.5px", letterSpacing: "0.14em" }}>
                ENTER SECTOR
              </span>
              <span className="font-mono-tactical"
                style={{ color: "rgba(155,175,170,0.38)", fontSize: "9.5px" }}>
                {activeSegment.path}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Default header */}
          <div className="px-6 pt-7 pb-5" style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
            <div className="font-mono-tactical tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.2em" }}>
              Platform Identity
            </div>
            <div className="font-orbitron text-sm font-bold tracking-wide leading-snug"
              style={{ color: "rgba(34,197,94,0.62)" }}>
              INDEX — the data layer of the RSR Intelligence Network
            </div>
          </div>

          {/* Default body */}
          <div className="flex-1 px-6 py-5 space-y-4">
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.78)", lineHeight: "1.95", fontSize: "11px" }}>
              INDEX is the structured data division of the RSR Intelligence Network. It is not the
              editorial or investigative arm — it is the data architecture layer: signal intake,
              dataset structuring, and record indexing.
            </p>
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.68)", lineHeight: "1.95", fontSize: "11px" }}>
              The command wheel maps the six public sectors. Each sector represents a distinct layer
              of the INDEX pipeline — from monitored signal intake to the access boundary.
            </p>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.18em" }}>
                Sector Index
              </div>
              {segments.map((seg, i) => (
                <div key={seg.label} className="flex items-center gap-2.5 py-1.5">
                  <span className="font-mono-tactical flex-shrink-0"
                    style={{ color: "rgba(155,175,170,0.38)", fontSize: "9px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.07)" }} />
                  <span className="font-orbitron font-semibold tracking-wider flex-shrink-0"
                    style={{ color: "rgba(34,197,94,0.55)", fontSize: "8.5px" }}>
                    {seg.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            {/* Live channel + ecosystem */}
            <div className="space-y-2">
              <a
                href="https://x.com/RSRIntel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded px-3 py-2.5"
                style={{
                  border: "1px solid rgba(155,175,170,0.1)",
                  background: "rgba(0,0,0,0.2)",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(155,175,170,0.42)", fontSize: "7.5px", letterSpacing: "0.14em", marginBottom: 2 }}>
                    Live Channel
                  </div>
                  <div className="font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.65)", fontSize: "9.5px" }}>
                    @RSRIntel on X
                  </div>
                </div>
                <span style={{ color: "rgba(155,175,170,0.32)", fontSize: "12px" }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
