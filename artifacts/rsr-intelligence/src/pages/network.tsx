import AppShell from "@/components/AppShell";
import SectionPanel from "@/components/SectionPanel";
import StatusPill from "@/components/StatusPill";
import EmptyState from "@/components/EmptyState";

const NODES = [
  { label: "AXION",        host: "192.168.12.228", port: 3025, role: "AI Orchestration",  status: "ready" as const },
  { label: "ORION",        host: "192.168.12.228", port: 3000, role: "Monitoring",         status: "ready" as const },
  { label: "SAGE",         host: "192.168.12.228", port: 3001, role: "LLM Interface",      status: "ready" as const },
  { label: "PORTAINER",   host: "192.168.12.228", port: 9000, role: "Container Mgmt",     status: "ready" as const },
];

const METRICS = [
  { label: "TOPOLOGY SOURCE",     value: "Not connected" },
  { label: "MONITORING AGENT",   value: "Not bound" },
  { label: "UPTIME TRACKING",    value: "Pending" },
  { label: "PACKET INSPECTION",  value: "Not available" },
  { label: "VISUALIZATION",      value: "Shell ready" },
];

export default function NetworkPage() {
  return (
    <AppShell>
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.45)" }}>
              Module / Network
            </div>
            <h1 className="font-orbitron text-2xl font-bold tracking-widest" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
              NETWORK
            </h1>
            <p className="mt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
              Node topology, connectivity management, and infrastructure health
            </p>
          </div>
          <StatusPill status="standby" label="VISUALIZATION NOT CONNECTED" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 space-y-5">
            <SectionPanel title="Known Nodes" subtitle="Statically registered infrastructure nodes">
              <div className="divide-y" style={{ borderColor: "rgba(34,197,94,0.07)" }}>
                <div
                  className="grid gap-0 px-4 py-2"
                  style={{
                    gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr",
                    background: "rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(34,197,94,0.08)",
                  }}
                >
                  {["NODE", "HOST", "PORT", "ROLE", "STATUS"].map((h) => (
                    <div key={h} className="font-mono-tactical tracking-widest uppercase" style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)" }}>
                      {h}
                    </div>
                  ))}
                </div>
                {NODES.map((node) => (
                  <div
                    key={node.label}
                    data-testid={`node-row-${node.label.toLowerCase()}`}
                    className="grid gap-0 px-4 py-3 transition-all duration-150"
                    style={{
                      gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(34,197,94,0.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div className="font-orbitron text-xs font-bold tracking-wide" style={{ color: "#22c55e" }}>
                      {node.label}
                    </div>
                    <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.5)" }}>
                      {node.host}
                    </div>
                    <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                      {node.port}
                    </div>
                    <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.4)" }}>
                      {node.role}
                    </div>
                    <div>
                      <StatusPill status={node.status} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionPanel>

            <SectionPanel title="Network Visualization" subtitle="Live topology graph — not connected">
              <div
                className="relative flex items-center justify-center"
                style={{ height: 200 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 500 180" style={{ opacity: 0.18 }}>
                  <circle cx="250" cy="90" r="30" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 6" />
                  {[0, 72, 144, 216, 288].map((a, i) => {
                    const rad = (a - 90) * Math.PI / 180;
                    const x = 250 + 100 * Math.cos(rad);
                    const y = 90 + 100 * Math.sin(rad);
                    return (
                      <g key={i}>
                        <line x1="250" y1="90" x2={x} y2={y} stroke="#22c55e" strokeWidth="0.8" strokeDasharray="2 4" />
                        <circle cx={x} cy={y} r="8" fill="none" stroke="#22c55e" strokeWidth="1" />
                      </g>
                    );
                  })}
                  <text x="250" y="94" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">RSR</text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <EmptyState
                    icon="⬢"
                    title="Network topology not connected"
                    subtitle="Monitoring source not bound — visualization shell ready"
                  />
                </div>
              </div>
            </SectionPanel>
          </div>

          <div className="space-y-5">
            <SectionPanel title="Connectivity Status">
              <div className="px-4 py-3 space-y-3">
                {METRICS.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical" style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)", letterSpacing: "0.1em" }}>
                      {m.label}
                    </span>
                    <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.5)" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </SectionPanel>

            <SectionPanel title="Integration Targets">
              <div className="px-4 py-3 space-y-2.5">
                {[
                  { label: "nmap / network scan", note: "Not configured" },
                  { label: "Prometheus / metrics", note: "Not bound" },
                  { label: "Grafana / dashboards",  note: "UI shell active" },
                  { label: "Docker stats feed",     note: "Not connected" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical" style={{ fontSize: "10px", color: "rgba(34,197,94,0.3)" }}>
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </SectionPanel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
