import { AuthProvider } from "./auth.context";
import { ToastProvider } from "./toast.context";
import { SidebarProvider } from "./sidebar.context";

export const ProductionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ToastProvider>
    </AuthProvider>
  );
};