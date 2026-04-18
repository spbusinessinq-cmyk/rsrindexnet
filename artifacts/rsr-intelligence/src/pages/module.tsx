import { useLocation } from "wouter";

interface ModulePageProps {
  label: string;
  description: string;
  icon: string;
  color?: string;
}

export default function ModulePage({ label, description, icon, color = "#22c55e" }: ModulePageProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden grid-overlay flex flex-col">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 30%, ${color}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-border">
        <button
          data-testid="button-back-home"
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 font-mono-tactical text-xs text-muted-foreground hover:text-green-400 transition-colors tracking-widest uppercase"
        >
          ← Command Wheel
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-pulse" />
          <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">RSR-NET // ONLINE</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center p-8">
        <div className="max-w-lg w-full text-center space-y-6">
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border"
            style={{
              borderColor: `${color}40`,
              background: `${color}08`,
              boxShadow: `0 0 24px ${color}20`,
            }}
          >
            <span style={{ fontSize: 32, color }}>{icon}</span>
          </div>

          <div>
            <div className="font-mono-tactical text-xs tracking-widest uppercase mb-1" style={{ color: `${color}70` }}>
              RSR Module
            </div>
            <h1 className="font-orbitron text-3xl font-bold tracking-widest" style={{ color, textShadow: `0 0 16px ${color}60` }}>
              {label}
            </h1>
          </div>

          <p className="font-mono-tactical text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div
            className="border rounded p-4 text-left space-y-2"
            style={{ borderColor: `${color}20`, background: `${color}05` }}
          >
            <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: `${color}60` }}>
              Module Status
            </div>
            <div className="h-px" style={{ background: `${color}20` }} />
            <div className="font-mono-tactical text-xs text-muted-foreground/70">
              This module is being provisioned. Operational content will populate upon configuration and data-source binding.
            </div>
            <div className="font-mono-tactical text-xs" style={{ color: `${color}50` }}>
              STATUS: STANDBY // AWAITING CONFIGURATION
            </div>
          </div>

          <button
            data-testid="button-return-command"
            onClick={() => setLocation("/")}
            className="font-mono-tactical text-xs tracking-widest uppercase border rounded px-6 py-3 transition-all duration-200"
            style={{
              borderColor: `${color}30`,
              color: `${color}80`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}60`;
              (e.currentTarget as HTMLButtonElement).style.color = color;
              (e.currentTarget as HTMLButtonElement).style.background = `${color}08`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}30`;
              (e.currentTarget as HTMLButtonElement).style.color = `${color}80`;
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            ← Return to Command Wheel
          </button>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 py-2 border-t border-border">
        <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
          RSR INTELLIGENCE NETWORK // {label}
        </span>
        <span className="font-mono-tactical text-xs text-muted-foreground">MODULE: STANDBY</span>
      </div>
    </div>
  );
}

export function SystemsPage() {
  return <ModulePage label="SYSTEMS" description="Infrastructure monitoring, deployment control, and systems health across all active nodes in the RSR stack." icon="⬡" />;
}

export function SignalsPage() {
  return <ModulePage label="SIGNALS" description="Intelligence feeds, intercept monitoring, and signal analysis for active reconnaissance and situational awareness." icon="◈" />;
}

export function ToolsPage() {
  return <ModulePage label="TOOLS" description="Operator toolkit, automation utilities, and custom-built instruments for RSR field operations and analysis." icon="⬙" />;
}

export function FilesPage() {
  return <ModulePage label="FILES" description="Encrypted document vault, mission archives, and secure file management with access controls." icon="▣" />;
}

export function BriefsPage() {
  return <ModulePage label="BRIEFS" description="Mission reports, intelligence summaries, and operational briefs consolidated for rapid situational review." icon="◉" />;
}

export function NetworkPage() {
  return <ModulePage label="NETWORK" description="Node topology visualization, connectivity management, and network health monitoring across the RSR infrastructure." icon="⬢" />;
}
