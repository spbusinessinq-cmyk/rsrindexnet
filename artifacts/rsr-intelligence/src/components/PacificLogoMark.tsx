import logoUrl from "@assets/Screenshot_2026-04-30_122604_1777577950541.png";

interface Props {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PacificLogoMark({ size = 40, className, style }: Props) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        border: "1px solid rgba(245,158,11,0.45)",
        background: "#050607",
        backgroundImage: `url(${logoUrl})`,
        backgroundSize: "240%",
        backgroundPosition: "center 36%",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}

export function PacificLogoMarkHero({ size = 220 }: { size?: number }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer dim ring */}
      <div style={{
        position: "absolute",
        width: size + 20,
        height: size + 20,
        borderRadius: "50%",
        border: "1px solid rgba(245,158,11,0.15)",
        pointerEvents: "none",
      }} />

      {/* Main circular crop */}
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid rgba(245,158,11,0.65)",
        background: "#050607",
        backgroundImage: `url(${logoUrl})`,
        backgroundSize: "240%",
        backgroundPosition: "center 36%",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 0 48px rgba(245,158,11,0.12), 0 0 0 1px rgba(245,158,11,0.08)",
      }} />

      {/* Tactical axis ticks */}
      {[
        { top: -14, left: "50%", transform: "translateX(-50%)", width: 1, height: 10 },
        { bottom: -14, left: "50%", transform: "translateX(-50%)", width: 1, height: 10 },
        { left: -14, top: "50%", transform: "translateY(-50%)", width: 10, height: 1 },
        { right: -14, top: "50%", transform: "translateY(-50%)", width: 10, height: 1 },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          background: "rgba(245,158,11,0.55)",
          ...s,
        }} />
      ))}
    </div>
  );
}
