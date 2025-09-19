import { createContext, useContext, useState, useMemo, useEffect } from "react";

type UserAuth = {

};

type AuthContext = {
  token: string | null,
  expiresAt: number | null,
  isAuthenticated: boolean,
  setAuth: (t: string, expire: number) => void,
  clearAuth: () => void
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  // Kiểm tra nếu đã có token trên session và chưa hết hạn
  useEffect(() => {
    const authSession = sessionStorage.getItem("auth");
    if (!authSession) return;

    try {
      const auth = JSON.parse(authSession) as { token: string, expiresAt: number };
      const currentTime = Date.now();

      if (auth.expiresAt * 1000 > currentTime) {
        setToken(auth.token);
        setExpiresAt(auth.expiresAt);
      } else {
        sessionStorage.removeItem("auth");
      }
    } catch {
      sessionStorage.removeItem("auth");
    }
  }, []);

  // Kiểm tra nếu token hết hạn thì log out
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

  const clearAuth = () => {
    setToken(null);
    setExpiresAt(null);
    sessionStorage.removeItem("auth");
  };

  const setAuth = (token: string, expire: number) => {
    setToken(token);
    setExpiresAt(expire);
    sessionStorage.setItem("auth", JSON.stringify({ token: token, expiresAt: expire }));
  };

  const value = useMemo(() => ({
    token,
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

