import { useState } from "react";
import { useLocation } from "wouter";

const C = {
  bg:             "#121922",
  bgSection:      "#0F1720",
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
};

const NAV_LINKS = [
  { label: "OVERVIEW", path: "/overview" },
  { label: "SIGNALS",  path: "/signals"  },
  { label: "DATASETS", path: "/datasets" },
  { label: "INDEX",    path: "/records"  },
  { label: "METHOD",   path: "/method"   },
];

interface AppShellProps {
  children: React.ReactNode;
}

export const T = {
  body:    C.body,
  bodyDim: "rgba(180,192,202,0.62)",
  label:   C.accent,
  labelDim:"rgba(127,174,158,0.5)",
  meta:    C.muted,
  metaDim: C.mutedDim,
  steel:   "rgba(94,110,122,0.5)",
};

export default function AppShell({ children }: AppShellProps) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (path: string) => {
    setLocation(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) =>
    path === "/" ? location === "/" : location.startsWith(path);

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

      {/* ── STICKY TOP NAV ─────────────────────────────────────── */}
      <header style={{
        borderBottom: `1px solid ${C.border}`,
        background: C.bgStrip,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        minHeight: 56,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}>
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
            padding: 0,
          }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: C.accent,
            boxShadow: `0 0 6px ${C.accent}88`,
          }} />
          <div>
            <div style={{
              color: C.body, fontSize: "12.5px", letterSpacing: "0.16em",
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700, lineHeight: 1,
            }}>
              PACIFIC SYSTEMS
            </div>
            <div style={{
              color: C.mutedDim, fontSize: "8.5px", letterSpacing: "0.12em",
              fontFamily: "'Share Tech Mono', monospace", marginTop: 4,
            }}>
              RSR INTELLIGENCE NETWORK
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}
          className="hidden-mobile">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <button key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: active ? C.accent : C.muted,
                  fontSize: "10.5px", letterSpacing: "0.16em",
                  fontFamily: "'Share Tech Mono', monospace",
                  textTransform: "uppercase",
                  padding: "4px 0",
                  borderBottom: active ? `1px solid ${C.accent}` : "1px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseOver={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = C.body;
                }}
                onMouseOut={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = C.muted;
                }}>
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: external link + ACCESS + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
            style={{
              color: C.mutedDim, fontSize: "10px", letterSpacing: "0.1em",
              textDecoration: "none", fontFamily: "'Share Tech Mono', monospace",
              transition: "color 0.15s",
            }}
            className="hidden-mobile"
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.mutedDim; }}>
            RSR INTEL ↗
          </a>
          <button onClick={() => navigate("/access")}
            className="hidden-mobile"
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

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "none", flexDirection: "column", gap: 5,
              padding: "4px 0",
            }}
            className="show-mobile"
            aria-label="Menu">
            <div style={{
              width: 22, height: 1.5,
              background: mobileOpen ? C.accent : C.muted,
              transition: "all 0.2s",
              transform: mobileOpen ? "rotate(45deg) translateY(6px)" : "none",
            }} />
            <div style={{
              width: 22, height: 1.5, background: C.muted,
              opacity: mobileOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }} />
            <div style={{
              width: 22, height: 1.5,
              background: mobileOpen ? C.accent : C.muted,
              transition: "all 0.2s",
              transform: mobileOpen ? "rotate(-45deg) translateY(-6px)" : "none",
            }} />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 56, left: 0, right: 0,
          background: C.bgStrip,
          borderBottom: `1px solid ${C.border}`,
          zIndex: 28,
          padding: "1.5rem 2.5rem",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              color: C.muted, fontSize: "11px", letterSpacing: "0.16em",
              fontFamily: "'Share Tech Mono', monospace", padding: "10px 0",
              borderBottom: `1px solid ${C.border}`,
            }}>
            HOME
          </button>
          {NAV_LINKS.map((link) => (
            <button key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
                color: isActive(link.path) ? C.accent : C.muted,
                fontSize: "11px", letterSpacing: "0.16em",
                fontFamily: "'Share Tech Mono', monospace", padding: "10px 0",
                borderBottom: `1px solid ${C.border}`,
              }}>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate("/access")}
            style={{
              marginTop: 8,
              background: "transparent",
              border: `1px solid ${C.borderAccent}`,
              color: C.accent, fontSize: "10.5px", letterSpacing: "0.14em",
              fontFamily: "'Share Tech Mono', monospace",
              padding: "10px 18px", borderRadius: 3, cursor: "pointer",
              textAlign: "center",
            }}>
            ACCESS
          </button>
        </div>
      )}

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>

      {/* ── FOOTER STRIP ────────────────────────────────────────── */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        background: C.bgStrip,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.875rem 2.5rem", flexWrap: "wrap", gap: 12,
        flexShrink: 0,
      }}>
        <div style={{
          color: C.mutedDim, fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700, fontSize: "10px", letterSpacing: "0.16em",
        }}>
          PACIFIC SYSTEMS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: C.accent, boxShadow: `0 0 4px ${C.accent}66`,
          }} />
          <span style={{
            color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px", letterSpacing: "0.08em",
          }}>
            PUBLIC LAYER ACTIVE
          </span>
        </div>
        <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
          style={{
            color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px", letterSpacing: "0.1em", textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.mutedDim; }}>
          RSR INTEL ↗
        </a>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
