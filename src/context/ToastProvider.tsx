// ToastProvider.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import type { Toast, ToastType } from "../interfaces/toast";
import { ToastContainer } from "../components/ui/Toast";

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let TOAST_ID = 0;

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider= ({
  children,
}:ToastProviderProps ) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration?: number) => {
      const id = (++TOAST_ID).toString();
      const newToast: Toast = { id, message, type, duration };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => {
      return addToast(message, "success", duration);
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      return addToast(message, "error", duration);
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      return addToast(message, "warning", duration);
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      return addToast(message, "info", duration);
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
