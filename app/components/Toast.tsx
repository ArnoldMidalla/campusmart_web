"use client";

import { useEffect, useRef, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle, Moon } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning" | "dark";

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  /** Auto-dismiss after this many ms. Default 3500. Pass 0 to disable. */
  duration?: number;
}

const typeConfig: Record<
  ToastType,
  {
    cardBg: string;
    bar: string;
    iconBg: string;
    Icon: React.ElementType;
    iconColor: string;
    titleColor: string;
    msgColor: string;
    dismissColor: string;
  }
> = {
  success: {
    cardBg: "bg-white border border-neutral-100",
    bar: "bg-green-500",
    iconBg: "bg-green-100",
    Icon: CheckCircle2,
    iconColor: "text-green-500",
    titleColor: "text-neutral-900",
    msgColor: "text-neutral-400",
    dismissColor: "text-neutral-400 hover:text-neutral-600",
  },
  error: {
    cardBg: "bg-white border border-neutral-100",
    bar: "bg-red-500",
    iconBg: "bg-red-100",
    Icon: AlertCircle,
    iconColor: "text-red-500",
    titleColor: "text-neutral-900",
    msgColor: "text-neutral-400",
    dismissColor: "text-neutral-400 hover:text-neutral-600",
  },
  info: {
    cardBg: "bg-white border border-neutral-100",
    bar: "bg-blue-500",
    iconBg: "bg-blue-100",
    Icon: Info,
    iconColor: "text-blue-500",
    titleColor: "text-neutral-900",
    msgColor: "text-neutral-400",
    dismissColor: "text-neutral-400 hover:text-neutral-600",
  },
  warning: {
    cardBg: "bg-white border border-neutral-100",
    bar: "bg-yellow-400",
    iconBg: "bg-yellow-100",
    Icon: AlertTriangle,
    iconColor: "text-yellow-500",
    titleColor: "text-neutral-900",
    msgColor: "text-neutral-400",
    dismissColor: "text-neutral-400 hover:text-neutral-600",
  },
  dark: {
    cardBg: "bg-[#1e2235] border border-[#2d3250]",
    bar: "bg-yellow-400",
    iconBg: "bg-[#2d3250]",
    Icon: Moon,
    iconColor: "text-yellow-400",
    titleColor: "text-white",
    msgColor: "text-neutral-400",
    dismissColor: "text-neutral-500 hover:text-neutral-300",
  },
};

/* ── Single toast card ── */
function ToastCard({ toast, onDismiss, duration = 3500 }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setVisible(true))
    );
    if (duration > 0) {
      timerRef.current = setTimeout(() => dismiss(), duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  const { cardBg, bar, iconBg, Icon, iconColor, titleColor, msgColor, dismissColor } =
    typeConfig[toast.type];

  /* Moon icon needs a filled style */
  const iconProps =
    toast.type === "dark"
      ? { size: 18, className: iconColor, fill: "#facc15" }
      : { size: 18, className: iconColor };

  return (
    <div
      role="alert"
      className={`
        flex items-center gap-3 w-full rounded-2xl shadow-lg
        pr-3 pl-0 py-3 overflow-hidden
        transition-all duration-300 ease-out
        ${cardBg}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
      `}
    >
      {/* Left accent bar */}
      <div className={`self-stretch w-1 rounded-r-full shrink-0 ${bar}`} />

      {/* Icon */}
      <div className={`size-9 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
        <Icon {...iconProps} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-snug ${titleColor}`}>{toast.title}</p>
        {toast.message && (
          <p className={`text-xs mt-0.5 leading-snug ${msgColor}`}>{toast.message}</p>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Dismiss notification"
        className={`transition-colors shrink-0 ${dismissColor}`}
      >
        <X size={16} />
      </button>
    </div>
  );
}

/* ── Toast container — fixed top of viewport ── */
interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  duration?: number;
}

export function ToastContainer({ toasts, onDismiss, duration }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 left-0 right-0 z-[200] flex flex-col items-center gap-2 px-4 pointer-events-none">
      <div className="w-full max-w-md flex flex-col gap-2 pointer-events-auto">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={onDismiss} duration={duration} />
        ))}
      </div>
    </div>
  );
}

/* ── Hook for managing toasts ── */
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = (type: ToastType, title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    return id;
  };

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return {
    toasts,
    dismiss,
    success: (title: string, message?: string) => show("success", title, message),
    error: (title: string, message?: string) => show("error", title, message),
    info: (title: string, message?: string) => show("info", title, message),
    warning: (title: string, message?: string) => show("warning", title, message),
    dark: (title: string, message?: string) => show("dark", title, message),
  };
}
