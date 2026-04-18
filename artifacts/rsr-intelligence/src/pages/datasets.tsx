import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { DATASET_DOMAINS } from "@/data/config";

const STATUS_LABELS: Record<string, string> = {
  defined: "Schema defined",
  active: "Active",
  inactive: "Inactive",
  deprecated: "Deprecated",
};

const BINDING_LABELS: Record<string, string> = {
  unbound: "No source bound",
  bound: "Source bound",
  partial: "Partially bound",
};

const CADENCE_LABELS: Record<string, string> = {
  realtime: "Real-time",
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  manual: "Manual",
};

export default function DatasetsPage() {
  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / DATASETS"
          title="DATASETS"
          subtitle="Structured data collections organised by domain — analytical coverage categories and tracked subject areas"
          badge={`${DATASET_DOMAINS.length} DOMAINS DEFINED`}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-5">
            <div className="rounded p-4"
              style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.18)" }}>
              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(185,205,200,0.65)", lineHeight: "1.95", fontSize: "11px" }}>
                Dataset domains define the analytical coverage structure of INDEX. Each domain is a bounded collection — signals are classified into domains on intake, and records are appended as new data is structured and committed. Domain schema is defined; sources are not yet bound.
              </p>
            </div>

            <div className="space-y-3">
              {DATASET_DOMAINS.map((ds) => (
                <div key={ds.id} data-testid={`dataset-${ds.id.toLowerCase()}`}
                  className="rounded idx-card"
                  style={{ border: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.18)" }}>
                  {/* Domain header */}
                  <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3.5"
                    style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
                    <div className="flex items-center gap-3">
                      <div className="font-mono-tactical px-2 py-1 rounded flex-shrink-0"
                        style={{
                          border: "1px solid rgba(34,197,94,0.22)",
                          color: "rgba(34,197,94,0.72)",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          background: "rgba(34,197,94,0.04)",
                        }}>
                        {ds.id}
                      </div>
                      <div>
                        <div className="font-orbitron text-sm font-bold tracking-wide"
                          style={{ color: "#22c55e" }}>
                          {ds.label}
                        </div>
                        <div className="font-mono-tactical mt-0.5"
                          style={{ color: "rgba(155,175,170,0.5)", fontSize: "9px" }}>
                          Schema v{ds.schemaVersion} — {ds.fields.length} fields defined
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <div className="font-mono-tactical px-2.5 py-1 rounded"
                        style={{
                          border: "1px solid rgba(34,197,94,0.18)",
                          color: "rgba(34,197,94,0.55)",
                          fontSize: "8.5px",
                          background: "rgba(34,197,94,0.04)",
                          letterSpacing: "0.08em",
                        }}>
                        {STATUS_LABELS[ds.status]}
                      </div>
                    </div>
                  </div>

                  {/* Domain body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x"
                    style={{ borderColor: "rgba(34,197,94,0.06)" }}>
                    {/* Left: description + binding */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="font-mono-tactical leading-relaxed"
                        style={{ color: "rgba(185,205,200,0.6)", lineHeight: "1.9", fontSize: "10.5px" }}>
                        {ds.description}
                      </p>
                      <div className="space-y-1.5 pt-1">
                        {[
                          {
                            label: "Source Binding",
                            value: BINDING_LABELS[ds.bindingStatus],
                            dim: ds.bindingStatus === "unbound",
                          },
                          {
                            label: "Update Cadence",
                            value: ds.updateCadence ? CADENCE_LABELS[ds.updateCadence] : "Not yet assigned",
                            dim: !ds.updateCadence,
                          },
                          {
                            label: "Record Count",
                            value: ds.recordCount === 0 ? "Awaiting first record" : ds.recordCount.toString(),
                            dim: ds.recordCount === 0,
                          },
                          {
                            label: "Last Updated",
                            value: ds.lastUpdated ?? "—",
                            dim: !ds.lastUpdated,
                          },
                        ].map((item) => (
                          <div key={item.label} className="flex items-start gap-2">
                            <span className="font-mono-tactical flex-shrink-0 w-28"
                              style={{ color: "rgba(155,175,170,0.45)", fontSize: "9.5px", letterSpacing: "0.06em" }}>
                              {item.label}
                            </span>
                            <span className="font-mono-tactical"
                              style={{
                                color: item.dim ? "rgba(155,175,170,0.4)" : "rgba(185,205,200,0.7)",
                                fontSize: "10px",
                                fontStyle: item.dim ? "italic" : "normal",
                              }}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: field schema */}
                    <div className="px-5 py-4">
                      <div className="font-mono-tactical tracking-widest uppercase mb-3"
                        style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.16em" }}>
                        Record Schema — {ds.fields.length} Fields
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {ds.fields.slice(0, 12).map((field) => (
                          <div key={field.key} className="flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{
                                background: field.required
                                  ? "rgba(34,197,94,0.5)"
                                  : "rgba(155,175,170,0.25)",
                              }} />
                            <span className="font-mono-tactical truncate"
                              style={{
                                color: field.required
                                  ? "rgba(185,205,200,0.62)"
                                  : "rgba(155,175,170,0.45)",
                                fontSize: "9.5px",
                              }}>
                              {field.key}
                            </span>
                            <span className="font-mono-tactical flex-shrink-0"
                              style={{ color: "rgba(155,175,170,0.3)", fontSize: "8.5px" }}>
                              {field.type}
                            </span>
                          </div>
                        ))}
                        {ds.fields.length > 12 && (
                          <div className="col-span-2 font-mono-tactical"
                            style={{ color: "rgba(155,175,170,0.3)", fontSize: "9px" }}>
                            +{ds.fields.length - 12} more fields
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded" style={{ border: "1px solid rgba(34,197,94,0.07)", background: "rgba(0,0,0,0.12)" }}>
              <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.16em" }}>
                  Live Dataset Status
                </span>
              </div>
              <EmptyState
                icon="⊞"
                title="No live dataset sources connected"
                subtitle="Domain structure defined — source binding pending. Records will appear here when sources are attached and data is committed."
                statusLine="Intake layer ready — awaiting source attachment"
              />
            </div>
          </div>

          {/* Status sidebar */}
          <div className="w-60 xl:w-64 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.48)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Coverage Status
              </div>
              <div className="space-y-3">
                {[
                  { label: "DOMAINS DEFINED",    value: DATASET_DOMAINS.length.toString() },
                  { label: "SCHEMAS VERSIONED",  value: DATASET_DOMAINS.length.toString() },
                  { label: "ACTIVE SOURCES",     value: "None" },
                  { label: "LIVE RECORDS",       value: "—" },
                  { label: "LAST UPDATED",       value: "—" },
                  { label: "TOTAL ENTRIES",      value: "—" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical"
                      style={{ fontSize: "8.5px", color: "rgba(155,175,170,0.42)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(185,205,200,0.68)", fontSize: "11px" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.14em" }}>
                Schema Key
              </div>
              <div className="space-y-2">
                {[
                  { dot: "rgba(34,197,94,0.5)", label: "Required field" },
                  { dot: "rgba(155,175,170,0.25)", label: "Optional field" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: item.dot }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(185,205,200,0.5)", fontSize: "10px" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.45)", fontSize: "10px", lineHeight: "1.85" }}>
              Datasets grow incrementally as signals are structured and committed to the record layer.
              Domain schemas are versioned — field changes are tracked.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
