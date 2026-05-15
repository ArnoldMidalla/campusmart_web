"use client";

import { useEffect, useState } from "react";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-main/10 rounded-full flex items-center justify-center animate-pulse">
          <WifiOff className="w-12 h-12 text-main" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-neutral-900 mb-3 tracking-tighter">
        You're Offline
      </h1>
      <p className="text-neutral-500 max-w-xs mb-10 leading-relaxed font-medium">
        It looks like your internet connection is taking a break. Please check your network and try again.
      </p>

      <div className="flex flex-col w-full max-w-xs gap-4">
        <button
          onClick={handleRetry}
          className="flex items-center justify-center gap-2 bg-main text-white py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-main/20"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700 py-4 rounded-2xl font-bold transition-all hover:bg-neutral-200"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <p className="absolute bottom-10 text-neutral-400 text-sm font-medium">
        {isOnline ? "Connection restored! You can refresh now." : "Waiting for connection..."}
      </p>
    </div>
  );
}
