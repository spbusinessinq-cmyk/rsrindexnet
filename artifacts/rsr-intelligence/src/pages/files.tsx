import AppShell from "@/components/AppShell";
import SectionPanel from "@/components/SectionPanel";
import StatusPill from "@/components/StatusPill";
import EmptyState from "@/components/EmptyState";

const COLUMNS = ["FILENAME", "TYPE", "DATE ADDED", "SIZE", "CLASSIFICATION", "STATUS"];

export default function FilesPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "calc(100vh - 84px)" }}>
        <div
          className="px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.45)" }}>
                Module / Files
              </div>
              <h1 className="font-orbitron text-2xl font-bold tracking-widest" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
                FILES
              </h1>
              <p className="mt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                Structured analytical records — investigations, mapped cases, and evidence layers
              </p>
            </div>
            <StatusPill status="standby" label="NO FILES LOADED" />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded flex-1 max-w-xs"
              style={{ border: "1px solid rgba(34,197,94,0.15)", background: "rgba(0,0,0,0.3)" }}
            >
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.35)" }}>⌕</span>
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.2)" }}>
                Search files...
              </span>
            </div>
            <div
              className="h-5 w-px"
              style={{ background: "rgba(34,197,94,0.12)" }}
            />
            {["ALL", "REPORTS", "BRIEFS", "RAW"].map((f) => (
              <button
                key={f}
                data-testid={`file-filter-${f.toLowerCase()}`}
                className="font-mono-tactical text-xs px-3 py-1 rounded"
                style={{
                  border: f === "ALL" ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(34,197,94,0.1)",
                  color: f === "ALL" ? "#22c55e" : "rgba(34,197,94,0.35)",
                  background: f === "ALL" ? "rgba(34,197,94,0.07)" : "transparent",
                  letterSpacing: "0.1em",
                }}
              >
                {f}
              </button>
            ))}
            <div className="flex-1" />
            <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.25)", fontSize: "10px" }}>
              0 FILES
            </span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div
              className="grid gap-0 px-5 py-2 shrink-0"
              style={{
                gridTemplateColumns: "3fr 1fr 2fr 1fr 1.5fr 1fr",
                borderBottom: "1px solid rgba(34,197,94,0.08)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              {COLUMNS.map((col) => (
                <div
                  key={col}
                  className="font-mono-tactical tracking-widest uppercase"
                  style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)" }}
                >
                  {col}
                </div>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon="▣"
                title="No reports loaded"
                subtitle="Awaiting file source connection — file index ready"
              />
            </div>
          </div>

          <div
            className="w-60 xl:w-72 shrink-0 border-l"
            style={{ borderColor: "rgba(34,197,94,0.08)" }}
          >
            <SectionPanel title="File Detail">
              <EmptyState icon="◌" title="No file selected" subtitle="Select a row to view metadata" />
            </SectionPanel>
            <SectionPanel title="Vault Status" className="border-t-0 rounded-t-none">
              <div className="px-4 py-3 space-y-2.5">
                {[
                  { label: "STORAGE SOURCE", value: "Not connected" },
                  { label: "ENCRYPTION", value: "AES-256 / Pending" },
                  { label: "INDEX STATUS", value: "Shell ready" },
                  { label: "TOTAL FILES", value: "—" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical" style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.5)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </SectionPanel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
