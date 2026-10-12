"use client";

import { useState, Suspense } from "react";
import {
  Search,
  ListFilter,
  MoreVertical,
  AlertCircle,
  Truck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import DispatchNav from "../../components/DispatchNav";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { DispatchHeader, DispatchBadge } from "../components";
import { useDispatchContext } from "../context";
import { OrderTab, OrderStatus } from "../types";

const getOrderIcon = (status: OrderStatus) => {
  if (status === "DISPUTE") return { icon: AlertCircle, color: "bg-red-50 text-[#E34149]" };
  if (status === "IN TRANSIT") return { icon: Truck, color: "bg-blue-50 text-blue-600" };
  if (status === "DELIVERED") return { icon: CheckCircle2, color: "bg-green-50 text-green-600" };
  if (status === "CANCELLED") return { icon: XCircle, color: "bg-gray-100 text-gray-500" };
  return { icon: AlertTriangle, color: "bg-amber-50 text-amber-700" };
};

function OrdersContent() {
  const searchParams = useSearchParams();
  const { orders, openDisputesCount } = useDispatchContext();
  const initialTab = (searchParams.get("tab") as OrderTab) || "all";
  const [activeTab, setActiveTab] = useState<OrderTab>(
    initialTab === "disputes" ? "disputes" : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredOrders = orders.filter((o) => {
    // Tab filter
    if (activeTab === "in_progress" && o.status !== "IN TRANSIT") return false;
    if (activeTab === "cancelled" && o.status !== "CANCELLED") return false;
    if (activeTab === "failed" && o.status !== "FAILED") return false;
    if (activeTab === "disputes" && o.status !== "DISPUTE") return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.buyer.toLowerCase().includes(q) ||
        o.store.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <main className="flex-1 flex flex-col pb-28">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Orders"
        subtitle="Monitor every marketplace order"
        rightAction={
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="More options"
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-default shrink-0 transition-active hover:bg-gray-50"
            >
              <MoreVertical size={20} className="text-foreground" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-border-default overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Filter settings
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Search & Filter */}
      <div className="px-6 mb-4 flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-foreground-muted" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, buyer or seller"
            className="w-full bg-white h-12 pl-11 pr-4 rounded-xl border border-border-default text-[13px] text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-main/20"
          />
        </div>
        <button className="w-12 h-12 bg-[#222222] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
          <ListFilter size={20} className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-border-default/60 flex items-center gap-6 overflow-x-auto no-scrollbar">
        {/* All Tab */}
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "all"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          All
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* In Progress Tab */}
        <button
          onClick={() => setActiveTab("in_progress")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "in_progress"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          In progress
          {activeTab === "in_progress" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Cancelled Tab */}
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "cancelled"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          Cancelled
          {activeTab === "cancelled" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Failed Tab */}
        <button
          onClick={() => setActiveTab("failed")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "failed"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          Failed
          {activeTab === "failed" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Disputes Tab */}
        <button
          onClick={() => setActiveTab("disputes")}
          className={`pb-3 pt-2 text-[14px] flex items-center gap-2 relative whitespace-nowrap transition-colors ${
            activeTab === "disputes"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          <span>Disputes</span>
          <span className="bg-[#E34149] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
            {openDisputesCount}
          </span>
          {activeTab === "disputes" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>
      </div>

      {/* List Header */}
      <div className="px-6 mt-6 mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-foreground">
          {filteredOrders.length} orders
        </h2>
        <span className="text-[13px] font-semibold text-main">
          Today
        </span>
      </div>

      {/* Orders List */}
      <div className="px-6">
        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => {
              const { icon: Icon, color: iconColor } = getOrderIcon(order.status);
              const isLast = index === filteredOrders.length - 1;

              return (
                <Link
                  key={order.id}
                  href={
                    order.status === "DISPUTE"
                      ? `/dispatch/orders/${order.id}/dispute`
                      : `/dispatch/orders/${order.id}`
                  }
                  className={`p-4 flex items-center gap-3.5 transition-colors hover:bg-gray-50/50 cursor-pointer ${
                    !isLast ? "border-b border-border-default/60" : ""
                  }`}
                >
                  {/* Status Icon Thumbnail */}
                  <div
                    className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${iconColor}`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-[14px] font-bold text-foreground truncate">
                      {order.orderNumber} &middot; {order.buyer}
                    </h3>
                    <p className="text-[12px] text-foreground-muted truncate">
                      {order.store} &middot; {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>

                  {/* Price & Badge */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[14px] font-bold text-foreground">
                      {order.price}
                    </span>
                    <DispatchBadge status={order.status} />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="p-8 text-center text-foreground-muted text-sm">
              No orders found in this category.
            </div>
          )}
        </div>
      </div>

      <DispatchNav />
    </main>
  );
}

export default function DispatchOrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-muted" />}>
      <OrdersContent />
    </Suspense>
  );
}
