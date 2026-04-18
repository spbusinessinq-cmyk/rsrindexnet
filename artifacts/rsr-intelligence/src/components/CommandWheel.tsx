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
const G_DIM = "rgba(34,197,94,0.55)";
const G_FAINT = "rgba(34,197,94,0.22)";
const G_FILL = "rgba(34,197,94,0.07)";
const G_FILL_HOV = "rgba(34,197,94,0.16)";
const G_FILL_ACT = "rgba(34,197,94,0.28)";

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r1: number,
  r2: number,
  startDeg: number,
  endDeg: number,
  gapDeg = 2.2
): string {
  const s = startDeg + gapDeg;
  const e = endDeg - gapDeg;
  const large = e - s > 180 ? 1 : 0;
  const os = polar(cx, cy, r2, s);
  const oe = polar(cx, cy, r2, e);
  const ie = polar(cx, cy, r1, e);
  const is_ = polar(cx, cy, r1, s);
  return [
    `M ${os.x} ${os.y}`,
    `A ${r2} ${r2} 0 ${large} 1 ${oe.x} ${oe.y}`,
    `L ${ie.x} ${ie.y}`,
    `A ${r1} ${r1} 0 ${large} 0 ${is_.x} ${is_.y}`,
    "Z",
  ].join(" ");
}

function openArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number, gapDeg = 3) {
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
    METHOD: (
      <g>
        <circle cx="0" cy="0" r={s * 0.85} fill="none" stroke={col} strokeWidth="1.1" />
        <circle cx="0" cy="0" r={s * 0.5} fill="none" stroke={col} strokeWidth="1.1" />
        <circle cx="0" cy="0" r={s * 0.15} fill={col} />
        {[0, 90, 180, 270].map((a) => {
          const p1 = polar(0, 0, s * 0.5, a);
          const p2 = polar(0, 0, s * 0.85, a);
          return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={col} strokeWidth="1" strokeLinecap="round" />;
        })}
      </g>
    ),
    SIGNALS: (
      <g>
        {[s * 0.35, s * 0.62, s * 0.9].map((r, i) => (
          <path
            key={i}
            d={`M ${-r * Math.cos(Math.PI / 4)} ${r * Math.sin(Math.PI / 4)} A ${r} ${r} 0 0 1 ${r * Math.cos(Math.PI / 4)} ${r * Math.sin(Math.PI / 4)}`}
            fill="none"
            stroke={col}
            strokeWidth={i === 2 ? "1.4" : "1.1"}
            strokeLinecap="round"
            strokeOpacity={0.55 + i * 0.2}
            transform="rotate(180)"
          />
        ))}
        <circle cx="0" cy={s * 0.42} r="1.8" fill={col} />
      </g>
    ),
    ACCESS: (
      <g>
        <rect x={-s * 0.55} y={-s * 0.55} width={s * 1.1} height={s * 1.1} rx="2.5"
          fill="none" stroke={col} strokeWidth="1.3" />
        <circle cx="0" cy={s * 0.05} r={s * 0.22} fill="none" stroke={col} strokeWidth="1.2" />
        <line x1="0" y1={s * 0.22} x2="0" y2={s * 0.5} stroke={col} strokeWidth="1.3" strokeLinecap="round" />
        <path d={`M ${-s * 0.35} ${-s * 0.18} L ${-s * 0.35} ${-s * 0.55} A ${s * 0.35} ${s * 0.35} 0 0 1 ${s * 0.35} ${-s * 0.55} L ${s * 0.35} ${-s * 0.18}`}
          fill="none" stroke={col} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ),
    FILES: (
      <g>
        <path
          d={`M ${-s * 0.55} ${-s * 0.75} L ${s * 0.2} ${-s * 0.75} L ${s * 0.55} ${-s * 0.35} L ${s * 0.55} ${s * 0.75} L ${-s * 0.55} ${s * 0.75} Z`}
          fill="none"
          stroke={col}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d={`M ${s * 0.2} ${-s * 0.75} L ${s * 0.2} ${-s * 0.35} L ${s * 0.55} ${-s * 0.35}`} fill="none" stroke={col} strokeWidth="1.1" />
        {[-0.1, 0.15, 0.4].map((dy) => (
          <line key={dy} x1={-s * 0.35} y1={s * dy} x2={s * 0.3} y2={s * dy} stroke={col} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
        ))}
      </g>
    ),
    BRIEFS: (
      <g>
        <rect x={-s * 0.65} y={-s * 0.75} width={s * 1.3} height={s * 1.5} rx="1.5" fill="none" stroke={col} strokeWidth="1.3" />
        <path d={`M ${-s * 0.25} ${-s * 0.75} L ${-s * 0.25} ${-s * 1.05} L ${s * 0.25} ${-s * 1.05} L ${s * 0.25} ${-s * 0.75}`} fill="none" stroke={col} strokeWidth="1.1" />
        {[-0.2, 0.05, 0.3].map((dy) => (
          <line key={dy} x1={-s * 0.42} y1={s * dy} x2={s * 0.42} y2={s * dy} stroke={col} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
        ))}
      </g>
    ),
    NETWORK: (
      <g>
        {[
          { cx: 0, cy: -s * 0.7 },
          { cx: s * 0.65, cy: s * 0.35 },
          { cx: -s * 0.65, cy: s * 0.35 },
        ].flatMap((a, ai) =>
          [
            { cx: 0, cy: -s * 0.7 },
            { cx: s * 0.65, cy: s * 0.35 },
            { cx: -s * 0.65, cy: s * 0.35 },
          ]
            .filter((_, bi) => bi > ai)
            .map((b, bi) => (
              <line key={`${ai}-${bi}`} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke={col} strokeWidth="1.1" strokeOpacity="0.55" />
            ))
        )}
        {[
          { cx: 0, cy: -s * 0.7 },
          { cx: s * 0.65, cy: s * 0.35 },
          { cx: -s * 0.65, cy: s * 0.35 },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="3.2" fill={col} fillOpacity={i === 0 ? 1 : 0.6} />
        ))}
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
  const OUTER = 232;
  const ICON_R = (INNER + OUTER) / 2 - 18;
  const LABEL_R = (INNER + OUTER) / 2 + 14;
  const OUTER_TICK_R = OUTER + 8;

  const n = segments.length;
  const STEP = 360 / n;
  const OFFSET = -30;

  const enter = (i: number) => { setHovered(i); onHover(segments[i].label); };
  const leave = () => { setHovered(null); onHover(null); };
  const click = (i: number) => {
    setClicked(i);
    setTimeout(() => setClicked(null), 400);
    onSegmentClick(segments[i].path);
  };

  const activeIdx = hovered ?? clicked ?? null;
  const activeSeg = activeIdx !== null ? segments[activeIdx] : null;

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none gap-3"
      style={{ width: SIZE, maxWidth: "100%" }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ overflow: "visible", width: "100%", height: "auto" }}
      >
        <defs>
          <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-glow-xl" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="12" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rg-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.18)" />
            <stop offset="55%" stopColor="rgba(34,197,94,0.06)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0)" />
          </radialGradient>
        </defs>

        {[OUTER + 22, OUTER + 38, OUTER + 54].map((r, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={G} strokeOpacity={0.05 - i * 0.01}
            strokeWidth={1}
            strokeDasharray={["5 10", "2 14", "1 20"][i]}
          />
        ))}

        <circle cx={cx} cy={cy} r={OUTER + 3} fill="none" stroke={G} strokeWidth={1.2} strokeOpacity={0.18} />
        <circle cx={cx} cy={cy} r={INNER - 3} fill="none" stroke={G} strokeWidth={1} strokeOpacity={0.18} />

        {segments.map((seg, i) => {
          const startDeg = OFFSET + i * STEP;
          const endDeg = startDeg + STEP;
          const midDeg = startDeg + STEP / 2;
          const isHov = hovered === i;
          const isClk = clicked === i;
          const active = isHov || isClk;

          const segPath = arcPath(cx, cy, INNER + 4, OUTER - 3, startDeg, endDeg);
          const iconPt = polar(cx, cy, ICON_R, midDeg);
          const labelPt = polar(cx, cy, LABEL_R, midDeg);
          const tickArc = openArc(cx, cy, OUTER_TICK_R, startDeg, endDeg, 3);

          return (
            <g
              key={seg.label}
              data-testid={`segment-${seg.label.toLowerCase()}`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => enter(i)}
              onMouseLeave={leave}
              onClick={() => click(i)}
            >
              <path
                d={arcPath(cx, cy, INNER + 4, OUTER - 3, startDeg, endDeg, 2)}
                fill="transparent"
                strokeWidth={0}
              />

              <path
                d={segPath}
                fill={isClk ? G_FILL_ACT : isHov ? G_FILL_HOV : G_FILL}
                stroke={active ? G : G_FAINT}
                strokeWidth={active ? 1.4 : 0.8}
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "fill 0.18s ease, stroke 0.18s ease, stroke-width 0.18s ease" }}
              />

              {active && (
                <path
                  d={segPath}
                  fill="none"
                  stroke={G}
                  strokeWidth={2.5}
                  strokeOpacity={0.35}
                  filter="url(#f-glow-lg)"
                />
              )}

              <path
                d={tickArc}
                fill="none"
                stroke={active ? G : G_FAINT}
                strokeWidth={active ? 2.2 : 1}
                strokeLinecap="round"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "stroke 0.18s ease, stroke-width 0.18s ease" }}
              />

              {active && (
                <path
                  d={tickArc}
                  fill="none"
                  stroke={G}
                  strokeWidth={4}
                  strokeOpacity={0.2}
                  strokeLinecap="round"
                  filter="url(#f-glow-lg)"
                />
              )}

              <SegmentIcon label={seg.label} x={iconPt.x} y={iconPt.y} active={active} />

              <text
                x={labelPt.x}
                y={labelPt.y + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9.5"
                fontFamily="'Orbitron', sans-serif"
                fontWeight={active ? "700" : "500"}
                fill={active ? G : G_DIM}
                letterSpacing="0.16em"
                filter={active ? "url(#f-glow)" : undefined}
                style={{ transition: "fill 0.18s ease", userSelect: "none", pointerEvents: "none" }}
              >
                {seg.label}
              </text>

              {active && (() => {
                const arrowPt = polar(cx, cy, OUTER - 16, midDeg);
                return (
                  <circle
                    cx={arrowPt.x}
                    cy={arrowPt.y}
                    r={3}
                    fill={G}
                    filter="url(#f-glow)"
                  />
                );
              })()}
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={INNER - 4} fill="url(#rg-hub)" stroke={G} strokeWidth={1.5} strokeOpacity={0.35} filter="url(#f-glow)" />
        <circle cx={cx} cy={cy} r={INNER - 16} fill="rgba(0,0,0,0.82)" stroke={G} strokeWidth={0.8} strokeOpacity={0.2} strokeDasharray="5 5" />
        <circle cx={cx} cy={cy} r={INNER - 30} fill="rgba(0,0,0,0.6)" stroke={G} strokeWidth={0.5} strokeOpacity={0.12} />
        <circle cx={cx} cy={cy} r={INNER - 42} fill="rgba(0,0,0,0.4)" stroke={G} strokeWidth={0.4} strokeOpacity={0.08} />

        {[0, 60, 120, 180, 240, 300].map((a) => {
          const p1 = polar(cx, cy, INNER - 42, a);
          const p2 = polar(cx, cy, INNER - 18, a);
          return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={G} strokeWidth={0.6} strokeOpacity={0.18} />;
        })}

        <text x={cx} y={cy - 32} textAnchor="middle" dominantBaseline="middle"
          fontSize="7.5" fontFamily="'Share Tech Mono', monospace" fontWeight="400"
          fill={G} fillOpacity={0.45} letterSpacing="0.3em">CORE</text>

        <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="middle"
          fontSize="24" fontFamily="'Orbitron', sans-serif" fontWeight="800"
          fill={G} letterSpacing="0.1em" filter="url(#f-glow-lg)">RSR</text>

        <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fontFamily="'Share Tech Mono', monospace"
          fill={G} fillOpacity={0.5} letterSpacing="0.22em">INTELLIGENCE</text>

        <text x={cx} y={cy + 29} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fontFamily="'Share Tech Mono', monospace"
          fill={G} fillOpacity={0.5} letterSpacing="0.22em">NETWORK</text>
      </svg>

      <div
        className="w-full flex items-center justify-center"
        style={{ height: 48, minHeight: 48 }}
      >
        {activeSeg ? (
          <div
            className="flex items-center gap-3 border rounded px-5 py-2.5 transition-all duration-200"
            style={{
              borderColor: "rgba(34,197,94,0.3)",
              background: "rgba(34,197,94,0.06)",
              boxShadow: "0 0 12px rgba(34,197,94,0.12)",
              maxWidth: 380,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: G, boxShadow: `0 0 6px ${G}` }} />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className="font-orbitron text-xs font-bold tracking-widest"
                  style={{ color: G, textShadow: `0 0 8px rgba(34,197,94,0.5)` }}
                >
                  {activeSeg.label}
                </span>
                <span className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.5)" }}>
                  {activeSeg.path}
                </span>
              </div>
              <span className="font-mono-tactical text-xs truncate" style={{ color: "rgba(34,197,94,0.55)" }}>
                {activeSeg.description}
              </span>
            </div>
          </div>
        ) : (
          <div className="font-mono-tactical text-xs tracking-widest" style={{ color: "rgba(34,197,94,0.25)" }}>
            SELECT A MODULE
          </div>
        )}
      </div>
    </div>
  );
}
