import { useState } from "react";
import { useLocation } from "wouter";
import CommandWheel from "@/components/CommandWheel";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { derivePlatformState, fmtRelative } from "@/lib/runtime";

export const SEGMENTS = [
  {
    label: "OVERVIEW",
    path: "/overview",
    description: "What Pacific Systems is and how signal-to-structure works",
    detail: "OVERVIEW documents the Pacific Systems platform — what it monitors, how it structures incoming signals into usable data, and how structured data becomes indexed records.",
    methodology: "Platform scope. Signal-to-structure flow. Layer introduction.",
  },
  {
    label: "SIGNALS",
    path: "/signals",
    description: "Monitored signal classes, intake categories, and source structure",
    detail: "SIGNALS is where monitored input enters the Pacific Systems architecture. Signal categories are defined, sources are classified, and intake logic determines what gets structured versus what gets held or dismissed.",
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
    description: "How Pacific Systems collects, classifies, structures, and synthesises",
    detail: "METHOD explains the operational logic behind Pacific Systems — the discipline rules that govern signal intake, the classification logic that routes data into datasets, and the structuring process that builds records.",
    methodology: "Collection discipline. Classification logic. Synthesis flow.",
  },
  {
    label: "ACCESS",
    path: "/access",
    description: "Controlled entry to deeper data layers and restricted environments",
    detail: "ACCESS is the boundary between the public interface and the operational layer behind it. Deeper datasets, live signal feeds, and analytical tools exist behind this threshold.",
    methodology: "Verified entry. Tier separation. Restricted data layer.",
  },
];

/* ── Design tokens — marine steel / graphite / slate ─────────── */
const C = {
  bg:             "#121922",
  bgSection:      "#0F1720",
  bgCard:         "#1C2A35",
  bgCardHover:    "#243240",
  bgStrip:        "#0D1520",
  border:         "#2D3E4E",
  borderMid:      "#3B4E5E",
  borderAccent:   "rgba(127,174,158,0.32)",
  borderAccentMid:"rgba(127,174,158,0.5)",
  heading:        "#EEF3F7",
  headingDim:     "#C8D4DC",
  body:           "#B4C0CA",
  muted:          "#7F8E9B",
  mutedDim:       "#5E6E7A",
  accent:         "#7FAE9E",
  accentHover:    "#95C2B2",
  accentBlue:     "#7C95AD",
  accentBlueDim:  "#5A7A96",
  amber:          "#C7A56A",
  amberDim:       "#A8864E",
};

/* ── Shared micro-label ────────────────────────────────────────── */
function SectionLabel({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: 20, height: 1, background: accent ? C.borderAccentMid : C.borderMid, flexShrink: 0 }} />
      <span style={{
        color: accent ? C.accent : C.mutedDim,
        fontSize: "10px",
        letterSpacing: "0.22em",
        fontFamily: "'Share Tech Mono', monospace",
        textTransform: "uppercase",
        fontWeight: 400,
      }}>
        {children}
      </span>
    </div>
  );
}

/* ── Status indicator ──────────────────────────────────────────── */
function StatusDot({ live, amber = false }: { live: boolean; amber?: boolean }) {
  const color = live ? (amber ? C.amber : C.accent) : C.mutedDim;
  return (
    <div style={{
      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
      background: live ? color : C.border,
      boxShadow: live ? `0 0 6px ${color}55` : undefined,
      transition: "all 0.3s",
    }} />
  );
}

