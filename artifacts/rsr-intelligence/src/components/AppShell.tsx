import { useState } from "react";
import { useLocation } from "wouter";
import { PacificSystemsMark } from "./PacificSystemsMark";

const C = {
  bg:              "#050607",
  bgSection:       "#090B0D",
  bgStrip:         "#080A0C",
  border:          "rgba(255,255,255,0.07)",
  borderMid:       "rgba(255,255,255,0.12)",
  borderAccent:    "rgba(245,158,11,0.28)",
  borderAccentMid: "rgba(245,158,11,0.50)",
  heading:         "#F4F6F8",
  headingDim:      "#C8CFD6",
  body:            "#B8C2CC",
  muted:           "#8D969E",
  mutedDim:        "#545E66",
  accent:          "#F59E0B",
  accentHover:     "#D97706",
  accentPale:      "#FFD38A",
};

const NAV_LINKS = [
  { label: "OVERVIEW", path: "/overview" },
  { label: "SIGNALS",  path: "/signals"  },
  { label: "DATASETS", path: "/datasets" },
  { label: "RECORDS",  path: "/records"  },
  { label: "METHOD",   path: "/method"   },
];

interface AppShellProps {
  children: React.ReactNode;
}

export const T = {
  body:    C.body,
  bodyDim: "rgba(184,194,204,0.62)",
  label:   C.accent,
  labelDim:"rgba(245,158,11,0.5)",
  meta:    C.muted,
  metaDim: C.mutedDim,
  steel:   "rgba(94,100,110,0.5)",
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
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)," +
        "linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}>

      {/* ── AMBER TOP ACCENT LINE ─────────────────────────────── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6) 40%, rgba(245,158,11,0.6) 60%, transparent)", flexShrink: 0 }} />

      {/* ── STICKY TOP NAV ─────────────────────────────────────── */}
      <header style={{
        borderBottom: `1px solid ${C.border}`,
        background: C.bgStrip,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        minHeight: 58,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}>
        {/* Brand lockup */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
            padding: 0,
          }}>
          <PacificSystemsMark size={34} />
          <div>
            <div style={{
              color: C.heading, fontSize: "13.5px", letterSpacing: "0.18em",
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700, lineHeight: 1.1,
            }}>
              PACIFIC SYSTEMS
            </div>
            <div style={{
              color: C.mutedDim, fontSize: "10px", letterSpacing: "0.14em",
              fontFamily: "'Share Tech Mono', monospace", marginTop: 3,
              textTransform: "uppercase",
            }}>
              DATA INFRASTRUCTURE // RSR INTEL
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}
          className="hidden-mobile">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <button key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: active ? C.accent : C.muted,
                  fontSize: "13px", letterSpacing: "0.16em",
                  fontFamily: "'Share Tech Mono', monospace",
                  textTransform: "uppercase",
                  padding: "4px 0",
                  borderBottom: active ? `1px solid ${C.accent}` : "1px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseOver={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = C.heading;
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
              color: C.mutedDim, fontSize: "12px", letterSpacing: "0.1em",
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
              color: C.accent, fontSize: "12px", letterSpacing: "0.14em",
              fontFamily: "'Share Tech Mono', monospace",
              padding: "7px 18px", borderRadius: 2, cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = `rgba(245,158,11,0.08)`;
              (e.currentTarget as HTMLElement).style.borderColor = C.borderAccentMid;
              (e.currentTarget as HTMLElement).style.color = C.accentPale;
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = C.borderAccent;
              (e.currentTarget as HTMLElement).style.color = C.accent;
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
            {[0,1,2].map((i) => (
              <div key={i} style={{
                width: 22, height: 1.5,
                background: (i === 1 && mobileOpen) ? "transparent" : (mobileOpen ? C.accent : C.muted),
                transition: "all 0.2s",
                transform: mobileOpen && i === 0 ? "rotate(45deg) translateY(6.5px)" :
                           mobileOpen && i === 2 ? "rotate(-45deg) translateY(-6.5px)" : "none",
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 59, left: 0, right: 0,
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
              color: C.muted, fontSize: "13px", letterSpacing: "0.16em",
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
                fontSize: "13px", letterSpacing: "0.16em",
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
              color: C.accent, fontSize: "13px", letterSpacing: "0.14em",
              fontFamily: "'Share Tech Mono', monospace",
              padding: "10px 18px", borderRadius: 2, cursor: "pointer",
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
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <PacificSystemsMark size={20} />
          <div style={{
            color: C.mutedDim, fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700, fontSize: "11px", letterSpacing: "0.16em",
          }}>
            PACIFIC SYSTEMS
          </div>
          <div style={{
            color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px", letterSpacing: "0.1em",
          }}>
            — DATA INFRASTRUCTURE DIVISION
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: C.accent, boxShadow: `0 0 5px ${C.accent}88`,
          }} />
          <span style={{
            color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px", letterSpacing: "0.08em",
          }}>
            PUBLIC LAYER ACTIVE
          </span>
        </div>
        <a href="https://www.rsrintel.com" target="_blank" rel="noopener noreferrer"
          style={{
            color: C.mutedDim, fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px", letterSpacing: "0.1em", textDecoration: "none",
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
