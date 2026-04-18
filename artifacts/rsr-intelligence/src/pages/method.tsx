import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

const PHASES = [
  {
    id: "01",
    label: "Collection Discipline",
    headline: "Source selection is a decision, not a default.",
    body: "INDEX does not monitor everything available. Collection discipline means defining which source categories are worth monitoring before monitoring begins. Sources are evaluated for reliability, recency, and relevance to defined analytical domains. High-volume sources that do not meet relevance thresholds are not added — regardless of availability.",
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
    body: "Classification routes a signal into the INDEX architecture. It determines the signal's type, source category, domain assignment, and triage outcome. Unclassified signals are held in the staging queue — they do not auto-route. Classification decisions are logged, including dismissal reasons.",
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
    body: "Datasets are not storage buckets. They are bounded collections with defined analytical scope. When a structured entry is assigned to a dataset, it must fit the domain definition. Cross-domain signals are either split into typed entries or flagged for manual classification review.",
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
    body: "When a structured, dataset-assigned entry meets all criteria, it is committed to the INDEX layer. Committed records are discrete, searchable entries with defined status. Once committed, records are not overwritten — revisions are versioned. The index reflects what was known, when, and from what source.",
    rules: [
      "Committed records are not overwritten — revisions are versioned",
      "Each record carries a commit timestamp and source attribution",
      "Records with expired sources are flagged, not deleted",
    ],
  },
  {
    id: "06",
    label: "Synthesis Layer",
    headline: "Synthesis flows from indexed records outward — not from raw signals.",
    body: "Synthesis is not part of the intake pipeline. It is the output layer — analysis drawn from indexed records, across datasets, with stated confidence. Synthesis products reference their record sources explicitly. Inference is separated from observation. The synthesis layer exists at the boundary between the public INDEX and the restricted operational environment.",
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
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / METHOD"
          title="METHOD"
          subtitle="How INDEX collects, classifies, structures, and synthesizes — process architecture, not tool inventory"
          badge="6 PHASES"
        />

        <div className="flex-1 p-6 md:p-8 max-w-4xl space-y-4">
          {/* Context block */}
          <div className="rounded p-4 md:p-5"
            style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,8,4,0.45)" }}>
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(185,205,200,0.65)", lineHeight: "1.92", fontSize: "10.5px" }}>
              INDEX operates a defined methodology for turning monitored signals into structured, indexed records.
              Each phase has explicit rules — not guidelines. This page documents the process architecture, not the tools that run it.
            </p>
          </div>

          {PHASES.map((phase) => (
            <div key={phase.id} data-testid={`phase-${phase.id}`}
              className="rounded p-5 idx-card"
              style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}>
              <div className="flex items-start gap-4">
                {/* Phase number */}
                <div className="w-9 h-9 rounded flex items-center justify-center font-mono-tactical font-bold flex-shrink-0"
                  style={{
                    background: "rgba(34,197,94,0.05)",
                    border: "1px solid rgba(34,197,94,0.22)",
                    color: "rgba(34,197,94,0.68)",
                    fontSize: "9.5px",
                  }}>
                  {phase.id}
                </div>

                <div className="flex-1 space-y-3 min-w-0">
                  {/* Label + headline */}
                  <div>
                    <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#22c55e" }}>
                      {phase.label}
                    </div>
                    <div className="font-mono-tactical mt-1 italic"
                      style={{ color: "rgba(185,205,200,0.52)", fontSize: "10.5px", lineHeight: "1.7" }}>
                      {phase.headline}
                    </div>
                  </div>

                  {/* Body */}
                  <p className="font-mono-tactical leading-relaxed"
                    style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.9", fontSize: "10.5px" }}>
                    {phase.body}
                  </p>

                  {/* Rules */}
                  <div className="rounded p-3.5 space-y-2"
                    style={{ background: "rgba(34,197,94,0.025)", border: "1px solid rgba(34,197,94,0.08)" }}>
                    <div className="font-mono-tactical tracking-widest uppercase mb-2"
                      style={{ color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.14em" }}>
                      Rules
                    </div>
                    {phase.rules.map((rule, ri) => (
                      <div key={ri} className="flex items-start gap-2.5">
                        <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "rgba(34,197,94,0.42)" }} />
                        <span className="font-mono-tactical"
                          style={{ color: "rgba(185,205,200,0.58)", lineHeight: "1.8", fontSize: "10.5px" }}>
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
