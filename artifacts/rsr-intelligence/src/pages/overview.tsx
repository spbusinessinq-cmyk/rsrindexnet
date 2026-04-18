import AppShell from "@/components/AppShell";
import { useLocation } from "wouter";

const PIPELINE = [
  {
    step: "01",
    label: "Signal Intake",
    description: "Monitored sources deliver signals into INDEX continuously. Sources are classified, signals are timestamped on arrival, and triage logic determines what moves forward.",
    output: "Classified signal log",
  },
  {
    step: "02",
    label: "Structuring",
    description: "Signals that clear triage are structured — scope is defined, source attribution is applied, and the data is organized into its target dataset or record type.",
    output: "Structured data entry",
  },
  {
    step: "03",
    label: "Dataset Assignment",
    description: "Structured data is assigned to a domain-specific dataset. Datasets are bounded collections — signals are appended, not piled. Each dataset has a defined scope.",
    output: "Dataset record",
  },
  {
    step: "04",
    label: "Index Commitment",
    description: "Finalized records are committed to the INDEX layer — the searchable, traversable core of the platform. Once indexed, a record is fixed. Revisions are versioned, not overwritten.",
    output: "Indexed record",
  },
];

const SECTORS = [
  { label: "SIGNALS", path: "/signals", description: "Signal categories, intake structure, and source classification" },
  { label: "DATASETS", path: "/datasets", description: "Organized data collections grouped by domain and tracked activity" },
  { label: "INDEX", path: "/records", description: "Searchable indexed records — the structured output of the pipeline" },
  { label: "METHOD", path: "/method", description: "Collection discipline, classification logic, and synthesis flow" },
  { label: "ACCESS", path: "/access", description: "Entry to restricted data layers and operational environments" },
];

export default function OverviewPage() {
  const [, setLocation] = useLocation();

  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-8 max-w-4xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.4)" }}>
              MODULE / OVERVIEW
            </div>
            <h1 className="font-orbitron text-3xl font-bold tracking-wider" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}>
              OVERVIEW
            </h1>
            <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              What INDEX is, what it does, and how signal-to-structure works
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded p-5 space-y-3" style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.2)" }}>
            <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#22c55e" }}>What INDEX is</div>
            <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", lineHeight: "1.9", fontSize: "11px" }}>
              INDEX is a structured data and signal network. It is not a newsroom, a content platform, or a system catalog.
              It exists to monitor defined signal categories, structure incoming data into classified collections, and build
              a traversable record index — the public-facing analytical data layer of a larger intelligence infrastructure.
            </p>
          </div>
          <div className="rounded p-5 space-y-3" style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.2)" }}>
            <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#22c55e" }}>What INDEX is not</div>
            <div className="space-y-2">
              {[
                "Not a content or editorial platform",
                "Not a duplicate of the RSR Intel site's systems layer",
                "Not a tool launcher or backend dashboard",
                "Not a static document archive",
                "Not a social or collaborative network",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(34,197,94,0.3)" }} />
                  <span className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.32)", fontSize: "10.5px" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono-tactical text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(34,197,94,0.35)" }}>
            The Pipeline
          </div>
          <div className="space-y-3">
            {PIPELINE.map((phase, i) => (
              <div key={phase.step} className="flex gap-4">
                <div className="flex flex-col items-center gap-0 flex-shrink-0">
                  <div className="w-8 h-8 rounded flex items-center justify-center font-mono-tactical font-bold"
                    style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.18)", color: "rgba(34,197,94,0.7)", fontSize: "10px" }}>
                    {phase.step}
                  </div>
                  {i < PIPELINE.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(34,197,94,0.1)", minHeight: 20 }} />}
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-orbitron text-xs font-bold tracking-wider" style={{ color: "#22c55e" }}>
                      {phase.label}
                    </span>
                    <span className="font-mono-tactical text-xs px-2 py-0.5 rounded"
                      style={{ border: "1px solid rgba(34,197,94,0.12)", color: "rgba(34,197,94,0.4)", fontSize: "9px" }}>
                      → {phase.output}
                    </span>
                  </div>
                  <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.85", fontSize: "10.5px" }}>
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono-tactical text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(34,197,94,0.35)" }}>
            Platform Sectors
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SECTORS.map((sector) => (
              <button
                key={sector.label}
                onClick={() => setLocation(sector.path)}
                className="rounded p-4 text-left transition-all duration-200"
                style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.15)", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,197,94,0.28)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,197,94,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,197,94,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.15)";
                }}
              >
                <div className="font-orbitron text-xs font-bold tracking-wider mb-1" style={{ color: "rgba(34,197,94,0.75)" }}>
                  {sector.label}
                </div>
                <div className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>
                  {sector.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
