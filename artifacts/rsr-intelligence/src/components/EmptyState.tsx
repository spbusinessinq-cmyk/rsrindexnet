interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}

export default function EmptyState({ icon = "◌", title, subtitle, className = "", compact = false }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "py-8 px-4" : "py-14 px-6"} ${className}`}>
      <div
        className="font-mono-tactical mb-3 select-none"
        style={{
          fontSize: compact ? 24 : 32,
          color: "rgba(34,197,94,0.18)",
          letterSpacing: "0.04em",
        }}
      >
        {icon}
      </div>
      <div
        className="font-mono-tactical tracking-widest uppercase mb-1.5"
        style={{
          fontSize: compact ? "10px" : "11px",
          color: "rgba(34,197,94,0.38)",
          letterSpacing: "0.18em",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className="font-mono-tactical max-w-xs"
          style={{
            fontSize: "9.5px",
            color: "rgba(34,197,94,0.2)",
            lineHeight: "1.8",
            letterSpacing: "0.04em",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