/* ── Division card ─────────────────────────────────────────────── */
function DivisionCard({ code, name, purpose, path, onClick }: {
  code: string; name: string; purpose: string; path: string;
  onClick: (path: string) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onClick(path)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? C.borderAccent : C.border}`,
        background: hov ? C.bgCardHover : C.bgCard,
        borderRadius: 4,
        padding: "1.875rem 2rem",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "border-color 0.18s, background 0.18s",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ color: C.mutedDim, fontSize: "9.5px", letterSpacing: "0.12em", fontFamily: "'Share Tech Mono', monospace" }}>
          {code}
        </span>
        <span style={{ color: hov ? C.accent : C.mutedDim, fontSize: "12px", transition: "color 0.18s", opacity: hov ? 1 : 0.4 }}>
          →
        </span>
      </div>
      <div style={{
        color: hov ? C.heading : C.headingDim,
        fontSize: "13px",
        letterSpacing: "0.07em",
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 600,
        marginBottom: 14,
        lineHeight: 1.4,
        transition: "color 0.18s",
      }}>
        {name}
      </div>
      <p style={{
        color: C.muted,
        fontSize: "15px",
        lineHeight: "1.76",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 400,
        flex: 1,
        margin: 0,
      }}>
        {purpose}
      </p>
    </button>
  );
}

/* ── Pipeline step ─────────────────────────────────────────────── */
function PipelineStep({ number, label, desc, active = false }: {
  number: string; label: string; desc: string; active?: boolean;
}) {
  return (
    <div style={{
      flex: 1,
      border: `1px solid ${active ? C.borderAccent : C.border}`,
      background: active ? `${C.bgCard}` : C.bgCard,
      borderRadius: 4,
      padding: "1.375rem 1.5rem",
      position: "relative",
    }}>
      {active && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${C.accent}55, transparent)`,
          borderRadius: "4px 4px 0 0",
        }} />
      )}
      <div style={{ color: C.mutedDim, fontSize: "9px", letterSpacing: "0.14em", fontFamily: "'Share Tech Mono', monospace", marginBottom: 12 }}>
        {number}
      </div>
      <div style={{
        color: active ? C.accent : C.headingDim,
        fontSize: "11px", letterSpacing: "0.09em",
        fontFamily: "'Orbitron', sans-serif", fontWeight: 600, marginBottom: 12,
      }}>
        {label}
      </div>
      <p style={{ color: C.muted, fontSize: "14px", lineHeight: "1.72", fontFamily: "'Rajdhani', sans-serif", margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}

/* ── Branch card ───────────────────────────────────────────────── */
function BranchCard({ name, code, role, desc, href }: {
  name: string; code: string; role: string; desc: string; href: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block", textDecoration: "none",
        border: `1px solid ${hov ? C.borderMid : C.border}`,
        background: hov ? C.bgCardHover : C.bgCard,
        borderRadius: 4, padding: "2.25rem 2.5rem",
        transition: "border-color 0.18s, background 0.18s",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ color: C.mutedDim, fontSize: "9.5px", letterSpacing: "0.12em", fontFamily: "'Share Tech Mono', monospace" }}>
          {code}
        </span>
        <span style={{ color: hov ? C.accentBlue : C.mutedDim, fontSize: "13px", transition: "color 0.18s", opacity: hov ? 1 : 0.5 }}>
          ↗
        </span>
      </div>
      <div style={{
        color: C.headingDim, fontSize: "17px", letterSpacing: "0.05em",
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700, marginBottom: 8,
      }}>
        {name}
      </div>
      <div style={{ color: C.accentBlue, fontSize: "10.5px", letterSpacing: "0.1em", fontFamily: "'Share Tech Mono', monospace", marginBottom: 18 }}>
        {role}
      </div>
      <p style={{ color: C.muted, fontSize: "15px", lineHeight: "1.8", fontFamily: "'Rajdhani', sans-serif", margin: 0 }}>
        {desc}
      </p>
    </a>
  );
}

