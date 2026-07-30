"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerIcon?: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  headerIcon,
  className,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300",
        isOpen ? "visible" : "invisible"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] h-[90vh] sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl transition-transform duration-300",
          isOpen ? "translate-y-0" : "translate-y-full",
          className
        )}
      >
        {/* Mobile Handle */}
        <div className="sm:hidden w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-neutral-200 rounded-full cursor-pointer" onClick={onClose} />
        </div>

        {/* Header */}
        {(title || headerIcon) && (
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <div className="size-10 flex items-center justify-center">
              {headerIcon}
            </div>
            {title && <h2 className="text-[20px] font-bold text-foreground-dark">{title}</h2>}
            <button
              onClick={onClose}
              className="size-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-6 py-4 scroll-smooth no-scrollbar">
          {children}
        </main>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-6 bg-white border-t border-neutral-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
