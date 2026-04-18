import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";

const LAYERS = [
  {
    id: "INTAKE",
    label: "Signal Intake",
    description: "The first layer — where monitored sources deliver raw information into the RSR environment. Signals are received, timestamped, and staged for triage before entering the analytical cycle.",
    connections: ["Open source feeds", "Structured data streams", "Webhook endpoints"],
    status: "Awaiting source binding",
  },
  {
    id: "PROCESS",
    label: "Processing Core",
    description: "The analytical middle layer — where AXION, ORION, and SAGE operate. Signals are triaged, classified, and routed. AI orchestration, monitoring, and inference occur here, transforming raw intake into usable analytical material.",
    connections: ["AXION orchestration", "ORION telemetry", "SAGE reasoning"],
    status: "Architecture documented",
  },
  {
    id: "OUTPUT",
    label: "Output Layer",
    description: "Where analytical work exits the processing core. Files are committed to the record. Briefs are issued. The output layer is the boundary between internal analysis and deliverable intelligence.",
    connections: ["Files record layer", "Briefs synthesis layer", "Archive and version control"],
    status: "Shell active",
  },
];

const RELATIONSHIPS = [
  { from: "SIGNALS", to: "AXION", description: "Signal intake routes through AXION for classification and pipeline routing" },
  { from: "AXION", to: "SAGE", description: "AXION dispatches reasoning tasks to SAGE for LLM-assisted analysis" },
  { from: "ORION", to: "AXION", description: "ORION surfaces system health data that informs AXION routing decisions" },
  { from: "AXION", to: "FILES", description: "Processed signals are committed to structured file records" },
  { from: "FILES", to: "BRIEFS", description: "Files are synthesized into executive briefs and recurring reports" },
];

export default function NetworkPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-8 max-w-5xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              MODULE / NETWORK
            </div>
            <h1
              className="font-orbitron text-3xl font-bold tracking-wider"
              style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}
            >
              NETWORK
            </h1>
            <p className="mt-2 font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              How information moves — architectural layers, system relationships, and intelligence flow topology
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
            style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.5)", background: "rgba(34,197,94,0.04)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.4)" }} />
            TOPOLOGY MAPPED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.id}
              data-testid={`layer-${layer.id.toLowerCase()}`}
              className="rounded p-5 space-y-3 flex flex-col"
              style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.2)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="font-mono-tactical text-xs tracking-widest"
                    style={{ color: "rgba(34,197,94,0.35)", fontSize: "9px" }}
                  >
                    LAYER {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="font-orbitron text-sm font-bold tracking-wider mt-0.5"
                    style={{ color: "#22c55e" }}
                  >
                    {layer.label}
                  </div>
                </div>
              </div>

              <p
                className="font-mono-tactical text-xs leading-relaxed flex-1"
                style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.85", fontSize: "10.5px" }}
              >
                {layer.description}
              </p>

              <div className="space-y-1" style={{ borderTop: "1px solid rgba(34,197,94,0.07)", paddingTop: "10px" }}>
                {layer.connections.map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full" style={{ background: "rgba(34,197,94,0.35)" }} />
                    <span className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.28)", fontSize: "10px" }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="font-mono-tactical text-xs tracking-widest"
                style={{ color: "rgba(34,197,94,0.3)", fontSize: "9.5px" }}
              >
                {layer.status}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <div
              className="rounded"
              style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.15)" }}
            >
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}
              >
                <span className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.35)" }}>
                  Information Flow
                </span>
              </div>

              <div className="relative" style={{ height: 200, overflow: "hidden" }}>
                <svg width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.22 }}>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                    </marker>
                  </defs>

                  {[
                    { x: 70, y: 90, label: "SIGNALS" },
                    { x: 200, y: 50, label: "AXION" },
                    { x: 200, y: 130, label: "ORION" },
                    { x: 340, y: 90, label: "SAGE" },
                    { x: 470, y: 55, label: "FILES" },
                    { x: 470, y: 130, label: "BRIEFS" },
                  ].map((node) => (
                    <g key={node.label}>
                      <rect x={node.x - 32} y={node.y - 11} width={64} height={22} rx="2" fill="none" stroke="#22c55e" strokeWidth="0.8" />
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="monospace" letterSpacing="0.08em">
                        {node.label}
                      </text>
                    </g>
                  ))}

                  <line x1="102" y1="85" x2="164" y2="60" stroke="#22c55e" strokeWidth="0.7" markerEnd="url(#arrow)" strokeDasharray="4 3" />
                  <line x1="232" y1="55" x2="304" y2="82" stroke="#22c55e" strokeWidth="0.7" markerEnd="url(#arrow)" strokeDasharray="4 3" />
                  <line x1="200" y1="119" x2="200" y2="65" stroke="#22c55e" strokeWidth="0.6" markerEnd="url(#arrow)" strokeDasharray="3 4" />
                  <line x1="372" y1="82" x2="434" y2="62" stroke="#22c55e" strokeWidth="0.7" markerEnd="url(#arrow)" strokeDasharray="4 3" />
                  <line x1="470" y1="66" x2="470" y2="119" stroke="#22c55e" strokeWidth="0.6" markerEnd="url(#arrow)" strokeDasharray="3 4" />
                </svg>
                <div className="absolute inset-0 flex items-end justify-start px-5 pb-3">
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.2)", fontSize: "9px" }}>
                    Schematic — not a live topology feed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded p-5 space-y-3"
            style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.15)" }}
          >
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase"
              style={{ color: "rgba(34,197,94,0.35)" }}
            >
              System Relationships
            </div>
            <div className="space-y-3">
              {RELATIONSHIPS.map((rel, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-orbitron text-xs font-semibold"
                      style={{ color: "rgba(34,197,94,0.65)", fontSize: "9px" }}
                    >
                      {rel.from}
                    </span>
                    <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.25)", fontSize: "9px" }}>
                      →
                    </span>
                    <span
                      className="font-orbitron text-xs font-semibold"
                      style={{ color: "rgba(34,197,94,0.65)", fontSize: "9px" }}
                    >
                      {rel.to}
                    </span>
                  </div>
                  <p
                    className="font-mono-tactical text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.28)", fontSize: "10px", lineHeight: "1.75" }}
                  >
                    {rel.description}
                  </p>
                  {i < RELATIONSHIPS.length - 1 && (
                    <div style={{ height: "1px", background: "rgba(34,197,94,0.06)", marginTop: "8px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
