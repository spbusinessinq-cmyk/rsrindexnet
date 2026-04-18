interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function EmptyState({ icon = "◌", title, subtitle, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      <div className="font-mono-tactical text-3xl mb-3" style={{ color: "rgba(34,197,94,0.2)" }}>
        {icon}
      </div>
      <div className="font-mono-tactical text-sm tracking-widest uppercase mb-1" style={{ color: "rgba(34,197,94,0.35)" }}>
        {title}
      </div>
      {subtitle && (
        <div className="font-mono-tactical text-xs mt-1" style={{ color: "rgba(34,197,94,0.2)", fontSize: "10px" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
