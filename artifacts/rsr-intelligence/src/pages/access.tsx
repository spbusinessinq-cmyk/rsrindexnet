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
    description: "The Pacific Systems public interface — this site. Documents the platform's structure, sector architecture, methodology, and analytical approach. No account. No restrictions. No gating.",
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

type TierStatus = "ACTIVE" | "CONTROLLED" | "RESTRICTED";

const STATUS_COLORS: Record<TierStatus, { border: string; text: string; bg: string }> = {
  ACTIVE:     { border: "rgba(245,158,11,0.35)", text: "rgba(245,158,11,0.92)",  bg: "rgba(245,158,11,0.07)" },
  CONTROLLED: { border: "rgba(245,158,11,0.18)", text: "rgba(245,158,11,0.52)", bg: "rgba(245,158,11,0.035)" },
  RESTRICTED: { border: "rgba(80,88,96,0.2)", text: "rgba(127,142,155,0.5)", bg: "rgba(0,0,0,0.2)" },
};

const TIER_BORDERS: Record<TierStatus, string> = {
  ACTIVE:     "rgba(245,158,11,0.25)",
  CONTROLLED: "rgba(245,158,11,0.12)",
  RESTRICTED: "rgba(80,88,96,0.15)",
};

const TIER_BG: Record<TierStatus, string> = {
  ACTIVE:     "rgba(18,25,34,0.55)",
  CONTROLLED: "rgba(15,23,32,0.42)",
  RESTRICTED: "rgba(13,21,32,0.55)",
};

const DESC_COLORS: Record<TierStatus, string> = {
  ACTIVE:     "rgba(180,192,202,0.82)",
  CONTROLLED: "rgba(180,192,202,0.7)",
  RESTRICTED: "rgba(180,192,202,0.62)",
};

const SCOPE_COLORS: Record<TierStatus, string> = {
  ACTIVE:     "rgba(180,192,202,0.75)",
  CONTROLLED: "rgba(180,192,202,0.65)",
  RESTRICTED: "rgba(180,192,202,0.58)",
};

