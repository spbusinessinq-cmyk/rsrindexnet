interface PageHeaderProps {
  module: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeActive?: boolean;
  children?: React.ReactNode;
}

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
      className="px-6 md:px-8 py-5 shrink-0"
      style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div
            className="font-mono-tactical tracking-widest uppercase mb-2"
            style={{ color: "rgba(34,197,94,0.48)", letterSpacing: "0.22em", fontSize: "9.5px" }}
          >
            {module}
          </div>
          <h1
            className="font-orbitron text-3xl font-bold tracking-wider leading-none"
            style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.15)" }}
          >
            {title}
          </h1>
          <p
            className="mt-2.5 font-mono-tactical"
            style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.9", maxWidth: 560, fontSize: "11px" }}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical tracking-widest"
              style={{
                border: `1px solid ${badgeActive ? "rgba(34,197,94,0.28)" : "rgba(34,197,94,0.14)"}`,
                color: badgeActive ? "rgba(34,197,94,0.75)" : "rgba(34,197,94,0.4)",
                background: "rgba(34,197,94,0.04)",
                letterSpacing: "0.12em",
                fontSize: "9.5px",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: badgeActive ? "rgba(34,197,94,0.65)" : "rgba(34,197,94,0.28)",
                  boxShadow: badgeActive ? "0 0 4px rgba(34,197,94,0.5)" : undefined,
                  animation: badgeActive ? "status-pulse 2.4s ease-in-out infinite" : undefined,
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
