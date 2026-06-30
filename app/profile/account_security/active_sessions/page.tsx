"use client";

import { Smartphone, Monitor, Tablet, AlertCircle } from "lucide-react";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";

export default function ActiveSessionsPage() {
  return (
    <>
      <main className="pb-36 pt-8 px-6 md:ml-64">
        <PageHeader title="Active Sessions" showBack={true} />

        {/* ── CURRENT SESSION ── */}
        <section className="mt-8 flex flex-col gap-4">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Current Session
          </p>
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Smartphone size={22} className="text-main" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[15px] font-semibold text-neutral-900 truncate">
                  iPhone 15 Pro Max
                </p>
                <span className="shrink-0 bg-green-100 text-green-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  This device
                </span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">iOS 19.1 · Safari</p>
              <p className="text-sm text-neutral-500 mt-0.5">Lagos, Nigeria · 105.112.xx.xx</p>
              <p className="text-[13px] font-semibold text-green-500 flex items-center gap-1.5 mt-1.5">
                <span className="size-2 rounded-full bg-green-500" />
                Active now
              </p>
            </div>
          </div>
        </section>

        {/* ── OTHER SESSIONS ── */}
        <section className="mt-8 flex flex-col gap-6">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Other Sessions
          </p>

          {/* Device 1 */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Monitor size={22} className="text-main" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[15px] font-semibold text-neutral-900 truncate">
                  MacBook Pro
                </p>
                <button
                  disabled
                  className="shrink-0 bg-red-50 text-red-500 text-[13px] font-semibold px-4 py-1.5 rounded-full opacity-90"
                >
                  Revoke
                </button>
              </div>
              <p className="text-sm text-neutral-400 mt-1">macOS Sequoia · Chrome</p>
              <p className="text-sm text-neutral-400 mt-0.5">Lagos, Nigeria · 105.112.xx.xx</p>
              <p className="text-[13px] text-neutral-400 mt-1.5">Last active: 2 hours ago</p>
            </div>
          </div>

          {/* Device 2 */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Tablet size={22} className="text-main" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[15px] font-semibold text-neutral-900 truncate">
                  iPad Air
                </p>
                <button
                  disabled
                  className="shrink-0 bg-red-50 text-red-500 text-[13px] font-semibold px-4 py-1.5 rounded-full opacity-90"
                >
                  Revoke
                </button>
              </div>
              <p className="text-sm text-neutral-400 mt-1">iPadOS 19 · Safari</p>
              <p className="text-sm text-neutral-400 mt-0.5">Abuja, Nigeria · 197.210.xx.xx</p>
              <p className="text-[13px] text-neutral-400 mt-1.5">Last active: 3 days ago</p>
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <div className="mt-8 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-4">
          <div className="size-5 rounded-full border-2 border-main flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-main text-[10px] font-bold">!</span>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-neutral-800 mb-0.5">
              Don&apos;t recognize a session?
            </p>
            <p className="text-sm text-neutral-500">
              Revoke it immediately and change your password.
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 pt-3 bg-gradient-to-t from-white via-white/90 to-transparent z-50">
        <div className="w-full max-w-md px-6">
          <button
            disabled
            className="w-full bg-white text-red-500 border border-red-500 rounded-full py-4 font-semibold text-[15px] transition-all"
          >
            Sign Out All Other Devices
          </button>
        </div>
      </div>

      <Nav />
    </>
  );
}
