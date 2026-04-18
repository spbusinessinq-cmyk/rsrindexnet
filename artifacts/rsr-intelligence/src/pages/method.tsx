import AppShell from "@/components/AppShell";

const PHASES = [
  {
    id: "01",
    label: "Collection Discipline",
    headline: "Source selection is a decision, not a default.",
    body: "INDEX does not monitor everything that is available. Collection discipline means defining which source categories are worth monitoring before monitoring begins. Sources are evaluated for reliability, recency, and relevance to defined analytical domains. High-volume sources that do not meet relevance thresholds are not added — regardless of availability.",
    rules: [
      "Source inclusion requires a documented rationale",
      "Source reliability is scored and reviewed — not assumed",
      "Collection scope is bounded — domains are defined before sources are added",
    ],
  },
  {
    id: "02",
    label: "Signal Classification",
    headline: "Every signal must be classified before it enters the record.",
    body: "Classification is the process that routes a signal into the INDEX architecture. It determines the signal's type, source category, domain assignment, and triage outcome. Unclassified signals are held in the staging queue — they do not auto-route. Classification decisions are logged, including dismissal reasons.",
    rules: [
      "Signals are not auto-committed without classification",
      "Classification includes source type, domain, and triage outcome",
      "Dismissal is a logged outcome — signals are not silently discarded",
    ],
  },
  {
    id: "03",
    label: "Data Structuring",
    headline: "Structuring converts a classified signal into a usable data entry.",
    body: "Structuring is the translation layer between raw classified signal and committed dataset record. A signal that passes triage is given scope, source attribution, and a domain assignment. Structuring imposes the format that makes data queryable and indexable — it is not reformatting, it is definition.",
    rules: [
      "Structured entries have defined scope — no open-ended records",
      "Source attribution is applied at structuring, not inferred later",
      "Structured entries are validated before dataset assignment",
    ],
  },
  {
    id: "04",
    label: "Dataset Assignment",
    headline: "Structured data is assigned to a bounded domain collection.",
    body: "Datasets are not storage buckets. They are bounded collections with defined analytical scope. When a structured entry is assigned to a dataset, it must fit the domain definition. Cross-domain signals are either split into typed entries or flagged for manual classification review. Datasets grow incrementally — they are not pre-populated.",
    rules: [
      "Dataset boundaries are enforced — no catch-all collections",
      "Cross-domain signals require explicit classification before assignment",
      "Dataset scope is reviewed when new signal types emerge",
    ],
  },
  {
    id: "05",
    label: "Index Commitment",
    headline: "Committed records are fixed entries in the searchable data layer.",
    body: "When a structured, dataset-assigned entry meets all criteria, it is committed to the INDEX layer. Committed records are discrete, searchable entries with defined status. Once committed, records are not overwritten — revisions are versioned. The index reflects what was known, when, and from what source. That is its core function.",
    rules: [
      "Committed records are not overwritten — revisions are versioned",
      "Each record carries a commit timestamp and source attribution",
      "Records with expired or invalidated sources are flagged, not deleted",
    ],
  },
  {
    id: "06",
    label: "Synthesis Layer",
    headline: "Synthesis flows from indexed records outward — not from raw signals.",
    body: "Synthesis is not part of the intake pipeline. It is the output layer — analysis drawn from indexed records, across datasets, with stated confidence. Synthesis products reference their record sources explicitly. Inference is separated from observation. The synthesis layer exists at the boundary between the public INDEX and the restricted operational environment behind ACCESS.",
    rules: [
      "Synthesis references indexed records — not raw signal logs",
      "Analytical confidence is stated, not implied",
      "Inference and sourced observation are kept in separate layers",
    ],
  },
];

export default function MethodPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-7 max-w-4xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(34,197,94,0.4)" }}>
              MODULE / METHOD
            </div>
            <h1 className="font-orbitron text-3xl font-bold tracking-wider" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}>
              METHOD
            </h1>
            <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              How INDEX collects, classifies, structures, and synthesizes — analytical process architecture
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
            style={{ border: "1px solid rgba(34,197,94,0.18)", color: "rgba(34,197,94,0.5)", background: "rgba(34,197,94,0.03)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.4)" }} />
            6 PHASES
          </div>
        </div>

        <div className="rounded p-4" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(34,197,94,0.03)" }}>
          <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", lineHeight: "1.95", fontSize: "11px" }}>
            INDEX operates a defined methodology for turning monitored signals into structured, indexed records. Each phase has explicit rules — not guidelines. This page documents the process architecture, not the tools that run it.
          </p>
        </div>

        <div className="space-y-4">
          {PHASES.map((phase, i) => (
            <div key={phase.id} data-testid={`phase-${phase.id}`}
              className="rounded p-5" style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded flex items-center justify-center font-mono-tactical font-bold flex-shrink-0"
                  style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.18)", color: "rgba(34,197,94,0.65)", fontSize: "10px" }}>
                  {phase.id}
                </div>
                <div className="flex-1 space-y-2.5">
                  <div>
                    <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#22c55e" }}>
                      {phase.label}
                    </div>
                    <div className="font-mono-tactical text-xs mt-0.5 italic" style={{ color: "rgba(255,255,255,0.32)", fontSize: "10.5px" }}>
                      {phase.headline}
                    </div>
                  </div>
                  <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.88", fontSize: "11px" }}>
                    {phase.body}
                  </p>
                  <div className="rounded p-3 space-y-1.5" style={{ background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.07)" }}>
                    <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px" }}>
                      Rules
                    </div>
                    {phase.rules.map((rule, ri) => (
                      <div key={ri} className="flex items-start gap-2.5">
                        <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(34,197,94,0.38)" }} />
                        <span className="font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.28)", lineHeight: "1.8", fontSize: "10.5px" }}>
                          {rule}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
