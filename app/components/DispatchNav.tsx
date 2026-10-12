"use client";
import BottomFloatingBar from './BottomFloatingBar';
import { Home, Users, ShoppingBag, Truck, BarChart2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DispatchNav() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/dispatch" ? pathname === "/dispatch" : pathname.startsWith(path);
    
  const baseIcon = "p-2 rounded-full border border-border-default transition-all";
  const activeIcon = "bg-main text-white py-2 px-4";
  const inactiveIcon = "bg-card text-foreground hover:bg-surface-muted";

  const navItems = [
    { href: "/dispatch", icon: Home, label: "Home" },
    { href: "/dispatch/users", icon: Users, label: "Users" },
    { href: "/dispatch/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/dispatch/riders", icon: Truck, label: "Dispatch" },
    { href: "/dispatch/analytics", icon: BarChart2, label: "Analytics" },
  ];

  return (
    <BottomFloatingBar zIndex={70} className="text-sm">
      <div className="backdrop-blur-sm flex gap-4 items-center py-2 px-2 rounded-full border border-border-default max-w-[95vw] overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex gap-1 items-center rounded-full whitespace-nowrap shrink-0 ${baseIcon} ${
                active ? activeIcon : inactiveIcon
              }`}
            >
              <Icon size={18} />
              {active && <p className="font-medium text-xs">{item.label}</p>}
            </Link>
          );
        })}
      </div>
    </BottomFloatingBar>
  );
}
