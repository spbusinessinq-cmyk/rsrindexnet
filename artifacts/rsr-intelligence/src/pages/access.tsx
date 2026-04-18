import AppShell from "@/components/AppShell";

const ACCESS_TIERS = [
  {
    id: "PUBLIC",
    label: "Public Layer",
    description: "This site. The INDEX public interface documents the platform's structure, methodology, and analytical architecture. No account required. No restrictions.",
    available: [
      "Platform overview and sector documentation",
      "Signal category definitions and intake structure",
      "Dataset domain descriptions and coverage map",
      "Methodology and process architecture",
    ],
    status: "current",
    badge: "Active",
  },
  {
    id: "RESTRICTED",
    label: "Restricted Data",
    description: "Curated datasets, live signal feeds, and deeper record access beyond the public index. Restricted data requires account verification and is not available in the public layer.",
    available: [
      "Expanded dataset coverage across all domains",
      "Live signal feed access and intake visibility",
      "Full record index — active and archived",
      "Cross-dataset query and export",
    ],
    status: "coming",
    badge: "Planned",
  },
  {
    id: "OPERATOR",
    label: "Operator Access",
    description: "Direct environment access for operators — live dashboards, analytical tools, data management, and system-level interaction. Operator access is not publicly available.",
    available: [
      "Live operational dashboards and monitoring",
      "Analytical tooling and inference environments",
      "Data pipeline management and source configuration",
      "Index administration and record management",
    ],
    status: "restricted",
    badge: "Restricted",
  },
];

export default function AccessPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-8 max-w-4xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.4)" }}>
              MODULE / ACCESS
            </div>
            <h1 className="font-orbitron text-3xl font-bold tracking-wider" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}>
              ACCESS
            </h1>
            <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              Access tiers, data boundaries, and the separation between public documentation and restricted operation
            </p>
          </div>
        </div>

        <div className="rounded p-4" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(34,197,94,0.03)" }}>
          <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", lineHeight: "1.9", fontSize: "11px" }}>
            INDEX operates across three defined access tiers. The public interface — this site — documents the platform's architecture, methodology, and sector structure. Deeper data layers, live feeds, and operational environments exist behind controlled access thresholds. The distinction between public documentation and operational access is a design decision, not a security gap.
          </p>
        </div>

        <div className="space-y-4">
          {ACCESS_TIERS.map((tier) => (
            <div key={tier.id} className="rounded p-5 space-y-4"
              style={{
                border: tier.status === "current"
                  ? "1px solid rgba(34,197,94,0.22)"
                  : "1px solid rgba(34,197,94,0.1)",
                background: tier.status === "current" ? "rgba(34,197,94,0.04)" : "rgba(0,0,0,0.2)",
              }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono-tactical text-xs px-1.5 py-0.5 rounded inline-block mb-2"
                    style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.1em" }}>
                    {tier.id}
                  </div>
                  <div className="font-orbitron text-base font-bold tracking-wider" style={{ color: "#22c55e" }}>
                    {tier.label}
                  </div>
                </div>
                <div className="font-mono-tactical text-xs px-2.5 py-1 rounded flex-shrink-0"
                  style={{
                    border: `1px solid ${tier.status === "current" ? "rgba(34,197,94,0.35)" : tier.status === "coming" ? "rgba(34,197,94,0.18)" : "rgba(34,197,94,0.1)"}`,
                    color: tier.status === "current" ? "rgba(34,197,94,0.8)" : tier.status === "coming" ? "rgba(34,197,94,0.45)" : "rgba(34,197,94,0.3)",
                    fontSize: "9.5px",
                    letterSpacing: "0.1em",
                  }}>
                  {tier.badge}
                </div>
              </div>

              <p className="font-mono-tactical text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.88", fontSize: "11px" }}>
                {tier.description}
              </p>

              <div>
                <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px" }}>
                  Includes
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {tier.available.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: tier.status === "current" ? "rgba(34,197,94,0.55)" : "rgba(34,197,94,0.2)" }} />
                      <span className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.3)", fontSize: "10.5px" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded p-5 space-y-4" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.15)" }}>
          <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "rgba(34,197,94,0.7)" }}>
            Request Access
          </div>
          <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9", fontSize: "11px" }}>
            Restricted and operator-level access is not publicly available. If you represent an organization with a
            legitimate analytical use case, access requests will be reviewed individually. No automated sign-up flow exists yet.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded px-3 py-2.5"
              style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.3)" }}>
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.2)", fontSize: "10px" }}>
                Access request intake — not yet active
              </span>
            </div>
            <div className="font-mono-tactical text-xs px-4 py-2.5 rounded"
              style={{ border: "1px solid rgba(34,197,94,0.15)", color: "rgba(34,197,94,0.35)", letterSpacing: "0.1em" }}>
              SUBMIT
            </div>
          </div>
          <p className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.25)", fontSize: "9.5px" }}>
            Access intake form not yet active. This field is structural.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
