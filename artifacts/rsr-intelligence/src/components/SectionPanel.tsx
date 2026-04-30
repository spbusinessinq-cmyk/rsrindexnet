interface SectionPanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export default function SectionPanel({ title, subtitle, children, className = "", actions }: SectionPanelProps) {
  return (
    <div
      className={`flex flex-col rounded ${className}`}
      style={{ border: "1px solid rgba(245,158,11,0.12)", background: "rgba(0,0,0,0.35)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(245,158,11,0.1)" }}
      >
        <div>
          <div className="font-mono-tactical text-xs tracking-widest uppercase" style={{ color: "rgba(245,158,11,0.55)" }}>
            {title}
          </div>
          {subtitle && (
            <div className="font-mono-tactical text-xs mt-0.5" style={{ color: "rgba(245,158,11,0.3)", fontSize: "10px" }}>
              {subtitle}
            </div>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
