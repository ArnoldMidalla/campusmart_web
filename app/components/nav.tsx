"use client";
import { Home, ShoppingCart, TextSearch, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const baseIcon = "p-2 rounded-full border border-neutral-200 transition-all";
  const activeIcon = "bg-main text-white py-2 px-4";
  const inactiveIcon = "bg-white text-black";

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/categories", icon: TextSearch, label: "Categories" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "/profile", icon: UserRound, label: "Profile" },
  ];

  return (
    <main className="fixed bottom-0 left-0 w-full flex justify-center pb-6 z-40 font-dmSans text-sm">
      <div className="backdrop-blur-sm flex gap-4 items-center py-2 px-2 rounded-full border border-neutral-200 bg-white/20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex gap-1 items-center rounded-full ${baseIcon} ${
                active ? activeIcon : inactiveIcon
              }`}
            >
              <Icon size={18} />
              {active && <p className="font-medium">{item.label}</p>}
            </Link>
          );
        })}
      </div>
    </main>
  );
}