const DOT_COLORS: Record<TierStatus, string> = {
  ACTIVE:     "rgba(245,158,11,0.72)",
  CONTROLLED: "rgba(245,158,11,0.32)",
  RESTRICTED: "rgba(80,88,96,0.3)",
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
          {/* Main content */}
          <div className="flex-1 p-6 md:p-8 space-y-4 overflow-y-auto">

            {/* Tier overview block */}
            <div className="rounded"
              style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(15,23,32,0.45)" }}>
              <div className="flex items-center gap-2.5 px-5 py-3"
                style={{ borderBottom: "1px solid rgba(245,158,11,0.07)" }}>
                <div className="w-1 h-1 rounded-full" style={{ background: "rgba(245,158,11,0.45)" }} />
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(245,158,11,0.5)", fontSize: "13px", letterSpacing: "0.18em" }}>
                  Access Architecture — Three Tiers
                </span>
              </div>
              <div className="flex items-stretch divide-x px-0 py-0"
                style={{ borderColor: "rgba(245,158,11,0.07)" }}>
                {TIERS.map((tier, i) => {
                  const sc = STATUS_COLORS[tier.status as TierStatus];
                  return (
                    <div key={tier.id} className="flex-1 px-4 py-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: sc.text,
                            boxShadow: tier.active ? `0 0 4px rgba(245,158,11,0.5)` : undefined,
                          }} />
                        <span className="font-mono-tactical"
                          style={{ color: "rgba(127,142,155,0.38)", fontSize: "11.5px" }}>
                          {tier.id}
                        </span>
                      </div>
                      <div className="font-orbitron font-bold tracking-wide mb-1"
                        style={{ color: tier.active ? "#F59E0B" : "rgba(180,192,202,0.5)", fontSize: "14px" }}>
                        {tier.label}
                      </div>
                      <div className="font-mono-tactical rounded px-2 py-0.5 inline-block"
                        style={{
                          border: `1px solid ${sc.border}`,
                          color: sc.text,
                          background: sc.bg,
                          fontSize: "17px",
                          letterSpacing: "0.1em",
                        }}>
                        {tier.status}
                      </div>
                      {tier.active && (
                        <div className="font-mono-tactical mt-1.5"
                          style={{ color: "rgba(245,158,11,0.45)", fontSize: "17px", letterSpacing: "0.08em" }}>
                          ← you are here
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Context */}
            <div className="rounded p-5"
              style={{ border: "1px solid rgba(80,88,96,0.12)", background: "rgba(13,21,32,0.5)" }}>
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(180,192,202,0.72)", lineHeight: "1.92", fontSize: "15.5px" }}>
                Pacific Systems operates three access tiers. The public layer — this site — is open and unrestricted.
                It documents the architecture, methodology, and analytical structure of Pacific Systems
                within the RSR Intelligence ecosystem. Restricted and operator access exist beyond this boundary.
                They are controlled environments belonging to the RSR operational layer — not gated by a sign-up flow.
                The distinction is intentional.
              </p>
            </div>

            {/* Three tier cards */}
            {TIERS.map((tier) => {
              const sc = STATUS_COLORS[tier.status as TierStatus];
              const tb = TIER_BORDERS[tier.status as TierStatus];
              return (
                <div key={tier.id} className="rounded"
                  style={{
                    border: `1px solid ${tb}`,
                    background: TIER_BG[tier.status as TierStatus],
                  }}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5"
                    style={{
                      borderBottom: `1px solid ${tb}`,
                      background: tier.active ? "rgba(245,158,11,0.025)" : undefined,
                    }}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tactical flex-shrink-0"
                        style={{ color: "rgba(80,88,96,0.4)", fontSize: "13px" }}>
                        {tier.id}
                      </span>
                      <div className="w-px h-4 flex-shrink-0" style={{ background: "rgba(80,88,96,0.18)" }} />
                      <div>
                        <div className="font-mono-tactical tracking-widest uppercase"
                          style={{ color: "rgba(80,88,96,0.55)", fontSize: "12.5px", letterSpacing: "0.16em" }}>
                          {tier.code}
                        </div>
                        <div className="flex items-center gap-2.5 mt-0.5">
                          <div className="font-orbitron font-bold tracking-wide"
                            style={{ color: tier.active ? "#F59E0B" : "rgba(180,192,202,0.52)", fontSize: "13px" }}>
                            {tier.label}
                          </div>
                          {tier.active && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full"
                                style={{ background: "#F59E0B", boxShadow: "0 0 4px rgba(245,158,11,0.6)" }} />
                              <span className="font-mono-tactical"
                                style={{ color: "rgba(245,158,11,0.55)", fontSize: "11.5px", letterSpacing: "0.1em" }}>
                                ACTIVE — YOU ARE HERE
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0 pt-0.5">
                      <div className="font-mono-tactical rounded px-2.5 py-1"
                        style={{
                          border: `1px solid ${sc.border}`,
                          color: sc.text,
                          background: sc.bg,
                          fontSize: "12.5px",
                          letterSpacing: "0.12em",
                        }}>
                        {tier.status}
                      </div>
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(80,88,96,0.38)", fontSize: "12.5px" }}>
                        {tier.statusNote}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-4 space-y-4">
                    <p className="font-mono-tactical leading-relaxed"
                      style={{
                        color: DESC_COLORS[tier.status as TierStatus],
                        lineHeight: "2.0",
                        fontSize: "15.5px",
                      }}>
                      {tier.description}
                    </p>
                    <div>
                      <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                        style={{ color: "rgba(80,88,96,0.42)", fontSize: "12.5px", letterSpacing: "0.14em" }}>
                        Scope
                      </div>
                      <div className="space-y-1.5">
                        {tier.scope.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                              style={{ background: DOT_COLORS[tier.status as TierStatus] }} />
                            <span className="font-mono-tactical"
                              style={{
                                color: SCOPE_COLORS[tier.status as TierStatus],
                                fontSize: "15.5px",
                                lineHeight: "2.02",
                              }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Access structure note */}
            <div className="rounded"
              style={{ border: "1px solid rgba(80,88,96,0.15)", background: "rgba(13,21,32,0.72)" }}>
              <div className="flex items-center gap-2.5 px-5 py-3"
                style={{ borderBottom: "1px solid rgba(80,88,96,0.1)" }}>
                <div className="w-1 h-1 rounded-full" style={{ background: "rgba(80,88,96,0.38)" }} />
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(80,88,96,0.52)", fontSize: "13px", letterSpacing: "0.18em" }}>
                  Access Structure — RSR Operational Layer
                </span>
              </div>

              <div className="px-5 py-5 space-y-4">
                <p className="font-mono-tactical leading-relaxed"
                  style={{ color: "rgba(180,192,202,0.68)", lineHeight: "2.0", fontSize: "15.5px" }}>
                  Restricted and operator-level access belongs to the RSR operational layer — it is not
                  publicly available and is not accessible through this interface. These environments are
                  internal to the RSR ecosystem.
                </p>

                <div className="rounded px-4 py-4 space-y-2.5"
                  style={{ border: "1px solid rgba(80,88,96,0.1)", background: "rgba(13,21,32,0.35)" }}>
                  {[
                    "This public interface documents architecture — it does not grant or manage access",
                    "Restricted environments are controlled by RSR — not by Pacific Systems' public interface",
                    "Operator access is provisioned internally — there is no application process here",
                    "The RSR Intelligence site is the appropriate point of contact for external enquiries",
                  ].map((note) => (
                    <div key={note} className="flex items-start gap-2.5">
                      <span className="font-mono-tactical flex-shrink-0 mt-0.5"
                        style={{ color: "rgba(80,88,96,0.42)", fontSize: "15px" }}>—</span>
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(180,192,202,0.65)", fontSize: "15.5px", lineHeight: "1.8" }}>
                        {note}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1"
                  style={{ borderTop: "1px solid rgba(80,88,96,0.08)" }}>
                  <span className="font-mono-tactical italic"
                    style={{ color: "rgba(80,88,96,0.45)", fontSize: "14px" }}>
                    External enquiries — RSR Intelligence Network
                  </span>
                  <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
                    className="font-mono-tactical tracking-widest"
                    style={{ color: "rgba(245,158,11,0.48)", fontSize: "12.5px", letterSpacing: "0.12em", textDecoration: "none" }}>
                    RSRINTEL.COM ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Side column */}
          <div className="w-60 xl:w-68 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(80,88,96,0.08)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(80,88,96,0.38)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Tier Summary
              </div>
              <div className="space-y-1.5">
                {TIERS.map((tier) => {
                  const sc = STATUS_COLORS[tier.status as TierStatus];
                  return (
                    <div key={tier.id} className="flex items-center gap-3 py-2 rounded px-2.5"
                      style={{
                        border: tier.active ? "1px solid rgba(245,158,11,0.14)" : "1px solid rgba(80,88,96,0.07)",
                        background: tier.active ? "rgba(245,158,11,0.04)" : "rgba(13,21,32,0.18)",
                      }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: sc.text }} />
                      <span className="flex-1 font-mono-tactical truncate"
                        style={{ color: tier.active ? "rgba(180,192,202,0.82)" : "rgba(180,192,202,0.62)", fontSize: "15px" }}>
                        {tier.label}
                      </span>
                      <span className="font-mono-tactical flex-shrink-0"
                        style={{ color: sc.text, fontSize: "11.5px" }}>
                        {tier.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(80,88,96,0.08)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(80,88,96,0.38)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Access Model
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "PUBLIC ACCESS",  value: "Open — no account" },
                  { label: "RESTRICTED",     value: "By individual review" },
                  { label: "OPERATOR",       value: "Manually provisioned" },
                  { label: "SIGN-UP",        value: "None" },
                  { label: "AUTO-GRANT",     value: "None" },
                  { label: "INTAKE STATUS",  value: "Not active" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical"
                      style={{ fontSize: "11.5px", color: "rgba(80,88,96,0.32)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(180,192,202,0.72)", fontSize: "15px" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(80,88,96,0.08)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(180,192,202,0.65)", fontSize: "15px", lineHeight: "2.02" }}>
              This is not a waitlist. Restricted access is not queued. Deeper access is governed by RSR
              — not Pacific Systems' public interface. External enquiries via the RSR Intelligence site.
            </p>

            <div className="h-px" style={{ background: "rgba(80,88,96,0.07)" }} />

            <div className="flex items-center justify-between">
              <span className="font-mono-tactical"
                style={{ color: "rgba(80,88,96,0.32)", fontSize: "13px" }}>
                Already provisioned?
              </span>
              <a href="/login"
                className="font-mono-tactical tracking-widest"
                style={{ color: "rgba(245,158,11,0.45)", fontSize: "13px", letterSpacing: "0.12em", textDecoration: "none" }}>
                OPERATOR LOGIN →
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
