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
    text: "Monitored sources deliver signals into the INDEX architecture continuously. Intake is structured — sources are classified, signals are logged, and triage determines what enters the record.",
  },
  {
    id: "02",
    label: "Data Structuring",
    text: "Validated signals are structured into datasets and indexed records. Structuring imposes classification, scope definition, and source attribution on raw input.",
  },
  {
    id: "03",
    label: "Record Index",
    text: "Structured data accumulates into a searchable, traversable index. Records are discrete, scoped entries — not notes, not drafts. Each carries defined status and evidence attribution.",
  },
];

export default function LeftPanel({ hoveredSegment, segments }: LeftPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 border-r border-border p-6 gap-6 shrink-0 overflow-y-auto">
      <div>
        <div
          className="font-mono-tactical text-xs tracking-widest uppercase mb-3"
          style={{ color: "rgba(34,197,94,0.35)", letterSpacing: "0.22em" }}
        >
          Public Data Network
        </div>
        <h1
          className="font-orbitron text-3xl font-bold tracking-wide leading-none"
          style={{ color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.2)" }}
        >
          INDEX
        </h1>
        <p className="mt-4 font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.9" }}>
          A structured data and signal network. INDEX monitors inputs, structures them into classified datasets,
          and builds a traversable record index — the public-facing layer of a larger analytical infrastructure.
        </p>
      </div>

      <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />

      {activeSegment ? (
        <div
          className="rounded p-4 space-y-2 transition-all duration-300"
          style={{ border: "1px solid rgba(34,197,94,0.22)", background: "rgba(34,197,94,0.04)" }}
        >
          <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.4)" }}>
            Sector Selected
          </div>
          <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#22c55e" }}>
            {activeSegment.label}
          </div>
          <div className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
            {activeSegment.description}
          </div>
          {activeSegment.methodology && (
            <div className="pt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.32)", letterSpacing: "0.04em" }}>
              — {activeSegment.methodology}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.3)", letterSpacing: "0.2em" }}>
            Platform Structure
          </div>
          {PILLARS.map((p) => (
            <div key={p.id} className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-tactical text-xs flex-shrink-0" style={{ color: "rgba(34,197,94,0.3)", fontSize: "9px" }}>
                  {p.id}
                </span>
                <div className="w-px h-3 flex-shrink-0" style={{ background: "rgba(34,197,94,0.45)" }} />
                <span className="font-orbitron text-xs font-semibold tracking-wider" style={{ color: "rgba(34,197,94,0.75)", fontSize: "9.5px" }}>
                  {p.label}
                </span>
              </div>
              <p className="font-mono-tactical text-xs leading-relaxed pl-8" style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.85", fontSize: "10.5px" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
        <p className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.18)", lineHeight: "1.8", fontSize: "10px" }}>
          Navigate the command wheel to explore INDEX sectors. Hover to preview. Click to enter.
        </p>
      </div>
    </div>
  );
}
