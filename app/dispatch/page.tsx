"use client";

import {
  Bell,
  BarChart2,
  Download,
  ShieldCheck,
  Flag,
  AlertCircle,
  Bike,
  Users,
  ShoppingBag,
  Truck,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DispatchNav from "../components/DispatchNav";
import { DispatchHeader } from "./components";
import { useDispatchContext } from "./context";

export default function AdminDashboardPage() {
  const pathname = usePathname();
  const {
    pendingVerificationsCount,
    reportedProductsCount,
    openDisputesCount,
    onlineRidersCount,
  } = useDispatchContext();

  return (
    <main className="flex-1 flex flex-col pb-28">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Admin Dashboard"
        subtitle="Monday, 24 March · All systems normal"
        avatarBg="bg-main"
        rightAction={
          <button
            aria-label="Notifications"
            className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] relative border border-border-default shrink-0 transition-active hover:bg-gray-50"
          >
            <Bell size={20} className="text-foreground" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-main rounded-full border-2 border-white" />
          </button>
        }
      />

      {/* GMV Card */}
      <div className="px-6 mb-8">
        <div className="bg-[#1f1f1f] rounded-[2rem] p-6 relative overflow-hidden shadow-sm">
          {/* Background Shape */}
          <div className="absolute -top-16 -right-8 w-48 h-48 bg-[#63331c] rounded-full opacity-80 blur-xl mix-blend-screen pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#75391e] rounded-full opacity-40 blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <p className="text-[#a1a1a1] text-[13px] font-medium mb-1">
              Gross Merchandise Value &middot; 30 days
            </p>
            <h2 className="text-white text-[32px] font-bold mb-1 tracking-tight">
              &#8358;4,812,600
            </h2>
            <p className="text-[#a1a1a1] text-xs mb-6">
              +18.4% vs last month &middot; 1,284 orders
            </p>

            <div className="flex gap-3">
              <Link
                href="/dispatch/analytics"
                className="flex-1 bg-main hover:bg-main-light transition-colors text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
              >
                <BarChart2 size={16} />
                Analytics
              </Link>
              <Link
                href="/dispatch/transactions"
                className="flex-1 bg-[#333333] hover:bg-[#444] transition-colors text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm border border-[#444]"
              >
                <Download size={16} />
                Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Needs your attention */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Needs your attention
        </h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x">
          {/* Card 1 */}
          <Link
            href="/dispatch/users/verification"
            className="bg-card rounded-[1.5rem] p-4 flex flex-col items-center min-w-[95px] flex-1 shrink-0 snap-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 hover:border-main/40 transition-colors"
          >
            <div className="relative mb-3">
              <div className="w-12 h-12 bg-main-subtle rounded-full flex items-center justify-center">
                <ShieldCheck size={20} className="text-main" />
              </div>
              <div className="absolute -top-1 -right-2 bg-error text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-card">
                {pendingVerificationsCount}
              </div>
            </div>
            <p className="text-[11px] font-bold text-center text-foreground leading-tight">
              Verify
              <br />
              Sellers
            </p>
          </Link>

          {/* Card 2 */}
          <Link
            href="/dispatch/products"
            className="bg-card rounded-[1.5rem] p-4 flex flex-col items-center min-w-[95px] flex-1 shrink-0 snap-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 hover:border-main/40 transition-colors"
          >
            <div className="relative mb-3">
              <div className="w-12 h-12 bg-main-subtle rounded-full flex items-center justify-center">
                <Flag size={20} className="text-main" />
              </div>
              <div className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-card">
                {reportedProductsCount}
              </div>
            </div>
            <p className="text-[11px] font-bold text-center text-foreground leading-tight">
              Reported
              <br />
              Items
            </p>
          </Link>

          {/* Card 3 */}
          <Link
            href="/dispatch/orders?tab=disputes"
            className="bg-card rounded-[1.5rem] p-4 flex flex-col items-center min-w-[95px] flex-1 shrink-0 snap-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 hover:border-main/40 transition-colors"
          >
            <div className="relative mb-3">
              <div className="w-12 h-12 bg-main-subtle rounded-full flex items-center justify-center">
                <AlertCircle size={20} className="text-main" />
              </div>
              <div className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-card">
                {openDisputesCount}
              </div>
            </div>
            <p className="text-[11px] font-bold text-center text-foreground leading-tight">
              Open
              <br />
              Disputes
            </p>
          </Link>

          {/* Card 4 */}
          <Link
            href="/dispatch/riders/register"
            className="bg-card rounded-[1.5rem] p-4 flex flex-col items-center min-w-[95px] flex-1 shrink-0 snap-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 hover:border-main/40 transition-colors"
          >
            <div className="relative mb-3">
              <div className="w-12 h-12 bg-main-subtle rounded-full flex items-center justify-center">
                <Bike size={20} className="text-main" />
              </div>
            </div>
            <p className="text-[11px] font-bold text-center text-foreground leading-tight">
              Register
              <br />
              Rider
            </p>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {/* Users */}
        <Link
          href="/dispatch/users"
          className="bg-card rounded-[1.5rem] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col hover:border-main/40 transition-colors"
        >
          <div className="w-10 h-10 bg-main-subtle rounded-[10px] flex items-center justify-center mb-6">
            <Users size={18} className="text-main" />
          </div>
          <h2 className="text-[26px] font-bold text-foreground mb-1">8,412</h2>
          <p className="text-xs text-foreground-muted mb-2">Total users</p>
          <p className="text-[11px] font-bold text-[#10B981]">+312 this week</p>
        </Link>

        {/* Orders */}
        <Link
          href="/dispatch/orders"
          className="bg-card rounded-[1.5rem] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col hover:border-main/40 transition-colors"
        >
          <div className="w-10 h-10 bg-main-subtle rounded-[10px] flex items-center justify-center mb-6">
            <ShoppingBag size={18} className="text-main" />
          </div>
          <h2 className="text-[26px] font-bold text-foreground mb-1">1,284</h2>
          <p className="text-xs text-foreground-muted mb-2">Total orders</p>
          <p className="text-[11px] font-bold text-[#10B981]">+9.2%</p>
        </Link>

        {/* Dispatch */}
        <Link
          href="/dispatch/riders"
          className="bg-card rounded-[1.5rem] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col hover:border-main/40 transition-colors"
        >
          <div className="w-10 h-10 bg-main-subtle rounded-[10px] flex items-center justify-center mb-6">
            <Truck size={18} className="text-main" />
          </div>
          <h2 className="text-[26px] font-bold text-foreground mb-1">96.4%</h2>
          <p className="text-xs text-foreground-muted mb-2">Dispatch rate</p>
          <p className="text-[11px] font-bold text-[#10B981]">{onlineRidersCount} riders online</p>
        </Link>

        {/* Revenue */}
        <Link
          href="/dispatch/transactions"
          className="bg-card rounded-[1.5rem] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col hover:border-main/40 transition-colors"
        >
          <div className="w-10 h-10 bg-main-subtle rounded-[10px] flex items-center justify-center mb-6">
            <span className="text-main font-bold text-lg">&#8358;</span>
          </div>
          <h2 className="text-[26px] font-bold text-foreground mb-1">&#8358;612k</h2>
          <p className="text-xs text-foreground-muted mb-2">Revenue</p>
          <p className="text-[11px] font-bold text-[#10B981]">Transactions &rarr;</p>
        </Link>
      </div>

      <DispatchNav />
    </main>
  );
}
