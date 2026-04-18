import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { useLocation } from "wouter";

const PIPELINE = [
  {
    step: "01",
    label: "Signal Intake",
    output: "Classified signal log",
    path: "/signals",
    description: "Monitored sources deliver signals into INDEX. Sources are classified, signals are timestamped on arrival, and triage logic determines what moves forward.",
  },
  {
    step: "02",
    label: "Structuring",
    output: "Structured data entry",
    path: "/datasets",
    description: "Signals that clear triage are structured — scope is defined, source attribution is applied, and data is organised into its target dataset domain.",
  },
  {
    step: "03",
    label: "Dataset Assignment",
    output: "Dataset record",
    path: "/datasets",
    description: "Structured data is assigned to a domain-specific dataset. Datasets are bounded collections — signals are appended to defined scope, not piled into buckets.",
  },
  {
    step: "04",
    label: "Index Commitment",
    output: "Indexed record",
    path: "/records",
    description: "Finalised records are committed to the INDEX layer — the searchable, traversable core of the platform. Committed records are fixed; revisions are versioned.",
  },
];

const SECTORS = [
  { label: "SIGNALS",  path: "/signals",  description: "Signal categories, intake structure, and source classification" },
  { label: "DATASETS", path: "/datasets", description: "Organised data collections grouped by domain and tracked activity" },
  { label: "INDEX",    path: "/records",  description: "Searchable indexed records — the structured output of the pipeline" },
  { label: "METHOD",   path: "/method",   description: "Collection discipline, classification logic, and synthesis flow" },
  { label: "ACCESS",   path: "/access",   description: "Entry to restricted data layers and operational environments" },
];

const WHAT_IT_IS = [
  "A structured data division of the RSR Intelligence Network",
  "Signal intake, dataset structuring, and record indexing architecture",
  "The data infrastructure behind RSR's broader intelligence operation",
  "A public-facing layer documenting the analytical data pipeline",
];

const WHAT_IT_IS_NOT = [
  "Not a content or editorial platform",
  "Not a duplicate of the RSR Intelligence site",
  "Not a backend tool launcher or dashboard",
  "Not a static document archive",
  "Not a social or collaborative network",
  "Not a standalone brand unrelated to RSR",
];

