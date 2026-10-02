"use client";

import { useState } from "react";
import {
  CheckSquare,
  AlertTriangle,
  Star,
  CheckCircle,
  Percent,
  TrendingUp,
} from "lucide-react";
import PageHeader from "@/app/components/PageHeader";
import { cn } from "@/lib/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import SwipeToDismiss from "@/app/components/SwipeToDismiss";

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifCategory = "All" | "Orders" | "Promos" | "System";

interface Notification {
  id: number;
  title: string;
  body: string;
  time: string;
  read: boolean;
  category: Exclude<NotifCategory, "All">;
  icon: React.ReactNode;
  iconBg: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: Replace with real API / push-notification data.

const TODAY: Notification[] = [
  {
    id: 1,
    title: "New Order Received! 🎉",
    body: "#ORD-2026-5102 — ₦14,500",
    time: "2 minutes ago",
    read: false,
    category: "Orders",
    icon: <CheckSquare size={20} />,
    iconBg: "bg-seller-main/10 text-seller-main",
  },
  {
    id: 2,
    title: "Low Stock Alert ⚠️",
    body: '"Cargo Pants" — only 3 left',
    time: "15 minutes ago",
    read: false,
    category: "System",
    icon: <AlertTriangle size={20} />,
    iconBg: "bg-orange-100 text-orange-500",
  },
  {
    id: 3,
    title: "Payment Received 💰",
    body: "₦14,500 credited for Order #5098",
    time: "1 hour ago",
    read: false,
    category: "Orders",
    icon: <TrendingUp size={20} />,
    iconBg: "bg-green-100 text-green-600",
  },
];

const YESTERDAY: Notification[] = [
  {
    id: 4,
    title: "New 5-Star Review ⭐",
    body: '"Great quality product!" — Buyer',
    time: "Yesterday, 4:30 PM",
    read: true,
    category: "System",
    icon: <Star size={20} />,
    iconBg: "bg-yellow-100 text-yellow-500",
  },
  {
    id: 5,
    title: "Order Delivered ✅",
    body: "Order #5095 delivered successfully",
    time: "Yesterday, 2:15 PM",
    read: true,
    category: "Orders",
    icon: <CheckCircle size={20} />,
    iconBg: "bg-green-100 text-green-600",
  },
  {
    id: 6,
    title: "Boost Your Sales!",
    body: "Run a promo on slow-moving items",
    time: "Yesterday, 10:00 AM",
    read: true,
    category: "Promos",
    icon: <Percent size={20} />,
    iconBg: "bg-seller-main/10 text-seller-main",
  },
];

const CATEGORIES: NotifCategory[] = ["All", "Orders", "Promos", "System"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotifRow({ notif, onDismiss }: { notif: Notification; onDismiss: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.3 } }}
    >
      <SwipeToDismiss onDismiss={onDismiss}>
        <div className="flex items-start gap-3 px-4 py-3.5 border-b border-border-default last:border-b-0 bg-card">
          {/* Unread dot */}
          <div className="flex flex-col items-center pt-1 w-3 shrink-0">
            {!notif.read && (
              <span className="size-2 rounded-full bg-seller-main" />
            )}
          </div>

          {/* Icon */}
          <div
            className={cn(
              "size-11 rounded-full flex items-center justify-center shrink-0",
              notif.iconBg
            )}
          >
            {notif.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className={cn("text-sm leading-snug", notif.read ? "font-medium text-foreground" : "font-bold text-foreground")}>
              {notif.title}
            </p>
            <p className="text-xs text-foreground-muted leading-snug">{notif.body}</p>
            <p className="text-[11px] text-foreground-muted mt-0.5">{notif.time}</p>
          </div>
        </div>
      </SwipeToDismiss>
    </motion.div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[11px] font-bold text-foreground-muted uppercase tracking-widest px-4 pt-5 pb-1">
      {label}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [active, setActive] = useState<NotifCategory>("All");
  const [notifications, setNotifications] = useState({
    today: TODAY,
    yesterday: YESTERDAY,
  });

  const filter = (list: Notification[]) =>
    active === "All" ? list : list.filter((n) => n.category === active);

  const markAllRead = () => {
    setNotifications({
      today: notifications.today.map((n) => ({ ...n, read: true })),
      yesterday: notifications.yesterday.map((n) => ({ ...n, read: true })),
    });
  };

  const todayFiltered = filter(notifications.today);
  const yesterdayFiltered = filter(notifications.yesterday);
  const isEmpty = todayFiltered.length === 0 && yesterdayFiltered.length === 0;

  return (
    <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted pb-32">

      {/* ── Header ── */}
      <div className="bg-card px-4 pt-10 pb-4">
        <PageHeader
          title="Notifications"
          showBack
          rightItems={
            <button
              onClick={markAllRead}
              className="text-seller-main text-sm font-semibold"
            >
              Mark all read
            </button>
          }
        />
      </div>

      {/* ── Filter tabs ── */}
      <div className="bg-card px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all",
              active === cat
                ? "bg-seller-main text-white border-seller-main"
                : "bg-card text-foreground-muted border-border-default"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Notification list ── */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center flex-1 py-32 gap-2 text-foreground-muted">
          <p className="text-sm font-medium">No notifications</p>
          <p className="text-xs">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {todayFiltered.length > 0 && (
            <>
              <SectionLabel label="Today" />
              <div className="bg-card">
                <AnimatePresence>
                  {todayFiltered.map((n) => (
                    <NotifRow
                      key={n.id}
                      notif={n}
                      onDismiss={() => {
                        setNotifications((prev) => ({
                          ...prev,
                          today: prev.today.filter((x) => x.id !== n.id),
                        }));
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {yesterdayFiltered.length > 0 && (
            <>
              <SectionLabel label="Yesterday" />
              <div className="bg-card">
                <AnimatePresence>
                  {yesterdayFiltered.map((n) => (
                    <NotifRow
                      key={n.id}
                      notif={n}
                      onDismiss={() => {
                        setNotifications((prev) => ({
                          ...prev,
                          yesterday: prev.yesterday.filter((x) => x.id !== n.id),
                        }));
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
