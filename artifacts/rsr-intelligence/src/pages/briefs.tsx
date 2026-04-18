import AppShell from "@/components/AppShell";
import SectionPanel from "@/components/SectionPanel";
import StatusPill from "@/components/StatusPill";
import EmptyState from "@/components/EmptyState";

export default function BriefsPage() {
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
                Module / Briefs
              </div>
              <h1 className="font-orbitron text-2xl font-bold tracking-widest" style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
                BRIEFS
              </h1>
              <p className="mt-1 font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.45)" }}>
                Synthesized intelligence outputs — analytical conclusions in structured report form
              </p>
            </div>
            <StatusPill status="standby" label="NO BRIEFS AVAILABLE" />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div
            className="w-72 shrink-0 flex flex-col border-r overflow-y-auto"
            style={{ borderColor: "rgba(34,197,94,0.1)" }}
          >
            <div
              className="px-4 py-2.5 shrink-0 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.2)" }}
            >
              <span className="font-mono-tactical tracking-widest uppercase" style={{ fontSize: "9px", color: "rgba(34,197,94,0.35)" }}>
                BRIEF INDEX
              </span>
              <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.25)" }}>
                0 LOADED
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2.5 shrink-0" style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded flex-1"
                style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.3)" }}
              >
                <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.2)" }}>Search briefs...</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon="◉"
                title="No briefs available"
                subtitle="Awaiting brief source binding"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="flex items-center justify-between px-6 py-3 shrink-0"
              style={{ borderBottom: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono-tactical tracking-widest uppercase" style={{ fontSize: "9px", color: "rgba(34,197,94,0.3)" }}>
                  BRIEF VIEWER
                </span>
              </div>
              <div className="flex items-center gap-2">
                {["PRINT", "EXPORT", "ARCHIVE"].map((a) => (
                  <button
                    key={a}
                    className="font-mono-tactical rounded px-2.5 py-1 transition-all duration-150"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      border: "1px solid rgba(34,197,94,0.12)",
                      color: "rgba(34,197,94,0.3)",
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon="◌"
                title="Brief viewer ready"
                subtitle="Select a brief from the index to load content"
              />
            </div>
          </div>

          <div
            className="w-56 shrink-0 flex flex-col border-l overflow-y-auto"
            style={{ borderColor: "rgba(34,197,94,0.08)" }}
          >
            <SectionPanel title="Metadata">
              <div className="px-4 py-3 space-y-3">
                {[
                  { label: "BRIEF ID", value: "—" },
                  { label: "CLASSIFICATION", value: "—" },
                  { label: "DATE ISSUED", value: "—" },
                  { label: "AUTHOR", value: "—" },
                  { label: "STATUS", value: "—" },
                  { label: "TAGS", value: "—" },
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
            <SectionPanel title="Source" className="border-t-0 rounded-t-none">
              <div className="px-4 py-3">
                <div className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.35)" }}>
                  No source connected
                </div>
                <div className="mt-1 font-mono-tactical" style={{ fontSize: "10px", color: "rgba(34,197,94,0.2)" }}>
                  Awaiting brief source binding
                </div>
              </div>
            </SectionPanel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
