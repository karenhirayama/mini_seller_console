import { useEffect, useState } from "react";

import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem = ({ toast, onRemove }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const getToastStyles = () => {
    const baseStyles =
      "flex items-center w-full max-w-xs p-4 mb-2 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out";

    if (isExiting) {
      return `${baseStyles} opacity-0 translate-x-full`;
    }

    const typeStyles = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-black",
      info: "bg-blue-500 text-white",
    };

    return `${baseStyles} ${typeStyles[toast.type]} opacity-100 translate-x-0`;
  };

  const getIcon = () => {
    const iconSize = 20;
    switch (toast.type) {
      case "success":
        return <CheckCircle size={iconSize} className="mr-3" />;
      case "error":
        return <XCircle size={iconSize} className="mr-3" />;
      case "warning":
        return <AlertCircle size={iconSize} className="mr-3" />;
      case "info":
        return <Info size={iconSize} className="mr-3" />;
    }
  };

  return (
    <div className={getToastStyles()}>
      {getIcon()}
      <div className="text-sm font-normal flex-1">{toast.message}</div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export const ToastContainer = ({
  toasts,
  removeToast,
}: ToastContainerProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
