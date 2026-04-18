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

const G = "#22c55e";
const G_DIM = "rgba(34,197,94,0.5)";
const G_FAINT = "rgba(34,197,94,0.18)";
const G_FILL = "rgba(34,197,94,0.055)";
const G_FILL_HOV = "rgba(34,197,94,0.13)";
const G_FILL_ACT = "rgba(34,197,94,0.22)";

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r1: number, r2: number, startDeg: number, endDeg: number, gapDeg = 2.5): string {
  const s = startDeg + gapDeg;
  const e = endDeg - gapDeg;
  const large = e - s > 180 ? 1 : 0;
  const os = polar(cx, cy, r2, s);
  const oe = polar(cx, cy, r2, e);
  const ie = polar(cx, cy, r1, e);
  const is_ = polar(cx, cy, r1, s);
  return [`M ${os.x} ${os.y}`, `A ${r2} ${r2} 0 ${large} 1 ${oe.x} ${oe.y}`, `L ${ie.x} ${ie.y}`, `A ${r1} ${r1} 0 ${large} 0 ${is_.x} ${is_.y}`, "Z"].join(" ");
}

function openArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number, gapDeg = 4) {
  const s = startDeg + gapDeg;
  const e = endDeg - gapDeg;
  const large = e - s > 180 ? 1 : 0;
  const p1 = polar(cx, cy, r, s);
  const p2 = polar(cx, cy, r, e);
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
}

function SegmentIcon({ label, x, y, active }: { label: string; x: number; y: number; active: boolean }) {
  const col = active ? G : G_DIM;
  const s = 9;

  const icons: Record<string, JSX.Element> = {
    OVERVIEW: (
      <g>
        <rect x={-s * 0.82} y={-s * 0.65} width={s * 1.64} height={s * 1.3} rx="2" fill="none" stroke={col} strokeWidth="1.2" />
        <line x1={-s * 0.52} y1={-s * 0.22} x2={s * 0.52} y2={-s * 0.22} stroke={col} strokeWidth="1.1" strokeLinecap="round" />
        <line x1={-s * 0.52} y1={s * 0.08} x2={s * 0.3} y2={s * 0.08} stroke={col} strokeWidth="1" strokeLinecap="round" />
        <line x1={-s * 0.52} y1={s * 0.38} x2={s * 0.1} y2={s * 0.38} stroke={col} strokeWidth="1" strokeLinecap="round" />
      </g>
    ),
    SIGNALS: (
      <g>
        {[s * 0.32, s * 0.58, s * 0.86].map((r, i) => (
          <path
            key={i}
            d={`M ${-r * Math.cos(Math.PI / 4)} ${r * Math.sin(Math.PI / 4)} A ${r} ${r} 0 0 1 ${r * Math.cos(Math.PI / 4)} ${r * Math.sin(Math.PI / 4)}`}
            fill="none" stroke={col} strokeWidth={i === 2 ? "1.4" : "1.1"} strokeLinecap="round"
            strokeOpacity={0.5 + i * 0.2} transform="rotate(180)"
          />
        ))}
        <circle cx="0" cy={s * 0.4} r="2" fill={col} />
      </g>
    ),
    DATASETS: (
      <g>
        {[-s * 0.44, 0, s * 0.44].map((dy, i) => (
          <rect key={i} x={-s * 0.72} y={dy - s * 0.15} width={s * 1.44} height={s * 0.27} rx="1.2"
            fill="none" stroke={col} strokeWidth={i === 0 ? "1.35" : "1"} strokeOpacity={i === 0 ? 1 : 0.55} />
        ))}
      </g>
    ),
    INDEX: (
      <g>
        {[-s * 0.5, -s * 0.17, s * 0.17, s * 0.5].map((dy, i) => (
          <g key={i}>
            <circle cx={-s * 0.62} cy={dy} r="1.6" fill={col} fillOpacity={i === 0 ? 1 : 0.5} />
            <line x1={-s * 0.37} y1={dy} x2={s * 0.62} y2={dy} stroke={col} strokeWidth="0.95" strokeLinecap="round" strokeOpacity={0.55} />
          </g>
        ))}
      </g>
    ),
    METHOD: (
      <g>
        <circle cx="0" cy="0" r={s * 0.88} fill="none" stroke={col} strokeWidth="1.1" />
        <circle cx="0" cy="0" r={s * 0.52} fill="none" stroke={col} strokeWidth="1.1" />
        <circle cx="0" cy="0" r={s * 0.16} fill={col} />
        {[0, 90, 180, 270].map((a) => {
          const p1 = polar(0, 0, s * 0.52, a);
          const p2 = polar(0, 0, s * 0.88, a);
          return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={col} strokeWidth="1" strokeLinecap="round" />;
        })}
      </g>
    ),
    ACCESS: (
      <g>
        <rect x={-s * 0.56} y={-s * 0.55} width={s * 1.12} height={s * 1.1} rx="2.8" fill="none" stroke={col} strokeWidth="1.3" />
        <circle cx="0" cy={s * 0.06} r={s * 0.23} fill="none" stroke={col} strokeWidth="1.2" />
        <line x1="0" y1={s * 0.24} x2="0" y2={s * 0.52} stroke={col} strokeWidth="1.3" strokeLinecap="round" />
        <path d={`M ${-s * 0.36} ${-s * 0.16} L ${-s * 0.36} ${-s * 0.56} A ${s * 0.36} ${s * 0.36} 0 0 1 ${s * 0.36} ${-s * 0.56} L ${s * 0.36} ${-s * 0.16}`}
          fill="none" stroke={col} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ),
  };

  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: "none" }}>
      {icons[label] ?? <circle cx="0" cy="0" r="4" fill={col} />}
    </g>
  );
}

