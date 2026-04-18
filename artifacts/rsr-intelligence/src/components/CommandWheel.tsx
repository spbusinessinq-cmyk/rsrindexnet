import { useState } from "react";

interface Segment {
  label: string;
  path: string;
  description: string;
}

interface CommandWheelProps {
  segments: Segment[];
  onHover: (label: string | null) => void;
  onSegmentClick: (path: string) => void;
}

const GREEN = "#22c55e";
const GREEN_GLOW = "rgba(34,197,94,0.35)";
const GREEN_DIM = "rgba(34,197,94,0.12)";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function buildSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  gap: number = 2
): string {
  const s = startAngle + gap;
  const e = endAngle - gap;
  const outerStart = polarToCartesian(cx, cy, outerR, s);
  const outerEnd = polarToCartesian(cx, cy, outerR, e);
  const innerStart = polarToCartesian(cx, cy, innerR, e);
  const innerEnd = polarToCartesian(cx, cy, innerR, s);
  const largeArc = e - s <= 180 ? "0" : "1";
  return (
    `M ${outerStart.x} ${outerStart.y} ` +
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} ` +
    `L ${innerStart.x} ${innerStart.y} ` +
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y} ` +
    `Z`
  );
}

export default function CommandWheel({ segments, onHover, onSegmentClick }: CommandWheelProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const innerR = 105;
  const outerR = 220;
  const labelR = (innerR + outerR) / 2 + 8;
  const iconR = (innerR + outerR) / 2 - 14;
  const n = segments.length;
  const angleStep = 360 / n;

  const icons: Record<string, string> = {
    SYSTEMS: "⬡",
    SIGNALS: "◈",
    TOOLS: "⬙",
    FILES: "▣",
    BRIEFS: "◉",
    NETWORK: "⬢",
  };

  const handleMouseEnter = (i: number) => {
    setHovered(i);
    onHover(segments[i].label);
  };
  const handleMouseLeave = () => {
    setHovered(null);
    onHover(null);
  };
  const handleClick = (i: number) => {
    setActive(i);
    setTimeout(() => setActive(null), 300);
    onSegmentClick(segments[i].path);
  };

  const rings = [outerR + 18, outerR + 32, outerR + 46];

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size, maxWidth: "100%", maxHeight: "100%" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hub-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.15)" />
            <stop offset="60%" stopColor="rgba(34,197,94,0.05)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.0)" />
          </radialGradient>
          <radialGradient id="seg-hover-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.18)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.06)" />
          </radialGradient>
        </defs>

        {rings.map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={GREEN}
            strokeOpacity={0.06 - i * 0.015}
            strokeWidth={1}
            strokeDasharray={i === 0 ? "4 8" : i === 1 ? "2 12" : "1 18"}
          />
        ))}

        {[outerR + 4, innerR - 4].map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={GREEN}
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}

        {segments.map((seg, i) => {
          const startAngle = i * angleStep;
          const endAngle = startAngle + angleStep;
          const isHovered = hovered === i;
          const isActive = active === i;
          const path = buildSegmentPath(cx, cy, innerR + 6, outerR - 4, startAngle, endAngle, 2.5);

          const midAngle = startAngle + angleStep / 2;
          const labelPos = polarToCartesian(cx, cy, labelR, midAngle);
          const iconPos = polarToCartesian(cx, cy, iconR, midAngle);

          return (
            <g
              key={seg.label}
              data-testid={`segment-${seg.label.toLowerCase()}`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(i)}
            >
              <path
                d={path}
                fill={isActive ? "rgba(34,197,94,0.25)" : isHovered ? "rgba(34,197,94,0.14)" : "rgba(34,197,94,0.04)"}
                stroke={isHovered || isActive ? GREEN : "rgba(34,197,94,0.25)"}
                strokeWidth={isHovered ? 1.5 : 0.75}
                filter={isHovered ? "url(#glow-green)" : undefined}
                style={{ transition: "fill 0.2s, stroke 0.2s, stroke-width 0.2s" }}
              />

              {isHovered && (
                <path
                  d={buildSegmentPath(cx, cy, innerR + 6, outerR - 4, startAngle, endAngle, 2.5)}
                  fill="none"
                  stroke={GREEN}
                  strokeWidth={2}
                  strokeOpacity={0.6}
                  filter="url(#glow-green)"
                />
              )}

              <text
                x={labelPos.x}
                y={labelPos.y + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isHovered ? "11" : "10"}
                fontFamily="'Orbitron', sans-serif"
                fontWeight={isHovered ? "600" : "500"}
                fill={isHovered ? GREEN : "rgba(34,197,94,0.7)"}
                letterSpacing="0.12em"
                filter={isHovered ? "url(#glow-green)" : undefined}
                style={{ transition: "all 0.2s", userSelect: "none", pointerEvents: "none" }}
              >
                {seg.label}
              </text>

              <text
                x={iconPos.x}
                y={iconPos.y + 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isHovered ? "18" : "15"}
                fill={isHovered ? GREEN : "rgba(34,197,94,0.5)"}
                filter={isHovered ? "url(#glow-green)" : undefined}
                style={{ transition: "all 0.2s", userSelect: "none", pointerEvents: "none" }}
              >
                {icons[seg.label] ?? "◆"}
              </text>

              <path
                d={describeArc(cx, cy, outerR + 10, startAngle + 3, endAngle - 3)}
                fill="none"
                stroke={isHovered ? GREEN : "rgba(34,197,94,0.15)"}
                strokeWidth={isHovered ? 2 : 1}
                filter={isHovered ? "url(#glow-green)" : undefined}
                style={{ transition: "all 0.2s" }}
              />
            </g>
          );
        })}

        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="url(#hub-gradient)"
          stroke={GREEN}
          strokeWidth={1.5}
          strokeOpacity={0.4}
          filter="url(#glow-green)"
        />
        <circle
          cx={cx}
          cy={cy}
          r={innerR - 12}
          fill="rgba(0,0,0,0.7)"
          stroke={GREEN}
          strokeWidth={0.75}
          strokeOpacity={0.25}
          strokeDasharray="6 6"
        />
        <circle
          cx={cx}
          cy={cy}
          r={innerR - 24}
          fill="rgba(0,0,0,0.5)"
          stroke={GREEN}
          strokeWidth={0.5}
          strokeOpacity={0.15}
        />

        <text
          x={cx}
          y={cy - 24}
          textAnchor="middle"
          fontSize="9"
          fontFamily="'Share Tech Mono', monospace"
          fill={GREEN}
          fillOpacity={0.5}
          letterSpacing="0.25em"
        >
          CORE
        </text>
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize="20"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="700"
          fill={GREEN}
          filter="url(#glow-strong)"
          letterSpacing="0.08em"
        >
          RSR
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize="7"
          fontFamily="'Share Tech Mono', monospace"
          fill={GREEN}
          fillOpacity={0.55}
          letterSpacing="0.18em"
        >
          INTELLIGENCE
        </text>
        <text
          x={cx}
          y={cy + 30}
          textAnchor="middle"
          fontSize="7"
          fontFamily="'Share Tech Mono', monospace"
          fill={GREEN}
          fillOpacity={0.55}
          letterSpacing="0.18em"
        >
          NETWORK
        </text>

        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const p1 = polarToCartesian(cx, cy, innerR - 28, angle);
          const p2 = polarToCartesian(cx, cy, innerR - 6, angle);
          return (
            <line
              key={angle}
              x1={p1.x} y1={p1.y}
              x2={p2.x} y2={p2.y}
              stroke={GREEN}
              strokeWidth={0.75}
              strokeOpacity={0.2}
            />
          );
        })}
      </svg>
    </div>
  );
}
