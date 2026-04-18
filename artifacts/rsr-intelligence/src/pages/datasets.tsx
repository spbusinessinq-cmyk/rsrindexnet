import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";

const DATASET_CATEGORIES = [
  {
    id: "POL",
    label: "Political & Governance",
    description: "Signals related to political events, governance structures, policy developments, regulatory activity, and institutional decisions.",
    status: "defined",
    coverage: "Domain scoped — sources not yet bound",
  },
  {
    id: "ECO",
    label: "Economic & Financial",
    description: "Market signals, financial indicators, economic policy, trade activity, and capital flow patterns across tracked jurisdictions.",
    status: "defined",
    coverage: "Domain scoped — sources not yet bound",
  },
  {
    id: "INF",
    label: "Infrastructure & Technology",
    description: "Digital infrastructure events, technology platform activity, network architecture changes, and operational technology signals.",
    status: "defined",
    coverage: "Domain scoped — sources not yet bound",
  },
  {
    id: "ORG",
    label: "Organizational Mapping",
    description: "Structural intelligence on organizations — relationships, roles, hierarchies, and operational patterns of tracked entities.",
    status: "defined",
    coverage: "Domain scoped — sources not yet bound",
  },
  {
    id: "MED",
    label: "Media & Narrative",
    description: "Information environment signals — media output patterns, narrative structures, platform activity, and source behavior across monitored channels.",
    status: "defined",
    coverage: "Domain scoped — sources not yet bound",
  },
  {
    id: "GEO",
    label: "Geographic & Regional",
    description: "Location-anchored signal collections — events, developments, and patterns organized by geographic area or regional context.",
    status: "defined",
    coverage: "Domain scoped — sources not yet bound",
  },
];

export default function DatasetsPage() {
  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <div className="px-6 md:px-8 py-5 shrink-0" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.4)" }}>
                MODULE / DATASETS
              </div>
              <h1 className="font-orbitron text-3xl font-bold tracking-wider" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}>
                DATASETS
              </h1>
              <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
                Structured data collections organized by domain — analytical coverage categories and tracked subject areas
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
              style={{ border: "1px solid rgba(34,197,94,0.15)", color: "rgba(34,197,94,0.45)", background: "rgba(34,197,94,0.03)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.4)" }} />
              6 DOMAINS DEFINED
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="mb-5 rounded p-4" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.15)" }}>
              <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.9", fontSize: "11px" }}>
                Dataset domains define the analytical coverage structure of INDEX. Each domain is a bounded collection — signals are classified into domains on intake, and records are appended as new data is structured and committed. Domains without live source connections are documented as defined but inactive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {DATASET_CATEGORIES.map((ds) => (
                <div
                  key={ds.id}
                  data-testid={`dataset-${ds.id.toLowerCase()}`}
                  className="rounded p-5 flex flex-col space-y-3"
                  style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-mono-tactical text-xs px-1.5 py-0.5 rounded inline-block mb-2"
                        style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.6)", fontSize: "9px", letterSpacing: "0.08em" }}>
                        {ds.id}
                      </div>
                      <div className="font-orbitron text-sm font-bold tracking-wide" style={{ color: "#22c55e" }}>
                        {ds.label}
                      </div>
                    </div>
                  </div>
                  <p className="font-mono-tactical text-xs leading-relaxed flex-1"
                    style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.85", fontSize: "10.5px" }}>
                    {ds.description}
                  </p>
                  <div className="pt-2" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.3)" }} />
                      <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.35)", fontSize: "9.5px" }}>
                        {ds.coverage}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded p-4" style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.1)" }}>
              <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px" }}>
                Live Data Status
              </div>
              <EmptyState icon="⊞" title="No live dataset sources connected" subtitle="Domain structure defined — source binding pending" />
            </div>
          </div>

          <div className="w-56 shrink-0 p-4 space-y-4 overflow-y-auto" style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.3)", fontSize: "9px" }}>
              Coverage Status
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Domains defined", value: "6" },
                { label: "Active sources", value: "None" },
                { label: "Live records", value: "—" },
                { label: "Last updated", value: "—" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-mono-tactical" style={{ fontSize: "9px", color: "rgba(34,197,94,0.28)", letterSpacing: "0.08em" }}>
                    {item.label}
                  </span>
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.5)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-px" style={{ background: "rgba(34,197,94,0.07)" }} />
            <div className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.22)", lineHeight: "1.8", fontSize: "10px" }}>
              Datasets grow incrementally as signals are structured and committed to the record layer.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
