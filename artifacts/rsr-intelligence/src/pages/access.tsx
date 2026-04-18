import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

const TIERS = [
  {
    id: "01",
    code: "PUBLIC",
    label: "Public Layer",
    status: "ACTIVE",
    statusNote: "You are here",
    active: true,
    description: "The INDEX public interface — this site. Documents the platform's structure, sector architecture, methodology, and analytical approach. No account. No restrictions. No gating.",
    scope: [
      "Platform overview and sector documentation",
      "Signal category definitions and intake structure",
      "Dataset domain descriptions and coverage map",
      "Methodology — collection, classification, synthesis architecture",
      "Access tier boundaries and access model documentation",
    ],
  },
  {
    id: "02",
    code: "RESTRICTED",
    label: "Restricted Data Layer",
    status: "CONTROLLED",
    statusNote: "Not publicly available",
    active: false,
    description: "Curated datasets, live signal feeds, and expanded record access beyond the public index. Restricted data requires verification and is not available via sign-up. Access is granted individually after review.",
    scope: [
      "Expanded dataset coverage across all analytical domains",
      "Live signal feed visibility and intake log access",
      "Full record index — active, archived, and flagged",
      "Cross-dataset query and structured export",
    ],
  },
  {
    id: "03",
    code: "OPERATOR",
    label: "Operator Layer",
    status: "RESTRICTED",
    statusNote: "Manually provisioned",
    active: false,
    description: "Direct access to operational environments — live dashboards, analytical tools, data pipeline management, and system-level interaction. Operator access is not applied for. It is provisioned.",
    scope: [
      "Live operational monitoring and signal dashboards",
      "Analytical tooling and inference environments",
      "Data pipeline configuration and source management",
      "Index administration — commit, archive, version, restrict",
    ],
  },
];

const STATUS_COLORS = {
  ACTIVE:     { border: "rgba(34,197,94,0.32)", text: "rgba(34,197,94,0.9)",  bg: "rgba(34,197,94,0.07)" },
  CONTROLLED: { border: "rgba(34,197,94,0.15)", text: "rgba(34,197,94,0.45)", bg: "rgba(34,197,94,0.03)" },
  RESTRICTED: { border: "rgba(100,120,115,0.18)", text: "rgba(140,162,158,0.45)", bg: "rgba(0,0,0,0.2)" },
};

const TIER_BORDERS = {
  ACTIVE:     "rgba(34,197,94,0.22)",
  CONTROLLED: "rgba(34,197,94,0.1)",
  RESTRICTED: "rgba(100,120,115,0.12)",
};

const TIER_BG = {
  ACTIVE:     "rgba(12,24,16,0.5)",
  CONTROLLED: "rgba(8,14,10,0.4)",
  RESTRICTED: "rgba(5,8,7,0.5)",
};

const DOT_COLORS = {
  ACTIVE:     "rgba(34,197,94,0.7)",
  CONTROLLED: "rgba(34,197,94,0.28)",
  RESTRICTED: "rgba(100,120,115,0.25)",
};