export default function OverviewPage() {
  const [, setLocation] = useLocation();

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / OVERVIEW"
          title="OVERVIEW"
          subtitle="What INDEX is, where it fits within the RSR Intelligence Network, and how the signal-to-structure pipeline works"
        />

        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-4xl overflow-y-auto">

          {/* Where INDEX fits — flagship block */}
          <div className="rounded"
            style={{ border: "1px solid rgba(34,197,94,0.16)", background: "rgba(0,8,4,0.48)" }}>
            <div className="flex items-center gap-2.5 px-5 py-3"
              style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
              <div className="w-1 h-1 rounded-full" style={{ background: "rgba(34,197,94,0.55)" }} />
              <span className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(34,197,94,0.55)", fontSize: "9px", letterSpacing: "0.2em" }}>
                Where INDEX Fits
              </span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* RSR Ecosystem */}
                <div className="rounded px-4 py-4 space-y-2"
                  style={{ border: "1px solid rgba(155,175,170,0.12)", background: "rgba(0,0,0,0.25)" }}>
                  <div className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(155,175,170,0.42)", fontSize: "7.5px", letterSpacing: "0.14em" }}>
                    Parent Network
                  </div>
                  <div className="font-orbitron font-bold tracking-wide"
                    style={{ color: "rgba(185,205,200,0.78)", fontSize: "11px" }}>
                    RSR Intelligence Network
                  </div>
                  <div className="font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.62)", fontSize: "10px", lineHeight: "1.75" }}>
                    Intelligence and analytical ecosystem encompassing editorial analysis, investigations, and the data layer.
                  </div>
                  <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
                    className="font-mono-tactical tracking-widest inline-block mt-1"
                    style={{ color: "rgba(34,197,94,0.42)", fontSize: "8px", letterSpacing: "0.1em", textDecoration: "none" }}>
                    RSRINTEL.COM ↗
                  </a>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-px flex-1" style={{ background: "rgba(34,197,94,0.12)" }} />
                    <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.3)", fontSize: "16px" }}>→</span>
                    <div className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.25)", fontSize: "7.5px", letterSpacing: "0.1em" }}>DATA LAYER</div>
                    <div className="w-px flex-1" style={{ background: "rgba(34,197,94,0.12)" }} />
                  </div>
                </div>

                {/* INDEX */}
                <div className="rounded px-4 py-4 space-y-2"
                  style={{ border: "1px solid rgba(34,197,94,0.22)", background: "rgba(34,197,94,0.04)" }}>
                  <div className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(34,197,94,0.52)", fontSize: "7.5px", letterSpacing: "0.14em" }}>
                    Data Systems Division
                  </div>
                  <div className="font-orbitron font-bold tracking-wide"
                    style={{ color: "#22c55e", fontSize: "11px", textShadow: "0 0 12px rgba(34,197,94,0.12)" }}>
                    INDEX Data Network
                  </div>
                  <div className="font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.68)", fontSize: "10px", lineHeight: "1.75" }}>
                    Signal intake, dataset structuring, and record indexing. The data architecture layer — not the editorial arm.
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full"
                      style={{ background: "#22c55e", boxShadow: "0 0 4px rgba(34,197,94,0.6)" }} />
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(34,197,94,0.5)", fontSize: "8px", letterSpacing: "0.1em" }}>
                      YOU ARE HERE — PUBLIC LAYER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What INDEX is / is not */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded p-5 space-y-3 idx-card"
              style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,0,0,0.22)" }}>
              <div className="font-orbitron text-xs font-bold tracking-wider pb-2"
                style={{ color: "#22c55e", borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
                What INDEX is
              </div>
              <div className="space-y-2">
                {WHAT_IT_IS.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: "rgba(34,197,94,0.5)" }} />
                    <span className="font-mono-tactical" style={{ color: "rgba(185,205,200,0.75)", fontSize: "10.5px", lineHeight: "1.75" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-mono-tactical leading-relaxed pt-1"
                style={{ color: "rgba(185,205,200,0.58)", lineHeight: "1.88", fontSize: "10px", borderTop: "1px solid rgba(34,197,94,0.07)" }}>
                INDEX is not a newsroom and not an investigative unit. It is infrastructure — the analytical
                data architecture behind RSR's broader intelligence operation.
              </p>
            </div>
            <div className="rounded p-5 space-y-3 idx-card"
              style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.18)" }}>
              <div className="font-orbitron text-xs font-bold tracking-wider pb-2"
                style={{ color: "rgba(34,197,94,0.55)", borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
                What INDEX is not
              </div>
              <div className="space-y-2">
                {WHAT_IT_IS_NOT.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(34,197,94,0.25)" }} />
                    <span className="font-mono-tactical" style={{ color: "rgba(185,205,200,0.65)", fontSize: "10.5px" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline */}
          <div>
            <div className="font-mono-tactical tracking-widest uppercase mb-4"
              style={{ color: "rgba(34,197,94,0.5)", fontSize: "9.5px", letterSpacing: "0.2em" }}>
              The Signal-to-Record Pipeline
            </div>
            <div className="relative">
              <div className="absolute left-4 top-8 bottom-8 w-px" style={{ background: "rgba(34,197,94,0.08)" }} />
              <div className="space-y-2">
                {PIPELINE.map((phase) => (
                  <div key={phase.step} className="flex gap-5">
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
                      <div className="w-8 h-8 rounded flex items-center justify-center font-mono-tactical font-bold relative z-10"
                        style={{
                          background: "rgba(0,0,0,0.85)",
                          border: "1px solid rgba(34,197,94,0.24)",
                          color: "rgba(34,197,94,0.72)",
                          fontSize: "9.5px",
                          boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                        }}>
                        {phase.step}
                      </div>
                    </div>
                    <div className="flex-1 rounded p-4 idx-card"
                      style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-3">
                          <span className="font-orbitron text-xs font-bold tracking-wider" style={{ color: "#22c55e" }}>
                            {phase.label}
                          </span>
                          <span className="font-mono-tactical rounded px-2 py-0.5"
                            style={{
                              border: "1px solid rgba(34,197,94,0.12)",
                              color: "rgba(34,197,94,0.45)",
                              fontSize: "8.5px",
                              letterSpacing: "0.06em",
                            }}>
                            → {phase.output}
                          </span>
                        </div>
                        <button onClick={() => setLocation(phase.path)}
                          className="font-mono-tactical tracking-widest flex-shrink-0"
                          style={{ color: "rgba(34,197,94,0.4)", fontSize: "8px", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}>
                          VIEW →
                        </button>
                      </div>
                      <p className="font-mono-tactical leading-relaxed"
                        style={{ color: "rgba(185,205,200,0.72)", lineHeight: "1.85", fontSize: "10.5px" }}>
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explore sectors */}
          <div>
            <div className="font-mono-tactical tracking-widest uppercase mb-4"
              style={{ color: "rgba(34,197,94,0.5)", fontSize: "9.5px", letterSpacing: "0.2em" }}>
              Explore Sectors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {SECTORS.map((sector) => (
                <button key={sector.label} onClick={() => setLocation(sector.path)}
                  className="rounded p-4 text-left idx-card group"
                  style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.18)", cursor: "pointer" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-orbitron text-xs font-bold tracking-wider"
                      style={{ color: "rgba(34,197,94,0.72)" }}>
                      {sector.label}
                    </div>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(34,197,94,0.32)", fontSize: "11px" }}>→</span>
                  </div>
                  <div className="font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.62)", fontSize: "10px", lineHeight: "1.7" }}>
                    {sector.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
