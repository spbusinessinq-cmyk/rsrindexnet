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

const DEFAULT_CONTENT = {
  headline: "How the architecture works",
  paragraphs: [
    "RSR Intelligence Network operates across six defined sectors. Each sector represents a distinct layer of the intelligence cycle — from signal intake through synthesis to structured output.",
    "The command wheel is the primary navigation surface. Each segment maps to a functional layer with its own scope, methodology, and analytical role within the broader RSR architecture.",
    "Hover any segment to review its function. Click to enter that sector.",
  ],
};

const SECTOR_DETAILS: Record<string, { tagline: string; points: string[] }> = {
  SYSTEMS: {
    tagline: "How the intelligence infrastructure is structured",
    points: [
      "Each system has a defined role in the analytical workflow",
      "AXION, ORION, and SAGE form the operational core",
      "System health and integration state are continuously monitored",
      "Infrastructure is containerized and stack-managed",
    ],
  },
  SIGNALS: {
    tagline: "How raw information enters the analytical cycle",
    points: [
      "Signals are captured from monitored open and structured sources",
      "Each signal is triaged before entering the record layer",
      "Classification determines routing into analysis or archive",
      "Signal volume is tracked — pattern density is meaningful",
    ],
  },
  FILES: {
    tagline: "How signals become structured analytical records",
    points: [
      "A file is a completed unit of analytical work",
      "Each file carries source documentation and evidence chains",
      "Files are scoped — they do not speculate beyond the record",
      "The archive grows incrementally as cases are closed",
    ],
  },
  BRIEFS: {
    tagline: "How structured analysis reaches decision-ready form",
    points: [
      "Briefs synthesize across multiple files and signal threads",
      "Each brief carries a stated confidence level",
      "Analytical conclusions are separated from raw observation",
      "Briefs are written for action, not documentation",
    ],
  },
  NETWORK: {
    tagline: "How the components of RSR relate to each other",
    points: [
      "The network map documents information flow and system relationships",
      "Data topology is as important as the data itself",
      "Dependency modeling identifies structural risk",
      "The architecture is designed to be legible, not obscured",
    ],
  },
  ACCESS: {
    tagline: "How the operational layer is separated from the public face",
    points: [
      "The ACCESS layer is not public — entry requires verification",
      "Operator tools and live environments sit behind this threshold",
      "The public interface documents what RSR does",
      "The operator layer is where RSR operates",
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
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              Sector — {activeSegment.label}
            </div>
            <div
              className="font-orbitron text-base font-bold tracking-wide leading-snug"
              style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.2)" }}
            >
              {sectorDetail.tagline}
            </div>
          </div>

          <div className="h-px" style={{ background: "rgba(34,197,94,0.1)" }} />

          {activeSegment.detail && (
            <p
              className="font-mono-tactical text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.9", fontSize: "11px" }}
            >
              {activeSegment.detail}
            </p>
          )}

          <div className="space-y-2.5">
            {sectorDetail.points.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "rgba(34,197,94,0.55)" }}
                />
                <span
                  className="font-mono-tactical text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.8", fontSize: "10.5px" }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>

          {activeSegment.methodology && (
            <>
              <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />
              <div className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.35)" }}>
                {activeSegment.methodology}
              </div>
            </>
          )}

          <div
            className="rounded p-3 flex items-center justify-between"
            style={{ border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.03)" }}
          >
            <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.4)" }}>
              ENTER SECTOR
            </span>
            <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.3)" }}>
              {activeSegment.path}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              Architecture Overview
            </div>
            <div
              className="font-orbitron text-base font-bold tracking-wide leading-snug"
              style={{ color: "rgba(34,197,94,0.75)" }}
            >
              {DEFAULT_CONTENT.headline}
            </div>
          </div>

          <div className="h-px" style={{ background: "rgba(34,197,94,0.08)" }} />

          {DEFAULT_CONTENT.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-mono-tactical text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9", fontSize: "11px" }}
            >
              {p}
            </p>
          ))}

          <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />

          <div className="space-y-2">
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.3)" }}
            >
              Sector Index
            </div>
            {segments.map((seg, i) => (
              <div key={seg.label} className="flex items-center gap-2.5 py-0.5">
                <span
                  className="font-mono-tactical text-xs flex-shrink-0"
                  style={{ color: "rgba(34,197,94,0.25)", fontSize: "9.5px" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.07)" }} />
                <span
                  className="font-orbitron text-xs font-semibold tracking-wider flex-shrink-0"
                  style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px" }}
                >
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
