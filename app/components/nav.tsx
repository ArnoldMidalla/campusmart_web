"use client";
import { Heart, Home, ShoppingCart, TextSearch, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);
  const baseIcon = "p-2 rounded-full border border-neutral-200 transition-all md:w-full md:justify-start md:px-4 md:py-3 md:rounded-xl md:border-none md:gap-3";
  const activeIcon = "bg-main text-white py-2 px-4";
  const inactiveIcon = "bg-white text-black hover:bg-neutral-50";

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/categories", icon: TextSearch, label: "Categories" },
    { href: "/favourites", icon: Heart, label: "Favourites" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "/profile", icon: UserRound, label: "Account" },
  ];

  return (
    <main className="fixed bottom-0 left-0 w-full flex justify-center pb-6 z-70 font-dmSans text-sm md:absolute md:top-0 md:h-full md:w-64 md:border-r md:border-neutral-200 md:bg-white md:z-40 md:justify-start md:pb-0">
      <div className="backdrop-blur-sm flex gap-4 items-center py-2 px-2 rounded-full border border-neutral-200 md:sticky md:top-0 md:h-screen md:flex-col md:w-full md:px-4 md:pt-8 md:border-none md:gap-2 md:items-start md:rounded-none">
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
              <p className={`font-medium ${active ? 'block' : 'hidden md:block'}`}>{item.label}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}