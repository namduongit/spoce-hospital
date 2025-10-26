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
}

type AuthContext = {
  token: string | null,
  email: string | null,
  role: string | null,
  expiresAt: number | null,
  isAuthenticated: boolean,
  setAuth: (authResponse: UserAuth) => void,
  clearAuth: () => void
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const { execute } = useCallApi();

  useEffect(() => {
    const authSessionStr = sessionStorage.getItem("CURRENT_USER");
    if (!authSessionStr) return;
    const authSession: UserAuth = JSON.parse(authSessionStr);

    const validToken = async () => {
      const restResponse = await execute(valid());
      if (!restResponse?.result && restResponse?.statusCode === 401) {
        clearAuth();
        return;
      }
      const authResponse: AuthResponse = restResponse.data;
      setAuth({ ...authSession, email: authResponse.email, role: authResponse.role, issuedAt: authResponse.issuedAt, expiresAt: authResponse.expiresAt });
    }

    validToken();
  }, []);

  useEffect(() => {
    if (!token || !expiresAt) return;

    const duration = expiresAt * 1000 - Date.now();

    if (duration <= 0) {
      clearAuth();
      return;
    }

    const timeOut = window.setTimeout(() => {
      clearAuth();
    }, duration);

    return () => window.clearTimeout(timeOut);
  }, [token, expiresAt]);

  // Function clear token
  const clearAuth = () => {
    setToken("");
    setEmail("");
    setRole("");
    setExpiresAt(0);
    sessionStorage.removeItem("CURRENT_USER");
  };

  // Function set variable
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
    isAuthenticated: !!token,
    setAuth,
    clearAuth
  }), [token, expiresAt]);


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

