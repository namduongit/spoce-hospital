import { AuthProvider } from "./auth.context";
import { ToastProvider } from "./toast.context";

export const ProductionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
};