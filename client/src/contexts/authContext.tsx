import { createContext, useContext } from "react";

type UserAuth = {

};

type AuthContext = {

};

const AuthContext = createContext<AuthContext>({

});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {



  return (
    <AuthContext.Provider value={{}}>
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

