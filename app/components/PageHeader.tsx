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
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        {showBack && (
          <div className="w-10">
            <button
              onClick={() => router.back()}
              className="size-8 bg-white rounded-md border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
        <div className="flex-1">
          <p className="text-center text-lg font-medium line-clamp-1">
            {title}
          </p>
        </div>
        <div className="w-10">{rightItems}</div>
      </div>
      {subtitle && (
        <p className="text-center text-sm text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}
