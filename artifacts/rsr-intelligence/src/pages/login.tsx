import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { ENV } from "@/lib/env";

export default function LoginPage() {
  const { login, status } = useAuth();
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  /* Already authenticated — forward to operator */
  if (status === "authenticated") {
    setLocation("/operator");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) return;
    setSubmitting(true);
    setError(null);

    /* Brief delay — feels deliberate, not instant */
    setTimeout(() => {
      const ok = login(passphrase.trim());
      if (ok) {
        setLocation("/operator");
      } else {
        setError("Access denied — passphrase not recognised.");
        setPassphrase("");
        setSubmitting(false);
        inputRef.current?.focus();
      }
    }, 600);
  };

  const noKeyConfigured = !ENV.OPERATOR_KEY;

  return (
    <div className="min-h-screen w-full bg-background grid-overlay flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: "1px solid rgba(34,197,94,0.07)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(220,80,80,0.55)" }} />
          <span className="font-mono-tactical tracking-widest uppercase"
            style={{ color: "rgba(155,175,170,0.4)", fontSize: "9.5px", letterSpacing: "0.18em" }}>
            RESTRICTED
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-orbitron font-bold tracking-widest"
            style={{ color: "rgba(34,197,94,0.42)", fontSize: "11px", letterSpacing: "0.22em" }}>
            PACIFIC SYSTEMS
          </span>
          <span className="font-mono-tactical tracking-widest"
            style={{ color: "rgba(155,175,170,0.3)", fontSize: "8px", letterSpacing: "0.18em" }}>
            RSR INTELLIGENCE NETWORK — DATA SYSTEMS
          </span>
        </div>
        <button onClick={() => setLocation("/")}
          className="font-mono-tactical tracking-widest"
          style={{ color: "rgba(155,175,170,0.35)", fontSize: "9px", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}>
          ← PUBLIC LAYER
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full" style={{ maxWidth: 380 }}>

          {/* Identity block */}
          <div className="mb-8 text-center space-y-1.5">
            <div className="font-mono-tactical tracking-widest uppercase"
              style={{ color: "rgba(155,175,170,0.38)", fontSize: "9px", letterSpacing: "0.24em" }}>
              RSR Intelligence Network
            </div>
            <div className="font-orbitron font-bold tracking-widest"
              style={{ color: "#22c55e", fontSize: "22px", textShadow: "0 0 28px rgba(34,197,94,0.2)", letterSpacing: "0.08em" }}>
              PACIFIC SYSTEMS
            </div>
            <div className="font-mono-tactical tracking-widest"
              style={{ color: "rgba(155,175,170,0.45)", fontSize: "9px", letterSpacing: "0.2em" }}>
              OPERATOR ACCESS
            </div>
          </div>

          {/* Auth card */}
          <div className="rounded"
            style={{ border: "1px solid rgba(34,197,94,0.12)", background: "rgba(0,8,4,0.7)", boxShadow: "0 0 40px rgba(0,0,0,0.4)" }}>

            {/* Card header */}
            <div className="px-6 py-4"
              style={{ borderBottom: "1px solid rgba(34,197,94,0.08)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: noKeyConfigured ? "rgba(220,80,80,0.5)" : "rgba(34,197,94,0.45)",
                    boxShadow: noKeyConfigured ? "0 0 4px rgba(220,80,80,0.4)" : "0 0 4px rgba(34,197,94,0.3)",
                  }} />
                <span className="font-mono-tactical tracking-widest uppercase"
                  style={{ color: "rgba(34,197,94,0.52)", fontSize: "9px", letterSpacing: "0.18em" }}>
                  {noKeyConfigured ? "Access System Locked" : "Operator Authentication"}
                </span>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">
              {noKeyConfigured ? (
                /* Key not configured */
                <div className="space-y-3 text-center py-3">
                  <div className="font-orbitron font-bold"
                    style={{ color: "rgba(220,80,80,0.55)", fontSize: "12px" }}>
                    Authentication not configured
                  </div>
                  <p className="font-mono-tactical"
                    style={{ color: "rgba(185,205,200,0.45)", fontSize: "10px", lineHeight: "1.85" }}>
                    VITE_OPERATOR_KEY is not set in this environment.
                    Operator access cannot be granted until the authentication
                    key is configured.
                  </p>
                  <div className="font-mono-tactical rounded px-3 py-2 mt-2"
                    style={{ border: "1px solid rgba(155,175,170,0.1)", background: "rgba(0,0,0,0.4)", fontSize: "9.5px", color: "rgba(155,175,170,0.38)", fontStyle: "italic" }}>
                    Set VITE_OPERATOR_KEY in your deployment configuration
                  </div>
                </div>
              ) : (
                /* Login form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-mono-tactical tracking-widest uppercase block"
                      style={{ color: "rgba(34,197,94,0.5)", fontSize: "8.5px", letterSpacing: "0.16em" }}>
                      Operator Passphrase
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-tactical"
                        style={{ color: "rgba(34,197,94,0.28)", fontSize: "10px", pointerEvents: "none" }}>
                        &gt;
                      </span>
                      <input
                        ref={inputRef}
                        type="password"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        disabled={submitting}
                        placeholder="Enter operator passphrase"
                        autoComplete="current-password"
                        autoFocus
                        className="w-full pl-8 pr-4 py-3 rounded font-mono-tactical"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          border: error
                            ? "1px solid rgba(220,80,80,0.35)"
                            : "1px solid rgba(34,197,94,0.14)",
                          color: "rgba(185,205,200,0.8)",
                          fontSize: "11px",
                          outline: "none",
                          letterSpacing: "0.06em",
                          transition: "border-color 0.15s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 px-3.5 py-2.5 rounded"
                      style={{ border: "1px solid rgba(220,80,80,0.2)", background: "rgba(40,8,8,0.6)" }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "rgba(220,80,80,0.6)" }} />
                      <span className="font-mono-tactical"
                        style={{ color: "rgba(220,80,80,0.7)", fontSize: "10px" }}>
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting || !passphrase.trim()}
                    className="w-full py-3 rounded font-mono-tactical font-bold tracking-widest"
                    style={{
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: submitting ? "rgba(34,197,94,0.4)" : "#22c55e",
                      background: submitting ? "rgba(34,197,94,0.03)" : "rgba(34,197,94,0.07)",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      cursor: submitting || !passphrase.trim() ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                    }}>
                    {submitting ? "AUTHENTICATING..." : "AUTHENTICATE"}
                  </button>
                </form>
              )}

              {/* Access notice */}
              <div className="space-y-1 pt-1" style={{ borderTop: "1px solid rgba(34,197,94,0.06)" }}>
                <p className="font-mono-tactical text-center"
                  style={{ color: "rgba(155,175,170,0.3)", fontSize: "9.5px", lineHeight: "1.7" }}>
                  Operator access is provisioned individually.
                </p>
                <p className="font-mono-tactical text-center"
                  style={{ color: "rgba(155,175,170,0.25)", fontSize: "9px", lineHeight: "1.7" }}>
                  This is not a sign-up flow. No public access is available here.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-6 text-center">
            <span className="font-mono-tactical"
              style={{ color: "rgba(155,175,170,0.25)", fontSize: "9px" }}>
              Pacific Systems — RSR Data Systems Division
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-1.5"
        style={{ borderTop: "1px solid rgba(34,197,94,0.05)" }}>
        <span className="font-mono-tactical tracking-widest"
          style={{ color: "rgba(155,175,170,0.2)", fontSize: "9px" }}>
          RESTRICTED LAYER
        </span>
        <span className="font-mono-tactical"
          style={{ color: "rgba(155,175,170,0.18)", fontSize: "9px" }}>
          Authorised access only
        </span>
      </div>
    </div>
  );
}
