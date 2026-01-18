"use client";

import { useState, useEffect } from "react";
import {
  LogOut,
  Settings,
  Heart,
  Package,
  MessageSquare,
  Shield,
  Bell,
  HelpCircle,
  ChevronRight,
  Edit2,
} from "lucide-react";
import Link from "next/link";
import Nav from "../components/nav";
import PageHeader from "../components/PageHeader";
import { useCartStore } from "../store/useCartStore";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const { cart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@campus.edu",
    phone: "+234 701 234 5678",
    verified: true,
    joinedDate: "January 2024",
  };

  const menuItems = [
    {
      icon: Package,
      label: "My Orders",
      description: "Track and manage your purchases",
      href: "/checkout",
      badge: null,
    },
    {
      icon: Heart,
      label: "Wishlist",
      description: "Your saved items",
      href: "/cart",
      badge: cart.length > 0 ? `${cart.length}` : null,
    },
    {
      icon: MessageSquare,
      label: "Messages",
      description: "Chat with sellers",
      href: "#",
      badge: "2",
    },
    {
      icon: Shield,
      label: "Account Security",
      description: "Manage passwords and verification",
      href: "#",
      badge: null,
    },
  ];

  const settingsItems = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage notification preferences",
      href: "#",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "General app settings",
      href: "#",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "FAQs and contact support",
      href: "#",
    },
  ];

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-6 max-w-md w-full pb-28 px-6 pt-12">
        <PageHeader title="Profile" showBack={false} />

        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold text-neutral-800">
                  {user.name}
                </h2>
                {user.verified && (
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-700 mb-1">{user.email}</p>
              <p className="text-sm text-neutral-600">{user.phone}</p>
              <p className="text-xs text-neutral-500 mt-2">
                Member since {user.joinedDate}
              </p>
            </div>
            <button className="p-2 bg-white rounded-full border border-blue-200 hover:bg-blue-50 transition">
              <Edit2 size={18} className="text-blue-600" />
            </button>
          </div>
        </div>

        {/* Quick Access Menu */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-neutral-700">Quick Access</p>
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.label} href={item.href}>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800">
                        {item.label}
                      </p>
                      <p className="text-xs text-neutral-600 truncate">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="bg-main text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={18} className="text-neutral-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200" />

        {/* Settings Menu */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-neutral-700">Settings</p>
          <div className="flex flex-col gap-2">
            {settingsItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.label} href={item.href}>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800">
                        {item.label}
                      </p>
                      <p className="text-xs text-neutral-600 truncate">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-neutral-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-3 p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition">
            <div className="p-2 bg-red-100 rounded-lg">
              <LogOut size={18} className="text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-red-700">Logout</p>
              <p className="text-xs text-red-600">Sign out of your account</p>
            </div>
            <ChevronRight size={18} className="text-red-400" />
          </button>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center">
            Campusmart v1.0.0 • {new Date().getFullYear()}
          </p>
        </div>
      </main>
      <Nav />
    </div>
  );
}
