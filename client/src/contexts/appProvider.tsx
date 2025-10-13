import { AuthProvider } from "./authContext";
import { ToastProvider } from "./toastContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
};