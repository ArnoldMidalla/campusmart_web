"use client";

import { useState, useMemo } from "react";
import { Bell } from "lucide-react";

import { type OrderStatus } from "@/app/store/useOrdersStore";
import { useSellerOrders } from "@/lib/api/hooks/useSellerOrders";
import { useSellerStore } from "@/app/store/useSellerStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import OrderCard from "@/app/sellers/components/OrderCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: OrderStatus[] = ["Awaiting drop-off", "Dropped off", "Completed"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useSellerOrders();
  const { user } = useAuthStore();
  const sellerName = user?.firstName || user?.email?.split('@')[0] || "Seller";
  const [activeTab, setActiveTab] = useState<OrderStatus>("Awaiting drop-off");

  const filtered = useMemo(
    () => orders.filter((o) => o.status === activeTab),
    [orders, activeTab]
  );

  return (
    <main className="flex flex-col max-w-md w-full pb-32">

        {/* ── Header ── */}
        <div className="bg-white px-4 pt-10 pb-4 flex flex-col gap-4">
          {/* Greeting row */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-bold">Hi {sellerName} 👋</p>
              <p className="text-neutral-400 text-sm mt-0.5">Track all your orders easily</p>
            </div>
            <button className="size-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition">
              <Bell size={18} />
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-seller-main text-white"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Order list ── */}
        <div className="flex flex-col gap-3 px-4 pt-4 mt-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-2 text-neutral-400">
              <p className="text-sm font-medium">Loading orders…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-24 gap-2 text-red-400">
              <p className="text-sm font-medium">Failed to load orders. Please try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-2 text-neutral-400">
              <p className="text-sm font-medium">No orders here</p>
              <p className="text-xs">Orders in this status will appear here</p>
            </div>
          ) : (
            filtered.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>

    </main>
  );
}