import AppShell from "@/components/AppShell";

const OPERATOR_SYSTEMS = [
  {
    id: "AXION",
    label: "AXION",
    role: "AI Orchestration",
    description: "LLM inference routing, prompt pipeline management, and AI workflow orchestration. Flowise-powered visual node builder for building and testing agent architectures.",
    endpoint: "http://192.168.12.228:3025",
    tag: "FLOWISE",
    restricted: true,
  },
  {
    id: "ORION",
    label: "ORION",
    role: "Observability Platform",
    description: "Infrastructure telemetry, dashboard monitoring, alert management, and operational metrics. Live view of system health across the RSR stack.",
    endpoint: "http://192.168.12.228:3000",
    tag: "GRAFANA",
    restricted: true,
  },
  {
    id: "SAGE",
    label: "SAGE",
    role: "Conversational Intelligence",
    description: "Self-hosted LLM interface for operator sessions, document analysis, Q&A workflows, and model interaction. Multi-model support with session history.",
    endpoint: "http://192.168.12.228:3001",
    tag: "OPEN-WEBUI",
    restricted: true,
  },
  {
    id: "STACK",
    label: "STACK",
    role: "Container Management",
    description: "Docker container orchestration via Portainer. Stack deployment, service management, volume inspection, and infrastructure control for the full RSR environment.",
    endpoint: "http://192.168.12.228:9000",
    tag: "PORTAINER",
    restricted: true,
  },
];

export default function AccessPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              MODULE / ACCESS
            </div>
            <h1
              className="font-orbitron text-3xl font-bold tracking-wider"
              style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}
            >
              ACCESS
            </h1>
            <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              Operator layer — restricted environments and internal system access
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
            style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.6)", background: "rgba(34,197,94,0.04)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
            OPERATOR LAYER
          </div>
        </div>

        <div
          className="rounded p-5 space-y-2"
          style={{ border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.03)" }}
        >
          <div
            className="font-mono-tactical text-xs tracking-widest uppercase"
            style={{ color: "rgba(34,197,94,0.4)" }}
          >
            Restricted Zone
          </div>
          <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.9" }}>
            The systems accessible from this layer are internal operational environments. They are not
            public-facing products. Access is intended for RSR operators working directly with the
            intelligence infrastructure. If you are not an RSR operator, the public architecture
            documentation is available across the other modules.
          </p>
        </div>

        <div className="space-y-3">
          <div
            className="font-mono-tactical text-xs tracking-widest uppercase"
            style={{ color: "rgba(34,197,94,0.35)" }}
          >
            Internal Systems
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPERATOR_SYSTEMS.map((sys) => (
              <div
                key={sys.id}
                className="rounded p-5 space-y-3 flex flex-col"
                style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.25)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="font-mono-tactical text-xs px-1.5 py-0.5 rounded"
                        style={{ border: "1px solid rgba(34,197,94,0.25)", color: "rgba(34,197,94,0.7)", fontSize: "8.5px", letterSpacing: "0.1em" }}
                      >
                        {sys.tag}
                      </div>
                    </div>
                    <div
                      className="mt-2 font-orbitron text-base font-bold tracking-wider"
                      style={{ color: "#22c55e" }}
                    >
                      {sys.label}
                    </div>
                    <div
                      className="font-mono-tactical text-xs tracking-wider"
                      style={{ color: "rgba(34,197,94,0.5)", fontSize: "9.5px" }}
                    >
                      {sys.role}
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1 status-pulse"
                    style={{ background: "rgba(34,197,94,0.6)" }}
                  />
                </div>

                <p
                  className="font-mono-tactical text-xs leading-relaxed flex-1"
                  style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.85", fontSize: "10.5px" }}
                >
                  {sys.description}
                </p>

                <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid rgba(34,197,94,0.08)" }}>
                  <span
                    className="font-mono-tactical text-xs"
                    style={{ color: "rgba(34,197,94,0.3)", fontSize: "9.5px" }}
                  >
                    {sys.endpoint}
                  </span>
                  <a
                    href={sys.endpoint}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tactical text-xs px-3 py-1.5 rounded tracking-widest transition-all duration-200"
                    style={{
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "rgba(34,197,94,0.8)",
                      background: "rgba(34,197,94,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.05)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.3)";
                    }}
                  >
                    OPEN
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded p-4 space-y-1"
          style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.15)" }}
        >
          <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.3)" }}>
            Access Policy
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Authentication", value: "Local network required" },
              { label: "Environment", value: "Internal / non-public" },
              { label: "Classification", value: "Operator-restricted" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.4)", fontSize: "9.5px" }}>
                  {item.label}
                </span>
                <span className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
