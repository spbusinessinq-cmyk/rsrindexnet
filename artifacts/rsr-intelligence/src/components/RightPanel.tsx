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

const DEFAULT = {
  headline: "Signal to structure — how INDEX works",
  paragraphs: [
    "INDEX operates a defined pipeline: signals are monitored, classified, and structured into datasets and indexed records. The command wheel maps the six public sectors of this platform.",
    "Each sector represents a distinct layer of the INDEX architecture — from signal intake through structured data to the access boundary between public and restricted layers.",
    "Hover any sector to review its scope. Click to enter.",
  ],
};

const SECTOR_DETAILS: Record<string, { tagline: string; points: string[] }> = {
  OVERVIEW: {
    tagline: "What INDEX is and how it works",
    points: [
      "INDEX is a structured data and signal network, not a content platform",
      "The public interface documents what the platform does and how it operates",
      "Signal intake, data structuring, and record indexing form the core pipeline",
      "Deeper analytical layers exist behind the ACCESS threshold",
    ],
  },
  SIGNALS: {
    tagline: "How monitored inputs enter the INDEX architecture",
    points: [
      "Signal categories are defined before monitoring begins — not after",
      "Sources are classified on intake: reliability, type, and recency weight",
      "High-volume sources are filtered by relevance, not ingested wholesale",
      "Signals that don't meet triage criteria are logged and dismissed — not discarded silently",
    ],
  },
  DATASETS: {
    tagline: "How structured data is organized into collections",
    points: [
      "Datasets are organized by domain, subject class, or tracked activity type",
      "A dataset grows as new signals are structured and appended to its scope",
      "Dataset boundaries are defined — records cannot be cross-filed without explicit linking",
      "Public datasets reflect structure only — restricted data requires ACCESS verification",
    ],
  },
  INDEX: {
    tagline: "How structured records form the searchable data layer",
    points: [
      "The index is not a file vault — it is a structured, queryable record of classified data",
      "Each record has a defined scope, source attribution, and classification status",
      "Records are discrete — no open-ended notes or unsourced entries",
      "The index grows incrementally as new signals are structured and committed",
    ],
  },
  METHOD: {
    tagline: "How the operation collects, classifies, and synthesizes",
    points: [
      "Collection discipline defines which sources are worth monitoring",
      "Classification logic determines how signals are routed into datasets",
      "Structuring rules govern what makes a valid record entry",
      "Synthesis flows from indexed records outward — not from raw signal intake",
    ],
  },
  ACCESS: {
    tagline: "Where the public interface ends and the operational layer begins",
    points: [
      "ACCESS is the boundary between documentation and operation",
      "Deeper datasets, live feeds, and analytical tools exist behind this threshold",
      "Entry is not public — verification is required",
      "The platform is designed to support tiered access: public, restricted, operator",
    ],
  },
};

export default function RightPanel({ hoveredSegment, segments }: RightPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);
  const sectorDetail = hoveredSegment ? SECTOR_DETAILS[hoveredSegment] : null;

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 border-l border-border p-6 gap-5 shrink-0 overflow-y-auto">
      {activeSegment && sectorDetail ? (
        <div className="space-y-5 transition-all duration-300">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(34,197,94,0.38)" }}>
              Sector — {activeSegment.label}
            </div>
            <div className="font-orbitron text-base font-bold tracking-wide leading-snug" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.18)" }}>
              {sectorDetail.tagline}
            </div>
          </div>

          <div className="h-px" style={{ background: "rgba(34,197,94,0.09)" }} />

          {activeSegment.detail && (
            <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", lineHeight: "1.9", fontSize: "11px" }}>
              {activeSegment.detail}
            </p>
          )}

          <div className="space-y-2.5">
            {sectorDetail.points.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(34,197,94,0.5)" }} />
                <span className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.8", fontSize: "10.5px" }}>
                  {point}
                </span>
              </div>
            ))}
          </div>

          {activeSegment.methodology && (
            <>
              <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />
              <div className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.32)" }}>
                {activeSegment.methodology}
              </div>
            </>
          )}

          <div className="rounded p-3 flex items-center justify-between"
            style={{ border: "1px solid rgba(34,197,94,0.14)", background: "rgba(34,197,94,0.03)" }}>
            <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.38)" }}>ENTER SECTOR</span>
            <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.28)" }}>{activeSegment.path}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(34,197,94,0.38)" }}>
              Platform Overview
            </div>
            <div className="font-orbitron text-base font-bold tracking-wide leading-snug" style={{ color: "rgba(34,197,94,0.7)" }}>
              {DEFAULT.headline}
            </div>
          </div>

          <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />

          {DEFAULT.paragraphs.map((p, i) => (
            <p key={i} className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.32)", lineHeight: "1.9", fontSize: "11px" }}>
              {p}
            </p>
          ))}

          <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

          <div className="space-y-2">
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.28)" }}>
              Sector Index
            </div>
            {segments.map((seg, i) => (
              <div key={seg.label} className="flex items-center gap-2.5 py-0.5">
                <span className="font-mono-tactical text-xs flex-shrink-0" style={{ color: "rgba(34,197,94,0.22)", fontSize: "9.5px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.07)" }} />
                <span className="font-orbitron text-xs font-semibold tracking-wider flex-shrink-0" style={{ color: "rgba(34,197,94,0.42)", fontSize: "8.5px" }}>
                  {seg.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
