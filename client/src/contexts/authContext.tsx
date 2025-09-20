import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useToast } from "./toastContext";
import { valid } from "../services/authService";

type UserAuth = {
  accessToken: string,
  email: string,
  expiresAt: number,
  issuedAt: number,
  role: string
};

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

  const toast = useToast();

  useEffect(() => {
    const authSessionStr = sessionStorage.getItem("CURRENT_USER");
    if (!authSessionStr) return;
    const authSession: UserAuth = JSON.parse(authSessionStr);

    const validToken = async () => {
      const restResponse = await valid();
      if (restResponse.statusCode === 401) {
        toast.showToast("Thông báo", "Tài khoản không hợp lệ", "warning");
      } else if (restResponse.statusCode === 200) {
        const data: UserAuth = restResponse.data;
        data.accessToken = authSession.accessToken;
        setAuth(data);
      }
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

