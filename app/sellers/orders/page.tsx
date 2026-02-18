"use client";

import { useState, useMemo } from "react";
import { Bell } from "lucide-react";
import SellersNav from "@/app/sellers/components/sellersNav";
import { useOrdersStore, type OrderStatus } from "@/app/store/useOrdersStore";
import { useSellerStore } from "@/app/store/useSellerStore";
import OrderCard from "@/app/sellers/components/OrderCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: OrderStatus[] = ["Awaiting drop-off", "Dropped off", "Completed"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const { orders } = useOrdersStore();
  const { sellerName } = useSellerStore();
  const [activeTab, setActiveTab] = useState<OrderStatus>("Awaiting drop-off");

  const filtered = useMemo(
    () => orders.filter((o) => o.status === activeTab),
    [orders, activeTab]
  );

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-[#f1f1f1] text-black font-dmSans tracking-tight">
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
                    ? "bg-[#13368B] text-white"
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
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-2 text-neutral-400">
              <p className="text-sm font-medium">No orders here</p>
              <p className="text-xs">Orders in this status will appear here</p>
            </div>
          ) : (
            filtered.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>

      </main>

      <SellersNav />
    </div>
  );
}
