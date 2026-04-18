import AppShell from "@/components/AppShell";

const PHASES = [
  {
    id: "01",
    label: "Signal Intake",
    headline: "Monitored sources. Continuous capture. No assumption of relevance.",
    body: "The intelligence cycle begins with signal intake — the continuous monitoring of defined source categories. RSR does not wait for signals to arrive. Sources are watched. Feeds are structured. Patterns are tracked over time, not extracted opportunistically. A signal that appears once may be noise. A signal that recurs across separate sources is a candidate for analytical attention.",
    discipline: [
      "Source selection is deliberate — not all available information is worth monitoring",
      "Signals are timestamped and logged on intake, before any classification decision",
      "Volume is not a proxy for value — high-noise sources are weighted accordingly",
    ],
  },
  {
    id: "02",
    label: "Triage and Classification",
    headline: "Every signal must earn its place in the analytical record.",
    body: "Not every monitored signal becomes a file. Triage is the process that separates signals worth pursuing from those that should be archived without further action. Classification determines the signal's type, source reliability, and routing — whether it joins an open file, opens a new file, is held for pattern correlation, or is dismissed with a reason recorded. The record is honest about what was seen and what was set aside.",
    discipline: [
      "Triage decisions are logged — signals are not silently discarded",
      "Source reliability is assessed on intake, not assumed after the fact",
      "Classification is reversible — archived signals can be re-evaluated against new information",
    ],
  },
  {
    id: "03",
    label: "File Construction",
    headline: "A file is a structured analytical record, not a collection of notes.",
    body: "When a signal clears triage and joins the analytical record, it is built into a file. Files are scoped — they have a defined subject, a documented evidence chain, and explicit source attributions. RSR does not allow unsourced conclusions inside a file. Analytical judgments are separated from raw observations. A file closes when the subject is resolved or when no further signal activity warrants keeping it open.",
    discipline: [
      "Files are scoped on creation — no open-ended catch-all records",
      "Evidence and interpretation are kept in separate layers within each file",
      "File closure is a decision, not drift — reasons are documented",
    ],
  },
  {
    id: "04",
    label: "Brief Synthesis",
    headline: "Briefs compress analytical work into structured, decision-ready output.",
    body: "A brief is not a summary of a file. It is a synthesis across multiple files and signal threads — a distillation of analytical conclusions that can stand independently of the underlying record. Every brief carries a stated confidence level, identifies where analytical judgment was applied, and separates what is known from what is inferred. Briefs are written for decision-making, not for documentation.",
    discipline: [
      "Confidence levels are stated explicitly — not implied by tone",
      "Briefs distinguish between sourced facts and analytical inference",
      "Each brief carries a source lineage traceable back to the underlying files",
    ],
  },
  {
    id: "05",
    label: "Networked Flow",
    headline: "Outputs connect. The network is the record of how understanding compounds.",
    body: "RSR Intelligence Network is not a stack of isolated products. Files reference signals. Briefs reference files. The network layer maps how these outputs relate — where information flowed from, how conclusions were built, where gaps exist in the evidentiary chain. This is not a dashboard of system components. It is a map of analytical inheritance — how monitored signals eventually became structured understanding.",
    discipline: [
      "Cross-references between files, briefs, and signals are maintained explicitly",
      "Gaps in the evidence chain are documented, not obscured",
      "The network grows incrementally as new analytical work is completed",
    ],
  },
  {
    id: "06",
    label: "Access Boundary",
    headline: "The public interface documents the method. The operational layer applies it.",
    body: "This site — RSR Intelligence Network — is the public-facing documentation layer. It explains what signals are monitored, how files are built, how briefs are synthesized, and how the analytical network is structured. It does not expose live operational environments, active file records, or internal system access. The operator layer sits behind the ACCESS threshold. The distinction between public documentation and operational access is deliberate and maintained.",
    discipline: [
      "Public documentation and live operations are separated by design",
      "The ACCESS layer is not indexed or promoted on the public site",
      "What is described here reflects operational discipline — not aspirational design",
    ],
  },
];

export default function MethodPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 space-y-8 max-w-4xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div
              className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              MODULE / METHOD
            </div>
            <h1
              className="font-orbitron text-3xl font-bold tracking-wider"
              style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.2)" }}
            >
              METHOD
            </h1>
            <p className="mt-2 font-mono-tactical text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.9" }}>
              How the operation thinks — analytical discipline, workflow doctrine, and process architecture
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
            style={{ border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.5)", background: "rgba(34,197,94,0.04)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.4)" }} />
            6 PHASES DOCUMENTED
          </div>
        </div>

        <div
          className="rounded p-5"
          style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(34,197,94,0.03)" }}
        >
          <p className="font-mono-tactical text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.95", fontSize: "11.5px" }}>
            RSR Intelligence Network operates a defined analytical methodology — a sequence of phases that transforms monitored signals into structured files and synthesized briefs. Each phase has a distinct purpose, explicit discipline requirements, and documented decision logic. This page explains how the cycle works, not what tools are used to run it.
          </p>
        </div>

        <div className="space-y-0">
          {PHASES.map((phase, i) => (
            <div
              key={phase.id}
              data-testid={`phase-${phase.id}`}
              className="relative"
            >
              {i < PHASES.length - 1 && (
                <div
                  className="absolute left-[19px] top-full w-px z-10"
                  style={{ height: "24px", background: "rgba(34,197,94,0.12)" }}
                />
              )}
              <div
                className="rounded p-5 mb-6"
                style={{ border: "1px solid rgba(34,197,94,0.1)", background: "rgba(0,0,0,0.2)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center font-mono-tactical font-bold flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(34,197,94,0.06)",
                      border: "1px solid rgba(34,197,94,0.18)",
                      color: "rgba(34,197,94,0.7)",
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {phase.id}
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <div
                        className="font-orbitron text-sm font-bold tracking-wider"
                        style={{ color: "#22c55e" }}
                      >
                        {phase.label}
                      </div>
                      <div
                        className="font-mono-tactical text-xs mt-1 italic"
                        style={{ color: "rgba(255,255,255,0.35)", fontSize: "10.5px" }}
                      >
                        {phase.headline}
                      </div>
                    </div>

                    <p
                      className="font-mono-tactical text-xs leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.42)", lineHeight: "1.9", fontSize: "11px" }}
                    >
                      {phase.body}
                    </p>

                    <div
                      className="rounded p-3.5 space-y-2"
                      style={{ background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.07)" }}
                    >
                      <div
                        className="font-mono-tactical text-xs tracking-widest uppercase"
                        style={{ color: "rgba(34,197,94,0.3)", fontSize: "9px" }}
                      >
                        Discipline
                      </div>
                      {phase.discipline.map((d, di) => (
                        <div key={di} className="flex items-start gap-2.5">
                          <div
                            className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: "rgba(34,197,94,0.4)" }}
                          />
                          <span
                            className="font-mono-tactical text-xs leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.8", fontSize: "10.5px" }}
                          >
                            {d}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded p-5 flex items-start justify-between gap-4 flex-wrap"
          style={{ border: "1px solid rgba(34,197,94,0.08)", background: "rgba(0,0,0,0.1)" }}
        >
          <p className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.3)", lineHeight: "1.8", fontSize: "10px" }}>
            This methodology applies to RSR Intelligence Network's data and analytical operations. The broader RSR ecosystem maintains separate documentation on the main Intel site.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
