"use client";

import { Heart, Home, ShoppingCart, TextSearch, UserRound, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/categories", icon: TextSearch, label: "Categories" },
  { href: "/favourites", icon: Heart, label: "Favourites" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/profile", icon: UserRound, label: "Profile" },
];

/**
 * SideNav — persistent left sidebar shown at lg+ breakpoints.
 * The mobile pill nav (nav.tsx) handles everything below lg.
 */
export default function SideNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden lg:flex flex-col w-60 xl:w-64 min-h-dvh border-r border-neutral-100 bg-white sticky top-0 shrink-0 py-8 px-4">
      {/* ── Brand ── */}
      <Link href="/" className="flex items-center gap-2.5 px-2 mb-10">
        {/* <div className="size-9 rounded-xl flex items-center justify-center shadow-sm shrink-0"> */}
          {/* <Store size={18} color="white" strokeWidth={2} /> */}
          <Image src="/favicon.ico" alt="Logo" width={28} height={28} />
        {/* </div> */}
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[15px] tracking-tight text-neutral-900">
            CampusMart
          </span>
          {/* <span className="text-[10px] text-neutral-500 font-medium tracking-wide">
            Campus marketplace
          </span> */}
        </div>
      </Link>

      {/* ── Nav links ── */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-widest px-3 mb-2">
          Menu
        </p>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[14px] ${
                active
                  ? "bg-orange-50 text-main"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? "text-main" : "text-neutral-500"}
              />
              {label}
              {active && (
                <span className="ml-auto size-1.5 rounded-full bg-main" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-2 pt-6 border-t border-neutral-100">
        <p className="text-[11px] text-neutral-400 font-medium">
          © {new Date().getFullYear()} CampusMart
        </p>
      </div>
    </aside>
  );
}
