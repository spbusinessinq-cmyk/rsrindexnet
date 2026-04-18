import { useState } from "react";
import { useLocation } from "wouter";
import CommandWheel from "@/components/CommandWheel";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export const SEGMENTS = [
  {
    label: "SYSTEMS",
    path: "/systems",
    description: "Core intelligence architecture and analytical infrastructure",
    detail: "RSR operates a layered stack of analytical systems — each with a defined role in the intelligence cycle. AXION handles AI orchestration and inference routing. ORION monitors infrastructure telemetry and operational health. SAGE manages conversational intelligence and document reasoning. These systems are not tools. They are the operating architecture.",
    methodology: "System mapping. Role definition. Infrastructure integrity.",
  },
  {
    label: "SIGNALS",
    path: "/signals",
    description: "Signal monitoring, ingestion methodology, and watch surfaces",
    detail: "Signals are the raw material of intelligence. This layer captures, categorizes, and routes incoming information from monitored sources — open feeds, structured data streams, and flagged patterns. Before a signal becomes a file, it passes through triage, classification, and source validation.",
    methodology: "Signal capture. Source triage. Pattern classification.",
  },
  {
    label: "FILES",
    path: "/files",
    description: "Investigations, structured records, and analytical evidence",
    detail: "Files represent completed units of analytical work — structured records built from validated signals. Each file has a defined scope, documented sources, and traceable evidence chains. This is where pattern becomes record, and observation becomes structured understanding.",
    methodology: "Record structure. Evidence mapping. Source documentation.",
  },
  {
    label: "BRIEFS",
    path: "/briefs",
    description: "Synthesized intelligence outputs and recurring reporting products",
    detail: "Briefs are the synthesis layer — distilled analytical conclusions drawn from signals and files. They are written for decision-making, not consumption. Each brief carries a defined subject, analytical confidence level, and source lineage. The goal is structured understanding delivered with precision.",
    methodology: "Synthesis. Confidence assessment. Actionable framing.",
  },
  {
    label: "NETWORK",
    path: "/network",
    description: "Organizational architecture and intelligence layer topology",
    detail: "The network layer maps how RSR's intelligence systems, data flows, and analytical components relate to each other. This is not a social graph. It is a structural diagram of how information moves — from signal intake through analysis to output. Understanding the network means understanding how the operation functions.",
    methodology: "Topology mapping. Flow documentation. Dependency modeling.",
  },
  {
    label: "ACCESS",
    path: "/access",
    description: "Controlled operator layer and restricted environment entry",
    detail: "Behind the public interface sits an operational layer built for direct system interaction. ACCESS is the threshold between public architecture and internal operations. Entry requires verification. The tools, dashboards, and live environments available through this layer are not public-facing — they are operator-grade infrastructure.",
    methodology: "Verified access. Operator authentication. Restricted environment.",
  },
];

export default function Home() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const handleSegmentClick = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden grid-overlay flex flex-col">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(0,255,100,0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,100,0.35), transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,100,0.35), transparent)" }}
      />

      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-pulse glow-green" />
          <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase">RSR-NET // ACTIVE</span>
        </div>
        <div className="font-mono-tactical text-xs text-muted-foreground/60 tracking-widest hidden md:block">
          RSR INTELLIGENCE NETWORK
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono-tactical text-xs text-muted-foreground/50">
            {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        <LeftPanel hoveredSegment={hoveredSegment} segments={SEGMENTS} />

        <div className="flex-1 flex items-center justify-center p-4 md:p-6">
          <CommandWheel
            segments={SEGMENTS}
            onHover={setHoveredSegment}
            onSegmentClick={handleSegmentClick}
          />
        </div>

        <RightPanel hoveredSegment={hoveredSegment} segments={SEGMENTS} />
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 py-2 border-t border-border">
        <span className="font-mono-tactical text-xs text-muted-foreground/40 tracking-widest">
          RSR INTELLIGENCE NETWORK // v2.1
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono-tactical text-xs text-muted-foreground/40">PUBLIC INTERFACE</span>
          <div className="w-1 h-1 rounded-full bg-green-400/40 status-pulse" />
          <span className="font-mono-tactical text-xs text-muted-foreground/40">SIGNAL LAYER ACTIVE</span>
        </div>
        <span className="font-mono-tactical text-xs text-muted-foreground/40 tracking-widest hidden md:block">
          6 SECTORS MAPPED
        </span>
      </div>
    </div>
  );
}
