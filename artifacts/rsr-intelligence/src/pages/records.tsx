import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { derivePlatformState } from "@/lib/runtime";

const COLUMNS = [
  { key: "id",             label: "Record ID",    width: "10rem" },
  { key: "subject",        label: "Subject",      width: "1fr"   },
  { key: "domain",         label: "Domain",       width: "6rem"  },
  { key: "classification", label: "Class.",       width: "6rem"  },
  { key: "status",         label: "Status",       width: "7rem"  },
  { key: "dateIndexed",    label: "Indexed",      width: "9rem"  },
  { key: "source",         label: "Source",       width: "8rem"  },
];

const COL_TEMPLATE = COLUMNS.map((c) => c.width).join(" ");

const RECORD_FIELDS = [
  { key: "id",              label: "Record ID",      type: "string",  required: true  },
  { key: "subject",         label: "Subject",        type: "string",  required: true  },
  { key: "domain",          label: "Domain",         type: "enum",    required: true  },
  { key: "classification",  label: "Classification", type: "enum",    required: true  },
  { key: "dateIndexed",     label: "Date Indexed",   type: "date",    required: true  },
  { key: "dateUpdated",     label: "Date Updated",   type: "date",    required: true  },
  { key: "status",          label: "Status",         type: "enum",    required: true  },
  { key: "source",          label: "Source",         type: "string",  required: true  },
  { key: "sourceType",      label: "Source Type",    type: "enum",    required: true  },
  { key: "confidence",      label: "Confidence",     type: "enum",    required: true  },
  { key: "tags",            label: "Tags",           type: "string",  required: false },
  { key: "version",         label: "Version",        type: "number",  required: true  },
];

export default function RecordsPage() {
  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();
  const feeds = [f0, f1, f2, f3];
  const platform = derivePlatformState(feeds);

  const totalStaged = platform.totalLiveItems;
  const hasStaged   = totalStaged > 0;

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / INDEX"
          title="INDEX"
          subtitle="Committed records in the searchable data layer — discrete, versioned entries with defined scope and source attribution"
          badge="0 COMMITTED"
          badgeActive={false}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Table area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Column headers */}
            <div className="idx-col-header shrink-0">
              <div className="grid gap-0 px-5 py-2.5"
                style={{
                  gridTemplateColumns: COL_TEMPLATE,
                  borderBottom: "1px solid rgba(34,197,94,0.08)",
                  background: "rgba(0,0,0,0.28)",
                  minWidth: 640,
                }}>
                {COLUMNS.map((col) => (
                  <div key={col.key} className="font-mono-tactical tracking-widest uppercase"
                    style={{ fontSize: "8.5px", color: "rgba(34,197,94,0.5)", letterSpacing: "0.14em" }}>
                    {col.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Empty state — with honest staged candidates notice */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
              <EmptyState
                icon="≡"
                title="No committed records"
                subtitle="Records appear here when signals have been classified, structured, and committed to the index. The commit pipeline is ready — no records have been committed yet."
                statusLine="Index layer ready — 0 committed records"
              />

              {/* Staged notice — shown when sources are live */}
              {hasStaged && (
                <div className="rounded p-5 max-w-lg w-full"
                  style={{ border: "1px solid rgba(34,197,94,0.14)", background: "rgba(6,14,9,0.5)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(34,197,94,0.65)", boxShadow: "0 0 4px rgba(34,197,94,0.5)" }} />
                    <span className="font-orbitron font-bold tracking-wider"
                      style={{ color: "rgba(34,197,94,0.72)", fontSize: "10px" }}>
                      {totalStaged} Staged Candidates
                    </span>
                  </div>
                  <p className="font-mono-tactical leading-relaxed"
                    style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.88", fontSize: "10px" }}>
                    {totalStaged} signal item{totalStaged !== 1 ? "s have" : " has"} been received from live sources and
                    staged for classification. None have been committed to the index yet.
                    Staged candidates require classification and operator review before commit is allowed.
                    Classification and commit controls are accessible via the operator layer.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "rgba(155,175,170,0.3)" }} />
                    <span className="font-mono-tactical italic"
                      style={{ color: "rgba(155,175,170,0.42)", fontSize: "9.5px" }}>
                      Staged items are not shown publicly — accessible via the operator console.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Record detail panel */}
          <div className="shrink-0 flex flex-col overflow-hidden hidden lg:flex"
            style={{ borderLeft: "1px solid rgba(34,197,94,0.07)", width: 272 }}>
            {/* Record schema */}
            <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(34,197,94,0.48)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Record Schema
              </div>
              <div className="space-y-1.5">
                {RECORD_FIELDS.map((field) => (
                  <div key={field.key} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: field.required ? "rgba(34,197,94,0.5)" : "rgba(155,175,170,0.22)" }} />
                    <span className="font-mono-tactical flex-1"
                      style={{ color: field.required ? "rgba(185,205,200,0.65)" : "rgba(155,175,170,0.4)", fontSize: "9.5px" }}>
                      {field.key}
                    </span>
                    <span className="font-mono-tactical flex-shrink-0"
                      style={{ color: "rgba(155,175,170,0.28)", fontSize: "8.5px" }}>
                      {field.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Index state */}
            <div className="px-5 py-4 space-y-3 flex-1">
              <div className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(34,197,94,0.45)", fontSize: "9px", letterSpacing: "0.16em" }}>
                Index State
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Committed",  value: "0" },
                  { label: "Staged",     value: hasStaged ? String(totalStaged) : "—" },
                  { label: "Archived",   value: "—" },
                  { label: "Flagged",    value: "—" },
                  { label: "Schema Ver", value: "1.0" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between">
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(155,175,170,0.42)", fontSize: "9px", letterSpacing: "0.08em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{
                        color: item.label === "Staged" && hasStaged
                          ? "rgba(34,197,94,0.65)"
                          : "rgba(185,205,200,0.58)",
                        fontSize: "11px",
                      }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: "rgba(34,197,94,0.06)" }} />

              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(155,175,170,0.38)", fontSize: "9.5px", lineHeight: "1.8" }}>
                Committed records are immutable — revisions create versioned entries. Records carry
                source attribution, classification, and commit timestamp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
