"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import PageHeader from "@/app/components/PageHeader";
import RevenueBarChart from "./components/RevenueBarChart";

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: Replace with real API data once analytics endpoint is available.

const REVENUE = 2_847_500;
const REVENUE_CHANGE = 24.5;

const STATS: {
  label: string;
  value: string;
  changeLabel: string;
  positive: boolean;
}[] = [
  { label: "Orders",   value: "156",  changeLabel: "12%", positive: true  },
  { label: "Products", value: "48",   changeLabel: "6",   positive: true  },
  { label: "Visitors", value: "2.4K", changeLabel: "3%",  positive: false },
];

const REVENUE_TREND = [
  { label: "Jan", value: 320_000 },
  { label: "Feb", value: 410_000 },
  { label: "Mar", value: 360_000 },
  { label: "Apr", value: 430_000 },
  { label: "May", value: 480_000, active: true },
  { label: "Jun", value: 380_000 },
  { label: "Jul", value: 300_000 },
];

const TOP_PRODUCTS: {
  id: number;
  name: string;
  sold: number;
  revenue: string;
  change: number;
  image: string;
}[] = [
  {
    id: 1,
    name: "UrbanFlex Cargo Pants",
    sold: 42,
    revenue: "₦609K",
    change: 18,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "The Ordinary Face Wash",
    sold: 38,
    revenue: "₦551K",
    change: 12,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Delicious Rice & Beans",
    sold: 35,
    revenue: "₦168K",
    change: -5,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop&q=60",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Mini sparkline path used in the revenue hero card */
function Sparkline() {
  const points = [
    [0, 50], [30, 38], [60, 44], [90, 30], [120, 22], [150, 18], [180, 6],
  ];
  const d = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 180 60"
      width={120}
      height={40}
      fill="none"
      aria-hidden="true"
    >
      <path d={d} stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
      {/* Terminal dot */}
      <circle cx={180} cy={6} r={4} fill="white" opacity={0.9} />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  changeLabel: string;
  positive: boolean;
}

function StatCard({ label, value, changeLabel, positive }: StatCardProps) {
  const Arrow = positive ? ArrowUpRight : ArrowDownRight;
  const changeColor = positive ? "text-green-500" : "text-red-500";

  return (
    <div className="flex-1 flex flex-col gap-1.5 bg-card rounded-2xl p-4 border border-border-default">
      <p className="text-foreground-muted text-[11px] font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className="text-[22px] font-bold text-foreground leading-none">
        {value}
      </p>
      <span className={`flex items-center gap-0.5 text-xs font-semibold ${changeColor}`}>
        <Arrow size={13} />
        {changeLabel}
      </span>
    </div>
  );
}

interface TopProductRowProps {
  product: (typeof TOP_PRODUCTS)[0];
  rank: number;
}

function TopProductRow({ product, rank }: TopProductRowProps) {
  const isPositive = product.change >= 0;
  const Arrow = isPositive ? ArrowUpRight : ArrowDownRight;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border-default last:border-b-0">
      {/* Product image */}
      <div className="relative size-12 rounded-xl overflow-hidden shrink-0 bg-surface-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {product.name}
        </p>
        <p className="text-xs text-foreground-muted mt-0.5">
          {product.sold} sold · {product.revenue}
        </p>
      </div>

      {/* Change badge */}
      <span className={`flex items-center gap-0.5 text-sm font-bold shrink-0 ${changeColor}`}>
        <Arrow size={14} />
        {Math.abs(product.change)}%
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <main className="flex flex-col w-full max-w-md pb-32 bg-surface-muted min-h-dvh">

      {/* ── Header ── */}
      <div className="bg-card px-4 pt-10 pb-4">
        <PageHeader
          title="Analytics"
          showBack
          rightItems={
            <button className="px-4 py-1.5 rounded-full bg-surface-muted text-foreground-muted text-sm font-medium border border-border-default">
              This Month
            </button>
          }
        />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">

        {/* ── Revenue Hero Card ── */}
        <div
          className="relative rounded-3xl overflow-hidden p-5 flex flex-col gap-2"
          style={{
            background:
              "linear-gradient(135deg, #1a2e6e 0%, #13368B 50%, #1a5276 100%)",
          }}
        >
          {/* Sparkline — top-right */}
          <div className="absolute top-4 right-4">
            <Sparkline />
          </div>

          <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
            Total Revenue
          </p>
          <p className="text-white text-[32px] font-bold leading-none tracking-tight">
            ₦{REVENUE.toLocaleString("en-NG")}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">
              <ArrowUpRight size={12} />
              {REVENUE_CHANGE}%
            </span>
            <p className="text-white/50 text-xs">vs last month</p>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="flex gap-3">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ── Revenue Trend ── */}
        <div className="bg-card rounded-3xl p-5 border border-border-default">
          <p className="text-base font-bold text-foreground mb-4">
            Revenue Trend
          </p>
          <RevenueBarChart data={REVENUE_TREND} height={190} />
        </div>

        {/* ── Top Selling Products ── */}
        <div className="bg-card rounded-3xl p-5 border border-border-default">
          <p className="text-base font-bold text-foreground mb-1">
            Top Selling Products
          </p>
          <div className="flex flex-col">
            {TOP_PRODUCTS.map((product, i) => (
              <TopProductRow key={product.id} product={product} rank={i + 1} />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
