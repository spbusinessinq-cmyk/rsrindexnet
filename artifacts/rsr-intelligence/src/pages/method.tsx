import { useLocation } from "wouter";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

const PHASES = [
  {
    id: "01",
    label: "Collection Discipline",
    headline: "Source selection is a decision, not a default.",
    body: "Pacific Systems does not monitor everything available. Collection discipline means defining which source categories are worth monitoring before monitoring begins. Sources are evaluated for reliability, recency, and relevance to defined analytical domains. High-volume sources that do not meet relevance thresholds are not added — regardless of availability.",
    rules: [
      "Source inclusion requires a documented rationale",
      "Source reliability is scored and reviewed — not assumed",
      "Collection scope is bounded — domains are defined before sources are added",
    ],
    relatedPath: "/signals",
    relatedLabel: "SIGNALS",
  },
  {
    id: "02",
    label: "Signal Classification",
    headline: "Every signal must be classified before it enters the record.",
    body: "Classification routes a signal into the Pacific Systems architecture. It determines the signal's type, source category, domain assignment, and triage outcome. Unclassified signals are held in the staging queue — they do not auto-route. Classification decisions are logged, including dismissal reasons.",
    rules: [
      "Signals are not auto-committed without classification",
      "Classification includes source type, domain, and triage outcome",
      "Dismissal is a logged outcome — signals are not silently discarded",
    ],
    relatedPath: "/signals",
    relatedLabel: "SIGNALS",
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
    relatedPath: "/datasets",
    relatedLabel: "DATASETS",
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
    relatedPath: "/datasets",
    relatedLabel: "DATASETS",
  },
  {
    id: "05",
    label: "Index Commitment",
    headline: "Committed records are fixed entries in the searchable data layer.",
    body: "When a structured, dataset-assigned entry meets all criteria, it is committed to the record index layer. Committed records are discrete, searchable entries with defined status. Once committed, records are not overwritten — revisions are versioned.",
    rules: [
      "Committed records are not overwritten — revisions are versioned",
      "Each record carries a commit timestamp and source attribution",
      "Records with expired sources are flagged, not deleted",
    ],
    relatedPath: "/records",
    relatedLabel: "RECORDS",
  },
  {
    id: "06",
    label: "Synthesis Layer",
    headline: "Synthesis flows from indexed records outward — not from raw signals.",
    body: "Synthesis is not part of the intake pipeline. It is the output layer — analysis drawn from indexed records, across datasets, with stated confidence. Synthesis products reference their record sources explicitly.",
    rules: [
      "Synthesis references indexed records — not raw signal logs",
      "Analytical confidence is stated, not implied",
      "Inference and sourced observation are kept in separate layers",
    ],
    relatedPath: "/records",
    relatedLabel: "RECORDS",
  },
];

