"use client";

import React from "react";
import { Check } from "lucide-react";

export type AvatarTheme = "orange" | "blue" | "green" | "gray" | "dark";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface DispatchAvatarProps {
  initials: string;
  colorTheme?: AvatarTheme;
  size?: AvatarSize;
  isVerified?: boolean;
  className?: string;
}

const THEME_STYLES: Record<AvatarTheme, string> = {
  orange: "bg-orange-50 text-[#E65C00]",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-[#EAF7EE] text-[#1E7E34]",
  gray: "bg-gray-100 text-gray-700",
  dark: "bg-[#222222] text-white",
};

const SIZE_STYLES: Record<AvatarSize, { box: string; text: string; badge: string; checkIcon: number }> = {
  xs: { box: "w-8 h-8 rounded-xl", text: "text-[11px]", badge: "w-4 h-4", checkIcon: 9 },
  sm: { box: "w-10 h-10 rounded-[12px]", text: "text-[12px]", badge: "w-4 h-4", checkIcon: 10 },
  md: { box: "w-12 h-12 rounded-[14px]", text: "text-[14px]", badge: "w-5 h-5", checkIcon: 11 },
  lg: { box: "w-14 h-14 rounded-2xl", text: "text-[16px]", badge: "w-5 h-5", checkIcon: 12 },
  xl: { box: "w-[88px] h-[88px] rounded-[2rem]", text: "text-[32px]", badge: "w-6 h-6", checkIcon: 12 },
};

export function DispatchAvatar({
  initials,
  colorTheme = "orange",
  size = "md",
  isVerified = false,
  className = "",
}: DispatchAvatarProps) {
  const themeClass = THEME_STYLES[colorTheme] || THEME_STYLES.orange;
  const sizeConfig = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`flex items-center justify-center font-bold select-none ${sizeConfig.box} ${sizeConfig.text} ${themeClass}`}
      >
        {initials}
      </div>

      {isVerified && (
        <div
          className={`absolute -bottom-1 -right-1 ${sizeConfig.badge} bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center shadow-xs`}
        >
          <Check
            size={sizeConfig.checkIcon}
            className="text-white"
            strokeWidth={3}
          />
        </div>
      )}
    </div>
  );
}

export default DispatchAvatar;
