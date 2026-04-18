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

const CAPABILITIES = [
  {
    id: "SIG",
    label: "Signal Monitoring",
    text: "We track structured and open-source information streams, applying triage logic to surface patterns before they become noise.",
  },
  {
    id: "SYN",
    label: "Intelligence Synthesis",
    text: "Raw signals are transformed into structured analytical products — files, briefs, and records that carry traceable evidentiary chains.",
  },
  {
    id: "SYS",
    label: "Systems Mapping",
    text: "We document the architecture of complex systems — how components relate, how data flows, how operations sustain themselves.",
  },
];

export default function LeftPanel({ hoveredSegment, segments }: LeftPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 border-r border-border p-6 gap-6 shrink-0 overflow-y-auto">
      <div>
        <div
          className="font-mono-tactical text-xs tracking-widest uppercase mb-3"
          style={{ color: "rgba(34,197,94,0.4)", letterSpacing: "0.2em" }}
        >
          RSR Intelligence Network
        </div>
        <h1 className="font-orbitron text-2xl font-bold tracking-wide leading-tight" style={{ color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.25)" }}>
          Intelligence<br />Infrastructure
        </h1>
        <p className="mt-4 font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.9" }}>
          RSR Intelligence Network is a data and intelligence operation focused on signal monitoring,
          analytical synthesis, and systems mapping — structured to produce operational understanding
          from complex information environments.
        </p>
      </div>

      <div className="h-px" style={{ background: "rgba(34,197,94,0.08)" }} />

      {activeSegment ? (
        <div
          className="rounded p-4 space-y-2 transition-all duration-300"
          style={{
            border: "1px solid rgba(34,197,94,0.25)",
            background: "rgba(34,197,94,0.04)",
            boxShadow: "0 0 20px rgba(34,197,94,0.06)",
          }}
        >
          <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.45)" }}>
            Selected Sector
          </div>
          <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#22c55e" }}>
            {activeSegment.label}
          </div>
          <div className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
            {activeSegment.description}
          </div>
          {activeSegment.methodology && (
            <div className="pt-1 font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.35)" }}>
              — {activeSegment.methodology}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.35)", letterSpacing: "0.18em" }}>
            Core Capabilities
          </div>
          {CAPABILITIES.map((cap) => (
            <div key={cap.id} className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-px h-3 flex-shrink-0"
                  style={{ background: "rgba(34,197,94,0.5)" }}
                />
                <span className="font-orbitron text-xs font-semibold tracking-wider" style={{ color: "rgba(34,197,94,0.8)", fontSize: "9.5px" }}>
                  {cap.label}
                </span>
              </div>
              <p className="font-mono-tactical text-xs leading-relaxed pl-4" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.85", fontSize: "10.5px" }}>
                {cap.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
        <div className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em", lineHeight: "1.8" }}>
          Use the command wheel to navigate the intelligence architecture.
          Hover any sector to review its scope.
        </div>
      </div>
    </div>
  );
}
