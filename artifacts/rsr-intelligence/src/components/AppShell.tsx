import { useLocation } from "wouter";

interface AppShellProps {
  children: React.ReactNode;
}

const NAV = [
  { label: "HOME",     path: "/",         icon: "⊕" },
  { label: "OVERVIEW", path: "/overview", icon: "⊡" },
  { label: "SIGNALS",  path: "/signals",  icon: "◈" },
  { label: "DATASETS", path: "/datasets", icon: "⊞" },
  { label: "INDEX",    path: "/records",  icon: "≡" },
  { label: "METHOD",   path: "/method",   icon: "◎" },
  { label: "ACCESS",   path: "/access",   icon: "⊟" },
];

export default function AppShell({ children }: AppShellProps) {
  const [location, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full bg-background grid-overlay flex flex-col overflow-hidden">
      <div
        className="relative z-20 flex items-center justify-between px-5 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-pulse" style={{ boxShadow: "0 0 6px #22c55e" }} />
          <span className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.5)" }}>
            INDEX // ACTIVE
          </span>
        </div>
        <span className="font-orbitron text-sm font-bold tracking-widest" style={{ color: "rgba(34,197,94,0.5)" }}>
          INDEX
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.25)" }}>
            DATA NETWORK
          </span>
          <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.2)" }}>
            {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <nav
          className="flex flex-col shrink-0 py-3 gap-0.5 overflow-y-auto"
          style={{
            width: 56,
            borderRight: "1px solid rgba(34,197,94,0.09)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          {NAV.map((item) => {
            const active = item.path === "/" ? location === "/" : location.startsWith(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                data-testid={`nav-${item.label.toLowerCase()}`}
                title={item.label}
                onClick={(e) => { e.preventDefault(); setLocation(item.path); }}
                className="group flex flex-col items-center gap-1 py-3 px-1 relative transition-all duration-150"
                style={{
                  background: active ? "rgba(34,197,94,0.08)" : "transparent",
                  borderLeft: active ? "2px solid #22c55e" : "2px solid transparent",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {active && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(34,197,94,0.03)" }} />
                )}
                <span
                  className="text-base leading-none"
                  style={{
                    color: active ? "#22c55e" : "rgba(34,197,94,0.3)",
                    filter: active ? "drop-shadow(0 0 4px #22c55e)" : undefined,
                    transition: "color 0.15s",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-mono-tactical"
                  style={{
                    fontSize: "7px",
                    letterSpacing: "0.1em",
                    color: active ? "rgba(34,197,94,0.8)" : "rgba(34,197,94,0.2)",
                    transition: "color 0.15s",
                  }}
                >
                  {item.label === "HOME" ? "BASE" : item.label.slice(0, 3)}
                </span>
              </a>
            );
          })}
        </nav>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <div
        className="relative z-20 flex items-center justify-between px-5 py-2 shrink-0"
        style={{ borderTop: "1px solid rgba(34,197,94,0.07)" }}
      >
        <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.2)" }}>
          INDEX // v1.0
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.18)" }}>DATA NETWORK</span>
          <div className="w-1 h-1 rounded-full bg-green-400/30 status-pulse" />
          <span className="font-mono-tactical text-xs" style={{ color: "rgba(34,197,94,0.18)" }}>SIGNAL INTAKE ACTIVE</span>
        </div>
        <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.2)" }}>
          PUBLIC LAYER
        </span>
      </div>
    </div>
  );
}