export default function AccessPage() {
  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / ACCESS"
          title="ACCESS"
          subtitle="The boundary between public documentation and operational access — tier structure, scope, and entry requirements"
        />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 md:p-8 space-y-4 overflow-y-auto max-w-3xl">
            {/* Context block */}
            <div className="rounded p-4"
              style={{ border: "1px solid rgba(100,120,115,0.12)", background: "rgba(5,8,7,0.5)" }}>
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(180,200,195,0.32)", lineHeight: "1.92", fontSize: "10.5px" }}>
                INDEX operates three access tiers. The public layer — this site — is open and unrestricted. It documents the platform's architecture, methodology, and analytical structure. Restricted and operator access exist beyond this boundary. They are controlled, not gated by a sign-up flow. The distinction is intentional.
              </p>
            </div>

            {/* Three tiers */}
            {TIERS.map((tier) => {
              const sc = STATUS_COLORS[tier.status as keyof typeof STATUS_COLORS];
              return (
                <div key={tier.id} className="rounded access-tier-restricted"
                  style={{
                    border: `1px solid ${TIER_BORDERS[tier.status as keyof typeof TIER_BORDERS]}`,
                    background: TIER_BG[tier.status as keyof typeof TIER_BG],
                  }}>
                  {/* Tier header */}
                  <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5"
                    style={{ borderBottom: `1px solid ${TIER_BORDERS[tier.status as keyof typeof TIER_BORDERS]}` }}>
                    <div className="flex items-center gap-3">
                      <div className="font-mono-tactical flex-shrink-0"
                        style={{ color: "rgba(100,120,115,0.4)", fontSize: "9px", letterSpacing: "0.06em" }}>
                        {tier.id}
                      </div>
                      <div className="w-px h-4 flex-shrink-0" style={{ background: "rgba(100,120,115,0.18)" }} />
                      <div>
                        <div className="font-mono-tactical tracking-widest uppercase"
                          style={{ color: "rgba(100,120,115,0.5)", fontSize: "8.5px", letterSpacing: "0.16em" }}>
                          {tier.code}
                        </div>
                        <div className="font-orbitron font-bold tracking-wide mt-0.5"
                          style={{ color: tier.active ? "#22c55e" : "rgba(180,200,195,0.5)", fontSize: "13px" }}>
                          {tier.label}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0 pt-0.5">
                      <div className="font-mono-tactical rounded px-2.5 py-1"
                        style={{
                          border: `1px solid ${sc.border}`,
                          color: sc.text,
                          background: sc.bg,
                          fontSize: "8.5px",
                          letterSpacing: "0.12em",
                        }}>
                        {tier.status}
                      </div>
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(100,120,115,0.35)", fontSize: "8.5px" }}>
                        {tier.statusNote}
                      </span>
                    </div>
                  </div>

                  {/* Tier body */}
                  <div className="px-5 py-4 space-y-3.5">
                    <p className="font-mono-tactical leading-relaxed"
                      style={{ color: "rgba(180,200,195,0.35)", lineHeight: "1.9", fontSize: "10.5px" }}>
                      {tier.description}
                    </p>
                    <div className="space-y-1.5">
                      <div className="font-mono-tactical tracking-widest uppercase mb-2"
                        style={{ color: "rgba(100,120,115,0.35)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
                        Scope
                      </div>
                      {tier.scope.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <div className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: DOT_COLORS[tier.status as keyof typeof DOT_COLORS] }} />
                          <span className="font-mono-tactical"
                            style={{ color: "rgba(180,200,195,0.28)", fontSize: "10.5px" }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Access request intake terminal ─────────────── */}
            <div className="rounded" style={{ border: "1px solid rgba(100,120,115,0.15)", background: "rgba(4,7,5,0.7)" }}>
              {/* Terminal header */}
              <div className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: "1px solid rgba(100,120,115,0.1)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full"
                    style={{ background: "rgba(100,120,115,0.35)" }} />
                  <span className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(100,120,115,0.4)", fontSize: "9px", letterSpacing: "0.18em" }}>
                    Access Request Intake
                  </span>
                </div>
                <span className="font-mono-tactical"
                  style={{ color: "rgba(100,120,115,0.28)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  INTAKE-001
                </span>
              </div>

              <div className="px-5 py-5 space-y-5">
                {/* Framing text */}
                <div className="space-y-2">
                  <div className="font-orbitron font-bold tracking-wide"
                    style={{ color: "rgba(180,200,195,0.45)", fontSize: "11px" }}>
                    Restricted and Operator Access
                  </div>
                  <p className="font-mono-tactical leading-relaxed"
                    style={{ color: "rgba(180,200,195,0.28)", lineHeight: "1.9", fontSize: "10.5px" }}>
                    Restricted and operator-level access is not publicly available. Requests representing organisations with a documented analytical use case may be reviewed individually. There is no automated sign-up flow. Operator environments are manually provisioned — they are not self-serve.
                  </p>
                </div>

                {/* Intake notes */}
                <div className="rounded p-3.5 space-y-2"
                  style={{ border: "1px solid rgba(100,120,115,0.1)", background: "rgba(0,0,0,0.35)" }}>
                  {[
                    "Access requests are reviewed individually — not processed automatically",
                    "Restricted data access requires documented organisational context",
                    "Operator environments are provisioned manually — not assigned on approval",
                    "No timeline for review can be given — requests are assessed on merit",
                  ].map((note) => (
                    <div key={note} className="flex items-start gap-2.5">
                      <span className="font-mono-tactical flex-shrink-0 mt-0.5"
                        style={{ color: "rgba(100,120,115,0.3)", fontSize: "10px" }}>—</span>
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(155,175,168,0.28)", fontSize: "10.5px", lineHeight: "1.8" }}>
                        {note}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Input field shell */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 rounded px-3.5 py-3"
                    style={{
                      border: "1px solid rgba(100,120,115,0.14)",
                      background: "rgba(0,0,0,0.5)",
                      boxShadow: "inset 0 1px 8px rgba(0,0,0,0.4)",
                    }}>
                    <span className="font-mono-tactical flex-shrink-0"
                      style={{ color: "rgba(100,120,115,0.25)", fontSize: "10px" }}>
                      &gt;
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(100,120,115,0.22)", fontSize: "9.5px", letterSpacing: "0.04em" }}>
                      access request intake — not yet active
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 rounded px-3.5 py-2.5"
                      style={{
                        border: "1px solid rgba(100,120,115,0.1)",
                        background: "rgba(0,0,0,0.4)",
                      }}>
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(100,120,115,0.18)", fontSize: "9.5px" }}>
                        contact endpoint — pending configuration
                      </span>
                    </div>
                    <div className="rounded px-4 py-2.5 flex-shrink-0"
                      style={{
                        border: "1px solid rgba(100,120,115,0.15)",
                        background: "rgba(0,0,0,0.5)",
                        cursor: "default",
                      }}>
                      <span className="font-mono-tactical tracking-widest"
                        style={{ color: "rgba(100,120,115,0.3)", fontSize: "9.5px", letterSpacing: "0.1em" }}>
                        SUBMIT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status line */}
                <div className="flex items-center gap-2.5 pt-1"
                  style={{ borderTop: "1px solid rgba(100,120,115,0.07)" }}>
                  <div className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(100,120,115,0.3)" }} />
                  <span className="font-mono-tactical"
                    style={{ color: "rgba(100,120,115,0.3)", fontSize: "9px", letterSpacing: "0.08em" }}>
                    Intake not active — access model in controlled rollout. No timeline for public access.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side column */}
          <div className="w-60 xl:w-68 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(100,120,115,0.08)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(100,120,115,0.3)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Tier Summary
              </div>
              <div className="space-y-3">
                {TIERS.map((tier) => (
                  <div key={tier.id} className="flex items-center gap-3 py-2"
                    style={{ borderBottom: "1px solid rgba(100,120,115,0.07)" }}>
                    <div className="font-mono-tactical flex-shrink-0"
                      style={{ color: "rgba(100,120,115,0.25)", fontSize: "9px" }}>
                      {tier.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono-tactical truncate"
                        style={{ color: "rgba(180,200,195,0.35)", fontSize: "10px", letterSpacing: "0.06em" }}>
                        {tier.label}
                      </div>
                    </div>
                    <div className="font-mono-tactical flex-shrink-0"
                      style={{
                        color: STATUS_COLORS[tier.status as keyof typeof STATUS_COLORS].text,
                        fontSize: "8.5px",
                        letterSpacing: "0.06em",
                      }}>
                      {tier.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(100,120,115,0.08)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(100,120,115,0.3)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Access Model
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "PUBLIC ACCESS", value: "Open" },
                  { label: "RESTRICTED", value: "By review" },
                  { label: "OPERATOR", value: "Provisioned" },
                  { label: "SIGN-UP", value: "None" },
                  { label: "AUTO-GRANT", value: "None" },
                  { label: "INTAKE STATUS", value: "Not active" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical"
                      style={{ fontSize: "8.5px", color: "rgba(100,120,115,0.3)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(155,175,168,0.42)", fontSize: "10px" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(100,120,115,0.08)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(100,120,115,0.28)", lineHeight: "1.85", fontSize: "9.5px" }}>
              This is not a waitlist. Restricted access is not queued. Requests are assessed individually when intake is active.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
