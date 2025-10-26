import { createContext, useContext, useState } from "react";
import { motion } from "motion/react";

type Toast = {
    id: number,
    title: string,
    detail: string,
    type: "success" | "warning" | "error" | "note"
}

type ToastContext = {
    showToast: (title: string, detail: string, type: "success" | "warning" | "error" | "note") => void,
    closeToast: (id: number) => void
}

const ToastContext = createContext<ToastContext>({
    showToast: () => { },
    closeToast: () => { }
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, detail: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, detail, type }]);

    setTimeout(() => {
      closeToast(id);
    }, 3000);
  };

  const closeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <div className="toast fixed top-5 right-5 flex flex-col items-end space-y-3 z-100">
        {toasts.map((toast, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className={`
              flex items-center gap-3 p-4 rounded-lg shadow-lg text-white w-60 lg:w-80
              ${toast.type === "success" ? "bg-green-500" : ""}
              ${toast.type === "error" ? "bg-red-500" : ""}
              ${toast.type === "warning" ? "bg-yellow-500" : ""}
              ${toast.type === "note" ? "bg-blue-500" : ""}
            `}
          >
            <div className="toast__icon text-3xl">
              {toast.type === "note" && <i className="fa-solid fa-circle-info"></i>}
              {toast.type === "success" && <i className="fa-solid fa-circle-check"></i>}
              {toast.type === "warning" && <i className="fa-solid fa-circle-exclamation"></i>}
              {toast.type === "error" && <i className="fa-solid fa-triangle-exclamation"></i>}
            </div>
            <div className="toast__detail">
              <h3 className="font-semibold">{toast.title}</h3>
              <p className="text-sm">{toast.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
}

export { ToastProvider, useToast }
export type { Toast }