/* ── NavLink ──────────────────────────────────────────────────── */
function NavLink({ label, path, onClick }: { label: string; path: string; onClick: (p: string) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onClick(path)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: hov ? C.body : C.muted,
        fontSize: "10.5px", letterSpacing: "0.16em",
        fontFamily: "'Share Tech Mono', monospace",
        textTransform: "uppercase",
        transition: "color 0.15s",
        padding: "4px 0",
      }}>
      {label}
    </button>
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
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}>

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <header style={{
        borderBottom: `1px solid ${C.border}`,
        background: C.bgStrip,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", minHeight: 56, flexShrink: 0, position: "sticky", top: 0, zIndex: 20,
      }}>
        {/* Left: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <StatusDot live={networkLive} />
          <div>
            <div style={{ color: C.body, fontSize: "12.5px", letterSpacing: "0.16em", fontFamily: "'Orbitron', sans-serif", fontWeight: 700, lineHeight: 1 }}>
              PACIFIC SYSTEMS
            </div>
            <div style={{ color: C.mutedDim, fontSize: "8.5px", letterSpacing: "0.12em", fontFamily: "'Share Tech Mono', monospace", marginTop: 4 }}>
              RSR INTELLIGENCE NETWORK
            </div>
          </div>
        </div>

        {/* Center: nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {SEGMENTS.slice(0, -1).map((seg) => (
            <NavLink key={seg.path} label={seg.label} path={seg.path} onClick={navigate} />
          ))}
        </nav>

        {/* Right: external + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
            style={{ color: C.mutedDim, fontSize: "10px", letterSpacing: "0.1em", textDecoration: "none", fontFamily: "'Share Tech Mono', monospace", transition: "color 0.15s" }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.mutedDim; }}>
            RSR INTEL ↗
          </a>
          <button onClick={() => navigate("/access")}
            style={{
              background: "transparent",
              border: `1px solid ${C.borderAccent}`,
              color: C.accent, fontSize: "10.5px", letterSpacing: "0.14em",
              fontFamily: "'Share Tech Mono', monospace",
              padding: "7px 18px", borderRadius: 3, cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${C.accent}10`;
              (e.currentTarget as HTMLElement).style.borderColor = C.borderAccentMid;
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = C.borderAccent;
            }}>
            ACCESS
          </button>
        </div>
      </header>

      {/* ── DATA STRIP ──────────────────────────────────────────── */}
      <div style={{
        background: C.bgStrip, borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", minHeight: 36, flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
          {[
            { k: "INTAKE SOURCES", v: `${platform.sourcesConnected}/${platform.sourcesTotal}`, live: networkLive },
            { k: "STAGED", v: platform.totalLiveItems > 0 ? String(platform.totalLiveItems) : "—", live: platform.totalLiveItems > 0 },
            { k: "COMMITTED", v: "0", live: false },
            { k: "DOMAINS", v: `${platform.domainsBound}/${platform.domainsTotal}`, live: platform.domainsBound > 0 },
          ].map((item) => (
            <div key={item.k} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 0 0", marginRight: 20, borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
              <span style={{ color: C.mutedDim, fontSize: "9px", letterSpacing: "0.1em", fontFamily: "'Share Tech Mono', monospace" }}>
                {item.k}
              </span>
              <span style={{
                color: item.live ? C.accent : C.border,
                fontSize: "10.5px", letterSpacing: "0.04em",
                fontFamily: "'Share Tech Mono', monospace",
                fontVariantNumeric: "tabular-nums",
              }}>
                {item.v}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StatusDot live={networkLive} />
          <span style={{ color: C.mutedDim, fontSize: "9.5px", letterSpacing: "0.06em", fontFamily: "'Share Tech Mono', monospace" }}>
            {networkLive && platform.lastSync
              ? `SYNCED ${fmtRelative(platform.lastSync).toUpperCase()}`
              : isConnecting ? "CONNECTING..." : "PIPELINE READY"}
          </span>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${C.border}`, padding: "6rem 2.5rem 5rem" }}>
          <div style={{ maxWidth: 960 }}>
            {/* Parent label */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: C.borderAccentMid }} />
              <span style={{ color: C.accent, fontSize: "10px", letterSpacing: "0.22em", fontFamily: "'Share Tech Mono', monospace" }}>
                RSR INTELLIGENCE NETWORK — DATA SYSTEMS DIVISION
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              color: C.heading,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(44px, 7vw, 80px)",
              letterSpacing: "0.04em",
              lineHeight: 1.02,
              marginBottom: 16,
            }}>
              PACIFIC<br />SYSTEMS
            </h1>

            {/* Subtitle */}
            <div style={{
              color: C.accentBlue,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(15px, 2vw, 21px)",
              letterSpacing: "0.14em",
              marginBottom: 32,
            }}>
              Structured Data Infrastructure
            </div>

            {/* Description */}
            <p style={{
              color: C.body,
              fontSize: "clamp(16px, 1.6vw, 19px)",
              lineHeight: "1.94",
              maxWidth: 700,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 400,
              marginBottom: 44,
            }}>
              Pacific Systems is the structured data division of the RSR Intelligence Network.
              It receives monitored signals, routes them through a defined structuring process,
              assigns them to classified datasets, and commits them to a searchable record index.
              Pacific Systems does not produce editorial content — it produces structured,
              retrievable data infrastructure.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => navigate("/overview")}
                style={{
                  background: C.accent,
                  border: `1px solid ${C.accent}`,
                  color: "#0D1520",
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  padding: "14px 32px",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = C.accentHover; (e.currentTarget as HTMLElement).style.borderColor = C.accentHover; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = C.accent; (e.currentTarget as HTMLElement).style.borderColor = C.accent; }}>
                EXPLORE ARCHITECTURE
              </button>
              <button onClick={() => navigate("/method")}
                style={{
                  background: "transparent",
                  border: `1px solid ${C.borderMid}`,
                  color: C.body,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  padding: "14px 32px",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.borderAccent; (e.currentTarget as HTMLElement).style.color = C.heading; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.borderMid; (e.currentTarget as HTMLElement).style.color = C.body; }}>
                METHODOLOGY
              </button>
            </div>
          </div>
        </section>

        {/* ── NETWORK POSITIONING ───────────────────────────────── */}
        <section style={{ background: C.bgSection, borderBottom: `1px solid ${C.border}`, padding: "3.5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Network Architecture</SectionLabel>

            {/* Hierarchy breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { label: "RSR", sub: "Parent organisation", active: false, href: "https://www.rsrintel.com" },
                { label: "RSR Intelligence Network", sub: "Intelligence division", active: false, href: "https://www.rsrintel.com" },
                { label: "Pacific Systems", sub: "Data systems — this site", active: true, href: "/" },
              ].map((node, i) => (
                <div key={node.label} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <a href={node.href} target={node.active ? "_self" : "_blank"} rel="noopener noreferrer"
                    style={{
                      display: "flex", flexDirection: "column",
                      border: `1px solid ${node.active ? C.borderAccent : C.border}`,
                      background: node.active ? `${C.bgCard}` : "transparent",
                      borderRadius: 3, padding: "10px 18px", textDecoration: "none",
                      transition: "border-color 0.15s",
                    }}>
                    <span style={{
                      color: node.active ? C.accent : C.body,
                      fontSize: "11.5px", letterSpacing: "0.1em",
                      fontFamily: "'Orbitron', sans-serif", fontWeight: node.active ? 700 : 500,
                    }}>
                      {node.label}
                    </span>
                    <span style={{ color: C.mutedDim, fontSize: "9.5px", letterSpacing: "0.08em", fontFamily: "'Share Tech Mono', monospace", marginTop: 5 }}>
                      {node.sub}
                    </span>
                  </a>
                  {i < 2 && (
                    <div style={{ padding: "0 12px", color: C.borderMid, fontSize: "14px", flexShrink: 0 }}>›</div>
                  )}
                </div>
              ))}
            </div>

            {/* Sibling branches */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ color: C.mutedDim, fontSize: "10px", letterSpacing: "0.1em", fontFamily: "'Share Tech Mono', monospace" }}>
                SIBLING BRANCHES
              </span>
              <div style={{ width: 1, height: 12, background: C.border }} />
              {[
                { label: "RSR Press Corps", role: "Editorial & Publication" },
                { label: "Black Dog Security", role: "Security Intelligence" },
              ].map((branch) => (
                <div key={branch.label}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    border: `1px solid ${C.border}`,
                    background: "transparent",
                    borderRadius: 3, padding: "6px 14px",
                  }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accentBlue, opacity: 0.6 }} />
                  <span style={{ color: C.muted, fontSize: "10.5px", letterSpacing: "0.06em", fontFamily: "'Share Tech Mono', monospace" }}>
                    {branch.label}
                  </span>
                  <span style={{ color: C.mutedDim, fontSize: "9.5px", fontFamily: "'Share Tech Mono', monospace" }}>
                    — {branch.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCOPE DEFINITION ──────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${C.border}`, padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Scope Definition</SectionLabel>
            <h2 style={{ color: C.heading, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.07em", marginBottom: 28 }}>
              What Pacific Systems Is
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: 20 }}>

              {/* IS */}
              <div style={{
                border: `1px solid ${C.borderAccent}`,
                background: C.bgCard,
                borderRadius: 4, padding: "2rem 2.25rem",
                borderTop: `2px solid ${C.accent}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, boxShadow: `0 0 6px ${C.accent}55` }} />
                  <span style={{ color: C.accent, fontSize: "9.5px", letterSpacing: "0.2em", fontFamily: "'Share Tech Mono', monospace" }}>
                    PACIFIC SYSTEMS IS
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "The structured data infrastructure of the RSR Intelligence Network",
                    "A signal intake, classification, and record-indexing system",
                    "A defined pipeline from raw input to structured, retrievable output",
                    "A data operations layer with tiered access and version control",
                    "The authoritative record layer for the broader RSR ecosystem",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.borderAccentMid, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ color: C.body, fontSize: "16px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IS NOT */}
              <div style={{
                border: `1px solid ${C.border}`,
                background: C.bgCard,
                borderRadius: 4, padding: "2rem 2.25rem",
                borderTop: `2px solid ${C.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.border }} />
                  <span style={{ color: C.mutedDim, fontSize: "9.5px", letterSpacing: "0.2em", fontFamily: "'Share Tech Mono', monospace" }}>
                    PACIFIC SYSTEMS IS NOT
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "An editorial platform or press operation",
                    "A public-facing news or content system",
                    "A standalone brand separate from the RSR network",
                    "A commercial data marketplace or consumer service",
                    "A social platform, aggregator, or discovery tool",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.border, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ color: C.muted, fontSize: "16px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIVISIONS ─────────────────────────────────────────── */}
        <section style={{ background: C.bgSection, borderBottom: `1px solid ${C.border}`, padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Organisational Structure</SectionLabel>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ color: C.heading, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.07em", marginBottom: 10 }}>
                  Pacific Systems Divisions
                </h2>
                <p style={{ color: C.muted, fontSize: "15px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif", maxWidth: 500, margin: 0 }}>
                  Six internal divisions, each responsible for a defined stage of the signal-to-record pipeline.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusDot live={networkLive} />
                <span style={{ color: C.mutedDim, fontSize: "10px", letterSpacing: "0.08em", fontFamily: "'Share Tech Mono', monospace" }}>
                  {networkLive ? `${platform.sourcesConnected} SOURCES ACTIVE` : "INTAKE READY"}
                </span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
              {[
                { code: "DIV-01", name: "Signal Intake Office", path: "/signals",
                  purpose: "Receives and validates incoming signals from monitored sources. Manages intake routing, source classification, and triage gate evaluation." },
                { code: "DIV-02", name: "Data Structuring Division", path: "/datasets",
                  purpose: "Transforms validated signals into structured data entries. Applies schema rules, field normalisation, and preliminary classification before dataset assignment." },
                { code: "DIV-03", name: "Dataset Operations", path: "/datasets",
                  purpose: "Manages the domain dataset layer. Assigns structured entries to the correct collection, maintains dataset integrity, and enforces coverage boundaries." },
                { code: "DIV-04", name: "Index & Retrieval Division", path: "/records",
                  purpose: "Handles the commitment of structured entries into the searchable index. Manages record versioning, retrieval architecture, and index integrity." },
                { code: "DIV-05", name: "Access Control Office", path: "/access",
                  purpose: "Governs tier-based access to the data layer. Manages operator authentication, public/restricted separation, and access provisioning." },
                { code: "DIV-06", name: "Methodology & Standards Unit", path: "/method",
                  purpose: "Defines and maintains the operational standards governing all Pacific Systems activity — classification logic, collection discipline, and synthesis protocol." },
              ].map((div) => (
                <DivisionCard key={div.code} {...div} onClick={navigate} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SIGNAL-TO-RECORD PIPELINE ─────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${C.border}`, padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel accent>Data Architecture</SectionLabel>
            <h2 style={{ color: C.heading, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.07em", marginBottom: 12 }}>
              Signal-to-Record Pipeline
            </h2>
            <p style={{ color: C.muted, fontSize: "15px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif", maxWidth: 560, marginBottom: 40 }}>
              Every record in Pacific Systems began as a monitored signal. The pipeline defines the mandatory path from intake to indexed entry.
            </p>

            {/* Pipeline */}
            <div style={{ display: "flex", alignItems: "stretch", gap: 6, marginBottom: 28, overflowX: "auto" }}>
              {[
                { number: "01", label: "SIGNAL INTAKE", desc: "Monitored sources deliver raw signals into the intake layer", active: networkLive },
                { number: "02", label: "TRIAGE GATE", desc: "Signals validated against defined triage criteria before structuring", active: false },
                { number: "03", label: "STRUCTURING", desc: "Validated signals structured into schema-compliant entries", active: false },
                { number: "04", label: "DATASET ASSIGN", desc: "Structured entries routed to their domain dataset collection", active: false },
                { number: "05", label: "INDEX COMMIT", desc: "Operator review and explicit commit to the record index", active: false },
              ].map((step, i, arr) => (
                <div key={step.number} style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 140 }}>
                  <PipelineStep {...step} />
                  {i < arr.length - 1 && (
                    <div style={{ display: "flex", alignItems: "center", padding: "0 2px", flexShrink: 0 }}>
                      <div style={{ color: C.borderMid, fontSize: "16px" }}>›</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Live state */}
            <div style={{
              display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
              border: `1px solid ${C.border}`, background: C.bgCard,
              borderRadius: 4, padding: "14px 20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusDot live={networkLive} />
                <span style={{ color: C.mutedDim, fontSize: "10px", letterSpacing: "0.08em", fontFamily: "'Share Tech Mono', monospace" }}>
                  INTAKE LAYER
                </span>
                <span style={{ color: networkLive ? C.accent : C.muted, fontSize: "11px", fontFamily: "'Share Tech Mono', monospace" }}>
                  {networkLive ? `${platform.sourcesConnected} sources · ${platform.totalLiveItems} staged` : "Ready — awaiting source binding"}
                </span>
              </div>
              <div style={{ width: 1, height: 14, background: C.border }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.border }} />
                <span style={{ color: C.mutedDim, fontSize: "10px", letterSpacing: "0.08em", fontFamily: "'Share Tech Mono', monospace" }}>
                  INDEX LAYER
                </span>
                <span style={{ color: C.mutedDim, fontSize: "11px", fontFamily: "'Share Tech Mono', monospace", fontStyle: "italic" }}>
                  0 records committed — classification pending
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ───────────────────────────────────── */}
        <section style={{ background: C.bgSection, borderBottom: `1px solid ${C.border}`, padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Institutional Context</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 60, alignItems: "start" }}>
              {/* Left — narrative */}
              <div>
                <h2 style={{ color: C.heading, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.07em", marginBottom: 22 }}>
                  Why Pacific Systems Exists
                </h2>
                <p style={{ color: C.body, fontSize: "17px", lineHeight: "1.94", fontFamily: "'Rajdhani', sans-serif", marginBottom: 20 }}>
                  Intelligence networks accumulate large volumes of signal. Without a dedicated structuring and indexing layer, that volume remains operationally unusable — it cannot be retrieved, cross-referenced, or built upon systematically.
                </p>
                <p style={{ color: C.body, fontSize: "17px", lineHeight: "1.94", fontFamily: "'Rajdhani', sans-serif", marginBottom: 0 }}>
                  Pacific Systems resolves this within the RSR Intelligence Network. It converts raw monitored input into structured, attributed, version-controlled records that can be retrieved, queried, and used as the data foundation for downstream analytical work across RSR's broader operations.
                </p>
              </div>

              {/* Right — principles */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  {
                    heading: "Structured over raw",
                    body: "Every entry that enters Pacific Systems has been validated, classified, and structured against a defined schema. Raw signal volume does not equal usable data without this layer.",
                    accent: C.accent,
                  },
                  {
                    heading: "Attribution by design",
                    body: "Every record carries source attribution, intake timestamp, classification status, and version history. Pacific Systems does not accept unattributed entries.",
                    accent: C.accentBlue,
                  },
                  {
                    heading: "Retrieval-first architecture",
                    body: "The index layer is built around retrieval — entries are indexed for search, cross-reference, and programmatic access from the moment they are committed.",
                    accent: C.accent,
                  },
                ].map((principle) => (
                  <div key={principle.heading}
                    style={{
                      border: `1px solid ${C.border}`,
                      background: C.bgCard,
                      borderRadius: 4, padding: "1.25rem 1.5rem",
                      borderLeft: `3px solid ${principle.accent}55`,
                    }}>
                    <div style={{ color: C.headingDim, fontFamily: "'Orbitron', sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", marginBottom: 10 }}>
                      {principle.heading}
                    </div>
                    <p style={{ color: C.muted, fontSize: "14.5px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif", margin: 0 }}>
                      {principle.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NAVIGATE THE ARCHITECTURE ─────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${C.border}`, padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>Interactive Architecture</SectionLabel>
            <h2 style={{ color: C.heading, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.07em", marginBottom: 12 }}>
              Navigate Pacific Systems
            </h2>
            <p style={{ color: C.muted, fontSize: "15px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif", maxWidth: 480, marginBottom: 48 }}>
              Six public sectors. Hover to inspect scope. Click to enter.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 48 }}>
              {/* Wheel */}
              <div style={{ flexShrink: 0, width: 460, maxWidth: "100%" }}>
                <CommandWheel
                  segments={SEGMENTS}
                  onHover={setHoveredSegment}
                  onSegmentClick={navigate}
                />
              </div>

              {/* Sector list */}
              <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 6 }}>
                {SEGMENTS.map((seg) => {
                  const active = hoveredSegment === seg.label;
                  return (
                    <button key={seg.label}
                      onClick={() => navigate(seg.path)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        border: `1px solid ${active ? C.borderAccent : C.border}`,
                        background: active ? C.bgCardHover : C.bgCard,
                        borderRadius: 4, padding: "14px 18px",
                        cursor: "pointer", textAlign: "left", width: "100%",
                        transition: "all 0.15s",
                      }}>
                      <div style={{
                        width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                        background: active ? C.accent : C.border,
                        boxShadow: active ? `0 0 6px ${C.accent}55` : undefined,
                        transition: "all 0.15s",
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          color: active ? C.accent : C.headingDim,
                          fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
                          fontSize: "11px", letterSpacing: "0.14em", marginBottom: 6,
                          transition: "color 0.15s",
                        }}>
                          {seg.label}
                        </div>
                        <p style={{ color: C.muted, fontFamily: "'Share Tech Mono', monospace", fontSize: "11.5px", lineHeight: "1.65", margin: 0 }}>
                          {seg.description}
                        </p>
                      </div>
                      <span style={{ color: active ? C.accent : C.border, fontSize: "13px", flexShrink: 0, transition: "color 0.15s" }}>→</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED BRANCHES ──────────────────────────────────── */}
        <section style={{ background: C.bgSection, borderBottom: `1px solid ${C.border}`, padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: 1100 }}>
            <SectionLabel>RSR Intelligence Network</SectionLabel>
            <h2 style={{ color: C.heading, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "0.07em", marginBottom: 12 }}>
              Related Branches
            </h2>
            <p style={{ color: C.muted, fontSize: "15px", lineHeight: "1.78", fontFamily: "'Rajdhani', sans-serif", maxWidth: 540, marginBottom: 36 }}>
              Pacific Systems operates alongside two sibling branches within the RSR Intelligence Network.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16, marginBottom: 20 }}>
              <BranchCard
                name="RSR Press Corps"
                code="RSR-PC"
                role="EDITORIAL & PUBLICATION BRANCH"
                desc="The editorial and publication arm of the RSR Intelligence Network. Responsible for analysis, reporting, and the conversion of structured intelligence into distributed content."
                href="https://www.rsrintel.com"
              />
              <BranchCard
                name="Black Dog Security"
                code="BDS"
                role="SECURITY INTELLIGENCE BRANCH"
                desc="The security intelligence division of the RSR network. Focused on threat assessment, vulnerability analysis, and operational security intelligence for network-wide operations."
                href="https://www.rsrintel.com"
              />
            </div>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              border: `1px solid ${C.border}`, background: C.bgCard,
              borderRadius: 4, padding: "14px 18px",
            }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.borderAccentMid, flexShrink: 0, marginTop: 5 }} />
              <p style={{ color: C.muted, fontFamily: "'Rajdhani', sans-serif", fontSize: "15px", lineHeight: "1.78", margin: 0 }}>
                Pacific Systems provides the structured data layer that supports operations across all three RSR branches.
                Data indexed here feeds directly into RSR Press Corps analysis and Black Dog Security intelligence assessments.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${C.border}`,
          background: C.bgStrip,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.5rem 2.5rem", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{ color: C.headingDim, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "11.5px", letterSpacing: "0.16em", marginBottom: 5 }}>
              PACIFIC SYSTEMS
            </div>
            <div style={{ color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace", fontSize: "9px", letterSpacing: "0.1em" }}>
              RSR Intelligence Network — Data Systems Division
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {[
              { label: "OVERVIEW", path: "/overview" },
              { label: "METHOD", path: "/method" },
              { label: "ACCESS", path: "/access" },
            ].map((link) => (
              <button key={link.path} onClick={() => navigate(link.path)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px", letterSpacing: "0.14em", transition: "color 0.15s",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.mutedDim; }}>
                {link.label}
              </button>
            ))}
            <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
              style={{ color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", letterSpacing: "0.14em", textDecoration: "none", transition: "color 0.15s" }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.mutedDim; }}>
              RSR INTEL ↗
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StatusDot live={networkLive} />
            <span style={{ color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace", fontSize: "9.5px", letterSpacing: "0.06em" }}>
              PUBLIC LAYER ACTIVE
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
