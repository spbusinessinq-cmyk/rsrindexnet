import { useState } from "react";
import { useLocation } from "wouter";
import CommandWheel from "@/components/CommandWheel";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { useFeed0, useFeed1, useFeed2, useFeed3 } from "@/hooks/useFeed";
import { derivePlatformState, fmtRelative } from "@/lib/runtime";
import type { PlatformRuntimeState } from "@/lib/feeds/types";

export const SEGMENTS = [
  {
    label: "OVERVIEW",
    path: "/overview",
    description: "What the INDEX Data Network is and how signal-to-structure works",
    detail: "OVERVIEW documents the INDEX platform — what it monitors, how it structures incoming signals into usable data, and how structured data becomes indexed records. This is the entry point for understanding the architecture before navigating into its component layers.",
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
    detail: "DATASETS are the organised output of signal structuring — collections of data grouped by domain, subject class, or tracked activity type. A dataset is a bounded collection that grows as new signals are structured, classified, and appended to its scope.",
    methodology: "Domain grouping. Collection management. Analytical coverage.",
  },
  {
    label: "INDEX",
    path: "/records",
    description: "Indexed records, structured entries, and searchable data layer",
    detail: "The INDEX layer is the core of what this platform produces — a structured, searchable record of everything that has been monitored, classified, and committed. Records are discrete entries with defined scope, source attribution, and classification status.",
    methodology: "Record structure. Search architecture. Data integrity.",
  },
  {
    label: "METHOD",
    path: "/method",
    description: "How INDEX collects, classifies, structures, and synthesises",
    detail: "METHOD explains the operational logic behind INDEX — the discipline rules that govern signal intake, the classification logic that routes data into datasets, the structuring process that builds records, and the synthesis layer that produces analysis-ready output.",
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

/* ── Compact live metric ───────────────────────────────────────── */
function LiveMetric({ value, label, live, dim = false }: {
  value: string; label: string; live: boolean; dim?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rounded-full flex-shrink-0"
        style={{
          background: live ? "rgba(34,197,94,0.7)" : dim ? "rgba(155,175,170,0.12)" : "rgba(155,175,170,0.2)",
          boxShadow: live ? "0 0 3px rgba(34,197,94,0.5)" : undefined,
        }} />
      <span className="font-mono-tactical"
        style={{
          color: live ? "rgba(34,197,94,0.78)" : dim ? "rgba(155,175,170,0.25)" : "rgba(155,175,170,0.38)",
          fontSize: "9.5px",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.04em",
        }}>
        {value}
      </span>
      <span className="font-mono-tactical hidden xl:inline"
        style={{ color: "rgba(155,175,170,0.28)", fontSize: "8px", letterSpacing: "0.1em" }}>
        {label}
      </span>
    </div>
  );
}

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

  const handleSegmentClick = (path: string) => setLocation(path);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden grid-overlay flex flex-col">
      {/* Radial atmosphere */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 52%, rgba(0,255,100,0.018) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent 8%, rgba(34,197,94,0.22) 50%, transparent 92%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent 8%, rgba(34,197,94,0.14) 50%, transparent 92%)" }} />

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.09)" }}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-pulse glow-green" />
          <span className="font-mono-tactical tracking-widest uppercase"
            style={{ color: "rgba(34,197,94,0.65)", letterSpacing: "0.18em", fontSize: "9.5px" }}>
            INDEX // ACTIVE
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-orbitron font-bold tracking-widest hidden md:block"
            style={{ color: "rgba(34,197,94,0.52)", fontSize: "11px", letterSpacing: "0.24em" }}>
            INDEX DATA NETWORK
          </span>
          <span className="font-mono-tactical tracking-widest hidden md:block"
            style={{ color: "rgba(155,175,170,0.32)", fontSize: "7.5px", letterSpacing: "0.2em" }}>
            RSR INTELLIGENCE NETWORK — DATA SYSTEMS
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
            className="font-mono-tactical tracking-widest hidden sm:flex items-center"
            style={{
              color: "rgba(34,197,94,0.45)", fontSize: "8.5px", letterSpacing: "0.12em",
              textDecoration: "none", border: "1px solid rgba(34,197,94,0.18)",
              padding: "3px 10px", borderRadius: 3, background: "rgba(34,197,94,0.04)",
            }}>
            RSR INTEL ↗
          </a>
          <span className="font-mono-tactical hidden md:block"
            style={{ color: "rgba(155,175,170,0.3)", fontSize: "9px" }}>
            {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
          </span>
        </div>
      </div>

      {/* ── Live metrics strip ──────────────────────────────────── */}
      <div className="relative z-10 flex items-center shrink-0 px-5"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.05)", background: "rgba(0,0,0,0.22)", minHeight: 34 }}>

        <div className="flex items-center gap-0 flex-1 overflow-x-auto">
          {/* Sources */}
          <div className="flex items-center gap-2.5 px-4 py-2 flex-shrink-0"
            style={{ borderRight: "1px solid rgba(34,197,94,0.05)" }}>
            <LiveMetric
              value={`${platform.sourcesConnected} / ${platform.sourcesTotal}`}
              label="SOURCES"
              live={networkLive}
            />
          </div>
          {/* Staged */}
          <div className="flex items-center gap-2.5 px-4 py-2 flex-shrink-0"
            style={{ borderRight: "1px solid rgba(34,197,94,0.05)" }}>
            <LiveMetric
              value={String(platform.totalLiveItems)}
              label="STAGED"
              live={platform.totalLiveItems > 0}
            />
          </div>
          {/* Committed */}
          <div className="flex items-center gap-2.5 px-4 py-2 flex-shrink-0"
            style={{ borderRight: "1px solid rgba(34,197,94,0.05)" }}>
            <LiveMetric value="0" label="COMMITTED" live={false} dim />
          </div>
          {/* Domains */}
          <div className="flex items-center gap-2.5 px-4 py-2 flex-shrink-0 hidden md:flex"
            style={{ borderRight: "1px solid rgba(34,197,94,0.05)" }}>
            <LiveMetric
              value={`${platform.domainsBound} / ${platform.domainsTotal}`}
              label="DOMAINS BOUND"
              live={platform.domainsBound > 0}
            />
          </div>
        </div>

        {/* Right side: sync / status */}
        <div className="flex items-center gap-3 px-4 flex-shrink-0">
          {networkLive && platform.lastSync ? (
            <span className="font-mono-tactical hidden md:block"
              style={{ color: "rgba(34,197,94,0.38)", fontSize: "8.5px", letterSpacing: "0.06em" }}>
              SYNCED {fmtRelative(platform.lastSync).toUpperCase()}
            </span>
          ) : (
            <span className="font-mono-tactical hidden md:block"
              style={{ color: "rgba(155,175,170,0.22)", fontSize: "8.5px", letterSpacing: "0.06em" }}>
              {isConnecting ? "CONNECTING..." : "INTAKE READY"}
            </span>
          )}
          <div className="w-px h-3.5 hidden md:block" style={{ background: "rgba(34,197,94,0.08)" }} />
          <span className="font-mono-tactical tracking-widest hidden md:block"
            style={{ color: "rgba(34,197,94,0.25)", fontSize: "8px", letterSpacing: "0.14em" }}>
            PUBLIC LAYER
          </span>
        </div>
      </div>

      {/* ── Main three-panel area ──────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <LeftPanel hoveredSegment={hoveredSegment} segments={SEGMENTS} platform={platform} />
        <div className="flex-1 flex items-center justify-center p-4 md:p-6 min-w-0">
          <CommandWheel
            segments={SEGMENTS}
            onHover={setHoveredSegment}
            onSegmentClick={handleSegmentClick}
          />
        </div>
        <RightPanel hoveredSegment={hoveredSegment} segments={SEGMENTS} platform={platform} />
      </div>

      {/* ── Bottom status bar ──────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-2 shrink-0"
        style={{ borderTop: "1px solid rgba(34,197,94,0.07)", background: "rgba(0,0,0,0.15)" }}>
        <span className="font-mono-tactical tracking-widest"
          style={{ color: "rgba(155,175,170,0.22)", fontSize: "9px", letterSpacing: "0.18em" }}>
          INDEX DATA NETWORK
        </span>
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-1 rounded-full flex-shrink-0"
            style={{
              background: networkLive ? "rgba(34,197,94,0.65)" : isConnecting ? "rgba(34,197,94,0.32)" : "rgba(155,175,170,0.2)",
              boxShadow: networkLive ? "0 0 4px rgba(34,197,94,0.45)" : undefined,
            }} />
          <span className="font-mono-tactical"
            style={{
              color: networkLive ? "rgba(34,197,94,0.48)" : "rgba(155,175,170,0.28)",
              fontSize: "9px",
              letterSpacing: "0.05em",
            }}>
            {networkLive
              ? `${platform.sourcesConnected} SOURCE${platform.sourcesConnected !== 1 ? "S" : ""} ACTIVE · ${platform.totalLiveItems} STAGED${platform.lastSync ? ` · SYNCED ${fmtRelative(platform.lastSync).toUpperCase()}` : ""}`
              : isConnecting ? "SOURCES CONNECTING"
              : "INTAKE READY — SOURCES UNBOUND"}
          </span>
        </div>
        <span className="font-mono-tactical tracking-widest hidden md:block"
          style={{ color: "rgba(155,175,170,0.2)", fontSize: "9px", letterSpacing: "0.16em" }}>
          PUBLIC LAYER
        </span>
      </div>
    </div>
  );
}
