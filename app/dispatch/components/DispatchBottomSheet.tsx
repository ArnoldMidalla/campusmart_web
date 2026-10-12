"use client";

import React, { useEffect } from "react";

export interface DispatchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function DispatchBottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = "",
}: DispatchBottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content drawer */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-[32px] p-6 pb-9 shadow-2xl z-10 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto no-scrollbar ${className}`}
      >
        {/* Drag pill handle */}
        <div className="w-11 h-1 bg-[#D0D5DD] rounded-full mx-auto mb-5 shrink-0" />

        {title && (
          <h3 className="text-[18px] font-bold text-foreground mb-1 leading-snug">
            {title}
          </h3>
        )}

        {subtitle && (
          <p className="text-[13px] text-foreground-muted mb-5 leading-relaxed">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}

export default DispatchBottomSheet;
