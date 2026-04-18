import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";

const COLUMNS = ["ID", "SUBJECT", "DOMAIN", "CLASSIFICATION", "DATE INDEXED", "STATUS"];

export default function RecordsPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "calc(100vh - 84px)" }}>
        <div className="px-6 md:px-8 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.4)" }}>
                MODULE / INDEX
              </div>
              <h1 className="font-orbitron text-3xl font-bold tracking-wider" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}>
                INDEX
              </h1>
              <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
                Structured records — classified, indexed, and searchable data committed from the signal pipeline
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
              style={{ border: "1px solid rgba(34,197,94,0.15)", color: "rgba(34,197,94,0.45)", background: "rgba(34,197,94,0.03)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.35)" }} />
              INDEX EMPTY
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded"
              style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.3)", minWidth: 200 }}>
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.25)" }}>⌕</span>
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.18)" }}>Search index...</span>
            </div>
            <div className="h-5 w-px" style={{ background: "rgba(34,197,94,0.1)" }} />
            {["ALL", "ACTIVE", "ARCHIVED", "RESTRICTED"].map((f) => (
              <button key={f} data-testid={`index-filter-${f.toLowerCase()}`}
                className="font-mono-tactical text-xs px-3 py-1 rounded"
                style={{
                  border: f === "ALL" ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(34,197,94,0.1)",
                  color: f === "ALL" ? "#22c55e" : "rgba(34,197,94,0.35)",
                  background: f === "ALL" ? "rgba(34,197,94,0.07)" : "transparent",
                  letterSpacing: "0.1em",
                }}>
                {f}
              </button>
            ))}
            <div className="flex-1" />
            <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.22)", fontSize: "10px" }}>
              0 RECORDS
            </span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="grid px-6 py-2 shrink-0"
              style={{
                gridTemplateColumns: "1fr 3fr 2fr 2fr 2fr 1.5fr",
                borderBottom: "1px solid rgba(34,197,94,0.07)",
                background: "rgba(0,0,0,0.2)",
              }}>
              {COLUMNS.map((col) => (
                <div key={col} className="font-mono-tactical tracking-widest uppercase"
                  style={{ fontSize: "9px", color: "rgba(34,197,94,0.28)" }}>
                  {col}
                </div>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-center">
              <EmptyState icon="≡" title="Index empty" subtitle="No records committed — awaiting signal intake and structuring" />
            </div>
          </div>

          <div className="w-60 xl:w-72 shrink-0" style={{ borderLeft: "1px solid rgba(34,197,94,0.07)" }}>
            <div className="p-4 space-y-4">
              <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px" }}>
                Record Detail
              </div>
              <EmptyState icon="◌" title="No record selected" subtitle="Select a row to inspect" />
            </div>
            <div className="p-4 space-y-3" style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}>
              <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px" }}>
                Index Status
              </div>
              {[
                { label: "TOTAL RECORDS", value: "—" },
                { label: "ACTIVE", value: "—" },
                { label: "ARCHIVED", value: "—" },
                { label: "RESTRICTED", value: "—" },
                { label: "LAST COMMIT", value: "—" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-mono-tactical" style={{ fontSize: "9px", color: "rgba(34,197,94,0.28)", letterSpacing: "0.08em" }}>
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
