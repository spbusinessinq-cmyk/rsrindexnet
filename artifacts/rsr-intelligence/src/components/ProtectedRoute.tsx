/* ── INDEX Data Network — Protected Route ─────────────────────────────────────
   Wraps routes that require operator authentication.
   Unauthenticated → redirect to /login
   Locked (no OPERATOR_KEY configured) → show locked notice
   Authenticated → render children
   ──────────────────────────────────────────────────────────────────────────── */

import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth();
  const [, setLocation] = useLocation();

  if (status === "authenticated") {
    return <>{children}</>;
  }

  if (status === "locked") {
    return (
      <div className="min-h-screen bg-background grid-overlay flex flex-col items-center justify-center p-8">
        <div
          className="w-full max-w-sm rounded p-8 space-y-5"
          style={{ border: "1px solid rgba(220,80,80,0.2)", background: "rgba(8,4,4,0.8)" }}
        >
          <div className="font-mono-tactical tracking-widest uppercase text-center"
            style={{ color: "rgba(220,80,80,0.6)", fontSize: "9px", letterSpacing: "0.22em" }}>
            System Locked
          </div>
          <div className="font-orbitron text-center font-bold"
            style={{ color: "rgba(220,80,80,0.55)", fontSize: "14px" }}>
            Operator access not configured
          </div>
          <p className="font-mono-tactical text-center"
            style={{ color: "rgba(185,205,200,0.45)", fontSize: "10px", lineHeight: "1.85" }}>
            VITE_OPERATOR_KEY is not set. Operator access cannot be granted
            until the authentication key is configured in the deployment environment.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="w-full py-2.5 rounded font-mono-tactical tracking-widest"
            style={{
              border: "1px solid rgba(155,175,170,0.18)",
              color: "rgba(155,175,170,0.45)",
              background: "transparent",
              fontSize: "9.5px",
              letterSpacing: "0.14em",
              cursor: "pointer",
            }}>
            RETURN TO PUBLIC LAYER
          </button>
        </div>
      </div>
    );
  }

  /* Redirect to login */
  setLocation("/login");
  return null;
}
