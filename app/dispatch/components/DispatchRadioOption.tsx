"use client";

import React from "react";

export interface DispatchRadioOptionProps {
  isSelected: boolean;
  onSelect: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  rightBadge?: React.ReactNode;
  className?: string;
}

export function DispatchRadioOption({
  isSelected,
  onSelect,
  title,
  subtitle,
  icon,
  rightBadge,
  className = "",
}: DispatchRadioOptionProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`p-4 rounded-[18px] bg-white cursor-pointer transition-all flex items-center justify-between shadow-sm border select-none ${
        isSelected
          ? "border-[1.5px] border-main ring-1 ring-main/15 shadow-[0_2px_12px_rgba(255,104,31,0.08)]"
          : "border-border-default/80 hover:border-gray-300"
      } ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-bold text-foreground truncate">
            {title}
          </div>
          {subtitle && (
            <div className="text-[12px] text-foreground-muted mt-0.5 truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 pl-3">
        {rightBadge}
        {/* Custom Radio Indicator */}
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? "border-2 border-main bg-white"
              : "border border-gray-300 bg-white"
          }`}
        >
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-main" />}
        </div>
      </div>
    </div>
  );
}

export default DispatchRadioOption;
