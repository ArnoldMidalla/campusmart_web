"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already in standalone mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Show iOS prompt if on iOS and not standalone
    if (isIOSDevice && !isStandalone) {
      const hasSeenPrompt = localStorage.getItem("pwa_prompt_dismissed");
      if (!hasSeenPrompt) {
        setShowPrompt(true);
      }
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (isIOS) {
      // iOS doesn't support programmatic install, show instructions
      return;
    }

    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa_prompt_dismissed", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-white rounded-3xl shadow-2xl border border-neutral-100 p-5 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500 font-satoshi">
      <button 
        onClick={dismissPrompt}
        className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex gap-4 items-start pr-8">
        <div className="w-14 h-14 bg-main rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-main/20">
          <Download className="text-white w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-neutral-900 text-lg leading-tight mb-1">
            Install Campusmart
          </h3>
          <p className="text-neutral-500 text-sm font-medium leading-snug">
            Add to your home screen for a faster, better shopping experience.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {isIOS ? (
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Instructions for iOS</p>
            <div className="flex items-center gap-2 text-sm text-neutral-700 font-medium">
              <span>Tap the</span>
              <Share className="w-4 h-4 text-blue-500" />
              <span>icon and select</span>
              <span className="font-bold text-neutral-900">"Add to Home Screen"</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full bg-main text-white py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-main/20"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
}
