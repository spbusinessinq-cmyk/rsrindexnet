interface PageHeaderProps {
  module: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeActive?: boolean;
  children?: React.ReactNode;
}

export default function PageHeader({ module, title, subtitle, badge, badgeActive = true, children }: PageHeaderProps) {
  return (
    <div
      className="px-6 md:px-8 py-5 shrink-0"
      style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div
            className="font-mono-tactical text-xs tracking-widest uppercase mb-2"
            style={{ color: "rgba(34,197,94,0.35)", letterSpacing: "0.22em", fontSize: "9.5px" }}
          >
            {module}
          </div>
          <h1
            className="font-orbitron text-3xl font-bold tracking-wider leading-none"
            style={{ color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.18)" }}
          >
            {title}
          </h1>
          <p
            className="mt-2.5 font-mono-tactical text-xs"
            style={{ color: "rgba(255,255,255,0.32)", lineHeight: "1.85", maxWidth: 580 }}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono-tactical text-xs tracking-widest"
              style={{
                border: `1px solid ${badgeActive ? "rgba(34,197,94,0.25)" : "rgba(34,197,94,0.12)"}`,
                color: badgeActive ? "rgba(34,197,94,0.65)" : "rgba(34,197,94,0.35)",
                background: "rgba(34,197,94,0.03)",
                letterSpacing: "0.12em",
                fontSize: "9.5px",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: badgeActive ? "rgba(34,197,94,0.6)" : "rgba(34,197,94,0.25)",
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
