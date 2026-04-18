import AppShell from "@/components/AppShell";
import SectionPanel from "@/components/SectionPanel";
import StatusPill from "@/components/StatusPill";
import EmptyState from "@/components/EmptyState";

const FILTERS = ["ALL", "PRIORITY", "UNREAD", "ARCHIVED"];

export default function SignalsPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full overflow-hidden" style={{ minHeight: "calc(100vh - 84px)" }}>
        <div
          className="px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.45)" }}>
                Module / Signals
              </div>
              <h1 className="font-orbitron text-2xl font-bold tracking-widest" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
                SIGNALS
              </h1>
              <p className="mt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                Signal capture, source triage, and pattern classification workspace
              </p>
            </div>
            <StatusPill status="standby" label="NO FEEDS CONNECTED" />
          </div>

          <div className="flex items-center gap-3 mt-4">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase()}`}
                className="font-mono-tactical text-xs px-3 py-1 rounded transition-all duration-150"
                style={{
                  border: f === "ALL" ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(34,197,94,0.12)",
                  color: f === "ALL" ? "#22c55e" : "rgba(34,197,94,0.4)",
                  background: f === "ALL" ? "rgba(34,197,94,0.08)" : "transparent",
                  letterSpacing: "0.12em",
                }}
              >
                {f}
              </button>
            ))}
            <div className="flex-1" />
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded"
              style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.3)" }}
            >
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.3)", fontSize: "10px" }}>SEARCH</span>
              <div
                className="w-px h-3"
                style={{ background: "rgba(34,197,94,0.2)" }}
              />
              <span className="font-mono-tactical text-xs w-36" style={{ color: "rgba(34,197,94,0.2)" }}>Filter signals...</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div
            className="flex-1 flex flex-col overflow-y-auto"
            style={{ borderRight: "1px solid rgba(34,197,94,0.08)" }}
          >
            <div
              className="grid grid-cols-12 gap-0 px-4 py-2 shrink-0"
              style={{ borderBottom: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.2)" }}
            >
              {["#", "SOURCE", "TYPE", "TIMESTAMP", "PRIORITY", "STATUS"].map((h) => (
                <div
                  key={h}
                  className={`font-mono-tactical text-xs tracking-widest uppercase ${h === "#" ? "col-span-1" : h === "SOURCE" ? "col-span-3" : h === "TYPE" ? "col-span-2" : h === "TIMESTAMP" ? "col-span-3" : h === "PRIORITY" ? "col-span-2" : "col-span-1"}`}
                  style={{ color: "rgba(34,197,94,0.3)", fontSize: "9px" }}
                >
                  {h}
                </div>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon="◈"
                title="No signal feeds connected"
                subtitle="Awaiting source binding — signal rows will populate here"
              />
            </div>
          </div>

          <div
            className="w-64 xl:w-72 shrink-0 flex flex-col overflow-y-auto"
          >
            <SectionPanel title="Signal Inspector" subtitle="Select a signal to inspect">
              <EmptyState
                icon="◌"
                title="No signal selected"
                subtitle="Select a row to view detail"
              />
            </SectionPanel>

            <div className="mt-0">
              <SectionPanel title="Feed Status">
                <div className="px-4 py-3 space-y-2.5">
                  {[
                    { label: "PRIMARY FEED", value: "Not connected" },
                    { label: "SECONDARY FEED", value: "Not connected" },
                    { label: "WEBHOOK ENDPOINT", value: "Awaiting config" },
                    { label: "LAST SYNC", value: "—" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <span className="font-mono-tactical" style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)", letterSpacing: "0.1em" }}>
                        {item.label}
                      </span>
                      <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionPanel>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
