import { useLocation } from "wouter";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { DATASET_DOMAINS } from "@/data/config";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { deriveAllDomainBindings, derivePlatformState, FEED_STATE_COLORS, FEED_STATE_LABELS, fmtRelative, fmtTime } from "@/lib/runtime";
import type { DomainId, DatasetBinding } from "@/lib/feeds/types";

const FIRST_ACTIVATED_DOMAIN = "INF";

export default function DatasetsPage() {
  const [, setLocation] = useLocation();

  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();
  const feeds = [f0, f1, f2, f3];

  const bindings = deriveAllDomainBindings(feeds);
  const platform = derivePlatformState(feeds);

  const activeDomains = DATASET_DOMAINS.filter((ds) => {
    const b = bindings.get(ds.id as DomainId);
    return b?.state === "connected";
  });
  const unboundDomains = DATASET_DOMAINS.filter((ds) => {
    const b = bindings.get(ds.id as DomainId);
    return b?.state !== "connected";
  });

  const coveragePct = DATASET_DOMAINS.length > 0
    ? Math.round((platform.domainsBound / DATASET_DOMAINS.length) * 100)
    : 0;

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 84px)" }}>
        <PageHeader
          module="MODULE / DATASETS"
          title="DATASETS"
          subtitle="Structured data collections organised by domain — analytical coverage categories and tracked subject areas"
          badge={platform.domainsBound > 0
            ? `${platform.domainsBound}/${DATASET_DOMAINS.length} DOMAINS BOUND · ${platform.totalLiveItems} STAGED`
            : `${DATASET_DOMAINS.length} DOMAINS DEFINED`}
          badgeActive={platform.domainsBound > 0}
        />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-4">

            {/* Domain coverage summary band */}
            <div className="rounded"
              style={{ border: "1px solid rgba(127,174,158,0.12)", background: "rgba(15,23,32,0.42)" }}>
              <div className="flex items-center gap-2.5 px-5 py-3"
                style={{ borderBottom: "1px solid rgba(127,174,158,0.08)" }}>
                <div className="w-1 h-1 rounded-full"
                  style={{
                    background: platform.domainsBound > 0 ? "#7FAE9E" : "rgba(127,142,155,0.28)",
                    boxShadow: platform.domainsBound > 0 ? "0 0 4px rgba(127,174,158,0.5)" : undefined,
                  }} />
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(127,174,158,0.55)", fontSize: "13px", letterSpacing: "0.18em" }}>
                  Domain Coverage Map
                </span>
                {platform.domainsBound > 0 && (
                  <span className="font-mono-tactical ml-auto"
                    style={{ color: "rgba(127,174,158,0.42)", fontSize: "13px" }}>
                    {coveragePct}% bound
                  </span>
                )}
              </div>
              <div className="px-5 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-4">
                  {DATASET_DOMAINS.map((ds) => {
                    const binding = bindings.get(ds.id as DomainId);
                    const state = binding?.state ?? "unbound";
                    const isConn = state === "connected";
                    return (
                      <div key={ds.id} className="rounded px-2.5 py-2 text-center"
                        style={{
                          border: isConn ? "1px solid rgba(127,174,158,0.28)" : "1px solid rgba(127,142,155,0.1)",
                          background: isConn ? "rgba(127,174,158,0.06)" : "rgba(0,0,0,0.2)",
                        }}>
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <div className="w-1 h-1 rounded-full"
                            style={{ background: FEED_STATE_COLORS[state] }} />
                          <span className="font-mono-tactical"
                            style={{ color: isConn ? "rgba(127,174,158,0.72)" : "rgba(127,142,155,0.4)", fontSize: "11.5px", letterSpacing: "0.1em" }}>
                            {ds.id}
                          </span>
                        </div>
                        <div className="font-mono-tactical truncate"
                          style={{ color: isConn ? "rgba(180,192,202,0.72)" : "rgba(127,142,155,0.35)", fontSize: "11.5px" }}>
                          {isConn ? `${binding?.stagedCount ?? 0} stg` : "unbound"}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono-tactical leading-relaxed"
                  style={{ color: "rgba(180,192,202,0.68)", lineHeight: "2.0", fontSize: "15.5px" }}>
                  Dataset domains define the analytical coverage structure of INDEX. Each domain is a bounded collection —
                  signals are classified into domains on intake, and records are appended as data is structured and committed.
                  {platform.domainsBound > 0
                    ? ` ${platform.domainsBound} domain${platform.domainsBound > 1 ? "s are" : " is"} currently source-bound with ${platform.totalLiveItems} items staged.`
                    : " Domain schemas are defined — source binding is activating."}
                </p>
              </div>
            </div>

            {/* Active domains section */}
            {activeDomains.length > 0 && (
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#7FAE9E", boxShadow: "0 0 4px rgba(127,174,158,0.6)" }} />
                  <span className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(127,174,158,0.55)", fontSize: "13px", letterSpacing: "0.18em" }}>
                    Active Domains — Source Bound
                  </span>
                </div>
                <div className="space-y-3">
                  {activeDomains.map((ds) => (
                    <DomainCard key={ds.id} ds={ds} binding={bindings.get(ds.id as DomainId)} isFirst={ds.id === FIRST_ACTIVATED_DOMAIN} />
                  ))}
                </div>
              </div>
            )}

            {/* Unbound domains section */}
            {unboundDomains.length > 0 && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(127,142,155,0.25)" }} />
                  <span className="font-mono-tactical tracking-widest uppercase"
                    style={{ color: "rgba(127,142,155,0.38)", fontSize: "13px", letterSpacing: "0.18em" }}>
                    Defined Domains — Source Unbound
                  </span>
                </div>
                <div className="space-y-3">
                  {unboundDomains.map((ds) => (
                    <DomainCard key={ds.id} ds={ds} binding={bindings.get(ds.id as DomainId)} isFirst={false} />
                  ))}
                </div>
              </div>
            )}

            {/* If no active domains yet, show all */}
            {activeDomains.length === 0 && unboundDomains.length === 0 && (
              <div className="space-y-3">
                {DATASET_DOMAINS.map((ds) => (
                  <DomainCard key={ds.id} ds={ds} binding={bindings.get(ds.id as DomainId)} isFirst={ds.id === FIRST_ACTIVATED_DOMAIN} />
                ))}
              </div>
            )}

            {/* Cross-link to Index */}
            <div className="rounded px-5 py-4 flex items-center justify-between"
              style={{ border: "1px solid rgba(127,174,158,0.09)", background: "rgba(13,21,32,0.18)" }}>
              <div>
                <div className="font-mono-tactical tracking-widest uppercase mb-1"
                  style={{ color: "rgba(127,174,158,0.42)", fontSize: "12.5px", letterSpacing: "0.14em" }}>
                  Next Layer
                </div>
                <p className="font-mono-tactical"
                  style={{ color: "rgba(180,192,202,0.62)", fontSize: "15.5px" }}>
                  Structured dataset records commit to the INDEX — the searchable record layer.
                </p>
              </div>
              <button onClick={() => setLocation("/records")}
                className="font-mono-tactical tracking-widest flex-shrink-0 ml-6 rounded px-3 py-2"
                style={{
                  color: "rgba(127,174,158,0.58)", fontSize: "12.5px", letterSpacing: "0.1em",
                  border: "1px solid rgba(127,174,158,0.2)", background: "rgba(127,174,158,0.05)", cursor: "pointer",
                }}>
                INDEX →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-60 xl:w-64 shrink-0 p-5 space-y-5 overflow-y-auto hidden lg:block"
            style={{ borderLeft: "1px solid rgba(127,174,158,0.07)" }}>
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-3"
                style={{ color: "rgba(127,174,158,0.5)", fontSize: "13px", letterSpacing: "0.16em" }}>
                Coverage Status
              </div>
              <div className="space-y-3">
                {[
                  { label: "DOMAINS DEFINED",   value: String(platform.domainsTotal) },
                  { label: "SOURCES ACTIVE",
                    value: platform.sourcesConnected > 0
                      ? `${platform.sourcesConnected} / ${platform.sourcesTotal}`
                      : feeds.some(f => f.state === "loading") ? "Connecting..." : "—" },
                  { label: "STAGED ITEMS",
                    value: platform.totalLiveItems > 0 ? String(platform.totalLiveItems) : "—" },
                  { label: "DOMAINS BOUND",
                    value: platform.domainsBound > 0 ? `${platform.domainsBound} / ${platform.domainsTotal}` : "—" },
                  { label: "COMMITTED RECORDS",  value: "None yet" },
                  { label: "LAST SYNC",
                    value: platform.lastSync ? fmtRelative(platform.lastSync) : "—" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono-tactical"
                      style={{ fontSize: "12.5px", color: "rgba(127,142,155,0.45)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(180,192,202,0.78)", fontSize: "17px" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(127,174,158,0.06)" }} />

            {/* Per-domain binding */}
            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2.5"
                style={{ color: "rgba(127,174,158,0.48)", fontSize: "13px", letterSpacing: "0.14em" }}>
                Domain Binding
              </div>
              {DATASET_DOMAINS.map((ds) => {
                const binding = bindings.get(ds.id as DomainId);
                const state   = binding?.state ?? "unbound";
                const isConn = state === "connected";
                return (
                  <div key={ds.id} className="flex items-center gap-2.5 py-2"
                    style={{ borderBottom: "1px solid rgba(127,174,158,0.05)" }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{
                        background: FEED_STATE_COLORS[state],
                        boxShadow: isConn ? `0 0 3px ${FEED_STATE_COLORS[state]}` : undefined,
                      }} />
                    <span className="font-mono-tactical"
                      style={{ color: isConn ? "rgba(127,174,158,0.6)" : "rgba(127,142,155,0.42)", fontSize: "12.5px", width: 26 }}>
                      {ds.id}
                    </span>
                    <span className="font-mono-tactical flex-1 truncate"
                      style={{ color: isConn ? "rgba(180,192,202,0.75)" : "rgba(127,142,155,0.38)", fontSize: "14px" }}>
                      {isConn
                        ? `${binding?.stagedCount ?? 0} staged`
                        : state === "loading" ? "Connecting..." : "Unbound"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-px" style={{ background: "rgba(127,174,158,0.06)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(127,174,158,0.45)", fontSize: "13px", letterSpacing: "0.14em" }}>
                Schema Key
              </div>
              <div className="space-y-2">
                {[
                  { dot: "rgba(127,174,158,0.55)", label: "Required field" },
                  { dot: "rgba(127,142,155,0.25)", label: "Optional field" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                    <span className="font-mono-tactical" style={{ color: "rgba(180,192,202,0.65)", fontSize: "15px" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(127,174,158,0.06)" }} />

            <p className="font-mono-tactical leading-relaxed"
              style={{ color: "rgba(180,192,202,0.58)", fontSize: "15px", lineHeight: "2.02" }}>
              Datasets grow incrementally as signals are classified and structured. Schemas are versioned — field changes are tracked.
            </p>

            <div className="h-px" style={{ background: "rgba(127,174,158,0.06)" }} />

            <div>
              <div className="font-mono-tactical tracking-widest uppercase mb-2"
                style={{ color: "rgba(127,174,158,0.42)", fontSize: "12.5px", letterSpacing: "0.14em" }}>
                Related Layers
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "SIGNALS",  path: "/signals",  note: "Source layer" },
                  { label: "INDEX",    path: "/records",  note: "Committed records" },
                  { label: "METHOD",   path: "/method",   note: "Classification logic" },
                ].map((link) => (
                  <button key={link.path}
                    onClick={() => setLocation(link.path)}
                    className="w-full flex items-center justify-between py-1.5"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <span className="font-orbitron font-semibold tracking-wider"
                      style={{ color: "rgba(127,174,158,0.55)", fontSize: "12.5px" }}>
                      {link.label}
                    </span>
                    <span className="font-mono-tactical"
                      style={{ color: "rgba(127,142,155,0.38)", fontSize: "12.5px" }}>
                      {link.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Domain Card component ─────────────────────────────────────── */
function DomainCard({
  ds,
  binding,
  isFirst,
}: {
  ds: typeof DATASET_DOMAINS[number];
  binding: DatasetBinding | undefined;
  isFirst: boolean;
}) {
  const state       = binding?.state ?? "unbound";
  const stateColor  = FEED_STATE_COLORS[state];
  const stateLabel  = FEED_STATE_LABELS[state];
  const isConnected = state === "connected";

  return (
    <div data-testid={`dataset-${ds.id.toLowerCase()}`}
      className="rounded idx-card"
      style={{
        border: isConnected ? "1px solid rgba(127,174,158,0.22)" : "1px solid rgba(127,174,158,0.08)",
        background: isConnected ? "rgba(28,42,53,0.52)" : "rgba(13,21,32,0.18)",
      }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3.5"
        style={{
          borderBottom: `1px solid ${isConnected ? "rgba(127,174,158,0.12)" : "rgba(127,174,158,0.06)"}`,
          background: isConnected ? "rgba(127,174,158,0.025)" : undefined,
        }}>
        <div className="flex items-center gap-3">
          <div className="font-mono-tactical px-2 py-1 rounded flex-shrink-0"
            style={{
              border: `1px solid ${isConnected ? "rgba(127,174,158,0.42)" : "rgba(127,174,158,0.2)"}`,
              color: isConnected ? "rgba(127,174,158,0.92)" : "rgba(127,174,158,0.68)",
              fontSize: "13px", letterSpacing: "0.1em",
              background: isConnected ? "rgba(127,174,158,0.08)" : "rgba(127,174,158,0.03)",
            }}>
            {ds.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-orbitron text-sm font-bold tracking-wide"
                style={{ color: isConnected ? "#7FAE9E" : "rgba(200,210,220,0.7)" }}>
                {ds.label}
              </div>
              {isFirst && isConnected && (
                <span className="font-mono-tactical rounded px-1.5 py-0.5"
                  style={{ border: "1px solid rgba(127,174,158,0.3)", color: "rgba(127,174,158,0.72)", fontSize: "17px", letterSpacing: "0.1em", background: "rgba(127,174,158,0.06)" }}>
                  FIRST ACTIVE
                </span>
              )}
            </div>
            <div className="font-mono-tactical mt-0.5"
              style={{ color: "rgba(127,142,155,0.52)", fontSize: "13px" }}>
              Schema v{ds.schemaVersion} — {ds.fields.length} fields defined
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full"
              style={{ background: stateColor, boxShadow: isConnected ? `0 0 4px ${stateColor}` : undefined }} />
            <span className="font-mono-tactical rounded px-2 py-1"
              style={{
                border: `1px solid ${isConnected ? "rgba(127,174,158,0.28)" : "rgba(127,142,155,0.1)"}`,
                color: stateColor, fontSize: "12.5px",
                background: isConnected ? "rgba(127,174,158,0.06)" : "rgba(0,0,0,0.3)",
                letterSpacing: "0.08em",
              }}>
              {stateLabel}
            </span>
          </div>
          {isConnected && binding?.lastSync && (
            <span className="font-mono-tactical"
              style={{ color: "rgba(127,142,155,0.4)", fontSize: "11.5px" }}>
              Synced {fmtRelative(binding.lastSync)}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x"
        style={{ borderColor: isConnected ? "rgba(127,174,158,0.1)" : "rgba(127,174,158,0.05)" }}>
        <div className="px-5 py-4 space-y-3">
          <p className="font-mono-tactical leading-relaxed"
            style={{ color: "rgba(180,192,202,0.72)", lineHeight: "2.0", fontSize: "15.5px" }}>
            {ds.description}
          </p>
          <div className="space-y-1.5 pt-2" style={{ borderTop: "1px solid rgba(127,174,158,0.06)" }}>
            {[
              {
                label: "Source Binding",
                value: isConnected
                  ? (binding?.stagedCount ?? 0) > 0
                    ? `Connected — ${binding!.stagedCount} items staged`
                    : "Connected — polling"
                  : state === "loading" ? "Connecting..." : state === "unbound" ? "No source bound" : stateLabel,
                bright: isConnected,
              },
              {
                label: "Update Cadence",
                value: ds.id === "INF" ? "Polled — 60s interval" : "Not yet assigned",
                bright: ds.id === "INF",
              },
              { label: "Committed Records", value: "None committed yet", bright: false },
              { label: "Last Sync", value: binding?.lastSync ? fmtTime(binding.lastSync) : "—", bright: !!binding?.lastSync },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span className="font-mono-tactical flex-shrink-0 w-32"
                  style={{ color: "rgba(127,142,155,0.48)", fontSize: "14px", letterSpacing: "0.04em" }}>
                  {item.label}
                </span>
                <span className="font-mono-tactical"
                  style={{
                    color: item.bright ? "rgba(180,192,202,0.82)" : "rgba(127,142,155,0.48)",
                    fontSize: "15px", fontStyle: item.bright ? "normal" : "italic", lineHeight: "1.72",
                  }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="font-mono-tactical tracking-widest uppercase mb-3"
            style={{ color: "rgba(127,174,158,0.48)", fontSize: "12.5px", letterSpacing: "0.16em" }}>
            Record Schema — {ds.fields.length} Fields
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {ds.fields.slice(0, 12).map((field) => (
              <div key={field.key} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: field.required ? "rgba(127,174,158,0.55)" : "rgba(127,142,155,0.22)" }} />
                <span className="font-mono-tactical truncate"
                  style={{ color: field.required ? "rgba(180,192,202,0.72)" : "rgba(127,142,155,0.48)", fontSize: "14px" }}>
                  {field.key}
                </span>
                <span className="font-mono-tactical flex-shrink-0"
                  style={{ color: "rgba(127,142,155,0.3)", fontSize: "12.5px" }}>
                  {field.type}
                </span>
              </div>
            ))}
            {ds.fields.length > 12 && (
              <div className="col-span-2 font-mono-tactical"
                style={{ color: "rgba(127,142,155,0.38)", fontSize: "13px" }}>
                +{ds.fields.length - 12} more fields
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
