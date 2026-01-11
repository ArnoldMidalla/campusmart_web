"use client";

import { Home, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const baseIcon =
    "p-2 rounded-full border border-neutral-200 transition-all";
  const activeIcon = "bg-main text-white py-2 px-4";
  const inactiveIcon = "bg-white text-black";

  return (
    <main className="fixed bottom-0 left-0 w-full flex justify-center pb-6 z-40 font-dmSans text-sm">
      <div className="backdrop-blur-xs flex gap-4 items-center py-2 px-2 rounded-full border border-neutral-200 bg-white/30">

        {/* Home */}
        <Link
          href="/"
          className={`flex gap-1 items-center rounded-full ${baseIcon}
            ${isActive("/") ? activeIcon : inactiveIcon}`}
        >
          <Home size={18} />
          {isActive("/") && <p className="font-medium">Home</p>}
        </Link>

        {/* Search */}
        <Link
          href="/search"
          className={`${baseIcon} flex gap-1 ${
            isActive("/search") ? activeIcon : inactiveIcon
          }`}
        >
          <Search size={18} />
          {isActive("/search") && <p className="font-medium">Search</p>}
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`${baseIcon} flex gap-1 ${
            isActive("/cart") ? activeIcon : inactiveIcon
          }`}
        >
          <ShoppingCart size={18} />
          {isActive("/cart") && <p className="font-medium">Cart</p>}
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`${baseIcon} ${
            isActive("/profile") ? activeIcon : inactiveIcon
          }`}
        >
          <UserRound size={18} />
        </Link>
      </div>
    </main>
  );
}
