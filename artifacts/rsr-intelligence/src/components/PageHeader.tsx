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
      style={{ borderBottom: "1px solid rgba(34,197,94,0.09)", background: "rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div
            className="font-mono-tactical tracking-widest uppercase mb-2"
            style={{ color: "rgba(34,197,94,0.45)", letterSpacing: "0.24em", fontSize: "9px" }}
          >
            {module}
          </div>
          <h1
            className="font-orbitron text-3xl font-bold tracking-wider leading-none"
            style={{ color: "#22c55e", textShadow: "0 0 22px rgba(34,197,94,0.15)" }}
          >
            {title}
          </h1>
          <p
            className="mt-2.5 font-mono-tactical"
            style={{ color: "rgba(185,205,200,0.62)", lineHeight: "1.88", maxWidth: 560, fontSize: "10.5px" }}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical tracking-widest"
              style={{
                border: `1px solid ${badgeActive ? "rgba(34,197,94,0.3)" : "rgba(34,197,94,0.12)"}`,
                color: badgeActive ? "rgba(34,197,94,0.8)" : "rgba(34,197,94,0.38)",
                background: badgeActive ? "rgba(34,197,94,0.05)" : "rgba(0,0,0,0.2)",
                letterSpacing: "0.12em",
                fontSize: "9px",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: badgeActive ? "rgba(34,197,94,0.72)" : "rgba(34,197,94,0.25)",
                  boxShadow: badgeActive ? "0 0 5px rgba(34,197,94,0.55)" : undefined,
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
