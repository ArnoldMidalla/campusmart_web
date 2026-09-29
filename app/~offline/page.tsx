"use client";

import React from 'react';
import Link from 'next/link';

export default function OfflineFallback() {
  return (
    <main className="flex flex-col items-center justify-center min-h-dvh bg-neutral-50 px-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 max-w-sm w-full flex flex-col items-center gap-4">
        <div className="text-6xl mb-2">📡</div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">You're offline</h1>
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          It looks like you've lost your internet connection. But don't worry, parts of the app are still available offline!
        </p>
        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-main text-white py-3 rounded-full font-medium hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Try Again
          </button>
          <Link href="/cart" className="w-full text-main font-medium py-3 rounded-full hover:bg-neutral-50 active:scale-[0.98] transition-all border border-neutral-200">
            View Offline Cart
          </Link>
        </div>
      </div>
    </main>
  );
}
