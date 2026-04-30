type StatusVariant = "nominal" | "standby" | "offline" | "pending" | "active" | "ready";

interface StatusPillProps {
  status: StatusVariant;
  label?: string;
}

const config: Record<StatusVariant, { color: string; bg: string; pulse: boolean; text: string }> = {
  nominal:  { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  pulse: true,  text: "NOMINAL" },
  active:   { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  pulse: true,  text: "ACTIVE" },
  ready:    { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", pulse: false, text: "READY" },
  standby:  { color: "#94a3b8", bg: "rgba(148,163,184,0.1)",pulse: false, text: "STANDBY" },
  pending:  { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", pulse: true,  text: "PENDING" },
  offline:  { color: "#ef4444", bg: "rgba(239,68,68,0.1)",  pulse: false, text: "OFFLINE" },
};

export default function StatusPill({ status, label }: StatusPillProps) {
  const c = config[status];
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded"
      style={{ background: c.bg, border: `1px solid ${c.color}30` }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{
          background: c.color,
          boxShadow: `0 0 5px ${c.color}`,
          animation: c.pulse ? "status-pulse 2s ease-in-out infinite" : undefined,
        }}
      />
      <span className="font-mono-tactical text-xs tracking-widest" style={{ color: c.color }}>
        {label ?? c.text}
      </span>
    </div>
  );
}
