import AppShell from "@/components/AppShell";

const SYSTEMS = [
  {
    id: "AXION",
    badge: "AI",
    role: "Orchestration Layer",
    headline: "AI workflow routing and inference management",
    description: "AXION is the orchestration core of the RSR analytical stack. It manages model selection, prompt pipeline construction, and inference routing across connected AI endpoints. AXION does not generate output directly — it structures the environment in which intelligent processes operate.",
    capabilities: ["Prompt pipeline management", "Model registry and routing", "Agent workflow construction", "API endpoint abstraction"],
  },
  {
    id: "ORION",
    badge: "MON",
    role: "Observability Platform",
    headline: "Infrastructure monitoring and operational telemetry",
    description: "ORION tracks the health and operational status of the RSR infrastructure. Dashboards, alert rules, and metric collectors aggregate live system data into a unified observability surface. ORION makes the invisible visible — surfacing failures, latency, and behavioral patterns before they become operational problems.",
    capabilities: ["Live dashboard panels", "Alert rule management", "Metric collection and aggregation", "Operational health scoring"],
  },
  {
    id: "SAGE",
    badge: "LLM",
    role: "Conversational Intelligence",
    headline: "Language model interface and document reasoning",
    description: "SAGE provides the conversational intelligence layer — a self-hosted environment for language model interaction, document analysis, and structured Q&A. SAGE supports multi-model configurations and maintains session history for persistent analytical work. It is the interface between operator and inference.",
    capabilities: ["Multi-model session support", "Document ingestion and Q&A", "Context-aware reasoning", "Session history management"],
  },
];

const PRINCIPLES = [
  {
    label: "Defined Roles",
    text: "Every system in the RSR stack has a specific function. AXION orchestrates. ORION monitors. SAGE reasons. Clear role boundaries prevent operational confusion and reduce system dependency risk.",
  },
  {
    label: "Containerized Infrastructure",
    text: "All RSR systems operate within containerized environments, managed via stack deployment. This ensures reproducibility, isolation, and controlled upgrade paths across the full operational layer.",
  },
  {
    label: "Honest Status",
    text: "The system architecture is documented accurately. Where integrations are not yet live, this is stated. RSR does not present architectural theater — only operational reality.",
  },
];

export default function SystemsPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-8 max-w-5xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              MODULE / SYSTEMS
            </div>
            <h1
              className="font-orbitron text-3xl font-bold tracking-wider"
              style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}
            >
              SYSTEMS
            </h1>
            <p className="mt-2 font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              Core intelligence systems — architectural roles, operational scope, and capability mapping
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
            style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.6)", background: "rgba(34,197,94,0.04)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full status-pulse" style={{ background: "rgba(34,197,94,0.7)" }} />
            3 SYSTEMS DOCUMENTED
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {SYSTEMS.map((sys) => (
            <div
              key={sys.id}
              data-testid={`system-card-${sys.id.toLowerCase()}`}
              className="rounded"
              style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.2)" }}
            >
              <div
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded flex items-center justify-center font-mono-tactical font-bold flex-shrink-0"
                  style={{
                    background: "rgba(34,197,94,0.07)",
                    border: "1px solid rgba(34,197,94,0.18)",
                    color: "#22c55e",
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {sys.badge}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-orbitron text-base font-bold tracking-wider"
                      style={{ color: "#22c55e" }}
                    >
                      {sys.id}
                    </span>
                    <span
                      className="font-mono-tactical text-xs tracking-wider"
                      style={{ color: "rgba(34,197,94,0.45)", fontSize: "10px" }}
                    >
                      {sys.role}
                    </span>
                  </div>
                  <div
                    className="font-mono-tactical text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.35)", fontSize: "10.5px" }}
                  >
                    {sys.headline}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 grid md:grid-cols-5 gap-5">
                <div className="md:col-span-3">
                  <p
                    className="font-mono-tactical text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.9", fontSize: "11px" }}
                  >
                    {sys.description}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div
                    className="font-mono-tactical text-xs tracking-widest uppercase mb-2.5"
                    style={{ color: "rgba(34,197,94,0.3)", fontSize: "9px" }}
                  >
                    Capabilities
                  </div>
                  <div className="space-y-1.5">
                    {sys.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2.5">
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "rgba(34,197,94,0.4)" }}
                        />
                        <span
                          className="font-mono-tactical text-xs"
                          style={{ color: "rgba(255,255,255,0.32)", fontSize: "10.5px" }}
                        >
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded p-5"
          style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.15)" }}
        >
          <div
            className="font-mono-tactical text-xs tracking-widest uppercase mb-5"
            style={{ color: "rgba(34,197,94,0.35)" }}
          >
            Architectural Principles
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRINCIPLES.map((p) => (
              <div key={p.label} className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-px h-3" style={{ background: "rgba(34,197,94,0.5)" }} />
                  <span
                    className="font-orbitron text-xs font-semibold tracking-wider"
                    style={{ color: "rgba(34,197,94,0.7)", fontSize: "9.5px" }}
                  >
                    {p.label}
                  </span>
                </div>
                <p
                  className="font-mono-tactical text-xs leading-relaxed pl-4"
                  style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.85", fontSize: "10.5px" }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-between py-3 px-4 rounded"
          style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.1)" }}
        >
          <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.3)", fontSize: "10px" }}>
            Operator access to live system environments is available through the ACCESS layer.
          </span>
          <a
            href="/access"
            className="font-mono-tactical text-xs px-3 py-1.5 rounded tracking-widest transition-all duration-200"
            style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.6)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#22c55e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(34,197,94,0.6)";
            }}
          >
            ACCESS LAYER →
          </a>
        </div>
      </div>
    </AppShell>
  );
}
