import { useState, useRef, useCallback } from "react";

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

/* ── Palette ─────────────────────────────────────────────────── */
const G        = "#22c55e";
const G_DIM    = "rgba(34,197,94,0.58)";   /* brighter passive icons */
const G_FAINT  = "rgba(34,197,94,0.12)";
const G_FILL_H = "rgba(18,40,26,0.88)";
const G_FILL_A = "rgba(22,50,32,0.92)";
const SEG_FILL = "rgba(7,11,9,0.78)";

/* Steel tones for structural elements */
const ST       = "rgba(155,175,168,0.09)";
const ST_DIM   = "rgba(155,175,168,0.05)";

/* ── Geometry helpers ─────────────────────────────────────────── */
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r1: number, r2: number, s: number, e: number, gap = 2.5) {
  const sa = s + gap, ea = e - gap;
  const large = ea - sa > 180 ? 1 : 0;
  const o1 = polar(cx, cy, r2, sa), o2 = polar(cx, cy, r2, ea);
  const i2 = polar(cx, cy, r1, ea), i1 = polar(cx, cy, r1, sa);
  return [`M ${o1.x} ${o1.y}`, `A ${r2} ${r2} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i2.x} ${i2.y}`, `A ${r1} ${r1} 0 ${large} 0 ${i1.x} ${i1.y}`, "Z"].join(" ");
}

function openArc(cx: number, cy: number, r: number, s: number, e: number, gap = 4) {
  const sa = s + gap, ea = e - gap;
  const large = ea - sa > 180 ? 1 : 0;
  const p1 = polar(cx, cy, r, sa), p2 = polar(cx, cy, r, ea);
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
}

/* ── Icon system — consistent line weight, same family ─────────── */
function WheelIcon({ label, active }: { label: string; active: boolean }) {
  const c = active ? G : G_DIM;
  const w = 1.25;
  const r = "round" as const;

  switch (label) {
    case "OVERVIEW":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <rect x={-8} y={-9} width={16} height={17} rx="1.5" />
          <line x1={-5} y1={-4} x2={5} y2={-4} />
          <line x1={-5} y1={0} x2={3} y2={0} />
          <line x1={-5} y1={4} x2={1} y2={4} />
        </g>
      );
    case "SIGNALS": {
      /* Three upward-opening arcs (radio-wave / signal style)
         Circle center anchor at (0, 5), sweep=1 in SVG y-down = clockwise = arc goes UP */
      const anchor = 5;
      const sq2 = Math.SQRT2 / 2;
      const radii = [3.5, 6.2, 9.2];
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          {radii.map((ar, i) => {
            const x1 = -ar * sq2, y1 = anchor - ar * sq2;
            const x2 =  ar * sq2, y2 = anchor - ar * sq2;
            return (
              <path key={i}
                d={`M ${x1} ${y1} A ${ar} ${ar} 0 0 1 ${x2} ${y2}`}
                strokeOpacity={0.42 + i * 0.25} />
            );
          })}
          <circle cx={0} cy={anchor + 1.5} r={1.4} fill={c} stroke="none" />
        </g>
      );
    }
    case "DATASETS":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <rect x={-7.5} y={-8.5} width={15} height={4.5} rx="1" />
          <rect x={-7.5} y={-2.5} width={15} height={4.5} rx="1" />
          <rect x={-7.5} y={3.5}  width={15} height={4.5} rx="1" />
        </g>
      );
    case "INDEX":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <circle cx={-6} cy={-6} r={1.4} fill={c} stroke="none" />
          <line x1={-3.2} y1={-6} x2={6.5} y2={-6} />
          <circle cx={-6} cy={-1} r={1.4} fill={c} stroke="none" />
          <line x1={-3.2} y1={-1} x2={4.5} y2={-1} />
          <circle cx={-6} cy={4} r={1.4} fill={c} stroke="none" />
          <line x1={-3.2} y1={4} x2={5.5} y2={4} />
          <circle cx={-6} cy={9} r={1.4} fill={c} stroke="none" />
          <line x1={-3.2} y1={9} x2={2.5} y2={9} />
        </g>
      );
    case "METHOD":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <circle cx={0} cy={0} r={9} />
          <circle cx={0} cy={0} r={4.5} />
          <circle cx={0} cy={0} r={1.5} fill={c} stroke="none" />
          {[0, 90, 180, 270].map(a => {
            const rad = (a - 90) * Math.PI / 180;
            const x1 = 4.5 * Math.cos(rad), y1 = 4.5 * Math.sin(rad);
            const x2 = 9 * Math.cos(rad),   y2 = 9 * Math.sin(rad);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      );
    case "ACCESS":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r} strokeLinejoin="round">
          <rect x={-6} y={-1.5} width={12} height={10.5} rx="1.8" />
          <path d={`M -4 -1.5 L -4 -5 A 4 4 0 0 1 4 -5 L 4 -1.5`} />
          <circle cx={0} cy={4.5} r={1.8} />
          <line x1={0} y1={6.3} x2={0} y2={8} />
        </g>
      );
    default:
      return <circle cx={0} cy={0} r={5} fill="none" stroke={c} strokeWidth={w} />;
  }
}

