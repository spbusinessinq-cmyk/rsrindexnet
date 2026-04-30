/**
 * PacificDataCore — tactical SVG hero diagram for Pacific Systems.
 * All-vector, no raster assets. viewBox 500×440, center (250,220).
 */

const CX = 250;
const CY = 220;

/* Radii */
const R_OUTER  = 180; /* segmented outer ring           */
const R_NODE   = 150; /* orbit where nodes live         */
const R_MID    = 112; /* middle amber ring              */
const R_INNER  =  70; /* inner dashed ring              */
const R_HUB_O  =  46; /* hub outer stroke circle        */
const R_HUB_I  =  37; /* hub inner dashed circle        */
const LABEL_R  = R_NODE + 24; /* label orbit               */

const NODES = [
  { angle: -90,  label: "INTAKE",    active: true  },
  { angle: -18,  label: "STRUCTURE", active: false },
  { angle:  54,  label: "COMMIT",    active: false },
  { angle: 126,  label: "INDEX",     active: false },
  { angle: 198,  label: "RETRIEVE",  active: false },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function pt(r: number, deg: number) {
  const a = toRad(deg);
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function labelAnchor(angle: number): "start" | "middle" | "end" {
  const x = Math.cos(toRad(angle));
  if (x > 0.15) return "start";
  if (x < -0.15) return "end";
  return "middle";
}

export default function PacificDataCore() {
  const nodes = NODES.map((n) => ({
    ...n,
    node:  pt(R_NODE,  n.angle),
    spoke: pt(R_MID,   n.angle),
    lp:    pt(LABEL_R, n.angle),
  }));

  /* secondary mini orbit dots (staggered 36° from main nodes) */
  const innerOrbit = NODES.map((n) => pt(R_INNER, n.angle + 36));

  /* axis-tick positions on outer ring */
  const axisTicks = [0, 90, 180, 270].map((a) => ({
    inner: pt(R_OUTER - 6, a),
    outer: pt(R_OUTER + 7, a),
  }));

  return (
    <div style={{ width: "100%", maxWidth: 460, flexShrink: 0, alignSelf: "center" }}>
      <svg
        viewBox="0 0 500 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Pacific Systems Data Core orbital diagram"
      >
        <defs>
          <pattern id="pdc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.028)" strokeWidth="0.5" />
          </pattern>
          <pattern id="pdc-fine" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.012)" strokeWidth="0.3" />
          </pattern>
          <radialGradient id="pdc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(245,158,11,0.15)" />
            <stop offset="55%"  stopColor="rgba(245,158,11,0.04)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)"    />
          </radialGradient>
          <radialGradient id="pdc-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(245,158,11,0.25)" />
            <stop offset="65%"  stopColor="rgba(245,158,11,0.07)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)"    />
          </radialGradient>
        </defs>

        {/* ── Background ── */}
        <rect width="500" height="440" fill="#060708" />
        <rect width="500" height="440" fill="url(#pdc-fine)" />
        <rect width="500" height="440" fill="url(#pdc-grid)" />

        {/* ── Ambient glow behind diagram ── */}
        <ellipse cx={CX} cy={CY} rx="195" ry="185" fill="url(#pdc-glow)" />

        {/* ── Crosshairs ── */}
        <line x1={CX} y1="0"   x2={CX} y2="440" stroke="rgba(255,255,255,0.032)" strokeWidth="0.6" />
        <line x1="0"  y1={CY}  x2="500" y2={CY}  stroke="rgba(255,255,255,0.032)" strokeWidth="0.6" />

        {/* ── Outermost ghost ring ── */}
        <circle cx={CX} cy={CY} r="193"
          stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" strokeDasharray="2 7" />

        {/* ── Segmented outer ring ── */}
        <circle cx={CX} cy={CY} r={R_OUTER}
          stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" strokeDasharray="10 5" strokeDashoffset="2.5" />

        {/* Axis ticks at 0/90/180/270 on outer ring */}
        {axisTicks.map((t, i) => (
          <line key={i}
            x1={t.inner.x} y1={t.inner.y}
            x2={t.outer.x} y2={t.outer.y}
            stroke="rgba(245,158,11,0.60)" strokeWidth="1.3" />
        ))}

        {/* ── Amber sweep arc — primary ── */}
        <circle cx={CX} cy={CY} r={R_OUTER}
          stroke="rgba(245,158,11,0.58)" strokeWidth="1.6"
          strokeDasharray="62 1069" strokeLinecap="butt"
          className="sweep-arc-cw" />

        {/* ── Counter-sweep ghost ── */}
        <circle cx={CX} cy={CY} r={R_OUTER}
          stroke="rgba(245,158,11,0.18)" strokeWidth="0.8"
          strokeDasharray="30 1101"
          className="sweep-arc-ccw" />

        {/* ── Node orbit ring (faint) ── */}
        <circle cx={CX} cy={CY} r={R_NODE}
          stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

        {/* ── Spokes: mid-ring → node ── */}
        {nodes.map((n) => (
          <line key={n.label + "-outer-spoke"}
            x1={n.spoke.x} y1={n.spoke.y}
            x2={n.node.x}  y2={n.node.y}
            stroke={n.active ? "rgba(245,158,11,0.40)" : "rgba(255,255,255,0.07)"}
            strokeWidth={n.active ? 0.9 : 0.55}
            strokeDasharray={n.active ? undefined : "3 3"} />
        ))}

        {/* ── Middle amber orbital ring ── */}
        <circle cx={CX} cy={CY} r={R_MID}
          stroke="rgba(245,158,11,0.30)" strokeWidth="1.0" />

        {/* Slow CW sweep on middle ring */}
        <circle cx={CX} cy={CY} r={R_MID}
          stroke="rgba(245,158,11,0.55)" strokeWidth="1.3"
          strokeDasharray="28 676"
          className="sweep-arc-cw-2" />

        {/* ── Inner spokes: hub → mid-ring ── */}
        {nodes.map((n) => {
          const hubEdge = pt(R_HUB_O, n.angle);
          return (
            <line key={n.label + "-inner-spoke"}
              x1={hubEdge.x} y1={hubEdge.y}
              x2={n.spoke.x} y2={n.spoke.y}
              stroke={n.active ? "rgba(245,158,11,0.22)" : "rgba(255,255,255,0.055)"}
              strokeWidth="0.55" />
          );
        })}

        {/* ── Inner dashed structural ring ── */}
        <circle cx={CX} cy={CY} r={R_INNER}
          stroke="rgba(255,255,255,0.08)" strokeWidth="0.55" strokeDasharray="4 3" />

        {/* Inner mini nodes */}
        {innerOrbit.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="rgba(255,255,255,0.16)" />
        ))}

        {/* ── Center hub ── */}
        <circle cx={CX} cy={CY} r="56" fill="url(#pdc-hub)" />
        <circle cx={CX} cy={CY} r={R_HUB_O}
          fill="#050709"
          stroke="rgba(245,158,11,0.65)" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={R_HUB_I}
          fill="#050709"
          stroke="rgba(255,255,255,0.09)" strokeWidth="0.55" strokeDasharray="3 2" />

        {/* Rotating arc on hub */}
        <circle cx={CX} cy={CY} r={R_HUB_I}
          stroke="rgba(245,158,11,0.42)" strokeWidth="0.9"
          strokeDasharray="9 28"
          className="sweep-arc-cw" />

        {/* PS monogram */}
        <text x={CX} y={CY - 4}
          textAnchor="middle"
          fill="#F4F6F8"
          fontFamily="'Orbitron', sans-serif"
          fontSize="19" fontWeight="800" letterSpacing="1.5">
          PS
        </text>
        <text x={CX} y={CY + 13}
          textAnchor="middle"
          fill="rgba(245,158,11,0.62)"
          fontFamily="'Share Tech Mono', monospace"
          fontSize="5.2" letterSpacing="2.2">
          DATA CORE
        </text>

        {/* ── Node markers ── */}
        {nodes.map((n) => (
          <g key={n.label + "-mark"}>
            <circle cx={n.node.x} cy={n.node.y} r="12"
              fill={n.active ? "rgba(245,158,11,0.09)" : "rgba(255,255,255,0.025)"} />
            <circle cx={n.node.x} cy={n.node.y}
              r={n.active ? 6.5 : 5}
              fill="none"
              stroke={n.active ? "rgba(245,158,11,0.55)" : "rgba(255,255,255,0.17)"}
              strokeWidth="0.8" />
            <circle cx={n.node.x} cy={n.node.y}
              r={n.active ? 4.5 : 3}
              fill={n.active ? "#F59E0B" : "rgba(255,255,255,0.20)"} />
            {n.active && (
              <circle cx={n.node.x} cy={n.node.y} r="5"
                fill="rgba(245,158,11,0.38)"
                className="sensor-pulse-ring" />
            )}
          </g>
        ))}

        {/* ── Node labels ── */}
        {nodes.map((n) => {
          const anc = labelAnchor(n.angle);
          /* Vertical nudge to clear ring intersections */
          let dy = 4;
          if (n.angle === -90) dy = -9;
          if (n.angle === 54 || n.angle === 126) dy = 16;

          return (
            <text key={n.label + "-lbl"}
              x={n.lp.x} y={n.lp.y + dy}
              textAnchor={anc}
              fill={n.active ? "#F59E0B" : "rgba(244,246,248,0.36)"}
              fontFamily="'Share Tech Mono', monospace"
              fontSize="9" letterSpacing="1.6"
              fontWeight={n.active ? "700" : "400"}>
              {n.label}
            </text>
          );
        })}

        {/* ── Telemetry strip ── */}
        <rect x="0" y="410" width="500" height="30" fill="rgba(0,0,0,0.60)" />
        <line x1="0" y1="410" x2="500" y2="410"
          stroke="rgba(245,158,11,0.20)" strokeWidth="0.6" />
        <text x={CX} y="428"
          textAnchor="middle"
          fill="rgba(245,158,11,0.42)"
          fontFamily="'Share Tech Mono', monospace"
          fontSize="7" letterSpacing="2.5">
          DATA INFRASTRUCTURE · SIGNAL ROUTING · RECORD LAYER
        </text>

        {/* ── Corner brackets ── */}
        <path d="M 18 30 L 18 18 L 30 18" stroke="rgba(245,158,11,0.28)" strokeWidth="0.9" fill="none" />
        <path d="M 482 30 L 482 18 L 470 18" stroke="rgba(245,158,11,0.28)" strokeWidth="0.9" fill="none" />
        <path d="M 18 395 L 18 408" stroke="rgba(245,158,11,0.28)" strokeWidth="0.9" fill="none" />
        <path d="M 482 395 L 482 408" stroke="rgba(245,158,11,0.28)" strokeWidth="0.9" fill="none" />

        {/* ID tag */}
        <text x="488" y="14"
          textAnchor="end"
          fill="rgba(255,255,255,0.16)"
          fontFamily="'Share Tech Mono', monospace"
          fontSize="6.5" letterSpacing="1">
          PS // 05-AMBER
        </text>

        {/* System tag bottom-left */}
        <text x="12" y="406"
          textAnchor="start"
          fill="rgba(255,255,255,0.14)"
          fontFamily="'Share Tech Mono', monospace"
          fontSize="6" letterSpacing="1">
          SYS:PACIFIC-DATA
        </text>
      </svg>
    </div>
  );
}
