interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
  statusLine?: string;
}

export default function EmptyState({
  icon = "◌",
  title,
  subtitle,
  className = "",
  compact = false,
  statusLine,
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "py-8 px-4" : "py-12 px-8"} ${className}`}>
      <div
        className="font-mono-tactical mb-4 select-none"
        style={{
          fontSize: compact ? 22 : 28,
          color: "rgba(34,197,94,0.2)",
          letterSpacing: "0.04em",
        }}
      >
        {icon}
      </div>
      <div
        className="font-orbitron tracking-widest uppercase mb-2"
        style={{
          fontSize: compact ? "9.5px" : "10.5px",
          color: "rgba(34,197,94,0.5)",
          letterSpacing: "0.2em",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className="font-mono-tactical max-w-xs mb-2.5"
          style={{
            fontSize: "10px",
            color: "rgba(185,205,200,0.42)",
            lineHeight: "1.88",
            letterSpacing: "0.02em",
          }}
        >
          {subtitle}
        </div>
      )}
      {statusLine && (
        <div
          className="font-mono-tactical flex items-center gap-2 mt-1"
          style={{ fontSize: "9px", color: "rgba(155,175,170,0.32)" }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.3)" }}
          />
          {statusLine}
        </div>
      )}
    </div>
  );
}
