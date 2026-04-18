import AppShell from "@/components/AppShell";
import SectionPanel from "@/components/SectionPanel";
import StatusPill from "@/components/StatusPill";

const SYSTEMS = [
  {
    id: "AXION",
    purpose: "AI orchestration layer. Manages inference routing, model selection, and prompt pipelines across connected LLM endpoints.",
    integration: "Flowise endpoint",
    endpoint: "http://192.168.12.228:3025",
    status: "ready" as const,
    integrationStatus: "UI shell active — endpoint not bound",
    modules: ["Prompt Router", "Model Registry", "Pipeline Builder"],
  },
  {
    id: "ORION",
    purpose: "Observability and monitoring core. Collects telemetry, dashboards, and infrastructure health across the RSR stack.",
    integration: "Grafana / Intel Board",
    endpoint: "http://192.168.12.228:3000",
    status: "ready" as const,
    integrationStatus: "UI shell active — live feed not connected",
    modules: ["Dashboard Engine", "Alert Manager", "Metric Collector"],
  },
  {
    id: "SAGE",
    purpose: "Conversational intelligence interface. Hosts LLM interaction sessions, document Q&A, and reasoning workflows.",
    integration: "Open WebUI",
    endpoint: "http://192.168.12.228:3001",
    status: "ready" as const,
    integrationStatus: "UI shell active — session binding pending",
    modules: ["Chat Interface", "Document Ingestion", "Context Manager"],
  },
];

export default function SystemsPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.45)" }}>
              Module / Systems
            </div>
            <h1 className="font-orbitron text-2xl font-bold tracking-widest" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
              SYSTEMS
            </h1>
            <p className="mt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
              Infrastructure overview — active system nodes and integration states
            </p>
          </div>
          <StatusPill status="ready" label="3 SYSTEMS REGISTERED" />
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
        >
          {SYSTEMS.map((sys) => (
            <div
              key={sys.id}
              data-testid={`system-card-${sys.id.toLowerCase()}`}
              className="rounded flex flex-col"
              style={{
                border: "1px solid rgba(34,197,94,0.15)",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center font-orbitron text-xs font-bold"
                    style={{
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      color: "#22c55e",
                    }}
                  >
                    {sys.id.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-orbitron text-sm font-bold tracking-widest" style={{ color: "#22c55e" }}>
                      {sys.id}
                    </div>
                    <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.4)", fontSize: "10px" }}>
                      {sys.integration}
                    </div>
                  </div>
                </div>
                <StatusPill status={sys.status} />
              </div>

              <div className="px-4 py-3 space-y-3">
                <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(34,197,94,0.55)" }}>
                  {sys.purpose}
                </p>

                <div
                  className="rounded px-3 py-2"
                  style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.08)" }}
                >
                  <div className="font-mono-tactical text-xs mb-1" style={{ color: "rgba(34,197,94,0.35)", fontSize: "10px" }}>
                    INTEGRATION STATUS
                  </div>
                  <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.5)" }}>
                    {sys.integrationStatus}
                  </div>
                </div>

                <div>
                  <div className="font-mono-tactical text-xs mb-1.5" style={{ color: "rgba(34,197,94,0.3)", fontSize: "10px" }}>
                    MODULES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sys.modules.map((m) => (
                      <span
                        key={m}
                        className="font-mono-tactical text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(34,197,94,0.06)",
                          border: "1px solid rgba(34,197,94,0.12)",
                          color: "rgba(34,197,94,0.5)",
                          fontSize: "10px",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between pt-1"
                  style={{ borderTop: "1px solid rgba(34,197,94,0.08)" }}
                >
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.3)", fontSize: "10px" }}>
                    {sys.endpoint}
                  </span>
                  <a
                    href={sys.endpoint}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`launch-${sys.id.toLowerCase()}`}
                    className="font-mono-tactical text-xs px-3 py-1 rounded transition-all duration-150"
                    style={{
                      border: "1px solid rgba(34,197,94,0.25)",
                      color: "rgba(34,197,94,0.7)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.5)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#22c55e";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.25)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(34,197,94,0.7)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }}
                  >
                    OPEN →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionPanel title="Deployment Target" subtitle="Container orchestration layer">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="space-y-0.5">
              <div className="font-orbitron text-sm font-semibold tracking-wider" style={{ color: "#22c55e" }}>Portainer</div>
              <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.4)" }}>Docker management — http://192.168.12.228:9000</div>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill status="ready" />
              <a
                href="http://192.168.12.228:9000"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="launch-portainer"
                className="font-mono-tactical text-xs px-3 py-1.5 rounded transition-all duration-150"
                style={{ border: "1px solid rgba(34,197,94,0.25)", color: "rgba(34,197,94,0.7)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#22c55e";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.25)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(34,197,94,0.7)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                OPEN PORTAINER →
              </a>
            </div>
          </div>
        </SectionPanel>
      </div>
    </AppShell>
  );
}
