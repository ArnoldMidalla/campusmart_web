"use client";

import SideNav from "./SideNav";

interface AppShellProps {
  children: React.ReactNode;
  /** Extra classes applied to the inner <main> content column */
  className?: string;
  /** Remove the bottom padding reserved for the mobile pill nav (e.g. on pages with their own fixed bar) */
  noBottomPad?: boolean;
}

/**
 * AppShell — the single layout wrapper for every app page.
 *
 * Mobile  (<lg)  : centred single column, max-w-md, bottom-pad for pill nav
 * Tablet  (md)   : centred single column, max-w-2xl
 * Desktop (lg+)  : SideNav on the left, content fills remaining space up to max-w-7xl
 */
export default function AppShell({
  children,
  className = "",
  noBottomPad = false,
}: AppShellProps) {
  return (
    <div className="relative flex min-h-dvh w-full bg-white text-black font-dmSans tracking-tight">
      {/* ── Sidebar — visible lg+ only ── */}
      <SideNav />

      {/* ── Content column ── */}
      <div className="flex flex-1 justify-center overflow-x-hidden">
        <main
          className={`
            w-full
            max-w-md
            md:max-w-2xl
            lg:max-w-none lg:w-full
            xl:max-w-7xl
            ${noBottomPad ? "pb-0" : "pb-28 lg:pb-12"}
            pt-8
            px-0
            ${className}
          `.trim()}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
