import { useLocation } from "wouter";
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
  const [, setLocation] = useLocation();

  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();
  const feeds = [f0, f1, f2, f3];
  const platform = derivePlatformState(feeds);

  const totalStaged = platform.totalLiveItems;
  const hasStaged   = totalStaged > 0;
  const sourcesActive = platform.sourcesConnected;
  const pipelineActive = sourcesActive > 0;

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / RECORD INDEX"
          title="RECORD INDEX"
          subtitle="Committed records in the searchable data layer — discrete, versioned entries with defined scope and source attribution"
          badge={hasStaged
            ? `${totalStaged} STAGED — 0 COMMITTED`
            : "0 COMMITTED RECORDS"}
          badgeActive={hasStaged}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Table area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Column headers */}
            <div className="idx-col-header shrink-0">
              <div className="grid gap-0 px-5 py-2.5"
                style={{
                  gridTemplateColumns: COL_TEMPLATE,
                  borderBottom: "1px solid rgba(245,158,11,0.08)",
                  background: "rgba(13,21,32,0.28)",
                  minWidth: 640,
                }}>
                {COLUMNS.map((col) => (
                  <div key={col.key} className="font-mono-tactical tracking-widest uppercase"
                    style={{ fontSize: "12.5px", color: "rgba(245,158,11,0.52)", letterSpacing: "0.14em" }}>
                    {col.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto">
              {/* Pipeline convergence visual */}
              <div className="px-6 md:px-8 pt-6 pb-4">
                <div className="rounded mb-6"
                  style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.2)" }}>
                  <div className="flex items-center gap-2.5 px-4 py-2.5"
                    style={{ borderBottom: "1px solid rgba(245,158,11,0.07)" }}>
                    <div className="w-1 h-1 rounded-full"
                      style={{
                        background: pipelineActive ? "#F59E0B" : "rgba(127,142,155,0.25)",
                        boxShadow: pipelineActive ? "0 0 4px rgba(245,158,11,0.5)" : undefined,
                      }} />
                    <span className="font-mono-tactical tracking-widest uppercase"
                      style={{ color: "rgba(245,158,11,0.5)", fontSize: "13px", letterSpacing: "0.16em" }}>
                      Pipeline Convergence
                    </span>
                  </div>
                  <div className="flex items-stretch divide-x"
                    style={{ borderColor: "rgba(245,158,11,0.06)" }}>
                    {[
                      {
                        phase: "01",
                        label: "SIGNALS",
                        path: "/signals",
                        value: pipelineActive ? `${sourcesActive} src · ${totalStaged} staged` : "Sources ready",
                        live: pipelineActive,
                        note: "Intake layer",
                      },
                      {
                        phase: "02",
                        label: "DATASETS",
                        path: "/datasets",
                        value: platform.domainsBound > 0 ? `${platform.domainsBound}/${platform.domainsTotal} bound` : "Schemas defined",
                        live: platform.domainsBound > 0,
                        note: "Domain layer",
                      },
                      {
                        phase: "03",
                        label: "RECORDS",
                        path: "/records",
                        value: "0 committed",
                        live: false,
                        note: "This layer",
                        current: true,
                      },
                    ].map((p, i) => (
                      <button key={p.label}
                        onClick={() => !p.current && setLocation(p.path)}
                        className="flex-1 px-4 py-3.5 text-left"
                        style={{
                          background: p.current ? "rgba(245,158,11,0.04)" : "none",
                          border: "none",
                          cursor: p.current ? "default" : "pointer",
                        }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-mono-tactical" style={{ color: "rgba(245,158,11,0.28)", fontSize: "11.5px" }}>
                            {p.phase}
                          </span>
                          <div className="w-1 h-1 rounded-full"
                            style={{
                              background: p.live ? "rgba(245,158,11,0.65)" : p.current ? "rgba(245,158,11,0.35)" : "rgba(127,142,155,0.2)",
                              boxShadow: p.live ? "0 0 3px rgba(245,158,11,0.5)" : undefined,
                            }} />
                        </div>
                        <div className="font-orbitron font-bold tracking-wider"
                          style={{ color: p.current ? "rgba(245,158,11,0.78)" : p.live ? "rgba(245,158,11,0.65)" : "rgba(127,142,155,0.45)", fontSize: "13px" }}>
                          {p.label}
                        </div>
                        <div className="font-mono-tactical mt-0.5"
                          style={{ color: p.live ? "rgba(180,192,202,0.65)" : "rgba(127,142,155,0.32)", fontSize: "13px" }}>
                          {p.value}
                        </div>
                        <div className="font-mono-tactical mt-0.5 italic"
                          style={{ color: "rgba(127,142,155,0.28)", fontSize: "12.5px" }}>
                          {p.note}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Empty state */}
                <EmptyState
                  icon="≡"
                  title="No committed records"
                  subtitle={
                    sourcesActive > 0
                      ? `${sourcesActive} source${sourcesActive !== 1 ? "s are" : " is"} active and feeding staged candidates. Records appear here when signals have been classified, structured, and committed to the index.`
                      : "Records appear here when signals have been classified, structured, and committed to the index. The pipeline is ready — no records have been committed yet."
                  }
                  statusLine={hasStaged
                    ? `${totalStaged} staged candidate${totalStaged !== 1 ? "s" : ""} in pipeline — awaiting classification and commit`
                    : "Index layer ready — commit pipeline waiting"}
                />

                {/* Staged candidates card */}
                {hasStaged && (
                  <div className="rounded mt-4 max-w-xl mx-auto"
                    style={{ border: "1px solid rgba(245,158,11,0.2)", background: "rgba(28,42,53,0.55)" }}>
                    <div className="flex items-center gap-2.5 px-5 py-3"
                      style={{ borderBottom: "1px solid rgba(245,158,11,0.1)" }}>
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#F59E0B", boxShadow: "0 0 5px rgba(245,158,11,0.55)" }} />
                      <span className="font-orbitron font-bold tracking-wider"
                        style={{ color: "rgba(245,158,11,0.8)", fontSize: "14px", letterSpacing: "0.12em" }}>
                        {totalStaged} STAGED CANDIDATE{totalStaged !== 1 ? "S" : ""}
                      </span>
                      <span className="font-mono-tactical ml-auto"
                        style={{ color: "rgba(127,142,155,0.35)", fontSize: "12.5px" }}>
                        pre-commit
                      </span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="font-mono-tactical leading-relaxed"
                        style={{ color: "rgba(180,192,202,0.72)", lineHeight: "2.02", fontSize: "15px" }}>
                        {totalStaged} signal item{totalStaged !== 1 ? "s have" : " has"} been received from live sources and
                        staged for classification. None have been committed to the index.
                      </p>
                      <div className="rounded px-3.5 py-3 space-y-2"
                        style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.3)" }}>
                        <div className="font-mono-tactical tracking-widest uppercase"
                          style={{ color: "rgba(245,158,11,0.38)", fontSize: "17px", letterSpacing: "0.12em", marginBottom: 6 }}>
                          Commit Requirements
                        </div>
                        {[
                          "Signal must be classified with domain and type",
                          "Source attribution must be verified and applied",
                          "Structured entry must pass schema validation",
                          "Operator review and explicit commit action required",
                        ].map((req, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="font-mono-tactical flex-shrink-0"
                              style={{ color: "rgba(127,142,155,0.3)", fontSize: "13px" }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-mono-tactical"
                              style={{ color: "rgba(127,142,155,0.52)", fontSize: "14px", lineHeight: "1.8" }}>
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-1"
                        style={{ borderTop: "1px solid rgba(245,158,11,0.07)" }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "rgba(127,142,155,0.25)" }} />
                        <span className="font-mono-tactical italic"
                          style={{ color: "rgba(127,142,155,0.45)", fontSize: "13px" }}>
                          Classification and commit controls exist in the operator layer.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upstream links */}
                <div className="max-w-xl mx-auto mt-4 flex gap-3">
                  <button onClick={() => setLocation("/signals")}
                    className="flex-1 rounded px-4 py-3 text-left"
                    style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.2)", cursor: "pointer" }}>
                    <div className="font-mono-tactical tracking-widest uppercase mb-1"
                      style={{ color: "rgba(245,158,11,0.4)", fontSize: "11.5px", letterSpacing: "0.12em" }}>
                      Upstream
                    </div>
                    <div className="font-orbitron font-bold tracking-wider"
                      style={{ color: "rgba(245,158,11,0.62)", fontSize: "14px" }}>
                      SIGNALS ←
                    </div>
                    <div className="font-mono-tactical mt-1"
                      style={{ color: "rgba(127,142,155,0.45)", fontSize: "13px" }}>
                      Signal intake layer
                    </div>
                  </button>
                  <button onClick={() => setLocation("/datasets")}
                    className="flex-1 rounded px-4 py-3 text-left"
                    style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.2)", cursor: "pointer" }}>
                    <div className="font-mono-tactical tracking-widest uppercase mb-1"
                      style={{ color: "rgba(245,158,11,0.4)", fontSize: "11.5px", letterSpacing: "0.12em" }}>
                      Upstream
                    </div>
                    <div className="font-orbitron font-bold tracking-wider"
                      style={{ color: "rgba(245,158,11,0.62)", fontSize: "14px" }}>
                      DATASETS ←
                    </div>
                    <div className="font-mono-tactical mt-1"
                      style={{ color: "rgba(127,142,155,0.45)", fontSize: "13px" }}>
                      Domain collections
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="shrink-0 flex flex-col overflow-hidden hidden lg:flex"
            style={{ borderLeft: "1px solid rgba(245,158,11,0.07)", width: 272 }}>
            {/* Record schema */}
            <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(245,158,11,0.07)" }}>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(245,158,11,0.5)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Record Schema
              </div>
              <div className="space-y-1.5">
                {RECORD_FIELDS.map((field) => (
                  <div key={field.key} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: field.required ? "rgba(245,158,11,0.55)" : "rgba(127,142,155,0.2)" }} />
                    <span className="font-mono-tactical flex-1"
                      style={{ color: field.required ? "rgba(180,192,202,0.72)" : "rgba(127,142,155,0.42)", fontSize: "14px" }}>
                      {field.key}
                    </span>
                    <span className="font-mono-tactical flex-shrink-0"
                      style={{ color: "rgba(127,142,155,0.3)", fontSize: "12.5px" }}>
                      {field.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Index state */}
            <div className="px-5 py-4 space-y-3 flex-1 overflow-y-auto">
              <div className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(245,158,11,0.48)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Index State
              </div>
              <div className="rounded px-3.5 py-3 space-y-2.5"
                style={{ border: "1px solid rgba(245,158,11,0.08)", background: "rgba(13,21,32,0.28)" }}>
                {[
                  { label: "Committed",    value: "0",                                            active: false },
                  { label: "Staged",       value: hasStaged ? String(totalStaged) : "—",           active: hasStaged },
                  { label: "Archived",     value: "—",                                             active: false },
                  { label: "Flagged",      value: "—",                                             active: false },
                  { label: "Schema Ver",   value: "1.0",                                           active: false },
                  { label: "Sources Live", value: sourcesActive > 0 ? String(sourcesActive) : "—", active: sourcesActive > 0 },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between">
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(127,142,155,0.45)", fontSize: "13px", letterSpacing: "0.08em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{
                        color: item.active ? "rgba(245,158,11,0.75)" : "rgba(180,192,202,0.58)",
                        fontSize: "17px",
                      }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: "rgba(245,158,11,0.06)" }} />

              <p className="font-mono-tactical leading-relaxed"
                style={{ color: "rgba(127,142,155,0.5)", fontSize: "14px", lineHeight: "1.8" }}>
                Committed records are immutable — revisions create versioned entries. Records carry
                source attribution, classification, and commit timestamp.
              </p>

              <div className="h-px" style={{ background: "rgba(245,158,11,0.06)" }} />

              {/* Pipeline position */}
              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                  style={{ color: "rgba(245,158,11,0.42)", fontSize: "12.5px", letterSpacing: "0.14em" }}>
                  Pipeline Position
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "SIGNALS", note: "intake", current: false, live: pipelineActive },
                    { label: "DATASETS", note: "structure", current: false, live: platform.domainsBound > 0 },
                    { label: "RECORDS", note: "this layer", current: true, live: false },
                  ].map((p) => (
                    <div key={p.label} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{
                          background: p.current ? "rgba(245,158,11,0.6)" : p.live ? "rgba(245,158,11,0.45)" : "rgba(127,142,155,0.2)",
                        }} />
                      <span className="font-orbitron font-semibold tracking-wider"
                        style={{ color: p.current ? "rgba(245,158,11,0.72)" : p.live ? "rgba(245,158,11,0.55)" : "rgba(127,142,155,0.38)", fontSize: "12.5px" }}>
                        {p.label}
                      </span>
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(127,142,155,0.3)", fontSize: "12.5px" }}>
                        {p.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