/* ── Main component ────────────────────────────────────────────── */
export default function CommandWheel({ segments, onHover, onSegmentClick }: CommandWheelProps) {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [clicked, setClicked]   = useState<number | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const dy = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    setParallax({ x: dx * 7, y: dy * 7 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const SIZE  = 540;
  const cx    = SIZE / 2;
  const cy    = SIZE / 2;
  const INNER = 108;
  const OUTER = 228;
  const ICON_R  = (INNER + OUTER) / 2 - 20;
  const LABEL_R = (INNER + OUTER) / 2 + 16;
  const TICK_R  = OUTER + 10;
  const TRACE_R = OUTER + 26;

  const n    = segments.length;
  const STEP = 360 / n;
  const OFF  = -30;

  /* Sweep arc circumferences */
  const C_TRACE = 2 * Math.PI * (TRACE_R); // ~1617
  const C_OUTER = 2 * Math.PI * (OUTER + 52); // ~1757

  const enter = (i: number) => { setHovered(i); onHover(segments[i].label); };
  const leave = () => { setHovered(null); onHover(null); };
  const click = (i: number) => {
    setClicked(i);
    setTimeout(() => setClicked(null), 340);
    onSegmentClick(segments[i].path);
  };

  const activeIdx = hovered ?? clicked ?? null;
  const activeSeg = activeIdx !== null ? segments[activeIdx] : null;
  const hubActive = activeIdx !== null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none gap-1.5" style={{ width: SIZE, maxWidth: "100%" }}>
      <svg
        ref={svgRef}
        width={SIZE} height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ overflow: "visible", width: "100%", height: "auto" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { handleMouseLeave(); leave(); }}
      >
        <defs>
          <filter id="f-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-glow-md" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-hub" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="14" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rg-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(0,12,6,0.85)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="rg-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(34,197,94,0.12)" />
            <stop offset="50%"  stopColor="rgba(34,197,94,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="rg-hub-act" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(34,197,94,0.22)" />
            <stop offset="55%"  stopColor="rgba(34,197,94,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="rg-seg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(34,197,94,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Atmospheric vignette behind wheel */}
        <circle cx={cx} cy={cy} r={OUTER + 80} fill="url(#rg-bg)" />

        {/* ── OUTER ATMOSPHERIC RINGS — steel tones ──────────── */}
        {/* Sensor pulse rings */}
        <circle cx={cx} cy={cy} r={OUTER + 40} fill="none"
          stroke={ST} strokeWidth={1} className="sensor-pulse-ring" />
        <circle cx={cx} cy={cy} r={OUTER + 40} fill="none"
          stroke={ST} strokeWidth={1} className="sensor-pulse-ring-delay" />

        {/* Ambient far rings — steel, not green */}
        <circle cx={cx} cy={cy} r={OUTER + 64} fill="none" stroke={ST_DIM} strokeWidth={0.7} />
        <circle cx={cx} cy={cy} r={OUTER + 80} fill="none" stroke={ST_DIM} strokeWidth={0.5}
          strokeDasharray="3 14" />

        {/* Counter-rotating dotted rings */}
        <circle cx={cx} cy={cy} r={OUTER + 36} fill="none"
          stroke={ST} strokeWidth={0.7}
          strokeDasharray="2 10"
          className="hub-spin-slow" />
        <circle cx={cx} cy={cy} r={OUTER + 48} fill="none"
          stroke={ST_DIM} strokeWidth={0.6}
          strokeDasharray="1.5 14"
          className="ring-spin-ccw" />

        {/* Sweep arcs — moving highlights on outer ring layer */}
        <circle cx={cx} cy={cy} r={TRACE_R} fill="none"
          stroke={G} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={0.18}
          strokeDasharray={`28 ${C_TRACE - 28}`}
          className="sweep-arc-cw" />
        <circle cx={cx} cy={cy} r={OUTER + 52} fill="none"
          stroke="rgba(155,175,168,0.12)" strokeWidth={1.5} strokeLinecap="round"
          strokeDasharray={`18 ${C_OUTER - 18}`}
          className="sweep-arc-ccw" />
        <circle cx={cx} cy={cy} r={TRACE_R - 4} fill="none"
          stroke={G} strokeWidth={1.5} strokeLinecap="round" strokeOpacity={0.10}
          strokeDasharray={`12 ${C_TRACE - 12}`}
          className="sweep-arc-cw-2" />

        {/* ── MAIN SEGMENT RING ─────────────────────────────── */}
        {/* Outer boundary — green only on active */}
        <circle cx={cx} cy={cy} r={OUTER + 4} fill="none"
          stroke={hubActive ? "rgba(34,197,94,0.18)" : ST}
          strokeWidth={1}
          style={{ transition: "stroke 0.4s ease" }} />

        {/* Segments */}
        {segments.map((seg, i) => {
          const startDeg = OFF + i * STEP;
          const endDeg   = startDeg + STEP;
          const midDeg   = startDeg + STEP / 2;
          const isHov    = hovered === i;
          const isClk    = clicked === i;
          const active   = isHov || isClk;

          const path   = arcPath(cx, cy, INNER + 4, OUTER - 3, startDeg, endDeg);
          const hitPth = arcPath(cx, cy, INNER + 4, OUTER - 3, startDeg, endDeg, 0.5);
          const iconPt = polar(cx, cy, ICON_R, midDeg);
          const lblPt  = polar(cx, cy, LABEL_R, midDeg);
          const tickArc = openArc(cx, cy, TICK_R, startDeg, endDeg, 4);
          const traceArc = openArc(cx, cy, TRACE_R, startDeg, endDeg, 5);

          return (
            <g key={seg.label}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => enter(i)}
              onMouseLeave={leave}
              onClick={() => click(i)}
            >
              {/* Transparent wider hit area */}
              <path d={hitPth} fill="transparent" />

              {/* Segment body — dark glass */}
              <path d={path}
                fill={isClk ? G_FILL_A : isHov ? G_FILL_H : SEG_FILL}
                stroke={active ? G_FAINT : "rgba(100,120,115,0.09)"}
                strokeWidth={active ? 1 : 0.7}
                style={{ transition: "fill 0.18s ease, stroke 0.18s ease" }} />

              {/* Active glow overlay */}
              {active && (
                <path d={path} fill="none"
                  stroke={G} strokeWidth={1.4}
                  strokeOpacity={0.35}
                  filter="url(#f-glow)" />
              )}
              {active && (
                <path d={path} fill="none"
                  stroke={G} strokeWidth={4}
                  strokeOpacity={0.08}
                  filter="url(#f-glow-lg)" />
              )}

              {/* Tick arc — steel at rest, green on active */}
              <path d={tickArc} fill="none"
                stroke={active ? G : "rgba(140,162,158,0.18)"}
                strokeWidth={active ? 2.2 : 1}
                strokeLinecap="round"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }} />

              {/* Trace arc — appears on hover only */}
              {active && (
                <path d={traceArc} fill="none"
                  stroke={G} strokeWidth={2.8} strokeLinecap="round"
                  strokeOpacity={0.55}
                  filter="url(#f-glow-md)" />
              )}

              {/* Icon */}
              <g transform={`translate(${iconPt.x},${iconPt.y})`} style={{ pointerEvents: "none" }}>
                <WheelIcon label={seg.label} active={active} />
              </g>

              {/* Label */}
              <text
                x={lblPt.x} y={lblPt.y + 4.5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontFamily="'Orbitron', sans-serif"
                fontWeight={active ? "700" : "500"}
                fill={active ? G : "rgba(175,195,190,0.65)"}
                letterSpacing="0.18em"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "fill 0.2s ease", pointerEvents: "none", userSelect: "none" }}
              >
                {seg.label}
              </text>

              {/* Active inner dot */}
              {active && (() => {
                const dp = polar(cx, cy, OUTER - 20, midDeg);
                return (
                  <circle cx={dp.x} cy={dp.y} r={3}
                    fill={G} filter="url(#f-glow)" />
                );
              })()}
            </g>
          );
        })}

        {/* ── HUB — parallax group ────────────────────────── */}
        <g style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {/* Hub outer fill */}
          <circle cx={cx} cy={cy} r={INNER - 3}
            fill={hubActive ? "url(#rg-hub-act)" : "url(#rg-hub)"}
            filter={hubActive ? "url(#f-hub)" : undefined}
            style={{ transition: "filter 0.4s ease" }} />

          {/* Hub boundary ring */}
          <circle cx={cx} cy={cy} r={INNER - 3}
            fill="none"
            stroke={G}
            strokeWidth={1.4}
            strokeOpacity={hubActive ? 0.5 : 0.2}
            filter={hubActive ? "url(#f-glow-md)" : undefined}
            style={{ transition: "stroke-opacity 0.4s ease" }} />

          {/* Hub inner rings — steel / charcoal tones */}
          <circle cx={cx} cy={cy} r={INNER - 16}
            fill="rgba(0,0,0,0.82)"
            stroke={ST} strokeWidth={0.8}
            className="hub-breathe" />
          <circle cx={cx} cy={cy} r={INNER - 30}
            fill="rgba(0,0,0,0.7)"
            stroke={ST_DIM} strokeWidth={0.6} />
          <circle cx={cx} cy={cy} r={INNER - 44}
            fill="rgba(0,0,0,0.55)"
            stroke={ST_DIM} strokeWidth={0.4}
            strokeDasharray="3 6" />

          {/* Hub cardinal tick marks */}
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const p1 = polar(cx, cy, INNER - 44, a);
            const p2 = polar(cx, cy, INNER - 24, a);
            return (
              <line key={a}
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={hubActive ? "rgba(34,197,94,0.22)" : ST_DIM}
                strokeWidth={0.7}
                style={{ transition: "stroke 0.4s ease" }} />
            );
          })}

          {/* Hub text */}
          <text x={cx} y={cy - 27}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="6" fontFamily="'Share Tech Mono', monospace"
            fill={G} fillOpacity={hubActive ? 0.55 : 0.32}
            letterSpacing="0.36em"
            style={{ transition: "fill-opacity 0.35s ease" }}>
            RSR
          </text>

          <text x={cx} y={cy - 3}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="28" fontFamily="'Orbitron', sans-serif" fontWeight="800"
            fill={G} letterSpacing="0.05em"
            filter={hubActive ? "url(#f-glow-lg)" : "url(#f-glow)"}
            style={{ transition: "filter 0.35s ease" }}>
            INDEX
          </text>

          <text x={cx} y={cy + 19}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="'Share Tech Mono', monospace"
            fill={G} fillOpacity={hubActive ? 0.55 : 0.32}
            letterSpacing="0.3em"
            style={{ transition: "fill-opacity 0.35s ease" }}>
            DATA·NETWORK
          </text>

          {/* Hub center glow dot */}
          <circle cx={cx} cy={cy} r={2.5}
            fill="none" stroke={G}
            strokeWidth={0.8}
            strokeOpacity={hubActive ? 0.5 : 0.18}
            style={{ transition: "stroke-opacity 0.35s ease" }} />
        </g>

        {/* Inner boundary ring — fixed (not parallax'd) */}
        <circle cx={cx} cy={cy} r={INNER + 1}
          fill="none" stroke={ST} strokeWidth={0.6} />
      </svg>

      {/* ── Bottom indicator bar ─────────────────────────── */}
      <div style={{ width: "100%", height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {activeSeg ? (
          <div key={activeSeg.label} className="panel-fade-in flex items-center gap-3 rounded px-5 py-2.5"
            style={{
              border: "1px solid rgba(34,197,94,0.2)",
              background: "rgba(10,18,13,0.9)",
              boxShadow: "0 0 20px rgba(0,0,0,0.6), 0 0 12px rgba(34,197,94,0.06)",
              maxWidth: 440, width: "100%",
            }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: G, boxShadow: `0 0 6px ${G}` }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-0.5">
                <span className="font-orbitron font-bold tracking-widest" style={{ color: G, fontSize: "10px" }}>
                  {activeSeg.label}
                </span>
                <span className="font-mono-tactical" style={{ color: "rgba(34,197,94,0.28)", fontSize: "9px", letterSpacing: "0.06em" }}>
                  {activeSeg.path}
                </span>
              </div>
              <span className="font-mono-tactical truncate block" style={{ color: "rgba(155,175,168,0.4)", fontSize: "9.5px" }}>
                {activeSeg.description}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-px h-3" style={{ background: "rgba(155,175,168,0.1)" }} />
            <span className="font-mono-tactical tracking-widest"
              style={{ color: "rgba(155,175,168,0.22)", fontSize: "9px", letterSpacing: "0.16em" }}>
              SELECT A SECTOR
            </span>
            <div className="w-px h-3" style={{ background: "rgba(155,175,168,0.1)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
