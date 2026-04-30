import { useState, useRef, useCallback, useEffect } from "react";

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

/* ── Amber palette ───────────────────────────────────────────── */
const A        = "#F59E0B";
const A_DIM    = "rgba(245,158,11,0.50)";
const A_FAINT  = "rgba(245,158,11,0.12)";
const A_FILL_H = "rgba(20,15,2,0.90)";
const A_FILL_A = "rgba(26,18,2,0.94)";
const SEG_FILL = "rgba(7,7,5,0.80)";

const ST     = "rgba(255,255,255,0.07)";
const ST_DIM = "rgba(255,255,255,0.04)";

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

/* ── Icon system ─────────────────────────────────────────────── */
function WheelIcon({ label, active }: { label: string; active: boolean }) {
  const c = active ? A : A_DIM;
  const w = 1.2;
  const r = "round" as const;

  switch (label) {
    case "OVERVIEW":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <rect x={-7.5} y={-8} width={15} height={16} rx="1.5" />
          <line x1={-4.5} y1={-3} x2={4.5} y2={-3} />
          <line x1={-4.5} y1={1} x2={2.5} y2={1} />
          <line x1={-4.5} y1={5} x2={3.5} y2={5} />
        </g>
      );
    case "SIGNALS": {
      const anchor = 3.5;
      const sq2 = Math.SQRT2 / 2;
      const radii = [3.2, 5.8, 8.4];
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          {radii.map((ar, i) => {
            const x1 = -ar * sq2, y1 = anchor - ar * sq2;
            const x2 =  ar * sq2, y2 = anchor - ar * sq2;
            return (
              <path key={i}
                d={`M ${x1} ${y1} A ${ar} ${ar} 0 0 1 ${x2} ${y2}`}
                strokeOpacity={0.38 + i * 0.25} />
            );
          })}
          <circle cx={0} cy={anchor + 1.2} r={1.3} fill={c} stroke="none" />
        </g>
      );
    }
    case "DATASETS":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <rect x={-7} y={-7.5} width={14} height={4} rx="1" />
          <rect x={-7} y={-2}   width={14} height={4} rx="1" />
          <rect x={-7} y={3.5}  width={14} height={4} rx="1" />
        </g>
      );
    case "RECORDS":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <circle cx={-5.5} cy={-5.5} r={1.3} fill={c} stroke="none" />
          <line x1={-2.8} y1={-5.5} x2={6} y2={-5.5} />
          <circle cx={-5.5} cy={-0.5} r={1.3} fill={c} stroke="none" />
          <line x1={-2.8} y1={-0.5} x2={4} y2={-0.5} />
          <circle cx={-5.5} cy={4.5} r={1.3} fill={c} stroke="none" />
          <line x1={-2.8} y1={4.5} x2={5} y2={4.5} />
          <circle cx={-5.5} cy={9.5} r={1.3} fill={c} stroke="none" />
          <line x1={-2.8} y1={9.5} x2={2} y2={9.5} />
        </g>
      );
    case "METHOD":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r}>
          <circle cx={0} cy={0} r={8.5} />
          <circle cx={0} cy={0} r={4} />
          <circle cx={0} cy={0} r={1.4} fill={c} stroke="none" />
          {[0, 90, 180, 270].map(a => {
            const rad = (a - 90) * Math.PI / 180;
            const x1 = 4 * Math.cos(rad), y1 = 4 * Math.sin(rad);
            const x2 = 8.5 * Math.cos(rad), y2 = 8.5 * Math.sin(rad);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      );
    case "ACCESS":
      return (
        <g fill="none" stroke={c} strokeWidth={w} strokeLinecap={r} strokeLinejoin="round">
          <rect x={-5.5} y={-1} width={11} height={9.5} rx="1.8" />
          <path d={`M -3.5 -1 L -3.5 -4.5 A 3.5 3.5 0 0 1 3.5 -4.5 L 3.5 -1`} />
          <circle cx={0} cy={4} r={1.6} />
          <line x1={0} y1={5.6} x2={0} y2={7.2} />
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
  const svgRef   = useRef<SVGSVGElement>(null);
  const hubRef   = useRef<SVGGElement>(null);

  /* ── Parallax — direct DOM write, zero React re-renders ──── */
  const targetRef  = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef     = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      const LERP = 0.08;
      const { x: tx, y: ty } = targetRef.current;
      const { x: cx_, y: cy_ } = currentRef.current;
      const nx = cx_ + (tx - cx_) * LERP;
      const ny = cy_ + (ty - cy_) * LERP;
      currentRef.current = { x: nx, y: ny };
      if (hubRef.current) {
        hubRef.current.style.transform = `translate(${nx.toFixed(3)}px, ${ny.toFixed(3)}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const AMP = 4;
    const dx = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const dy = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    targetRef.current = {
      x: Math.max(-AMP, Math.min(AMP, dx * AMP * 2)),
      y: Math.max(-AMP, Math.min(AMP, dy * AMP * 2)),
    };
  }, []);

  const enter = useCallback((i: number) => {
    setHovered(i);
    onHover(segments[i].label);
  }, [onHover, segments]);

  const clearHover = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    setHovered(null);
    onHover(null);
  }, [onHover]);

  const SIZE  = 540;
  const cx    = SIZE / 2;
  const cy    = SIZE / 2;
  const INNER = 108;
  const OUTER = 228;

  const SEG_MID  = (INNER + OUTER) / 2;
  const ICON_R   = SEG_MID - 28;
  const LABEL_R  = SEG_MID + 26;
  const TICK_R   = OUTER + 10;
  const TRACE_R  = OUTER + 26;

  const n    = segments.length;
  const STEP = 360 / n;
  const OFF  = -30;

  const C_TRACE = 2 * Math.PI * TRACE_R;
  const C_OUTER = 2 * Math.PI * (OUTER + 52);

  const click = (i: number) => {
    setClicked(i);
    setTimeout(() => setClicked(null), 340);
    onSegmentClick(segments[i].path);
  };

  const activeIdx = hovered ?? clicked ?? null;
  const activeSeg = activeIdx !== null ? segments[activeIdx] : null;
  const hubActive = activeIdx !== null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none gap-1" style={{ width: SIZE, maxWidth: "100%" }}>
      <svg
        ref={svgRef}
        width={SIZE} height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ overflow: "visible", width: "100%", height: "auto" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={clearHover}
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
          {/* Near-black vignette — no green tint */}
          <radialGradient id="rg-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(5,6,7,0.88)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {/* Hub idle — dim amber glow */}
          <radialGradient id="rg-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(245,158,11,0.08)" />
            <stop offset="55%"  stopColor="rgba(245,158,11,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {/* Hub active — stronger amber glow */}
          <radialGradient id="rg-hub-act" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(245,158,11,0.20)" />
            <stop offset="55%"  stopColor="rgba(245,158,11,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Atmospheric vignette */}
        <circle cx={cx} cy={cy} r={OUTER + 80} fill="url(#rg-bg)" />

        {/* ── Outer atmospheric rings ─────────────────────────── */}
        <circle cx={cx} cy={cy} r={OUTER + 40} fill="none"
          stroke={ST} strokeWidth={1} className="sensor-pulse-ring" />
        <circle cx={cx} cy={cy} r={OUTER + 40} fill="none"
          stroke={ST} strokeWidth={1} className="sensor-pulse-ring-delay" />

        <circle cx={cx} cy={cy} r={OUTER + 64} fill="none" stroke={ST_DIM} strokeWidth={0.7} />
        <circle cx={cx} cy={cy} r={OUTER + 80} fill="none" stroke={ST_DIM} strokeWidth={0.5}
          strokeDasharray="3 14" />

        <circle cx={cx} cy={cy} r={OUTER + 36} fill="none"
          stroke={ST} strokeWidth={0.7} strokeDasharray="2 10"
          className="hub-spin-slow" />
        <circle cx={cx} cy={cy} r={OUTER + 48} fill="none"
          stroke={ST_DIM} strokeWidth={0.6} strokeDasharray="1.5 14"
          className="ring-spin-ccw" />

        {/* Sweep arcs — amber */}
        <circle cx={cx} cy={cy} r={TRACE_R} fill="none"
          stroke={A} strokeWidth={2.5} strokeLinecap="round" strokeOpacity={0.15}
          strokeDasharray={`28 ${C_TRACE - 28}`}
          className="sweep-arc-cw" />
        <circle cx={cx} cy={cy} r={OUTER + 52} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} strokeLinecap="round"
          strokeDasharray={`18 ${C_OUTER - 18}`}
          className="sweep-arc-ccw" />
        <circle cx={cx} cy={cy} r={TRACE_R - 4} fill="none"
          stroke={A} strokeWidth={1.5} strokeLinecap="round" strokeOpacity={0.08}
          strokeDasharray={`12 ${C_TRACE - 12}`}
          className="sweep-arc-cw-2" />

        {/* Outer boundary */}
        <circle cx={cx} cy={cy} r={OUTER + 4} fill="none"
          stroke={hubActive ? "rgba(245,158,11,0.18)" : ST}
          strokeWidth={1}
          style={{ transition: "stroke 0.4s ease" }} />

        {/* ── Segments ─────────────────────────────────────────── */}
        {segments.map((seg, i) => {
          const startDeg = OFF + i * STEP;
          const endDeg   = startDeg + STEP;
          const midDeg   = startDeg + STEP / 2;
          const isHov    = hovered === i;
          const isClk    = clicked === i;
          const active   = isHov || isClk;

          const path     = arcPath(cx, cy, INNER + 4, OUTER - 3, startDeg, endDeg);
          const hitPth   = arcPath(cx, cy, INNER + 4, OUTER - 3, startDeg, endDeg, 0.5);
          const iconPt   = polar(cx, cy, ICON_R, midDeg);
          const lblPt    = polar(cx, cy, LABEL_R, midDeg);
          const tickArc  = openArc(cx, cy, TICK_R, startDeg, endDeg, 4);
          const traceArc = openArc(cx, cy, TRACE_R, startDeg, endDeg, 5);

          return (
            <g key={seg.label}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => enter(i)}
              onClick={() => click(i)}
            >
              <path d={hitPth} fill="transparent" />

              <path d={path}
                fill={isClk ? A_FILL_A : isHov ? A_FILL_H : SEG_FILL}
                stroke={active ? A_FAINT : "rgba(255,255,255,0.06)"}
                strokeWidth={active ? 1 : 0.7}
                style={{ transition: "fill 0.18s ease, stroke 0.18s ease" }} />

              {active && (
                <path d={path} fill="none"
                  stroke={A} strokeWidth={1.4} strokeOpacity={0.32}
                  filter="url(#f-glow)" />
              )}
              {active && (
                <path d={path} fill="none"
                  stroke={A} strokeWidth={4} strokeOpacity={0.07}
                  filter="url(#f-glow-lg)" />
              )}

              <path d={tickArc} fill="none"
                stroke={active ? A : "rgba(200,180,140,0.14)"}
                strokeWidth={active ? 2.2 : 1}
                strokeLinecap="round"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }} />

              {active && (
                <path d={traceArc} fill="none"
                  stroke={A} strokeWidth={2.8} strokeLinecap="round"
                  strokeOpacity={0.50}
                  filter="url(#f-glow-md)" />
              )}

              {/* Icon */}
              <g transform={`translate(${iconPt.x},${iconPt.y})`} style={{ pointerEvents: "none" }}>
                <WheelIcon label={seg.label} active={active} />
              </g>

              {/* Label */}
              <text
                x={lblPt.x} y={lblPt.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="8.5"
                fontFamily="'Orbitron', sans-serif"
                fontWeight={active ? "700" : "500"}
                fill={active ? A : "rgba(200,190,170,0.75)"}
                letterSpacing="0.2em"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "fill 0.2s ease", pointerEvents: "none", userSelect: "none" }}
              >
                {seg.label}
              </text>

            </g>
          );
        })}

        {/* ── Hub ──────────────────────────────────────────────── */}
        <g ref={hubRef}>
          <circle cx={cx} cy={cy} r={INNER - 3}
            fill={hubActive ? "url(#rg-hub-act)" : "url(#rg-hub)"}
            filter={hubActive ? "url(#f-hub)" : undefined}
            style={{ transition: "filter 0.4s ease" }} />

          <circle cx={cx} cy={cy} r={INNER - 3}
            fill="none" stroke={A} strokeWidth={1.4}
            strokeOpacity={hubActive ? 0.48 : 0.18}
            filter={hubActive ? "url(#f-glow-md)" : undefined}
            style={{ transition: "stroke-opacity 0.4s ease" }} />

          <circle cx={cx} cy={cy} r={INNER - 16}
            fill="rgba(0,0,0,0.85)"
            stroke={ST} strokeWidth={0.8}
            className="hub-breathe" />
          <circle cx={cx} cy={cy} r={INNER - 30}
            fill="rgba(0,0,0,0.72)"
            stroke={ST_DIM} strokeWidth={0.6} />
          <circle cx={cx} cy={cy} r={INNER - 44}
            fill="rgba(0,0,0,0.58)"
            stroke={ST_DIM} strokeWidth={0.4}
            strokeDasharray="3 6" />

          {/* Cardinal ticks */}
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const p1 = polar(cx, cy, INNER - 44, a);
            const p2 = polar(cx, cy, INNER - 24, a);
            return (
              <line key={a}
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={hubActive ? "rgba(245,158,11,0.28)" : ST_DIM}
                strokeWidth={0.7}
                style={{ transition: "stroke 0.4s ease" }} />
            );
          })}

          {/* Hub text */}
          <text x={cx} y={cy - 27}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.8" fontFamily="'Share Tech Mono', monospace"
            fill={A} fillOpacity={hubActive ? 0.50 : 0.24}
            letterSpacing="0.38em"
            style={{ transition: "fill-opacity 0.35s ease" }}>
            RSR
          </text>

          <text x={cx} y={cy - 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="27" fontFamily="'Orbitron', sans-serif" fontWeight="800"
            fill={A} letterSpacing="0.06em"
            filter={hubActive ? "url(#f-glow-lg)" : "url(#f-glow)"}
            style={{ transition: "filter 0.35s ease" }}>
            PS
          </text>

          <text x={cx} y={cy + 22}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.2" fontFamily="'Share Tech Mono', monospace"
            fill={A} fillOpacity={hubActive ? 0.50 : 0.24}
            letterSpacing="0.32em"
            style={{ transition: "fill-opacity 0.35s ease" }}>
            PACIFIC·SYS
          </text>

          <circle cx={cx} cy={cy} r={2.5}
            fill="none" stroke={A} strokeWidth={0.8}
            strokeOpacity={hubActive ? 0.48 : 0.16}
            style={{ transition: "stroke-opacity 0.35s ease" }} />
        </g>

        {/* Inner boundary ring */}
        <circle cx={cx} cy={cy} r={INNER + 1}
          fill="none" stroke={ST} strokeWidth={0.6} />
      </svg>

      {/* ── Sector indicator bar ─────────────────────────────────── */}
      <div style={{ width: "100%", height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {activeSeg ? (
          <div key={activeSeg.label} className="panel-fade-in flex items-center gap-3 rounded px-5 py-2.5"
            style={{
              border: "1px solid rgba(245,158,11,0.22)",
              background: "rgba(12,9,2,0.94)",
              boxShadow: "0 0 20px rgba(0,0,0,0.6), 0 0 12px rgba(245,158,11,0.06)",
              maxWidth: 460, width: "100%",
            }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: A, boxShadow: `0 0 6px ${A}` }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-0.5">
                <span className="font-orbitron font-bold tracking-widest" style={{ color: A, fontSize: "9.5px" }}>
                  {activeSeg.label}
                </span>
                <span className="font-mono-tactical" style={{ color: "rgba(245,158,11,0.28)", fontSize: "9px" }}>
                  {activeIdx !== null ? String(activeIdx + 1).padStart(2, "0") : "01"}/{String(n).padStart(2, "0")}
                </span>
              </div>
              <span className="font-mono-tactical truncate block" style={{ color: "rgba(184,194,204,0.48)", fontSize: "9.5px" }}>
                {activeSeg.description}
              </span>
            </div>
            <span className="font-mono-tactical flex-shrink-0 hidden sm:block"
              style={{ color: "rgba(245,158,11,0.38)", fontSize: "9px", letterSpacing: "0.1em" }}>
              ENTER →
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-8 h-px" style={{ background: "rgba(245,158,11,0.10)" }} />
            <span className="font-mono-tactical tracking-widest"
              style={{ color: "rgba(200,180,140,0.28)", fontSize: "9px", letterSpacing: "0.18em" }}>
              HOVER A SECTOR — CLICK TO ENTER
            </span>
            <div className="w-8 h-px" style={{ background: "rgba(245,158,11,0.10)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
