"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        router.replace(user.role === "SELLER" ? "/sellers" : "/");
      } else {
        router.replace("/onboarding/role-select");
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-satoshi tracking-tight overflow-hidden">
      <main className="flex flex-col max-w-md w-full items-center justify-center min-h-dvh px-6">

        {/* Logo mark */}
        <div className="flex flex-col items-center gap-3 animate-[fadeUp_0.6s_ease_forwards]">
          {/* 2×2 icon grid — mirrors the design */}
          <div className="grid grid-cols-2 gap-[6px]">
            <div className="w-9 h-9 rounded-full bg-main" />
            <div className="w-9 h-9 rounded-full bg-main" />
            <div className="w-9 h-9 rounded-[10px] bg-main" />
            <div className="w-9 h-9 rounded-[10px] bg-main" />
          </div>

          {/* Wordmark */}
          <p className="text-main text-[38px] font-bold tracking-tighter leading-none">
            CampusMart
          </p>

          {/* Tagline */}
          <p className="text-main/70 text-[15px] font-medium tracking-tight">
            Browse. Buy. Sell Items
          </p>
        </div>

        {/* Bottom tagline */}
        <p className="absolute bottom-10 text-neutral-400 text-[13px] font-medium text-center leading-relaxed">
          The marketplace
          <br />
          for everyone, by students.
        </p>
      </main>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
