"use client";

import { useState } from "react";
import {
  Download,
  Users,
  ShoppingCart,
  ShoppingBag,
  Truck,
  ChevronRight,
} from "lucide-react";
import DispatchNav from "../../components/DispatchNav";
import Link from "next/link";
import { DispatchHeader } from "../components";

type TimeRange = "7 days" | "30 days" | "90 days";

interface WeeklyBar {
  day: string;
  count: number;
  heightPercent: number;
  isPeak?: boolean;
}

const WEEKLY_DATA: WeeklyBar[] = [
  { day: "M", count: 120, heightPercent: 40 },
  { day: "T", count: 180, heightPercent: 65 },
  { day: "W", count: 95, heightPercent: 32 },
  { day: "T", count: 210, heightPercent: 78 },
  { day: "F", count: 190, heightPercent: 70 },
  { day: "S", count: 320, heightPercent: 100, isPeak: true },
  { day: "S", count: 240, heightPercent: 82 },
];

const POPULAR_CATEGORIES = [
  { name: "Fashion & Thrift", percentage: "38%", orders: "488 orders" },
  { name: "Electronics & Tech", percentage: "26%", orders: "334 orders" },
  { name: "Books & Stationeries", percentage: "21%", orders: "270 orders" },
  { name: "Food & Groceries", percentage: "15%", orders: "192 orders" },
];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30 days");
  const [activeTooltip, setActiveTooltip] = useState<WeeklyBar | null>(null);

  return (
    <main className="flex-1 flex flex-col pb-36">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Analytics"
        subtitle="Platform performance at a glance"
        rightAction={
          <Link
            href="/dispatch/transactions"
            aria-label="Download statement"
            className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center border border-border-default shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:bg-gray-50 transition-colors"
          >
            <Download size={20} className="text-foreground" />
          </Link>
        }
      />

        {/* Time Range Pills Toggle */}
        <div className="px-6 mb-5">
          <div className="bg-[#EAEAEA]/80 p-1 rounded-[16px] flex">
            {(["7 days", "30 days", "90 days"] as TimeRange[]).map((range) => {
              const isSelected = selectedRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`flex-1 py-2.5 rounded-[12px] text-[13px] font-bold transition-all ${
                    isSelected
                      ? "bg-white text-foreground shadow-sm"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Metric Cards Grid */}
        <div className="px-6 grid grid-cols-2 gap-3.5 mb-5">
          {/* 1. Total users */}
          <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-[12px] bg-orange-50/80 text-main flex items-center justify-center mb-3">
              <Users size={18} />
            </div>
            <div>
              <h3 className="text-[26px] font-bold text-foreground leading-none mb-1.5">
                8,412
              </h3>
              <p className="text-xs text-foreground-muted mb-1">Total users</p>
              <p className="text-[11px] font-bold text-[#10B981]">+312</p>
            </div>
          </div>

          {/* 2. Active buyers */}
          <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-[12px] bg-orange-50/80 text-main flex items-center justify-center mb-3">
              <ShoppingCart size={18} />
            </div>
            <div>
              <h3 className="text-[26px] font-bold text-foreground leading-none mb-1.5">
                3,108
              </h3>
              <p className="text-xs text-foreground-muted mb-1">Active buyers</p>
              <p className="text-[11px] font-bold text-[#10B981]">+4.1%</p>
            </div>
          </div>

          {/* 3. Active sellers */}
          <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-[12px] bg-orange-50/80 text-main flex items-center justify-center mb-3">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="text-[26px] font-bold text-foreground leading-none mb-1.5">
                642
              </h3>
              <p className="text-xs text-foreground-muted mb-1">Active sellers</p>
              <p className="text-[11px] font-bold text-[#10B981]">+18</p>
            </div>
          </div>

          {/* 4. Delivery success */}
          <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-border-default/50 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-[12px] bg-orange-50/80 text-main flex items-center justify-center mb-3">
              <Truck size={18} />
            </div>
            <div>
              <h3 className="text-[26px] font-bold text-foreground leading-none mb-1.5">
                96.4%
              </h3>
              <p className="text-xs text-foreground-muted mb-1">
                Delivery success
              </p>
              <p className="text-[11px] font-bold text-[#10B981]">+1.1%</p>
            </div>
          </div>
        </div>

        {/* Orders This Week Bar Chart Card */}
        <div className="px-6 mb-5">
          <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-border-default/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-bold text-foreground">
                Orders this week
              </h3>
              <span className="text-[13px] text-foreground-muted">
                1,284 total
              </span>
            </div>

            {/* Bars container */}
            <div className="flex items-end justify-between gap-2.5 h-36 px-1 mb-2">
              {WEEKLY_DATA.map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveTooltip(item)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  {/* Tooltip on hover */}
                  {activeTooltip?.day === item.day && (
                    <div className="mb-2 bg-[#222222] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap animate-in fade-in duration-150">
                      {item.count} orders
                    </div>
                  )}

                  {/* Vertical bar */}
                  <div
                    style={{ height: `${item.heightPercent}%` }}
                    className={`w-full rounded-[10px] transition-all duration-300 ${
                      item.isPeak
                        ? "bg-main shadow-[0_4px_12px_rgba(255,104,31,0.3)]"
                        : "bg-[#FCEEE7] group-hover:bg-[#F9DACB]"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Days labels */}
            <div className="flex items-center justify-between px-1 text-center">
              {WEEKLY_DATA.map((item, idx) => (
                <span
                  key={idx}
                  className={`flex-1 text-[11px] font-bold ${
                    item.isPeak ? "text-main" : "text-foreground-muted"
                  }`}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-bold text-foreground">
              Popular categories
            </h3>
            <span className="text-[12px] font-semibold text-main hover:opacity-80 cursor-pointer">
              View all
            </span>
          </div>

          <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-border-default/50 overflow-hidden divide-y divide-border-default/60">
            {POPULAR_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
              >
                <div>
                  <h4 className="text-[13.5px] font-bold text-foreground">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-foreground-muted mt-0.5">
                    {cat.orders}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-main">
                    {cat.percentage}
                  </span>
                  <ChevronRight size={16} className="text-foreground-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DispatchNav />
      </main>
  );
}
