import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

const ACCESS_TIERS = [
  {
    id: "PUBLIC",
    label: "Public Layer",
    badge: "Active",
    status: "active" as const,
    description: "This site. The INDEX public interface documents the platform's structure, methodology, and analytical architecture. No account required. No restrictions.",
    includes: [
      "Platform overview and sector documentation",
      "Signal category definitions and intake structure",
      "Dataset domain descriptions and coverage map",
      "Methodology and process architecture",
    ],
  },
  {
    id: "RESTRICTED",
    label: "Restricted Data",
    badge: "Planned",
    status: "planned" as const,
    description: "Curated datasets, live signal feeds, and deeper record access beyond the public index. Restricted data requires account verification and is not available in the public layer.",
    includes: [
      "Expanded dataset coverage across all domains",
      "Live signal feed access and intake visibility",
      "Full record index — active and archived",
      "Cross-dataset query and export",
    ],
  },
  {
    id: "OPERATOR",
    label: "Operator Access",
    badge: "Restricted",
    status: "restricted" as const,
    description: "Direct environment access for operators — live dashboards, analytical tools, data management, and system-level interaction. Operator access is not publicly available.",
    includes: [
      "Live operational dashboards and monitoring",
      "Analytical tooling and inference environments",
      "Data pipeline management and source configuration",
      "Index administration and record management",
    ],
  },
];

const BORDER_COLORS = {
  active: "rgba(34,197,94,0.25)",
  planned: "rgba(34,197,94,0.12)",
  restricted: "rgba(34,197,94,0.08)",
};

const BG_COLORS = {
  active: "rgba(34,197,94,0.04)",
  planned: "rgba(0,0,0,0.18)",
  restricted: "rgba(0,0,0,0.22)",
};

const BADGE_COLORS = {
  active: { border: "rgba(34,197,94,0.38)", color: "rgba(34,197,94,0.85)" },
  planned: { border: "rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.5)" },
  restricted: { border: "rgba(34,197,94,0.12)", color: "rgba(34,197,94,0.32)" },
};

const DOT_COLORS = {
  active: "rgba(34,197,94,0.6)",
  planned: "rgba(34,197,94,0.25)",
  restricted: "rgba(34,197,94,0.15)",
};

export default function AccessPage() {
  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / ACCESS"
          title="ACCESS"
          subtitle="Access tiers, data boundaries, and the separation between public documentation and restricted operation"
        />

        <div className="flex-1 p-6 md:p-8 space-y-5 max-w-4xl">
          {/* Context */}
          <div className="rounded p-4"
            style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(34,197,94,0.025)" }}>
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.9", fontSize: "10.5px" }}>
              INDEX operates across three defined access tiers. The public interface — this site — documents the platform's architecture, methodology, and sector structure. Deeper data layers, live feeds, and operational environments exist behind controlled access thresholds. The distinction between public documentation and operational access is a design decision, not a security gap.
            </p>
          </div>

          {/* Access tiers */}
          {ACCESS_TIERS.map((tier) => (
            <div key={tier.id} className="rounded p-5 space-y-4"
              style={{
                border: `1px solid ${BORDER_COLORS[tier.status]}`,
                background: BG_COLORS[tier.status],
              }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="font-mono-tactical px-2 py-1 rounded"
                    style={{
                      border: `1px solid ${BORDER_COLORS[tier.status]}`,
                      color: BADGE_COLORS[tier.status].color,
                      fontSize: "8.5px",
                      letterSpacing: "0.1em",
                      background: "rgba(0,0,0,0.3)",
                    }}>
                    {tier.id}
                  </div>
                  <div className="font-orbitron text-base font-bold tracking-wider" style={{ color: "#22c55e" }}>
                    {tier.label}
                  </div>
                </div>
                <div className="font-mono-tactical px-2.5 py-1 rounded flex-shrink-0"
                  style={{
                    border: `1px solid ${BADGE_COLORS[tier.status].border}`,
                    color: BADGE_COLORS[tier.status].color,
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                  }}>
                  {tier.badge}
                </div>
              </div>

              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.88", fontSize: "10.5px" }}>
                {tier.description}
              </p>

              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                  style={{ color: "rgba(34,197,94,0.25)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
                  Includes
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {tier.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: DOT_COLORS[tier.status] }} />
                      <span className="font-mono-tactical" style={{ color: "rgba(255,255,255,0.28)", fontSize: "10.5px" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Request access shell */}
          <div className="rounded p-5 space-y-4"
            style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.15)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px", letterSpacing: "0.18em" }}>
                Request Access
              </div>
              <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "rgba(34,197,94,0.6)" }}>
                Restricted and operator access
              </div>
            </div>
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(255,255,255,0.32)", lineHeight: "1.9", fontSize: "10.5px" }}>
              Restricted and operator-level access is not publicly available. Requests representing organizations with a legitimate analytical use case will be reviewed individually. No automated sign-up flow exists yet.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded px-3 py-2.5"
                style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.35)" }}>
                <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.18)", fontSize: "9.5px" }}>
                  Access request intake — not yet active
                </span>
              </div>
              <div className="font-mono-tactical px-4 py-2.5 rounded"
                style={{
                  border: "1px solid rgba(34,197,94,0.14)",
                  color: "rgba(34,197,94,0.32)",
                  fontSize: "9.5px",
                  letterSpacing: "0.1em",
                }}>
                SUBMIT
              </div>
            </div>
            <p className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.22)", fontSize: "9px" }}>
              Access intake form structural — not yet active.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
