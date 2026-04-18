interface Segment {
  label: string;
  path: string;
  description: string;
}

interface LeftPanelProps {
  hoveredSegment: string | null;
  segments: Segment[];
}

const toolLinks = [
  { label: "Flowise", url: "http://192.168.12.228:3025", tag: "AI-FLOW" },
  { label: "Intel Board", url: "http://192.168.12.228:3000", tag: "GRAFANA" },
  { label: "Open WebUI", url: "http://192.168.12.228:3001", tag: "LLM-UI" },
  { label: "Portainer", url: "http://192.168.12.228:9000", tag: "DOCKER" },
];

export default function LeftPanel({ hoveredSegment, segments }: LeftPanelProps) {
  const activeSegment = segments.find((s) => s.label === hoveredSegment);

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 border-r border-border p-5 gap-5 shrink-0 overflow-y-auto">
      <div>
        <div className="font-mono-tactical text-xs text-green-400/50 tracking-widest uppercase mb-1">
          RSR Intelligence Network
        </div>
        <h1 className="font-orbitron text-xl font-bold text-green-400 tracking-wider leading-tight glow-green-text">
          Command Wheel
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-mono-tactical leading-relaxed">
          Segmented operator interface for rapid module access and situational awareness.
        </p>
      </div>

      <div className="border border-border rounded bg-card p-3 space-y-2" data-testid="status-card">
        <div className="flex items-center justify-between">
          <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase">Core Status</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-pulse" />
            <span className="font-mono-tactical text-xs text-green-400">NOMINAL</span>
          </div>
        </div>
        <div className="h-px bg-border" />
        <div className="space-y-1.5">
          {[
            { label: "UPLINK", value: "SECURE", ok: true },
            { label: "AUTH", value: "ACTIVE", ok: true },
            { label: "THREAT LVL", value: "LOW", ok: true },
            { label: "MODULES", value: "6/6 LOADED", ok: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="font-mono-tactical text-xs text-muted-foreground tracking-wider">{item.label}</span>
              <span className={`font-mono-tactical text-xs ${item.ok ? "text-green-400/80" : "text-red-400"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {hoveredSegment && activeSegment ? (
        <div className="border border-green-500/30 rounded bg-green-500/5 p-3 glow-green-border transition-all duration-200" data-testid="active-segment-info">
          <div className="font-mono-tactical text-xs text-green-400/60 tracking-widest uppercase mb-1">
            Selected Module
          </div>
          <div className="font-orbitron text-sm font-bold text-green-400 tracking-wider">
            {activeSegment.label}
          </div>
          <div className="mt-1 font-mono-tactical text-xs text-muted-foreground">
            {activeSegment.description}
          </div>
          <div className="mt-2 font-mono-tactical text-xs text-green-400/50 tracking-widest">
            → {activeSegment.path}
          </div>
        </div>
      ) : (
        <div className="border border-border rounded bg-card/50 p-3">
          <div className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase mb-2">
            Module Index
          </div>
          <div className="space-y-1.5">
            {["SYSTEMS", "SIGNALS", "TOOLS", "FILES", "BRIEFS", "NETWORK"].map((mod, i) => (
              <div key={mod} className="flex items-center gap-2">
                <span className="font-mono-tactical text-xs text-green-400/30">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto space-y-1.5">
        <div className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase mb-2">
          Live Tool Links
        </div>
        {toolLinks.map((tool) => (
          <a
            key={tool.label}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-${tool.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex items-center justify-between border border-border hover:border-green-500/40 rounded p-2.5 bg-card hover:bg-green-500/5 transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400/50 group-hover:bg-green-400 transition-colors status-pulse" />
              <span className="font-orbitron text-xs font-medium text-foreground/80 group-hover:text-green-400 transition-colors tracking-wide">
                {tool.label}
              </span>
            </div>
            <span className="font-mono-tactical text-xs text-muted-foreground group-hover:text-green-400/60 transition-colors tracking-widest">
              {tool.tag}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
