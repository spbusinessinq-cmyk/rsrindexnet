import { useState } from "react";
import { useLocation } from "wouter";
import CommandWheel from "@/components/CommandWheel";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export default function Home() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const segments = [
    { label: "SYSTEMS", path: "/systems", description: "Infrastructure & deployment control" },
    { label: "SIGNALS", path: "/signals", description: "Intelligence feeds & intercepts" },
    { label: "TOOLS", path: "/tools", description: "Operator toolkit & utilities" },
    { label: "FILES", path: "/files", description: "Document vault & archives" },
    { label: "BRIEFS", path: "/briefs", description: "Mission reports & summaries" },
    { label: "NETWORK", path: "/network", description: "Node topology & connectivity" },
  ];

  const handleSegmentClick = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden grid-overlay flex flex-col">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,100,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,100,0.6), transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,100,0.6), transparent)" }}
      />

      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 status-pulse glow-green" />
          <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest uppercase">RSR-NET // ONLINE</span>
        </div>
        <div className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
          CLASSIFICATION: OPERATOR-LEVEL
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono-tactical text-xs text-muted-foreground">
            {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        <LeftPanel hoveredSegment={hoveredSegment} segments={segments} />

        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <CommandWheel
            segments={segments}
            onHover={setHoveredSegment}
            onSegmentClick={handleSegmentClick}
          />
        </div>

        <RightPanel hoveredSegment={hoveredSegment} segments={segments} />
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 py-2 border-t border-border">
        <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
          RSR INTELLIGENCE NETWORK // v2.0.1
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono-tactical text-xs text-muted-foreground">SYS-INT: NOMINAL</span>
          <div className="w-1 h-1 rounded-full bg-green-400 status-pulse" />
          <span className="font-mono-tactical text-xs text-muted-foreground">UPLINK: ACTIVE</span>
        </div>
        <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
          6 MODULES LOADED
        </span>
      </div>
    </div>
  );
}