export default function MethodPage() {
  const [, setLocation] = useLocation();

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / METHOD"
          title="METHOD"
          subtitle="How Pacific Systems collects, classifies, structures, and synthesises — process architecture, not tool inventory"
          badge="6 PHASES"
          badgeActive={true}
        />

        {/* Phase navigator strip */}
        <div className="shrink-0 flex items-center gap-0 overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(245,158,11,0.06)", background: "rgba(0,0,0,0.2)" }}>
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
              style={{ borderRight: i < PHASES.length - 1 ? "1px solid rgba(245,158,11,0.06)" : undefined }}>
              <span className="font-mono-tactical"
                style={{ color: "rgba(245,158,11,0.3)", fontSize: "11.5px" }}>
                {phase.id}
              </span>
              <span className="font-mono-tactical"
                style={{ color: "rgba(180,192,202,0.55)", fontSize: "12.5px", letterSpacing: "0.04em" }}>
                {phase.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 p-6 md:p-7 space-y-4 overflow-y-auto">
          {/* Context block */}
          <div className="rounded p-5 max-w-4xl mx-auto"
            style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(180,192,202,0.72)", lineHeight: "2.02", fontSize: "17px" }}>
              Pacific Systems operates a defined methodology for turning monitored signals into structured, indexed records.
              Each phase has explicit rules — not guidelines. This page documents the process architecture.
              The six phases are sequential — signal classification cannot precede collection discipline;
              index commitment cannot precede structuring. The pipeline is ordered by design.
            </p>
          </div>

          {/* Phase cards */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {PHASES.map((phase) => (
              <div key={phase.id} className="rounded idx-card"
                style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.2)" }}>
                {/* Phase header */}
                <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5"
                  style={{ borderBottom: "1px solid rgba(245,158,11,0.08)" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex-shrink-0 rounded flex items-center justify-center font-mono-tactical font-bold"
                      style={{
                        background: "rgba(13,21,32,0.55)",
                        border: "1px solid rgba(245,158,11,0.22)",
                        color: "rgba(245,158,11,0.75)",
                        fontSize: "13px",
                      }}>
                      {phase.id}
                    </div>
                    <div>
                      <div className="font-orbitron text-sm font-bold tracking-wider" style={{ color: "#F59E0B" }}>
                        {phase.label}
                      </div>
                      <div className="font-mono-tactical mt-0.5 italic"
                        style={{ color: "rgba(180,192,202,0.72)", fontSize: "15.5px", lineHeight: "2.02" }}>
                        {phase.headline}
                      </div>
                    </div>
                  </div>
                  {phase.relatedPath && (
                    <button
                      onClick={() => setLocation(phase.relatedPath)}
                      className="font-mono-tactical tracking-widest flex-shrink-0 rounded px-2.5 py-1.5"
                      style={{
                        color: "rgba(245,158,11,0.45)",
                        fontSize: "11.5px",
                        letterSpacing: "0.1em",
                        border: "1px solid rgba(245,158,11,0.14)",
                        background: "rgba(245,158,11,0.03)",
                        cursor: "pointer",
                      }}>
                      {phase.relatedLabel} →
                    </button>
                  )}
                </div>

                {/* Phase body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x"
                  style={{ borderColor: "rgba(245,158,11,0.07)" }}>
                  <div className="px-5 py-4">
                    <p className="font-mono-tactical leading-relaxed"
                      style={{ color: "rgba(180,192,202,0.72)", lineHeight: "2.0", fontSize: "15.5px" }}>
                      {phase.body}
                    </p>
                  </div>

                  <div className="px-5 py-4">
                    <div className="font-mono-tactical tracking-widest uppercase mb-3"
                      style={{ color: "rgba(245,158,11,0.42)", fontSize: "12.5px", letterSpacing: "0.16em" }}>
                      Rules
                    </div>
                    <div className="space-y-2.5">
                      {phase.rules.map((rule, ri) => (
                        <div key={ri} className="flex items-start gap-2.5">
                          <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: "rgba(245,158,11,0.45)" }} />
                          <span className="font-mono-tactical"
                            style={{ color: "rgba(180,192,202,0.72)", lineHeight: "1.8", fontSize: "15.5px" }}>
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

          {/* Follow the Pipeline footer */}
          <div className="max-w-4xl mx-auto rounded"
            style={{ border: "1px solid rgba(245,158,11,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div className="flex items-center gap-2.5 px-5 py-3"
              style={{ borderBottom: "1px solid rgba(245,158,11,0.07)" }}>
              <div className="w-1 h-1 rounded-full" style={{ background: "rgba(245,158,11,0.45)" }} />
              <span className="font-mono-tactical tracking-widest uppercase"
                style={{ color: "rgba(245,158,11,0.5)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Follow the Pipeline
              </span>
            </div>
            <div className="flex flex-wrap gap-3 px-5 py-4">
              {[
                { label: "SIGNALS",  path: "/signals",  note: "Intake layer" },
                { label: "DATASETS", path: "/datasets", note: "Domain structure" },
                { label: "RECORDS",  path: "/records",  note: "Committed records" },
                { label: "ACCESS",   path: "/access",   note: "Tier structure" },
              ].map((link) => (
                <button key={link.path}
                  onClick={() => setLocation(link.path)}
                  className="rounded px-4 py-2.5 flex items-center gap-2.5"
                  style={{
                    border: "1px solid rgba(245,158,11,0.14)",
                    background: "rgba(245,158,11,0.04)",
                    cursor: "pointer",
                  }}>
                  <span className="font-orbitron font-bold tracking-wider"
                    style={{ color: "rgba(245,158,11,0.68)", fontSize: "12.5px" }}>
                    {link.label}
                  </span>
                  <span className="font-mono-tactical"
                    style={{ color: "rgba(127,142,155,0.38)", fontSize: "12.5px" }}>
                    — {link.note} →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
