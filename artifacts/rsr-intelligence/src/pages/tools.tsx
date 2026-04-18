import AppShell from "@/components/AppShell";
import SectionPanel from "@/components/SectionPanel";
import StatusPill from "@/components/StatusPill";

const TOOLS = [
  {
    id: "flowise",
    label: "Flowise",
    tag: "AI-FLOW",
    endpoint: "http://192.168.12.228:3025",
    purpose: "AI workflow builder and LLM orchestration. Build, test, and deploy prompt pipelines with a visual node editor.",
    status: "ready" as const,
    category: "AI / Orchestration",
    features: ["Visual Flow Builder", "LLM Chaining", "API Endpoint Export", "Agent Tools"],
  },
  {
    id: "intel-board",
    label: "Intel Board",
    tag: "GRAFANA",
    endpoint: "http://192.168.12.228:3000",
    purpose: "Observability and metrics dashboard. Monitor infrastructure telemetry, system health, and operational data in real time.",
    status: "ready" as const,
    category: "Monitoring / Observability",
    features: ["Live Dashboards", "Alert Rules", "Data Sources", "Panel Explorer"],
  },
  {
    id: "open-webui",
    label: "Open WebUI",
    tag: "LLM-UI",
    endpoint: "http://192.168.12.228:3001",
    purpose: "Self-hosted LLM interface. Interact with local and remote language models via a clean conversational UI.",
    status: "ready" as const,
    category: "AI / Interface",
    features: ["Multi-model Support", "Chat History", "Document Q&A", "System Prompt Control"],
  },
  {
    id: "portainer",
    label: "Portainer",
    tag: "DOCKER",
    endpoint: "http://192.168.12.228:9000",
    purpose: "Container management and orchestration. Deploy, manage, and monitor Docker containers across the RSR infrastructure.",
    status: "ready" as const,
    category: "Infrastructure / Containers",
    features: ["Container Control", "Stack Management", "Volume & Network", "Registry Access"],
  },
];

export default function ToolsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.45)" }}>
              Module / Tools
            </div>
            <h1 className="font-orbitron text-2xl font-bold tracking-widest" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
              TOOLS
            </h1>
            <p className="mt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
              Operator toolkit — live local service endpoints available now
            </p>
          </div>
          <StatusPill status="active" label="4 TOOLS ACTIVE" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              data-testid={`tool-card-${tool.id}`}
              className="rounded flex flex-col"
              style={{
                border: "1px solid rgba(34,197,94,0.18)",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center font-mono-tactical text-xs font-bold"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.25)",
                      color: "#22c55e",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {tool.tag.split("-")[0]}
                  </div>
                  <div>
                    <div className="font-orbitron text-base font-bold tracking-wide" style={{ color: "#22c55e" }}>
                      {tool.label}
                    </div>
                    <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.4)", fontSize: "10px" }}>
                      {tool.category}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={tool.status} />
                </div>
              </div>

              <div className="px-5 py-4 space-y-4 flex-1">
                <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(34,197,94,0.55)" }}>
                  {tool.purpose}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {tool.features.map((f) => (
                    <span
                      key={f}
                      className="font-mono-tactical text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(34,197,94,0.05)",
                        border: "1px solid rgba(34,197,94,0.12)",
                        color: "rgba(34,197,94,0.45)",
                        fontSize: "10px",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid rgba(34,197,94,0.08)" }}
                >
                  <div>
                    <div className="font-mono-tactical" style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)", letterSpacing: "0.1em" }}>
                      ENDPOINT
                    </div>
                    <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                      {tool.endpoint}
                    </div>
                  </div>
                  <a
                    href={tool.endpoint}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`launch-tool-${tool.id}`}
                    className="font-orbitron text-xs font-semibold px-5 py-2 rounded transition-all duration-150"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "#22c55e",
                      letterSpacing: "0.12em",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.18)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.6)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 12px rgba(34,197,94,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.1)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.3)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                  >
                    LAUNCH →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionPanel title="Quick Reference" subtitle="All tool endpoints at a glance">
          <div className="divide-y" style={{ borderColor: "rgba(34,197,94,0.07)" }}>
            {TOOLS.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 4px #22c55e" }} />
                  <span className="font-orbitron text-xs font-semibold tracking-wide" style={{ color: "#22c55e", minWidth: 96 }}>
                    {tool.label}
                  </span>
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.4)" }}>
                    {tool.endpoint}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.3)", fontSize: "10px" }}>
                    {tool.tag}
                  </span>
                  <StatusPill status="ready" />
                </div>
              </div>
            ))}
          </div>
        </SectionPanel>
      </div>
    </AppShell>
  );
}
