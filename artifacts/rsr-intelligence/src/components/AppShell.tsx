import { useLocation } from "wouter";

interface AppShellProps {
  children: React.ReactNode;
}

const NAV = [
  { label: "HOME",     path: "/",         icon: "⊕", abbr: "BASE" },
  { label: "OVERVIEW", path: "/overview", icon: "⊡", abbr: "OVE" },
  { label: "SIGNALS",  path: "/signals",  icon: "◈", abbr: "SIG" },
  { label: "DATASETS", path: "/datasets", icon: "⊞", abbr: "DAT" },
  { label: "INDEX",    path: "/records",  icon: "≡",  abbr: "IND" },
  { label: "METHOD",   path: "/method",   icon: "◎", abbr: "MET" },
  { label: "ACCESS",   path: "/access",   icon: "⊟", abbr: "ACC" },
];

/* Shared text color tokens */
export const T = {
  body:    "rgba(185,205,200,0.68)",
  bodyDim: "rgba(185,205,200,0.52)",
  label:   "rgba(34,197,94,0.55)",
  labelDim:"rgba(34,197,94,0.4)",
  meta:    "rgba(155,175,170,0.55)",
  metaDim: "rgba(155,175,170,0.35)",
  steel:   "rgba(155,175,170,0.28)",
};

export default function AppShell({ children }: AppShellProps) {
  const [location, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full bg-background grid-overlay flex flex-col overflow-hidden">
      {/* Top bar */}
      <div
        className="relative z-20 flex items-center justify-between px-5 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-1.5 h-1.5 rounded-full status-pulse"
            style={{ background: "#22c55e", boxShadow: "0 0 5px #22c55e" }}
          />
          <span className="font-mono-tactical tracking-widest uppercase"
            style={{ color: "rgba(34,197,94,0.58)", fontSize: "9.5px", letterSpacing: "0.18em" }}>
            INDEX // ACTIVE
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-orbitron font-bold tracking-widest"
            style={{ color: "rgba(34,197,94,0.45)", fontSize: "11px", letterSpacing: "0.25em" }}>
            INDEX
          </span>
          <span className="font-mono-tactical tracking-widest"
            style={{ color: "rgba(155,175,170,0.38)", fontSize: "8px", letterSpacing: "0.2em" }}>
            DATA NETWORK
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono-tactical"
            style={{ color: "rgba(155,175,170,0.4)", fontSize: "9.5px", letterSpacing: "0.1em" }}>
            PUBLIC LAYER
          </span>
          <span className="font-mono-tactical"
            style={{ color: "rgba(155,175,170,0.28)", fontSize: "9.5px" }}>
            {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Side nav */}
        <nav
          className="flex flex-col shrink-0 py-2 gap-0 overflow-y-auto"
          style={{
            width: 54,
            borderRight: "1px solid rgba(34,197,94,0.07)",
            background: "rgba(0,0,0,0.22)",
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
                className={`group flex flex-col items-center gap-1 py-3 px-1 relative idx-nav-item ${active ? "idx-nav-active" : ""}`}
                style={{
                  background: active ? "rgba(34,197,94,0.08)" : "transparent",
                  borderLeft: active ? "2px solid rgba(34,197,94,0.7)" : "2px solid transparent",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {active && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, rgba(34,197,94,0.06), transparent)" }}
                  />
                )}
                <span
                  style={{
                    fontSize: "15px",
                    lineHeight: 1,
                    color: active ? "#22c55e" : "rgba(34,197,94,0.3)",
                    filter: active ? "drop-shadow(0 0 5px #22c55e)" : undefined,
                    transition: "color 0.15s ease, filter 0.15s ease",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-mono-tactical"
                  style={{
                    fontSize: "7px",
                    letterSpacing: "0.08em",
                    color: active ? "rgba(34,197,94,0.82)" : "rgba(155,175,170,0.35)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {item.abbr}
                </span>
              </a>
            );
          })}
        </nav>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-20 flex items-center justify-between px-5 py-1.5 shrink-0"
        style={{ borderTop: "1px solid rgba(34,197,94,0.05)" }}
      >
        <span className="font-mono-tactical tracking-widest"
          style={{ color: "rgba(155,175,170,0.28)", fontSize: "9px", letterSpacing: "0.16em" }}>
          INDEX DATA NETWORK
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.22)", fontSize: "9px" }}>
            SIGNAL LAYER ACTIVE
          </span>
          <div className="w-1 h-1 rounded-full status-pulse" style={{ background: "rgba(34,197,94,0.3)" }} />
          <span className="font-mono-tactical" style={{ color: "rgba(155,175,170,0.22)", fontSize: "9px" }}>
            PUBLIC LAYER
          </span>
        </div>
        <span className="font-mono-tactical tracking-widest"
          style={{ color: "rgba(155,175,170,0.22)", fontSize: "9px" }}>
          v1.0
        </span>
      </div>
    </div>
  );
}
