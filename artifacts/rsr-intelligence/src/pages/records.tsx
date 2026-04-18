import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

const COLUMNS = [
  { key: "id",             label: "ID",             width: "80px" },
  { key: "subject",        label: "SUBJECT",        width: "1fr" },
  { key: "domain",         label: "DOMAIN",         width: "100px" },
  { key: "classification", label: "CLASS",          width: "110px" },
  { key: "confidence",     label: "CONFIDENCE",     width: "110px" },
  { key: "dateIndexed",    label: "DATE INDEXED",   width: "130px" },
  { key: "status",         label: "STATUS",         width: "90px" },
];

const COL_TEMPLATE = COLUMNS.map(c => c.width).join(" ");

const FILTERS = ["ALL", "ACTIVE", "ARCHIVED", "RESTRICTED"];

const RECORD_SCHEMA = [
  { key: "id",             type: "string",  note: "Unique index identifier" },
  { key: "subject",        type: "string",  note: "Primary subject of the record" },
  { key: "domain",         type: "enum",    note: "Dataset domain assignment" },
  { key: "classification", type: "enum",    note: "Access classification level" },
  { key: "dateIndexed",    type: "date",    note: "Timestamp of index commitment" },
  { key: "dateUpdated",    type: "date",    note: "Timestamp of last revision" },
  { key: "status",         type: "enum",    note: "Current record status" },
  { key: "source",         type: "string",  note: "Source attribution identifier" },
  { key: "sourceType",     type: "enum",    note: "Intake category of source" },
  { key: "confidence",     type: "enum",    note: "Confidence level: confirmed / probable / unverified" },
  { key: "tags",           type: "string",  note: "Optional classification tags" },
  { key: "version",        type: "number",  note: "Record revision version" },
];

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
          {/* Search shell */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded"
            style={{
              border: "1px solid rgba(34,197,94,0.12)",
              background: "rgba(0,0,0,0.35)",
              minWidth: 210,
            }}>
            <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.3)", fontSize: "12px" }}>⌕</span>
            <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.3)", fontSize: "9.5px" }}>
              Search index...
            </span>
          </div>
        </PageHeader>

        {/* Filter bar */}
        <div className="px-6 md:px-8 py-3 flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
          {FILTERS.map((f) => (
            <button key={f} data-testid={`index-filter-${f.toLowerCase()}`}
              className="font-mono-tactical idx-filter-btn rounded px-3 py-1"
              style={{
                border: f === "ALL" ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(34,197,94,0.1)",
                color: f === "ALL" ? "#22c55e" : "rgba(155,175,170,0.45)",
                background: f === "ALL" ? "rgba(34,197,94,0.07)" : "transparent",
                fontSize: "9.5px",
                letterSpacing: "0.1em",
              }}>
              {f}
            </button>
          ))}
          <div className="flex-1" />
          <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.38)", fontSize: "9.5px" }}>
            0 RECORDS
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Table area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Column headers */}
            <div className="grid gap-0 px-5 py-2.5 shrink-0"
              style={{
                gridTemplateColumns: COL_TEMPLATE,
                borderBottom: "1px solid rgba(34,197,94,0.08)",
                background: "rgba(0,0,0,0.28)",
              }}>
              {COLUMNS.map((col) => (
                <div key={col.key} className="font-mono-tactical tracking-widest uppercase"
                  style={{ fontSize: "8.5px", color: "rgba(34,197,94,0.5)", letterSpacing: "0.14em" }}>
                  {col.label}
                </div>
              ))}
            </div>

            {/* Empty state */}
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon="≡"
                title="Index empty"
                subtitle="No records committed — awaiting signal intake and structuring. Records appear here when signals clear triage and are committed to the index."
                statusLine="Index layer ready — awaiting first record commit"
              />
            </div>
          </div>

          {/* Record detail panel */}
          <div className="w-68 xl:w-76 shrink-0 flex flex-col overflow-hidden"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)", width: 272 }}>
            {/* Panel header */}
            <div className="px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
              <span className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(34,197,94,0.5)", fontSize: "9px", letterSpacing: "0.18em" }}>
                Record Detail
              </span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Empty selection */}
              <div className="px-4 py-4">
                <EmptyState icon="◌" title="No record selected" subtitle="Select a row to inspect" compact />
              </div>

              {/* Record schema reference */}
              <div className="px-4 pb-4">
                <div className="h-px mb-4" style={{ background: "rgba(34,197,94,0.07)" }} />
                <div className="font-mono-tactical tracking-widest uppercase mb-3"
                  style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.16em" }}>
                  Record Schema
                </div>
                <div className="space-y-2">
                  {RECORD_SCHEMA.map((field) => (
                    <div key={field.key} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: "rgba(34,197,94,0.35)" }} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tactical"
                            style={{ color: "rgba(185,205,200,0.7)", fontSize: "9.5px" }}>
                            {field.key}
                          </span>
                          <span className="font-mono-tactical"
                            style={{ color: "rgba(155,175,170,0.32)", fontSize: "8.5px" }}>
                            {field.type}
                          </span>
                        </div>
                        <div className="font-mono-tactical"
                          style={{ color: "rgba(155,175,170,0.42)", fontSize: "9px", lineHeight: "1.5" }}>
                          {field.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Index stats footer */}
            <div className="p-4 space-y-2.5" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.14em" }}>
                Index Status
              </div>
              {[
                { label: "TOTAL RECORDS", value: "—" },
                { label: "ACTIVE",        value: "—" },
                { label: "ARCHIVED",      value: "—" },
                { label: "RESTRICTED",    value: "—" },
                { label: "LAST COMMIT",   value: "—" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="font-mono-tactical"
                    style={{ fontSize: "8.5px", color: "rgba(155,175,170,0.4)", letterSpacing: "0.08em" }}>
                    {item.label}
                  </span>
                  <span className="font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.55)", fontSize: "10px" }}>
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
