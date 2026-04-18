import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

const COLUMNS = [
  { key: "id", label: "ID", width: "80px" },
  { key: "subject", label: "SUBJECT", width: "1fr" },
  { key: "domain", label: "DOMAIN", width: "140px" },
  { key: "classification", label: "CLASSIFICATION", width: "160px" },
  { key: "date", label: "DATE INDEXED", width: "140px" },
  { key: "status", label: "STATUS", width: "100px" },
];

const FILTERS = ["ALL", "ACTIVE", "ARCHIVED", "RESTRICTED"];

export default function RecordsPage() {
  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / INDEX"
          title="INDEX"
          subtitle="Structured records — classified, indexed, and searchable data committed from the signal pipeline"
          badge="INDEX EMPTY"
          badgeActive={false}
        >
          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded"
            style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.35)", minWidth: 200 }}>
            <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.25)", fontSize: "12px" }}>⌕</span>
            <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.18)", fontSize: "9.5px" }}>
              Search index...
            </span>
          </div>
        </PageHeader>

        {/* Filter tabs */}
        <div className="px-6 md:px-8 py-3 flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
          {FILTERS.map((f) => (
            <button key={f} data-testid={`index-filter-${f.toLowerCase()}`}
              className="font-mono-tactical idx-filter-btn rounded px-3 py-1"
              style={{
                border: f === "ALL" ? "1px solid rgba(34,197,94,0.38)" : "1px solid rgba(34,197,94,0.1)",
                color: f === "ALL" ? "#22c55e" : "rgba(34,197,94,0.35)",
                background: f === "ALL" ? "rgba(34,197,94,0.07)" : "transparent",
                fontSize: "9.5px",
                letterSpacing: "0.1em",
              }}>
              {f}
            </button>
          ))}
          <div className="flex-1" />
          <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.22)", fontSize: "9.5px" }}>
            0 RECORDS
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Table area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Column headers */}
            <div className="grid gap-0 px-5 py-2.5 shrink-0"
              style={{
                gridTemplateColumns: "80px 1fr 140px 160px 140px 100px",
                borderBottom: "1px solid rgba(34,197,94,0.08)",
                background: "rgba(0,0,0,0.25)",
              }}>
              {COLUMNS.map((col) => (
                <div key={col.key} className="font-mono-tactical tracking-widest uppercase"
                  style={{ fontSize: "8.5px", color: "rgba(34,197,94,0.28)", letterSpacing: "0.12em" }}>
                  {col.label}
                </div>
              ))}
            </div>

            {/* Empty table body */}
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon="≡"
                title="Index empty"
                subtitle="No records committed — awaiting signal intake and structuring"
              />
            </div>
          </div>

          {/* Record detail panel */}
          <div className="w-64 xl:w-72 shrink-0 flex flex-col overflow-hidden"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div className="px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
              <span className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Record Detail
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <EmptyState icon="◌" title="No record selected" subtitle="Select a row to inspect" compact />
            </div>

            <div className="p-4 space-y-3" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(34,197,94,0.25)", fontSize: "9px", letterSpacing: "0.14em" }}>
                Index Status
              </div>
              {[
                { label: "TOTAL RECORDS", value: "—" },
                { label: "ACTIVE", value: "—" },
                { label: "ARCHIVED", value: "—" },
                { label: "RESTRICTED", value: "—" },
                { label: "LAST COMMIT", value: "—" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="font-mono-tactical"
                    style={{ fontSize: "8.5px", color: "rgba(34,197,94,0.25)", letterSpacing: "0.08em" }}>
                    {item.label}
                  </span>
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
