/* ── INDEX Data Network — Auth Context ────────────────────────────────────────
   Operator authentication state management.
   Auth is passphrase-based, checked against VITE_OPERATOR_KEY.
   Session is stored in sessionStorage — clears on tab/browser close.

   If VITE_OPERATOR_KEY is unset → operator login always fails.
   If VITE_DEV_AUTH_BYPASS=true (DEV only) → auth is bypassed for development.

   This is a real auth gate, not a fake one.
   Production deployments MUST set VITE_OPERATOR_KEY via Portainer secrets.
   ──────────────────────────────────────────────────────────────────────────── */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ENV } from "@/lib/env";

const SESSION_KEY = "idx_operator_session";

export type AuthStatus = "authenticated" | "unauthenticated" | "locked";

interface AuthState {
  status: AuthStatus;
  login: (passphrase: string) => boolean;
  logout: () => void;
}

function getInitialStatus(): AuthStatus {
  /* Dev bypass — development only, never in production */
  if (ENV.DEV_AUTH_BYPASS) return "authenticated";

  /* Operator key not configured → lock the gate entirely */
  if (!ENV.OPERATOR_KEY) return "locked";

  /* Restore from session if token matches */
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored && stored === btoa(ENV.OPERATOR_KEY)) return "authenticated";

  return "unauthenticated";
}

const AuthContext = createContext<AuthState>({
  status: "unauthenticated",
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(getInitialStatus);

  const login = useCallback((passphrase: string): boolean => {
    if (!ENV.OPERATOR_KEY) return false;
    if (passphrase.trim() === ENV.OPERATOR_KEY.trim()) {
      sessionStorage.setItem(SESSION_KEY, btoa(ENV.OPERATOR_KEY));
      setStatus("authenticated");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setStatus("unauthenticated");
  }, []);

  return (
    <AuthContext.Provider value={{ status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
