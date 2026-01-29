"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  showBack?: boolean;
  rightItems?: React.ReactNode;
}

export default function PageHeader({
  showBack = true,
  rightItems,
}: PageHeaderProps) {
  const router = useRouter();
  
  return (
      <div className="flex items-center justify-between">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {rightItems && (
          <div className="shrink-0">
            {rightItems}
          </div>
        )}
      </div>
  );
}