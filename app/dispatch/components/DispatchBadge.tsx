"use client";

import React from "react";

export type BadgeVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral"
  | "orange"
  | "blue"
  | "green";

export interface DispatchBadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  status?: string;
  size?: "sm" | "md";
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  success: "bg-[#E8F8F0] text-[#12B76A]",
  danger: "bg-red-50 text-red-600",
  warning: "bg-amber-50 text-amber-700",
  info: "bg-blue-50 text-blue-600",
  neutral: "bg-gray-100 text-gray-700",
  orange: "bg-orange-50 text-[#E65C00]",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-[#E8F8F0] text-[#12B76A]",
};

function inferVariantFromStatus(status?: string): BadgeVariant {
  if (!status) return "neutral";
  const s = status.toUpperCase().trim();

  // Success
  if (
    s === "SUCCESS" ||
    s === "ACTIVE" ||
    s === "APPROVED" ||
    s === "ONLINE" ||
    s === "VERIFIED" ||
    s === "DELIVERED" ||
    s === "COMPLETED"
  ) {
    return "success";
  }

  // Danger
  if (
    s === "FAILED" ||
    s === "SUSPENDED" ||
    s === "REJECTED" ||
    s === "CANCELLED" ||
    s.startsWith("REPORTED")
  ) {
    return "danger";
  }

  // Info
  if (s === "IN TRANSIT" || s === "DELIVERING") {
    return "info";
  }

  // Warning
  if (
    s === "DISPUTE" ||
    s === "FLAGGED" ||
    s === "PENDING" ||
    s === "REVIEW" ||
    s === "REFUNDED" ||
    s === "REFUND"
  ) {
    return "warning";
  }

  // Roles & Special tags
  if (s === "SELLER" || s === "VERIFIED SELLER") return "orange";
  if (s === "BUYER") return "blue";
  if (s === "RIDER") return "green";

  return "neutral";
}

export function DispatchBadge({
  children,
  variant,
  status,
  size = "sm",
  className = "",
}: DispatchBadgeProps) {
  const content = children ?? status;
  const inferred = variant ?? inferVariantFromStatus(typeof content === "string" ? content : status);
  const colorClasses = VARIANT_STYLES[inferred] || VARIANT_STYLES.neutral;

  const sizeClasses =
    size === "md"
      ? "text-[11px] font-bold px-3 py-1"
      : "text-[10px] font-bold px-2.5 py-0.5";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full uppercase tracking-wider font-bold shrink-0 transition-colors ${sizeClasses} ${colorClasses} ${className}`}
    >
      {content}
    </span>
  );
}

export default DispatchBadge;
