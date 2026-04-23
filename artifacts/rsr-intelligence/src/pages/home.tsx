import { useState } from "react";
import { useLocation } from "wouter";
import CommandWheel from "@/components/CommandWheel";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { derivePlatformState, fmtRelative } from "@/lib/runtime";

export const SEGMENTS = [
  {
    label: "OVERVIEW",
    path: "/overview",
    description: "What the INDEX Data Network is and how signal-to-structure works",
    detail: "OVERVIEW documents the INDEX platform — what it monitors, how it structures incoming signals into usable data, and how structured data becomes indexed records.",
    methodology: "Platform scope. Signal-to-structure flow. Layer introduction.",
  },
  {
    label: "SIGNALS",
    path: "/signals",
    description: "Monitored signal classes, intake categories, and source structure",
    detail: "SIGNALS is where monitored input enters the INDEX architecture. Signal categories are defined, sources are classified, and intake logic determines what gets structured versus what gets held or dismissed.",
    methodology: "Signal classification. Intake routing. Source assessment.",
  },
  {
    label: "DATASETS",
    path: "/datasets",
    description: "Structured data collections and tracked analytical domains",
    detail: "DATASETS are the organised output of signal structuring — collections of data grouped by domain, subject class, or tracked activity type.",
    methodology: "Domain grouping. Collection management. Analytical coverage.",
  },
  {
    label: "INDEX",
    path: "/records",
    description: "Indexed records, structured entries, and searchable data layer",
    detail: "The INDEX layer is the core of what this platform produces — a structured, searchable record of everything that has been monitored, classified, and committed.",
    methodology: "Record structure. Search architecture. Data integrity.",
  },
  {
    label: "METHOD",
    path: "/method",
    description: "How INDEX collects, classifies, structures, and synthesises",
    detail: "METHOD explains the operational logic behind INDEX — the discipline rules that govern signal intake, the classification logic that routes data into datasets, and the structuring process that builds records.",
    methodology: "Collection discipline. Classification logic. Synthesis flow.",
  },
  {
    label: "ACCESS",
    path: "/access",
    description: "Controlled entry to deeper data layers and restricted environments",
    detail: "ACCESS is the boundary between the public INDEX interface and the operational layer behind it. Deeper datasets, live signal feeds, and analytical tools exist behind this threshold.",
    methodology: "Verified entry. Tier separation. Restricted data layer.",
  },
];

/* ── Design tokens ─────────────────────────────────────────────── */
const C = {
  textPrimary:   "rgba(222,228,226,0.88)",
  textSecondary: "rgba(168,182,178,0.66)",
  textTertiary:  "rgba(128,145,142,0.48)",
  textGreen:     "rgba(34,197,94,0.78)",
  textGreenDim:  "rgba(34,197,94,0.5)",
  borderNeutral: "rgba(255,255,255,0.065)",
  borderGreen:   "rgba(34,197,94,0.16)",
  borderGreenMid:"rgba(34,197,94,0.24)",
  surfaceCard:   "rgba(255,255,255,0.024)",
  surfaceRaised: "rgba(255,255,255,0.04)",
  green:         "#22c55e",
  amber:         "rgba(251,191,36,0.72)",
};

/* ── Shared micro-label ────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-4 h-px" style={{ background: C.borderGreenMid }} />
      <span className="font-mono-tactical tracking-widest uppercase"
        style={{ color: C.textGreenDim, fontSize: "8.5px", letterSpacing: "0.22em" }}>
        {children}
      </span>
    </div>
  );
}

/* ── Live status dot ───────────────────────────────────────────── */
function StatusDot({ live }: { live: boolean }) {
  return (
    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{
        background: live ? C.green : "rgba(140,155,150,0.3)",
        boxShadow: live ? `0 0 5px rgba(34,197,94,0.55)` : undefined,
      }} />
  );
}

