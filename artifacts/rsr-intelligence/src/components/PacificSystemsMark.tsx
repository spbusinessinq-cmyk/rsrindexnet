interface Props {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function PacificSystemsMark({ size = 36, className, style }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const scale = size / 40;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Crosshair guides */}
      <line x1="20" y1="1" x2="20" y2="39" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="1" y1="20" x2="39" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* Outer segmented ring */}
      <circle
        cx="20" cy="20" r="18"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.75"
        strokeDasharray="5.2 2.6"
        strokeDashoffset="1.3"
      />

      {/* Middle ring — amber */}
      <circle
        cx="20" cy="20" r="13"
        stroke="rgba(245,158,11,0.55)"
        strokeWidth="1"
      />

      {/* Inner ring */}
      <circle
        cx="20" cy="20" r="8"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.75"
      />

      {/* Center fill */}
      <circle cx="20" cy="20" r="6.5" fill="#0A0C0F" />

      {/* PS monogram */}
      <text
        x="20"
        y="23.2"
        textAnchor="middle"
        fill="#F4F6F8"
        fontFamily="'Orbitron', sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="0.5"
      >
        PS
      </text>

      {/* Primary amber node — top (INTAKE) */}
      <circle cx="20" cy="2" r="2.2" fill="#F59E0B" />
      <circle cx="20" cy="2" r="3.5" fill="rgba(245,158,11,0.15)" />

      {/* Secondary nodes — white/dim */}
      <circle cx="37.1" cy="11.3" r="1.4" fill="rgba(244,246,248,0.35)" />
      <circle cx="30.5" cy="36.2" r="1.4" fill="rgba(244,246,248,0.2)" />
      <circle cx="9.5" cy="36.2" r="1.4" fill="rgba(244,246,248,0.2)" />
      <circle cx="2.9" cy="11.3" r="1.4" fill="rgba(244,246,248,0.2)" />

      {/* Spoke from center to primary amber node */}
      <line x1="20" y1="13.5" x2="20" y2="4" stroke="rgba(245,158,11,0.3)" strokeWidth="0.6" />
    </svg>
  );
}

export function TacticalHeroDiagram() {
  const cx = 200;
  const cy = 200;
  const nodes = [
    { angle: -90,  label: "INGEST",    active: true  },
    { angle: -18,  label: "STRUCTURE", active: false },
    { angle:  54,  label: "COMMIT",    active: false },
    { angle: 126,  label: "INDEX",     active: false },
    { angle: 198,  label: "RETRIEVE",  active: false },
  ].map((n) => {
    const r1 = 165;
    const r2 = 185;
    const rad = (n.angle * Math.PI) / 180;
    return {
      ...n,
      x: cx + r1 * Math.cos(rad),
      y: cy + r1 * Math.sin(rad),
      lx: cx + r2 * Math.cos(rad),
      ly: cy + r2 * Math.sin(rad),
    };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 440, height: "auto", flexShrink: 0 }}
    >
      {/* Grid background */}
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245,158,11,0.12)" />
          <stop offset="70%" stopColor="rgba(245,158,11,0.03)" />
          <stop offset="100%" stopColor="rgba(245,158,11,0)" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245,158,11,0.18)" />
          <stop offset="100%" stopColor="rgba(245,158,11,0)" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill="url(#grid)" />

      {/* Ambient amber radial glow */}
      <circle cx={cx} cy={cy} r="170" fill="url(#amberGlow)" />

      {/* Crosshair */}
      <line x1={cx} y1="10" x2={cx} y2="390" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
      <line x1="10" y1={cy} x2="390" y2={cy} stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
      <circle cx={cx} cy={cy} r="200" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 4" />

      {/* Outer ring — segmented */}
      <circle
        cx={cx} cy={cy} r="165"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="0.75"
        strokeDasharray="8 4"
      />

      {/* Animated sweep arc on outer ring */}
      <circle
        cx={cx} cy={cy} r="165"
        stroke="rgba(245,158,11,0.45)"
        strokeWidth="1.2"
        strokeDasharray="52 990"
        className="sweep-arc-cw"
      />

      {/* Middle ring — amber */}
      <circle
        cx={cx} cy={cy} r="118"
        stroke="rgba(245,158,11,0.28)"
        strokeWidth="1"
      />

      {/* Inner structural ring */}
      <circle
        cx={cx} cy={cy} r="72"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.75"
        strokeDasharray="4 3"
      />

      {/* Spokes from middle ring to nodes */}
      {nodes.map((n) => {
        const mr = 118;
        const rad = (n.angle * Math.PI) / 180;
        return (
          <line
            key={n.label}
            x1={cx + mr * Math.cos(rad)}
            y1={cy + mr * Math.sin(rad)}
            x2={n.x}
            y2={n.y}
            stroke={n.active ? "rgba(245,158,11,0.45)" : "rgba(255,255,255,0.1)"}
            strokeWidth="0.75"
          />
        );
      })}

      {/* Center hub glow */}
      <circle cx={cx} cy={cy} r="52" fill="url(#centerGlow)" />

      {/* Center hub */}
      <circle
        cx={cx} cy={cy} r="42"
        fill="#080A0C"
        stroke="rgba(245,158,11,0.5)"
        strokeWidth="1.2"
      />
      <circle
        cx={cx} cy={cy} r="34"
        fill="#080A0C"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.5"
      />

      {/* PS monogram in center */}
      <text
        x={cx} y={cy - 3}
        textAnchor="middle"
        fill="#F4F6F8"
        fontFamily="'Orbitron', sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="1"
      >
        PS
      </text>
      <text
        x={cx} y={cy + 10}
        textAnchor="middle"
        fill="rgba(245,158,11,0.7)"
        fontFamily="'Share Tech Mono', monospace"
        fontSize="5.5"
        letterSpacing="1.5"
      >
        PACIFIC SYSTEMS
      </text>

      {/* Node markers */}
      {nodes.map((n) => (
        <g key={n.label}>
          {/* Outer halo for active node */}
          {n.active && (
            <circle cx={n.x} cy={n.y} r="9" fill="rgba(245,158,11,0.12)" />
          )}
          {/* Node dot */}
          <circle
            cx={n.x} cy={n.y}
            r={n.active ? 5 : 3.5}
            fill={n.active ? "#F59E0B" : "rgba(255,255,255,0.25)"}
          />
          {n.active && (
            <circle cx={n.x} cy={n.y} r="5" fill="rgba(245,158,11,0.35)"
              className="sensor-pulse-ring" />
          )}
        </g>
      ))}

      {/* Node labels — positioned outside the outer ring */}
      {nodes.map((n) => {
        const pad = 24;
        const rad = (n.angle * Math.PI) / 180;
        const tx = cx + (165 + pad) * Math.cos(rad);
        const ty = cy + (165 + pad) * Math.sin(rad);
        const anchor = tx < cx - 10 ? "end" : tx > cx + 10 ? "start" : "middle";
        return (
          <text
            key={n.label}
            x={tx} y={ty + 4}
            textAnchor={anchor}
            fill={n.active ? "#F59E0B" : "rgba(244,246,248,0.35)"}
            fontFamily="'Share Tech Mono', monospace"
            fontSize="9"
            letterSpacing="1.5"
            fontWeight={n.active ? "700" : "400"}
          >
            {n.label}
          </text>
        );
      })}
    </svg>
  );
}
