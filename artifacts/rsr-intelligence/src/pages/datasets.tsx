import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

const DOMAINS = [
  {
    id: "POL",
    label: "Political & Governance",
    description: "Political events, governance structures, policy developments, regulatory activity, and institutional decisions.",
    coverage: "Domain scoped",
    color: "rgba(34,197,94,0.65)",
  },
  {
    id: "ECO",
    label: "Economic & Financial",
    description: "Market signals, financial indicators, economic policy, trade activity, and capital flow patterns across tracked jurisdictions.",
    coverage: "Domain scoped",
    color: "rgba(34,197,94,0.65)",
  },
  {
    id: "INF",
    label: "Infrastructure & Technology",
    description: "Digital infrastructure events, technology platform activity, network architecture changes, and operational technology signals.",
    coverage: "Domain scoped",
    color: "rgba(34,197,94,0.65)",
  },
  {
    id: "ORG",
    label: "Organizational Mapping",
    description: "Structural intelligence on organizations — relationships, roles, hierarchies, and operational patterns of tracked entities.",
    coverage: "Domain scoped",
    color: "rgba(34,197,94,0.65)",
  },
  {
    id: "MED",
    label: "Media & Narrative",
    description: "Information environment signals — media output patterns, narrative structures, platform activity, and source behavior.",
    coverage: "Domain scoped",
    color: "rgba(34,197,94,0.65)",
  },
  {
    id: "GEO",
    label: "Geographic & Regional",
    description: "Location-anchored signal collections — events, developments, and patterns organized by geographic area or regional context.",
    coverage: "Domain scoped",
    color: "rgba(34,197,94,0.65)",
  },
];

export default function DatasetsPage() {
  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / DATASETS"
          title="DATASETS"
          subtitle="Structured data collections organized by domain — analytical coverage categories and tracked subject areas"
          badge="6 DOMAINS DEFINED"
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 p-6 md:p-7 overflow-y-auto space-y-5">
            <div className="rounded p-4"
              style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.15)" }}>
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9", fontSize: "10.5px" }}>
                Dataset domains define the analytical coverage structure of INDEX. Each domain is a bounded collection — signals are classified into domains on intake, and records are appended as new data is structured and committed. Domains without active source connections are documented as defined but inactive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {DOMAINS.map((ds) => (
                <div key={ds.id} data-testid={`dataset-${ds.id.toLowerCase()}`}
                  className="rounded p-5 flex flex-col idx-card"
                  style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)", minHeight: 180 }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="font-mono-tactical px-2 py-1 rounded"
                      style={{
                        border: "1px solid rgba(34,197,94,0.22)",
                        color: ds.color,
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        background: "rgba(34,197,94,0.04)",
                      }}>
                      {ds.id}
                    </div>
                  </div>
                  <div className="font-orbitron text-sm font-bold tracking-wide mb-2" style={{ color: "#22c55e" }}>
                    {ds.label}
                  </div>
                  <p className="font-mono-tactical leading-relaxed flex-1"
                    style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.85", fontSize: "10.5px" }}>
                    {ds.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 pt-3"
                    style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: "rgba(34,197,94,0.28)" }} />
                    <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.32)", fontSize: "9.5px" }}>
                      {ds.coverage} — sources not yet bound
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.07)", background: "rgba(0,0,0,0.12)" }}>
              <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(34,197,94,0.25)", fontSize: "9px", letterSpacing: "0.16em" }}>
                  Live Dataset Status
                </span>
              </div>
              <EmptyState icon="⊞" title="No live dataset sources connected" subtitle="Domain structure defined — source binding pending" />
            </div>
          </div>

          {/* Status sidebar */}
          <div className="w-56 xl:w-64 shrink-0 p-5 space-y-5 overflow-y-auto"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Coverage Status
              </div>
              <div className="space-y-3">
                {[
                  { label: "DOMAINS DEFINED", value: "6" },
                  { label: "ACTIVE SOURCES", value: "None" },
                  { label: "LIVE RECORDS", value: "—" },
                  { label: "LAST UPDATED", value: "—" },
                  { label: "TOTAL ENTRIES", value: "—" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical"
                      style={{ fontSize: "8.5px", color: "rgba(34,197,94,0.25)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.48)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />
            <p className="font-mono-tactical" style={{ color: "rgba(255,255,255,0.2)", fontSize: "9.5px", lineHeight: "1.8" }}>
              Datasets grow incrementally as signals are structured and committed to the record layer.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