/* ── Division card ─────────────────────────────────────────────── */
function DivisionCard({
  code, name, purpose, path, onClick,
}: {
  code: string; name: string; purpose: string; path: string;
  onClick: (path: string) => void;
}) {
  return (
    <button onClick={() => onClick(path)}
      className="group rounded-sm text-left w-full transition-all duration-200"
      style={{
        border: `1px solid ${C.borderNeutral}`,
        background: C.surfaceCard,
        padding: "1.25rem 1.5rem",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = C.borderGreen;
        (e.currentTarget as HTMLElement).style.background = C.surfaceRaised;
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = C.borderNeutral;
        (e.currentTarget as HTMLElement).style.background = C.surfaceCard;
      }}>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <span className="font-mono-tactical"
          style={{ color: C.textGreenDim, fontSize: "8.5px", letterSpacing: "0.14em" }}>
          {code}
        </span>
        <span className="font-mono-tactical opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ color: C.textGreen, fontSize: "9px" }}>
          →
        </span>
      </div>
      <div className="font-orbitron font-semibold mb-2"
        style={{ color: C.textPrimary, fontSize: "11px", letterSpacing: "0.08em" }}>
        {name}
      </div>
      <p className="font-mono-tactical leading-relaxed"
        style={{ color: C.textTertiary, fontSize: "9.5px", lineHeight: "1.75" }}>
        {purpose}
      </p>
    </button>
  );
}

/* ── Pipeline step ─────────────────────────────────────────────── */
function PipelineStep({
  number, label, desc, isLast = false,
}: {
  number: string; label: string; desc: string; isLast?: boolean;
}) {
  return (
    <div className="flex items-stretch gap-0 flex-1 min-w-0">
      <div className="flex flex-col items-center flex-1 min-w-0">
        <div className="rounded-sm px-3 py-3 w-full text-center"
          style={{ border: `1px solid ${C.borderNeutral}`, background: C.surfaceCard }}>
          <div className="font-mono-tactical mb-1.5"
            style={{ color: C.textGreenDim, fontSize: "8px", letterSpacing: "0.12em" }}>
            {number}
          </div>
          <div className="font-orbitron font-semibold"
            style={{ color: C.textPrimary, fontSize: "10px", letterSpacing: "0.08em" }}>
            {label}
          </div>
          <p className="font-mono-tactical mt-1.5"
            style={{ color: C.textTertiary, fontSize: "8.5px", lineHeight: "1.65" }}>
            {desc}
          </p>
        </div>
      </div>
      {!isLast && (
        <div className="flex items-center px-1.5 flex-shrink-0">
          <span style={{ color: C.textTertiary, fontSize: "11px" }}>›</span>
        </div>
      )}
    </div>
  );
}