export default function CommandWheel({ segments, onHover, onSegmentClick }: CommandWheelProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);

  const SIZE = 540;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const INNER = 112;
  const OUTER = 234;
  const ICON_R = (INNER + OUTER) / 2 - 18;
  const LABEL_R = (INNER + OUTER) / 2 + 15;
  const TICK_R = OUTER + 9;
  const TRACE_R = OUTER + 22;

  const n = segments.length;
  const STEP = 360 / n;
  const OFFSET = -30;

  const enter = (i: number) => { setHovered(i); onHover(segments[i].label); };
  const leave = () => { setHovered(null); onHover(null); };
  const click = (i: number) => {
    setClicked(i);
    setTimeout(() => setClicked(null), 350);
    onSegmentClick(segments[i].path);
  };

  const activeIdx = hovered ?? clicked ?? null;
  const activeSeg = activeIdx !== null ? segments[activeIdx] : null;
  const hubActive = activeIdx !== null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none gap-2" style={{ width: SIZE, maxWidth: "100%" }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: "visible", width: "100%", height: "auto" }}>
        <defs>
          <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-hub-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="12" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rg-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.18)" />
            <stop offset="55%" stopColor="rgba(34,197,94,0.06)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0)" />
          </radialGradient>
          <radialGradient id="rg-hub-active" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.28)" />
            <stop offset="60%" stopColor="rgba(34,197,94,0.1)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0)" />
          </radialGradient>
        </defs>

        {/* Outermost ambient rings */}
        {[OUTER + 36, OUTER + 52].map((r, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={G} strokeOpacity={0.03 - i * 0.01} strokeWidth={1}
            strokeDasharray={["4 12", "2 18"][i]} />
        ))}

        {/* Spinning dashed outer ring */}
        <circle cx={cx} cy={cy} r={OUTER + 18} fill="none"
          stroke={G} strokeOpacity={hubActive ? 0.1 : 0.05} strokeWidth={0.8}
          strokeDasharray="3 8"
          className="hub-spin-slow"
          style={{ transition: "stroke-opacity 0.4s ease" }} />

        {/* Main boundary rings */}
        <circle cx={cx} cy={cy} r={OUTER + 3} fill="none" stroke={G} strokeWidth={1} strokeOpacity={hubActive ? 0.22 : 0.12}
          style={{ transition: "stroke-opacity 0.3s ease" }} />
        <circle cx={cx} cy={cy} r={INNER - 3} fill="none" stroke={G} strokeWidth={1} strokeOpacity={0.12} />

        {/* Segments */}
        {segments.map((seg, i) => {
          const startDeg = OFFSET + i * STEP;
          const endDeg = startDeg + STEP;
          const midDeg = startDeg + STEP / 2;
          const isHov = hovered === i;
          const isClk = clicked === i;
          const active = isHov || isClk;

          const segPath = arcPath(cx, cy, INNER + 5, OUTER - 4, startDeg, endDeg);
          const iconPt = polar(cx, cy, ICON_R, midDeg);
          const labelPt = polar(cx, cy, LABEL_R, midDeg);
          const tickArc = openArc(cx, cy, TICK_R, startDeg, endDeg, 4);
          const traceArc = openArc(cx, cy, TRACE_R, startDeg, endDeg, 5);

          return (
            <g key={seg.label} data-testid={`segment-${seg.label.toLowerCase()}`} style={{ cursor: "pointer" }}
              onMouseEnter={() => enter(i)} onMouseLeave={leave} onClick={() => click(i)}>
              {/* Hit area */}
              <path d={arcPath(cx, cy, INNER + 5, OUTER - 4, startDeg, endDeg, 1)} fill="transparent" />

              {/* Segment fill */}
              <path d={segPath}
                fill={isClk ? G_FILL_ACT : isHov ? G_FILL_HOV : G_FILL}
                stroke={active ? G : G_FAINT} strokeWidth={active ? 1.3 : 0.7}
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease" }} />

              {/* Outer glow on hover */}
              {active && <path d={segPath} fill="none" stroke={G} strokeWidth={3} strokeOpacity={0.18} filter="url(#f-glow-lg)" />}

              {/* Tick arc */}
              <path d={tickArc} fill="none"
                stroke={active ? G : G_FAINT}
                strokeWidth={active ? 2.5 : 1} strokeLinecap="round"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }} />

              {/* Trace arc (outer, on hover only) */}
              {active && (
                <path d={traceArc} fill="none" stroke={G} strokeWidth={2.5} strokeLinecap="round"
                  strokeOpacity={0.55} filter="url(#f-glow-lg)" />
              )}

              {/* Icon */}
              <SegmentIcon label={seg.label} x={iconPt.x} y={iconPt.y} active={active} />

              {/* Label */}
              <text x={labelPt.x} y={labelPt.y + 5} textAnchor="middle" dominantBaseline="middle"
                fontSize="9.5" fontFamily="'Orbitron', sans-serif" fontWeight={active ? "700" : "500"}
                fill={active ? G : G_DIM} letterSpacing="0.16em"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "fill 0.2s ease", userSelect: "none", pointerEvents: "none" }}>
                {seg.label}
              </text>

              {/* Active dot */}
              {active && (() => {
                const dotPt = polar(cx, cy, OUTER - 18, midDeg);
                return <circle cx={dotPt.x} cy={dotPt.y} r={3.2} fill={G} filter="url(#f-glow)" />;
              })()}
            </g>
          );
        })}

        {/* Hub background */}
        <circle cx={cx} cy={cy} r={INNER - 4}
          fill={hubActive ? "url(#rg-hub-active)" : "url(#rg-hub)"}
          stroke={G} strokeWidth={1.5}
          strokeOpacity={hubActive ? 0.45 : 0.25}
          filter={hubActive ? "url(#f-hub-glow)" : undefined}
          style={{ transition: "stroke-opacity 0.35s ease" }} />

        {/* Hub inner rings */}
        <circle cx={cx} cy={cy} r={INNER - 18} fill="rgba(0,0,0,0.85)" stroke={G} strokeWidth={0.8}
          strokeOpacity={0.14} strokeDasharray="5 5" className={hubActive ? "" : "hub-breathe"}
          style={{ transition: "stroke-opacity 0.3s ease" }} />
        <circle cx={cx} cy={cy} r={INNER - 32} fill="rgba(0,0,0,0.65)" stroke={G} strokeWidth={0.5} strokeOpacity={0.09} />
        <circle cx={cx} cy={cy} r={INNER - 46} fill="rgba(0,0,0,0.45)" stroke={G} strokeWidth={0.4} strokeOpacity={0.06} />

        {/* Hub cardinal spokes */}
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const p1 = polar(cx, cy, INNER - 46, a);
          const p2 = polar(cx, cy, INNER - 20, a);
          return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={G} strokeWidth={0.6} strokeOpacity={hubActive ? 0.25 : 0.12}
            style={{ transition: "stroke-opacity 0.35s ease" }} />;
        })}

        {/* Hub text */}
        <text x={cx} y={cy - 28} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fontFamily="'Share Tech Mono', monospace" fontWeight="400"
          fill={G} fillOpacity={hubActive ? 0.55 : 0.3} letterSpacing="0.38em"
          style={{ transition: "fill-opacity 0.3s ease" }}>DATA</text>
        <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="middle"
          fontSize="30" fontFamily="'Orbitron', sans-serif" fontWeight="800"
          fill={G} letterSpacing="0.06em"
          filter={hubActive ? "url(#f-glow-lg)" : "url(#f-glow)"}
          style={{ transition: "filter 0.3s ease" }}>INDEX</text>
        <text x={cx} y={cy + 20} textAnchor="middle" dominantBaseline="middle"
          fontSize="6" fontFamily="'Share Tech Mono', monospace"
          fill={G} fillOpacity={hubActive ? 0.55 : 0.32} letterSpacing="0.28em"
          style={{ transition: "fill-opacity 0.3s ease" }}>NETWORK</text>
      </svg>

      {/* Bottom indicator bar */}
      <div className="w-full flex items-center justify-center" style={{ height: 52, minHeight: 52 }}>
        {activeSeg ? (
          <div
            key={activeSeg.label}
            className="panel-fade-in flex items-center gap-3 rounded px-5 py-2.5"
            style={{
              border: "1px solid rgba(34,197,94,0.25)",
              background: "rgba(34,197,94,0.05)",
              boxShadow: "0 0 16px rgba(34,197,94,0.08)",
              maxWidth: 400,
              width: "100%",
            }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: G, boxShadow: `0 0 6px ${G}` }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-0.5">
                <span className="font-orbitron text-xs font-bold tracking-widest" style={{ color: G }}>
                  {activeSeg.label}
                </span>
                <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.35)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  {activeSeg.path}
                </span>
              </div>
              <span className="font-mono-tactical text-xs truncate block" style={{ color: "rgba(34,197,94,0.48)", fontSize: "10px" }}>
                {activeSeg.description}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-px h-3" style={{ background: "rgba(34,197,94,0.15)" }} />
            <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.18)", fontSize: "10px" }}>
              HOVER TO INSPECT — CLICK TO ENTER
            </span>
            <div className="w-px h-3" style={{ background: "rgba(34,197,94,0.15)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
