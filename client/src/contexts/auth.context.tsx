import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { valid } from "../services/auth.service";
import useCallApi from "../hooks/useCallApi";

type UserAuth = {
  accessToken: string,
  email: string,
  expiresAt: number,
  issuedAt: number,
  role: string
};

type AuthResponse = {
  email: string,
  role: string,
  issuedAt: number,
  expiresAt: number
};

type AuthContext = {
  token: string | null,
  email: string | null,
  role: string | null,
  expiresAt: number | null,
  isAuthenticated: boolean,
  loadingSession: boolean,
  setAuth: (authResponse: UserAuth) => void,
  clearAuth: () => void
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const { execute } = useCallApi();

  useEffect(() => {
    const authSessionStr = sessionStorage.getItem("CURRENT_USER");
    if (authSessionStr) {
      const authSession: UserAuth = JSON.parse(authSessionStr);
      setToken(authSession.accessToken);
      setEmail(authSession.email);
      setRole(authSession.role);
      setExpiresAt(authSession.expiresAt);
    }

    setLoadingSession(false);
  }, []);

  useEffect(() => {
    if (loadingSession) return; 
    if (!token) return; 

    const validateToken = async () => {
      const res = await execute(valid());
      if (!res?.result && res?.statusCode === 401) {
        clearAuth();
        return;
      }

      const authResponse: AuthResponse = res.data;
      setEmail(authResponse.email);
      setRole(authResponse.role);
      setExpiresAt(authResponse.expiresAt);
    };

    validateToken();
  }, [loadingSession, token]);

  useEffect(() => {
    if (!token || !expiresAt) return;

    const duration = expiresAt * 1000 - Date.now();
    if (duration <= 0) {
      clearAuth();
      return;
    }

    const timeout = window.setTimeout(() => {
      clearAuth();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [token, expiresAt]);

  const clearAuth = () => {
    setToken("");
    setEmail("");
    setRole("");
    setExpiresAt(0);
    sessionStorage.removeItem("CURRENT_USER");
  };

  const setAuth = (authResponse: UserAuth) => {
    setToken(authResponse.accessToken);
    setEmail(authResponse.email);
    setRole(authResponse.role);
    setExpiresAt(authResponse.expiresAt);
    sessionStorage.setItem("CURRENT_USER", JSON.stringify(authResponse));
  };

  const value = useMemo(() => ({
    token,
    email,
    role,
    expiresAt,
    loadingSession,
    isAuthenticated: !!token && !!email && !!expiresAt,
    setAuth,
    clearAuth
  }), [token, email, role, expiresAt, loadingSession]);


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export { AuthProvider, useAuth };
export type { UserAuth };
