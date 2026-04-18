interface Segment {
  label: string;
  path: string;
  description: string;
}

interface RightPanelProps {
  hoveredSegment: string | null;
  segments: Segment[];
}

const buildNotes = [
  { tag: "V2.0", note: "Radial command wheel — segmented layout finalized" },
  { tag: "NEXT", note: "Populate module pages per segment route" },
  { tag: "TODO", note: "Bind live data feeds to SIGNALS module" },
  { tag: "TODO", note: "Deploy via Portainer compose stack" },
];

export default function RightPanel({ hoveredSegment, segments }: RightPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 border-l border-border p-5 gap-5 shrink-0 overflow-y-auto">
      <div className="border border-border rounded bg-card p-3 space-y-3" data-testid="wheel-intent">
        <div className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase">
          Wheel Intent
        </div>
        <div className="h-px bg-border" />
        <p className="font-mono-tactical text-xs text-muted-foreground/80 leading-relaxed">
          The command wheel is the primary navigation surface for RSR Intelligence operations.
          Each segment maps directly to a functional module with its own route and operational scope.
        </p>
        <p className="font-mono-tactical text-xs text-muted-foreground/60 leading-relaxed">
          Hover segments to preview module context. Click to enter a module's operational space.
        </p>
      </div>

      <div className="border border-border rounded bg-card p-3 space-y-2.5" data-testid="route-info">
        <div className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase">
          Route Map
        </div>
        <div className="h-px bg-border" />
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            className={`flex items-start gap-2 py-0.5 transition-all duration-200 ${
              hoveredSegment === seg.label ? "opacity-100" : "opacity-50"
            }`}
          >
            <span className="font-mono-tactical text-xs text-green-400/60 mt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-orbitron text-xs font-semibold text-green-400/90 tracking-wider">
                  {seg.label}
                </span>
                <span className="font-mono-tactical text-xs text-muted-foreground tracking-wider">
                  {seg.path}
                </span>
              </div>
              <div className="font-mono-tactical text-xs text-muted-foreground/60 leading-relaxed">
                {seg.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeSegment && (
        <div
          className="border border-green-500/30 rounded bg-green-500/5 p-3 space-y-2 transition-all duration-200 glow-green-border"
          data-testid="active-module-detail"
        >
          <div className="font-mono-tactical text-xs text-green-400/60 tracking-widest uppercase">
            Active Module
          </div>
          <div className="font-orbitron text-base font-bold text-green-400 tracking-wider glow-green-text">
            {activeSegment.label}
          </div>
          <div className="font-mono-tactical text-xs text-muted-foreground leading-relaxed">
            {activeSegment.description}
          </div>
          <div className="h-px bg-green-500/20" />
          <div className="font-mono-tactical text-xs text-green-400/50">
            ENTER: Click segment to access module
          </div>
        </div>
      )}

      <div className="mt-auto border border-border rounded bg-card p-3 space-y-2.5" data-testid="build-notes">
        <div className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase">
          Build Notes
        </div>
        <div className="h-px bg-border" />
        {buildNotes.map((note, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`font-mono-tactical text-xs shrink-0 ${
              note.tag === "V2.0" ? "text-green-400/80" :
              note.tag === "NEXT" ? "text-green-400/60" :
              "text-muted-foreground/50"
            } tracking-widest`}>
              [{note.tag}]
            </span>
            <span className="font-mono-tactical text-xs text-muted-foreground/70 leading-relaxed">
              {note.note}
            </span>
          </div>
        ))}
        <div className="h-px bg-border" />
        <div className="font-mono-tactical text-xs text-muted-foreground/40 tracking-widest">
          TARGET: Portainer/Docker stack
        </div>
      </div>
    </div>
  );
}