/* ── Related branch card ───────────────────────────────────────── */
function BranchCard({ name, abbr, desc, href }: { name: string; abbr: string; desc: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group block rounded-sm transition-all duration-200"
      style={{
        border: `1px solid ${C.borderNeutral}`,
        background: C.surfaceCard,
        padding: "1.5rem",
        textDecoration: "none",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = C.borderGreen;
        (e.currentTarget as HTMLElement).style.background = C.surfaceRaised;
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = C.borderNeutral;
        (e.currentTarget as HTMLElement).style.background = C.surfaceCard;
      }}>
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono-tactical"
          style={{ color: C.textGreenDim, fontSize: "8.5px", letterSpacing: "0.14em" }}>
          {abbr}
        </span>
        <span className="font-mono-tactical opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ color: C.textGreen, fontSize: "9px" }}>
          ↗
        </span>
      </div>
      <div className="font-orbitron font-semibold mb-2.5"
        style={{ color: C.textPrimary, fontSize: "13px", letterSpacing: "0.06em" }}>
        {name}
      </div>
      <p className="font-mono-tactical"
        style={{ color: C.textTertiary, fontSize: "9.5px", lineHeight: "1.75" }}>
        {desc}
      </p>
    </a>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export default function Home() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const f0 = useFeed0();
  const f1 = useFeed1();
  const f2 = useFeed2();
  const f3 = useFeed3();
  const feeds = [f0, f1, f2, f3];
  const platform = derivePlatformState(feeds);
  const isConnecting = feeds.some((f) => f.state === "loading");
  const networkLive  = platform.sourcesConnected > 0;

  const navigate = (path: string) => setLocation(path);

  return (
    <div className="relative min-h-screen w-full bg-background flex flex-col"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "52px 52px" }}>

      {/* ── TOP NAV ──────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between px-8 shrink-0"
        style={{ borderBottom: `1px solid ${C.borderNeutral}`, minHeight: 52 }}>
        <div className="flex items-center gap-3">
          <StatusDot live={networkLive} />
          <span className="font-mono-tactical tracking-widest"
            style={{ color: networkLive ? C.textGreen : C.textTertiary, fontSize: "9px", letterSpacing: "0.18em" }}>
            INDEX DATA NETWORK
          </span>
        </div>

        <div className="flex items-center gap-6">
          {SEGMENTS.slice(0, -1).map((seg) => (
            <button key={seg.path}
              onClick={() => navigate(seg.path)}
              className="font-mono-tactical tracking-widest transition-colors duration-150"
              style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.14em", background: "none", border: "none", cursor: "pointer" }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.textGreen; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.textTertiary; }}>
              {seg.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
            className="font-mono-tactical tracking-widest"
            style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.12em", textDecoration: "none", transition: "color 0.15s" }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.textGreen; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.textTertiary; }}>
            RSR INTEL ↗
          </a>
          <button onClick={() => navigate("/access")}
            className="font-mono-tactical tracking-widest rounded-sm"
            style={{
              color: C.textGreenDim, fontSize: "8.5px", letterSpacing: "0.12em",
              border: `1px solid ${C.borderGreen}`, padding: "5px 14px",
              background: "rgba(34,197,94,0.04)", cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.color = C.textGreen;
              (e.currentTarget as HTMLElement).style.borderColor = C.borderGreenMid;
              (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.07)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.color = C.textGreenDim;
              (e.currentTarget as HTMLElement).style.borderColor = C.borderGreen;
              (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.04)";
            }}>
            ACCESS
          </button>
        </div>
      </header>

      {/* ── LIVE STATUS STRIP ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 shrink-0"
        style={{ borderBottom: `1px solid ${C.borderNeutral}`, background: "rgba(0,0,0,0.18)", minHeight: 32 }}>
        <div className="flex items-center gap-0 overflow-x-auto">
          {[
            {
              label: "INTAKE SOURCES",
              value: `${platform.sourcesConnected}/${platform.sourcesTotal} ACTIVE`,
              live: networkLive,
            },
            {
              label: "STAGED SIGNALS",
              value: platform.totalLiveItems > 0 ? String(platform.totalLiveItems) : "—",
              live: platform.totalLiveItems > 0,
            },
            {
              label: "COMMITTED",
              value: "0",
              live: false,
            },
            {
              label: "DOMAINS",
              value: `${platform.domainsBound}/${platform.domainsTotal} BOUND`,
              live: platform.domainsBound > 0,
            },
          ].map((item, i) => (
            <div key={item.label}
              className="flex items-center gap-2.5 px-5 py-1.5 flex-shrink-0"
              style={{ borderRight: `1px solid ${C.borderNeutral}` }}>
              <span className="font-mono-tactical"
                style={{ color: C.textTertiary, fontSize: "7.5px", letterSpacing: "0.1em" }}>
                {item.label}
              </span>
              <span className="font-mono-tactical"
                style={{
                  color: item.live ? C.textGreen : "rgba(155,175,170,0.35)",
                  fontSize: "8.5px", letterSpacing: "0.06em", fontVariantNumeric: "tabular-nums",
                }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5 px-5 flex-shrink-0">
          {networkLive && platform.lastSync ? (
            <span className="font-mono-tactical"
              style={{ color: "rgba(34,197,94,0.38)", fontSize: "8px", letterSpacing: "0.06em" }}>
              SYNCED {fmtRelative(platform.lastSync).toUpperCase()}
            </span>
          ) : (
            <span className="font-mono-tactical"
              style={{ color: C.textTertiary, fontSize: "8px", letterSpacing: "0.06em" }}>
              {isConnecting ? "CONNECTING..." : "PIPELINE READY"}
            </span>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ───────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="px-8 py-20" style={{ borderBottom: `1px solid ${C.borderNeutral}` }}>
          <div style={{ maxWidth: 900 }}>
            <SectionLabel>RSR Intelligence Network — Data Systems Division</SectionLabel>
            <h1 className="font-orbitron font-bold mb-5"
              style={{ color: C.textPrimary, fontSize: "clamp(40px, 6vw, 68px)", letterSpacing: "0.06em", lineHeight: 1.08 }}>
              INDEX
            </h1>
            <div className="font-orbitron font-semibold mb-7"
              style={{ color: C.textSecondary, fontSize: "clamp(14px, 2vw, 20px)", letterSpacing: "0.1em" }}>
              Data Systems Division
            </div>
            <p className="mb-8"
              style={{ color: C.textSecondary, fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: "1.85", maxWidth: 660, fontFamily: "Rajdhani, sans-serif", fontWeight: 400 }}>
              INDEX is the structured data layer of the RSR Intelligence Network. It receives monitored signals, routes them through a defined structuring process, assigns them to classified datasets, and commits them to a searchable record index. INDEX does not produce editorial content — it produces structured, retrievable data infrastructure.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => navigate("/overview")}
                className="font-orbitron font-semibold rounded-sm transition-all duration-150"
                style={{
                  color: "#090909", background: C.green, border: `1px solid ${C.green}`,
                  fontSize: "11px", letterSpacing: "0.12em", padding: "10px 24px", cursor: "pointer",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
                EXPLORE ARCHITECTURE
              </button>
              <button onClick={() => navigate("/method")}
                className="font-orbitron font-semibold rounded-sm transition-all duration-150"
                style={{
                  color: C.textGreen, background: "transparent",
                  border: `1px solid ${C.borderGreen}`,
                  fontSize: "11px", letterSpacing: "0.12em", padding: "10px 24px", cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.borderGreenMid;
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.05)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.borderGreen;
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}>
                METHODOLOGY
              </button>
            </div>
          </div>
        </section>

        {/* ── NETWORK POSITIONING ───────────────────────────────── */}
        <section className="px-8 py-10" style={{ borderBottom: `1px solid ${C.borderNeutral}`, background: "rgba(0,0,0,0.14)" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Network Architecture</SectionLabel>
            <div className="flex items-center gap-0 mb-8 overflow-x-auto">
              {[
                { label: "RSR", sub: "Parent organisation", href: "https://www.rsrintel.com", external: true },
                { label: "RSR Intelligence Network", sub: "Intelligence division", href: "https://www.rsrintel.com", external: true },
                { label: "INDEX Data Network", sub: "Data systems layer — this site", href: "/", external: false, active: true },
              ].map((node, i) => (
                <div key={node.label} className="flex items-center gap-0 flex-shrink-0">
                  <a href={node.href}
                    target={node.external ? "_blank" : "_self"}
                    rel={node.external ? "noopener noreferrer" : undefined}
                    className="flex flex-col rounded-sm px-5 py-3 transition-all duration-150"
                    style={{
                      border: `1px solid ${node.active ? C.borderGreenMid : C.borderNeutral}`,
                      background: node.active ? "rgba(34,197,94,0.04)" : C.surfaceCard,
                      textDecoration: "none",
                    }}>
                    <span className="font-orbitron font-semibold"
                      style={{ color: node.active ? C.textGreen : C.textSecondary, fontSize: "10px", letterSpacing: "0.1em" }}>
                      {node.label}
                    </span>
                    <span className="font-mono-tactical mt-0.5"
                      style={{ color: C.textTertiary, fontSize: "8px", letterSpacing: "0.08em" }}>
                      {node.sub}
                    </span>
                  </a>
                  {i < 2 && (
                    <div className="px-3 flex-shrink-0">
                      <span style={{ color: C.textTertiary, fontSize: "12px" }}>›</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono-tactical flex-shrink-0"
                style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.1em", paddingTop: 2 }}>
                SIBLING BRANCHES:
              </span>
              {[
                { label: "RSR Press Corps", desc: "Editorial and publication arm" },
                { label: "Black Dog Security", desc: "Security intelligence division" },
              ].map((branch) => (
                <div key={branch.label}
                  className="flex items-center gap-2 rounded-sm px-3 py-1.5"
                  style={{ border: `1px solid ${C.borderNeutral}`, background: C.surfaceCard }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: "rgba(140,155,150,0.3)" }} />
                  <span className="font-mono-tactical"
                    style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.06em" }}>
                    {branch.label}
                  </span>
                  <span className="font-mono-tactical hidden sm:inline"
                    style={{ color: "rgba(128,145,142,0.32)", fontSize: "8px" }}>
                    — {branch.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT INDEX IS / IS NOT ────────────────────────────── */}
        <section className="px-8 py-16" style={{ borderBottom: `1px solid ${C.borderNeutral}` }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Scope Definition</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* IS */}
              <div className="rounded-sm p-7"
                style={{ border: `1px solid ${C.borderGreen}`, background: "rgba(34,197,94,0.025)" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.green, boxShadow: `0 0 5px rgba(34,197,94,0.5)` }} />
                  <span className="font-mono-tactical tracking-widest"
                    style={{ color: C.textGreenDim, fontSize: "8.5px", letterSpacing: "0.18em" }}>
                    WHAT INDEX IS
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    "The structured data infrastructure of the RSR Intelligence Network",
                    "A signal intake, classification, and record-indexing system",
                    "A defined pipeline from raw input to structured, retrievable output",
                    "A data operations layer with tiered access and version control",
                    "The authoritative record layer for the broader RSR ecosystem",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: C.textGreenDim }} />
                      <span style={{ color: C.textSecondary, fontSize: "13px", lineHeight: "1.7", fontFamily: "Rajdhani, sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IS NOT */}
              <div className="rounded-sm p-7"
                style={{ border: `1px solid ${C.borderNeutral}`, background: C.surfaceCard }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,155,150,0.3)" }} />
                  <span className="font-mono-tactical tracking-widest"
                    style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.18em" }}>
                    WHAT INDEX IS NOT
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    "An editorial platform or press operation",
                    "A public-facing news or content system",
                    "A standalone brand separate from the RSR network",
                    "A commercial data marketplace or consumer service",
                    "A social platform, aggregator, or discovery tool",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "rgba(140,155,150,0.22)" }} />
                      <span style={{ color: C.textTertiary, fontSize: "13px", lineHeight: "1.7", fontFamily: "Rajdhani, sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INDEX DIVISIONS ───────────────────────────────────── */}
        <section className="px-8 py-16" style={{ borderBottom: `1px solid ${C.borderNeutral}`, background: "rgba(0,0,0,0.1)" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Organisational Structure</SectionLabel>
            <h2 className="font-orbitron font-bold mb-2"
              style={{ color: C.textPrimary, fontSize: "22px", letterSpacing: "0.07em" }}>
              INDEX Divisions
            </h2>
            <p className="mb-8"
              style={{ color: C.textTertiary, fontSize: "13px", lineHeight: "1.75", fontFamily: "Rajdhani, sans-serif", maxWidth: 520 }}>
              INDEX operates through six internal divisions, each responsible for a defined stage of the signal-to-record pipeline.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  code: "DIV-01",
                  name: "Signal Intake Office",
                  purpose: "Receives and validates incoming signals from monitored sources. Manages intake routing, source classification, and triage gate evaluation.",
                  path: "/signals",
                },
                {
                  code: "DIV-02",
                  name: "Data Structuring Division",
                  purpose: "Transforms validated signals into structured data entries. Applies schema rules, field normalisation, and preliminary classification before dataset assignment.",
                  path: "/datasets",
                },
                {
                  code: "DIV-03",
                  name: "Dataset Operations",
                  purpose: "Manages the domain dataset layer. Assigns structured entries to the correct collection, maintains dataset integrity, and enforces coverage boundaries.",
                  path: "/datasets",
                },
                {
                  code: "DIV-04",
                  name: "Index & Retrieval Division",
                  purpose: "Handles the commitment of structured entries into the searchable index. Manages record versioning, retrieval architecture, and index integrity.",
                  path: "/records",
                },
                {
                  code: "DIV-05",
                  name: "Access Control Office",
                  purpose: "Governs tier-based access to the data layer. Manages operator authentication, public/restricted separation, and access provisioning.",
                  path: "/access",
                },
                {
                  code: "DIV-06",
                  name: "Methodology & Standards Unit",
                  purpose: "Defines and maintains the operational standards that govern all INDEX activity — classification logic, collection discipline, and synthesis protocol.",
                  path: "/method",
                },
              ].map((div) => (
                <DivisionCard key={div.code} {...div} onClick={navigate} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SIGNAL-TO-RECORD PIPELINE ─────────────────────────── */}
        <section className="px-8 py-16" style={{ borderBottom: `1px solid ${C.borderNeutral}` }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Data Architecture</SectionLabel>
            <h2 className="font-orbitron font-bold mb-2"
              style={{ color: C.textPrimary, fontSize: "22px", letterSpacing: "0.07em" }}>
              Signal-to-Record Pipeline
            </h2>
            <p className="mb-8"
              style={{ color: C.textTertiary, fontSize: "13px", lineHeight: "1.75", fontFamily: "Rajdhani, sans-serif", maxWidth: 520 }}>
              Every record in the INDEX began as a monitored signal. The pipeline below defines the mandatory path from intake to indexed entry.
            </p>

            {/* Pipeline flow — horizontal on desktop, vertical on mobile */}
            <div className="flex flex-col lg:flex-row items-stretch gap-1 mb-8">
              {[
                {
                  number: "01",
                  label: "SIGNAL INTAKE",
                  desc: "Monitored sources deliver raw signals into the intake layer",
                },
                {
                  number: "02",
                  label: "TRIAGE GATE",
                  desc: "Signals are validated against defined triage criteria",
                },
                {
                  number: "03",
                  label: "STRUCTURING",
                  desc: "Validated signals are structured into schema-compliant entries",
                },
                {
                  number: "04",
                  label: "DATASET ASSIGN",
                  desc: "Structured entries are routed to their domain dataset",
                },
                {
                  number: "05",
                  label: "INDEX COMMIT",
                  desc: "Operator review and explicit commit to the record index",
                },
              ].map((step, i) => (
                <PipelineStep key={step.number} {...step} isLast={i === 4} />
              ))}
            </div>

            {/* Live pipeline state */}
            <div className="flex items-center gap-6 px-5 py-3 rounded-sm"
              style={{ border: `1px solid ${C.borderNeutral}`, background: C.surfaceCard }}>
              <div className="flex items-center gap-2">
                <StatusDot live={networkLive} />
                <span className="font-mono-tactical"
                  style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.1em" }}>
                  INTAKE LAYER
                </span>
                <span className="font-mono-tactical"
                  style={{ color: networkLive ? C.textGreen : C.textTertiary, fontSize: "9px" }}>
                  {networkLive ? `${platform.sourcesConnected} sources active · ${platform.totalLiveItems} staged` : "Ready — awaiting source binding"}
                </span>
              </div>
              <div className="w-px h-3.5" style={{ background: C.borderNeutral }} />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,155,150,0.22)" }} />
                <span className="font-mono-tactical"
                  style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.1em" }}>
                  INDEX LAYER
                </span>
                <span className="font-mono-tactical italic"
                  style={{ color: "rgba(140,155,150,0.38)", fontSize: "9px" }}>
                  0 records committed — classification pending
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY INDEX MATTERS ─────────────────────────────────── */}
        <section className="px-8 py-16" style={{ borderBottom: `1px solid ${C.borderNeutral}`, background: "rgba(0,0,0,0.12)" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Institutional Context</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-orbitron font-bold mb-5"
                  style={{ color: C.textPrimary, fontSize: "22px", letterSpacing: "0.07em" }}>
                  Why INDEX Exists
                </h2>
                <p className="mb-5"
                  style={{ color: C.textSecondary, fontSize: "14px", lineHeight: "1.88", fontFamily: "Rajdhani, sans-serif" }}>
                  Intelligence networks accumulate vast signal volume. Without a dedicated structuring and indexing layer, that signal volume remains operationally unusable — it cannot be retrieved, cross-referenced, or built upon systematically.
                </p>
                <p style={{ color: C.textSecondary, fontSize: "14px", lineHeight: "1.88", fontFamily: "Rajdhani, sans-serif" }}>
                  INDEX solves this problem within the RSR Intelligence Network. It converts raw monitored input into structured, attributed, version-controlled records that can be retrieved, queried, and used as the data foundation for downstream analytical work across RSR's broader operations.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    heading: "Structured over raw",
                    body: "Every entry that enters INDEX has been validated, classified, and structured against a defined schema. Raw signal volume does not equal usable data without this layer.",
                  },
                  {
                    heading: "Attribution by design",
                    body: "Every record carries source attribution, intake timestamp, classification status, and version history. INDEX does not accept unattributed entries.",
                  },
                  {
                    heading: "Retrieval-first architecture",
                    body: "The INDEX layer is built around retrieval — entries are indexed for search, cross-reference, and programmatic access from the moment they are committed.",
                  },
                ].map((point) => (
                  <div key={point.heading} className="rounded-sm p-5"
                    style={{ border: `1px solid ${C.borderNeutral}`, background: C.surfaceCard }}>
                    <div className="font-orbitron font-semibold mb-2"
                      style={{ color: C.textPrimary, fontSize: "10.5px", letterSpacing: "0.08em" }}>
                      {point.heading}
                    </div>
                    <p style={{ color: C.textTertiary, fontSize: "12px", lineHeight: "1.78", fontFamily: "Rajdhani, sans-serif" }}>
                      {point.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NAVIGATE THE ARCHITECTURE ─────────────────────────── */}
        <section className="px-8 py-16" style={{ borderBottom: `1px solid ${C.borderNeutral}` }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Interactive Architecture</SectionLabel>
            <h2 className="font-orbitron font-bold mb-2"
              style={{ color: C.textPrimary, fontSize: "22px", letterSpacing: "0.07em" }}>
              Navigate the INDEX
            </h2>
            <p className="mb-10"
              style={{ color: C.textTertiary, fontSize: "13px", lineHeight: "1.75", fontFamily: "Rajdhani, sans-serif", maxWidth: 480 }}>
              Six public sectors. Hover a sector to inspect its scope. Click to enter.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              {/* Wheel */}
              <div className="flex-shrink-0" style={{ width: 480, maxWidth: "100%" }}>
                <CommandWheel
                  segments={SEGMENTS}
                  onHover={setHoveredSegment}
                  onSegmentClick={navigate}
                />
              </div>

              {/* Sector detail panel */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="grid grid-cols-1 gap-2">
                  {SEGMENTS.map((seg) => {
                    const isHovered = hoveredSegment === seg.label;
                    return (
                      <button key={seg.label}
                        onClick={() => navigate(seg.path)}
                        className="flex items-start gap-4 rounded-sm px-5 py-4 text-left w-full transition-all duration-150"
                        style={{
                          border: `1px solid ${isHovered ? C.borderGreenMid : C.borderNeutral}`,
                          background: isHovered ? "rgba(34,197,94,0.04)" : C.surfaceCard,
                          cursor: "pointer",
                        }}>
                        <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: isHovered ? C.green : "rgba(140,155,150,0.22)",
                              boxShadow: isHovered ? `0 0 5px rgba(34,197,94,0.5)` : undefined,
                              transition: "all 0.15s",
                            }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className="font-orbitron font-bold"
                              style={{ color: isHovered ? C.textGreen : C.textSecondary, fontSize: "10px", letterSpacing: "0.12em", transition: "color 0.15s" }}>
                              {seg.label}
                            </span>
                          </div>
                          <p className="font-mono-tactical"
                            style={{ color: C.textTertiary, fontSize: "9.5px", lineHeight: "1.65" }}>
                            {seg.description}
                          </p>
                        </div>
                        <span className="font-mono-tactical flex-shrink-0 self-center"
                          style={{ color: isHovered ? C.textGreen : C.textTertiary, fontSize: "11px", transition: "color 0.15s" }}>
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED BRANCHES ──────────────────────────────────── */}
        <section className="px-8 py-16" style={{ borderBottom: `1px solid ${C.borderNeutral}`, background: "rgba(0,0,0,0.12)" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>RSR Intelligence Network</SectionLabel>
            <h2 className="font-orbitron font-bold mb-2"
              style={{ color: C.textPrimary, fontSize: "22px", letterSpacing: "0.07em" }}>
              Related Branches
            </h2>
            <p className="mb-8"
              style={{ color: C.textTertiary, fontSize: "13px", lineHeight: "1.75", fontFamily: "Rajdhani, sans-serif", maxWidth: 480 }}>
              INDEX operates alongside two sibling branches within the RSR Intelligence Network.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <BranchCard
                name="RSR Press Corps"
                abbr="RSR-PC"
                desc="The editorial and publication arm of the RSR Intelligence Network. Responsible for analysis, reporting, and the conversion of structured intelligence into distributed content."
                href="https://www.rsrintel.com"
              />
              <BranchCard
                name="Black Dog Security"
                abbr="BDS"
                desc="The security intelligence division of the RSR network. Focused on threat assessment, vulnerability analysis, and operational security intelligence for network-wide operations."
                href="https://www.rsrintel.com"
              />
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-sm"
              style={{ border: `1px solid ${C.borderNeutral}`, background: C.surfaceCard }}>
              <div className="w-1 h-1 rounded-full" style={{ background: C.textGreenDim }} />
              <span className="font-mono-tactical"
                style={{ color: C.textTertiary, fontSize: "9px", lineHeight: "1.7" }}>
                INDEX provides the structured data layer that supports operations across all three RSR branches. Data indexed here feeds directly into RSR Press Corps analysis and Black Dog Security intelligence assessments.
              </span>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer className="px-8 py-6 flex items-center justify-between"
          style={{ borderTop: `1px solid ${C.borderNeutral}` }}>
          <div>
            <div className="font-orbitron font-bold mb-1"
              style={{ color: C.textTertiary, fontSize: "9.5px", letterSpacing: "0.18em" }}>
              INDEX DATA NETWORK
            </div>
            <div className="font-mono-tactical"
              style={{ color: "rgba(128,145,142,0.35)", fontSize: "8px", letterSpacing: "0.1em" }}>
              RSR Intelligence Network — Data Systems Division
            </div>
          </div>
          <div className="flex items-center gap-5">
            {[
              { label: "OVERVIEW", path: "/overview" },
              { label: "METHOD", path: "/method" },
              { label: "ACCESS", path: "/access" },
            ].map((link) => (
              <button key={link.path}
                onClick={() => navigate(link.path)}
                className="font-mono-tactical transition-colors duration-150"
                style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.textGreenDim; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.textTertiary; }}>
                {link.label}
              </button>
            ))}
            <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
              className="font-mono-tactical transition-colors duration-150"
              style={{ color: C.textTertiary, fontSize: "8.5px", letterSpacing: "0.12em", textDecoration: "none" }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.textGreenDim; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.textTertiary; }}>
              RSR INTEL ↗
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <StatusDot live={networkLive} />
            <span className="font-mono-tactical"
              style={{ color: C.textTertiary, fontSize: "8px", letterSpacing: "0.06em" }}>
              PUBLIC LAYER ACTIVE
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
