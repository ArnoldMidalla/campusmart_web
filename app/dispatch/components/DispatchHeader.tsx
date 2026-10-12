"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface DispatchHeaderProps {
  variant?: "root" | "detail";
  title: string;
  subtitle?: string;
  backHref?: string;
  avatarText?: string;
  avatarBg?: string;
  rightAction?: React.ReactNode;
  className?: string;
}

export function DispatchHeader({
  variant = "root",
  title,
  subtitle,
  backHref,
  avatarText = "AD",
  avatarBg = "bg-[#222222]",
  rightAction,
  className = "",
}: DispatchHeaderProps) {
  const router = useRouter();

  if (variant === "detail") {
    return (
      <header
        className={`px-6 pt-12 pb-4 flex items-center justify-between relative z-10 ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          {backHref ? (
            <Link
              href={backHref}
              aria-label="Go back"
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center border border-border-default shrink-0 transition-active hover:bg-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center border border-border-default shrink-0 transition-active hover:bg-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
          )}

          <h1 className="text-xl font-bold text-foreground truncate">{title}</h1>
        </div>

        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </header>
    );
  }

  return (
    <header
      className={`px-6 pt-12 pb-4 flex items-center justify-between relative z-10 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-12 h-12 ${avatarBg} rounded-[14px] flex items-center justify-center shrink-0`}
        >
          <span className="text-white font-bold text-lg">{avatarText}</span>
        </div>
        <div className="flex flex-col min-w-0">
          <h1 className="text-xl font-bold text-foreground truncate">{title}</h1>
          {subtitle && (
            <p className="text-[13px] text-foreground-muted truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {rightAction && <div className="shrink-0">{rightAction}</div>}
    </header>
  );
}

export default DispatchHeader;
