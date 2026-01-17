"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightItems?: React.ReactNode;
  subtitle?: string;
}

export default function PageHeader({
  title,
  showBack = true,
  rightItems,
  subtitle,
}: PageHeaderProps) {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="size-8 bg-white rounded-md border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-center text-lg font-medium line-clamp-1 px-2">
            {title}
          </p>
        </div>
        {rightItems && (
          <div className="shrink-0">
            {rightItems}
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-center text-sm text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}