interface PageHeaderProps {
  module: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeActive?: boolean;
  children?: React.ReactNode;
}

const C = {
  bg:           "#0D1520",
  border:       "#2D3E4E",
  heading:      "#EEF3F7",
  body:         "#B4C0CA",
  muted:        "#7F8E9B",
  mutedDim:     "#5E6E7A",
  accent:       "#7FAE9E",
  accentBlue:   "#7C95AD",
};

export default function PageHeader({
  module,
  title,
  subtitle,
  badge,
  badgeActive = true,
  children,
}: PageHeaderProps) {
  return (
    <div
      className="px-6 md:px-10 py-6 shrink-0"
      style={{
        borderBottom: `1px solid ${C.border}`,
        background: C.bg,
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div
            className="font-mono-tactical tracking-widest uppercase mb-2"
            style={{ color: C.mutedDim, letterSpacing: "0.22em", fontSize: "15px" }}
          >
            {module}
          </div>
          <h1
            className="font-orbitron font-bold tracking-wider leading-none"
            style={{
              color: C.heading,
              fontSize: "clamp(22px, 4vw, 30px)",
            }}
          >
            {title}
          </h1>
          <p
            className="mt-3 font-mono-tactical"
            style={{
              color: "rgba(180,192,202,0.68)",
              lineHeight: "1.88",
              maxWidth: 560,
              fontSize: "15px",
            }}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical tracking-widest"
              style={{
                border: `1px solid ${
                  badgeActive
                    ? "rgba(127,174,158,0.3)"
                    : "rgba(127,174,158,0.12)"
                }`,
                color: badgeActive
                  ? "rgba(127,174,158,0.85)"
                  : "rgba(127,174,158,0.4)",
                background: badgeActive
                  ? "rgba(127,174,158,0.06)"
                  : "rgba(13,21,32,0.4)",
                letterSpacing: "0.12em",
                fontSize: "15px",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: badgeActive
                    ? "rgba(127,174,158,0.75)"
                    : "rgba(127,174,158,0.28)",
                  boxShadow: badgeActive
                    ? "0 0 5px rgba(127,174,158,0.5)"
                    : undefined,
                  animation: badgeActive
                    ? "status-pulse 2.4s ease-in-out infinite"
                    : undefined,
                }}
              />
              {badge}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
