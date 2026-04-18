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
}

const PILLARS = [
  {
    id: "01",
    label: "Signal Intake",
    text: "Monitored sources deliver signals into INDEX continuously. Intake is structured — sources are classified, signals are logged, and triage determines what enters the record.",
  },
  {
    id: "02",
    label: "Data Structuring",
    text: "Validated signals are structured into datasets and indexed records. Structuring applies classification, scope definition, and source attribution.",
  },
  {
    id: "03",
    label: "Record Index",
    text: "Structured data accumulates into a searchable, traversable index. Records are discrete, scoped entries with defined status and evidence attribution.",
  },
];

export default function LeftPanel({ hoveredSegment, segments }: LeftPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);

  return (
    <div
      className="hidden lg:flex flex-col shrink-0 overflow-y-auto"
      style={{ borderRight: "1px solid rgba(34,197,94,0.07)", width: 272 }}
    >
      {/* Identity block */}
      <div className="px-6 pt-7 pb-5" style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
        <div className="font-mono-tactical tracking-widest uppercase mb-1"
          style={{ color: "rgba(34,197,94,0.42)", letterSpacing: "0.2em", fontSize: "9px" }}>
          RSR Intelligence Network
        </div>
        <h2 className="font-orbitron text-4xl font-bold tracking-wide leading-none mb-1"
          style={{ color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.16)", letterSpacing: "0.04em" }}>
          INDEX
        </h2>
        <div className="font-mono-tactical mb-4"
          style={{ color: "rgba(155,175,170,0.5)", fontSize: "9px", letterSpacing: "0.16em" }}>
          Data Systems Division
        </div>
        <p className="font-mono-tactical leading-relaxed"
          style={{ color: "rgba(185,205,200,0.6)", lineHeight: "1.92", fontSize: "11px" }}>
          The public-facing data network of the RSR Intelligence Network. INDEX monitors signals,
          structures them into classified datasets, and builds a traversable record index.
        </p>
      </div>

      {/* Dynamic content — adapts on hover */}
      <div className="flex-1 px-6 py-5">
        {activeSegment ? (
          <div key={activeSegment.label} className="panel-fade-in space-y-4">
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.2em" }}>
              Sector Preview
            </div>
            <div>
              <div className="font-orbitron text-sm font-bold tracking-wider mb-2"
                style={{ color: "#22c55e" }}>
                {activeSegment.label}
              </div>
              <div className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.92", fontSize: "11px" }}>
                {activeSegment.description}
              </div>
            </div>
            {activeSegment.methodology && (
              <div className="pt-1">
                <div className="h-px mb-3" style={{ background: "rgba(34,197,94,0.07)" }} />
                <div className="font-mono-tactical italic"
                  style={{ color: "rgba(34,197,94,0.42)", fontSize: "10px", lineHeight: "1.75" }}>
                  {activeSegment.methodology}
                </div>
              </div>
            )}
            <div className="rounded px-3 py-2 flex items-center gap-2 mt-1"
              style={{ border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.04)" }}>
              <div className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "#22c55e", boxShadow: "0 0 4px #22c55e" }} />
              <span className="font-mono-tactical"
                style={{ color: "rgba(34,197,94,0.58)", fontSize: "9.5px", letterSpacing: "0.08em" }}>
                Click to enter {activeSegment.label}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.48)", fontSize: "9px", letterSpacing: "0.2em" }}>
              Platform Structure
            </div>
            {PILLARS.map((p) => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-tactical flex-shrink-0"
                    style={{ color: "rgba(34,197,94,0.32)", fontSize: "8.5px" }}>{p.id}</span>
                  <div className="w-px h-3 flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.38)" }} />
                  <span className="font-orbitron font-semibold tracking-wider"
                    style={{ color: "rgba(34,197,94,0.72)", fontSize: "9.5px" }}>{p.label}</span>
                </div>
                <p className="font-mono-tactical leading-relaxed pl-7"
                  style={{ color: "rgba(185,205,200,0.55)", lineHeight: "1.88", fontSize: "10.5px" }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
        <p className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.38)", lineHeight: "1.8", fontSize: "10px" }}>
          Hover a sector to inspect. Click to enter.
        </p>
      </div>
    </div>
  );
}
