"use client";

import { useState } from "react";
import {
  Bell,
  BellOff,
  CheckSquare,
  TagIcon,
  MessageSquareOff,
  Mail,
  UserRound,
  ShieldAlert,
  CircleOff,
} from "lucide-react";
import Nav from "../../components/nav";
import PageHeader from "../../components/PageHeader";
import BottomSheet from "../../components/BottomSheet";

/* ─────────────────────────────────────────────
   Toggle
───────────────────────────────────────────── */
function Toggle({
  enabled,
  onToggle,
  id,
}: {
  enabled: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <button
      id={id}
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none ${
        enabled ? "bg-main" : "bg-neutral-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────
   Notification row
───────────────────────────────────────────── */
function NotificationRow({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
  id,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-main" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800">{label}</p>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} id={id} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Confirm-disable sheet config per toggle key
───────────────────────────────────────────── */
type PrefKey = "orderUpdates" | "promotions" | "chatMessages" | "newsletter" | "accountActivity";

interface SheetConfig {
  iconBg: string;
  iconColor: string;
  Icon: React.ElementType;
  title: string;
  body: string;
  bullets?: string[];
  warning: string;
  warningEmoji: string;
  confirmLabel: string;
  confirmDanger?: boolean;
  /** When the toggle is currently OFF and being turned ON, show a subscribe-style sheet */
  isSubscribe?: boolean;
  subscribeTitle?: string;
  subscribeBody?: string;
  subscribeBullets?: string[];
  subscribeConfirmLabel?: string;
  subscribeIconBg?: string;
  subscribeIconColor?: string;
  subscribeIcon?: React.ElementType;
}

const sheetConfigs: Record<PrefKey, SheetConfig> = {
  orderUpdates: {
    iconBg: "bg-orange-100",
    iconColor: "text-main",
    Icon: BellOff,
    title: "Turn Off Order Updates?",
    body: "You won't receive push notifications for order status changes and delivery alerts.",
    warning: "You might miss important delivery updates",
    warningEmoji: "⚠️",
    confirmLabel: "Turn Off Notifications",
  },
  promotions: {
    iconBg: "bg-orange-100",
    iconColor: "text-main",
    Icon: CircleOff,
    title: "Turn Off Promotions?",
    body: "You'll miss out on exclusive deals, discounts and special offers.",
    warning: "You could miss savings of up to 50% off!",
    warningEmoji: "💰",
    confirmLabel: "Turn Off Promotions",
  },
  chatMessages: {
    iconBg: "bg-orange-100",
    iconColor: "text-main",
    Icon: MessageSquareOff,
    title: "Mute Chat Messages?",
    body: "You won't be notified when buyers or sellers send you messages.",
    warning: "You may miss time-sensitive messages",
    warningEmoji: "💬",
    confirmLabel: "Mute Chat Notifications",
  },
  newsletter: {
    iconBg: "bg-orange-100",
    iconColor: "text-main",
    Icon: Mail,
    title: "Unsubscribe from Newsletter?",
    body: "You'll stop receiving weekly updates on new arrivals and curated picks.",
    warning: "You might miss exclusive early-access deals",
    warningEmoji: "📩",
    confirmLabel: "Unsubscribe",
    isSubscribe: true,
    subscribeIcon: Mail,
    subscribeIconBg: "bg-green-100",
    subscribeIconColor: "text-green-600",
    subscribeTitle: "Subscribe to Newsletter?",
    subscribeBody: "Get weekly updates on new arrivals, trending products, and curated picks.",
    subscribeBullets: ["Early access to deals", "Curated picks"],
    subscribeConfirmLabel: "Subscribe",
  },
  accountActivity: {
    iconBg: "bg-orange-100",
    iconColor: "text-main",
    Icon: ShieldAlert,
    title: "Disable Account Activity Emails?",
    body: "You won't receive email alerts for:",
    bullets: [
      "New login from unrecognized devices",
      "Password change confirmations",
      "Suspicious activity warnings",
    ],
    warning: "Strongly recommended to keep enabled",
    warningEmoji: "🔒",
    confirmLabel: "Disable",
    confirmDanger: true,
  },
};

/* ─────────────────────────────────────────────
   Confirmation Sheet
───────────────────────────────────────────── */
function ConfirmSheet({
  isOpen,
  prefKey,
  currentlyEnabled,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  prefKey: PrefKey | null;
  currentlyEnabled: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!prefKey) return null;
  const cfg = sheetConfigs[prefKey];

  /* newsletter being turned ON → show subscribe sheet */
  const showSubscribe = cfg.isSubscribe && !currentlyEnabled;

  if (showSubscribe) {
    const SIcon = cfg.subscribeIcon ?? Mail;
    return (
      <BottomSheet isOpen={isOpen} onClose={onCancel}>
        <div className="px-6 pt-4 pb-8 flex flex-col items-center gap-4">
          <div className={`size-16 rounded-full ${cfg.subscribeIconBg} flex items-center justify-center`}>
            <SIcon size={28} className={cfg.subscribeIconColor} />
          </div>
          <h2 className="text-[18px] font-bold text-neutral-900 text-center">
            {cfg.subscribeTitle}
          </h2>
          <p className="text-sm text-neutral-500 text-center leading-relaxed">
            {cfg.subscribeBody}
          </p>
          {cfg.subscribeBullets && (
            <div className="flex gap-6 justify-center">
              {cfg.subscribeBullets.map((b) => (
                <span key={b} className="flex items-center gap-1 text-sm text-neutral-700">
                  <span className="text-green-500 font-bold">✓</span> {b}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={onConfirm}
            className="w-full bg-main text-white rounded-full py-3.5 font-semibold text-[15px] hover:brightness-105 transition-all mt-1"
          >
            {cfg.subscribeConfirmLabel ?? "Subscribe"}
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-neutral-100 text-neutral-700 rounded-full py-3.5 font-semibold text-[15px] hover:bg-neutral-200 transition-all"
          >
            No Thanks
          </button>
        </div>
      </BottomSheet>
    );
  }

  /* default: disabling a notification */
  const Icon = cfg.Icon;
  return (
    <BottomSheet isOpen={isOpen} onClose={onCancel}>
      <div className="px-6 pt-4 pb-8 flex flex-col items-center gap-4">
        {/* Icon */}
        <div className={`size-16 rounded-full ${cfg.iconBg} flex items-center justify-center`}>
          <Icon size={28} className={cfg.iconColor} />
        </div>

        {/* Title */}
        <h2 className="text-[18px] font-bold text-neutral-900 text-center">
          {cfg.title}
        </h2>

        {/* Body + optional bullets */}
        <div className="text-center">
          <p className="text-sm text-neutral-500 leading-relaxed">{cfg.body}</p>
          {cfg.bullets && (
            <ul className="mt-2 text-left inline-block space-y-1">
              {cfg.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="text-main mt-0.5">•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Warning pill */}
        <div className="w-full rounded-full border border-orange-200 bg-orange-50 px-4 py-2.5 text-center">
          <span className="text-sm font-medium text-main">
            {cfg.warningEmoji} {cfg.warning}
          </span>
        </div>

        {/* Action buttons */}
        {cfg.confirmDanger ? (
          /* Side-by-side layout for account activity */
          <div className="flex gap-3 w-full mt-1">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 text-white rounded-full py-3.5 font-semibold text-[15px] hover:bg-red-600 transition-all"
            >
              {cfg.confirmLabel}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-neutral-100 text-neutral-700 rounded-full py-3.5 font-semibold text-[15px] hover:bg-neutral-200 transition-all"
            >
              Keep Enabled
            </button>
          </div>
        ) : (
          /* Stacked layout */
          <>
            <button
              onClick={onConfirm}
              className="w-full bg-main text-white rounded-full py-3.5 font-semibold text-[15px] hover:brightness-105 transition-all mt-1"
            >
              {cfg.confirmLabel}
            </button>
            <button
              onClick={onCancel}
              className="w-full bg-neutral-100 text-neutral-700 rounded-full py-3.5 font-semibold text-[15px] hover:bg-neutral-200 transition-all"
            >
              Keep Enabled
            </button>
          </>
        )}
      </div>
    </BottomSheet>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    orderUpdates: true,
    promotions: true,
    chatMessages: true,
    newsletter: false,
    accountActivity: true,
  });

  /* which toggle is pending confirmation */
  const [pending, setPending] = useState<PrefKey | null>(null);

  const handleToggle = (key: PrefKey) => {
    // Always show the sheet — content adapts to enable vs disable context
    setPending(key);
  };

  const handleConfirm = () => {
    if (!pending) return;
    setPrefs((p) => ({ ...p, [pending]: !p[pending] }));
    setPending(null);
  };

  const handleCancel = () => setPending(null);

  return (
    <>
      <main className="pb-28 pt-8 px-6">
        <PageHeader title="Notifications" showBack={true} />

        {/* Hero */}
        <div className="flex flex-col items-center gap-3 mt-8 mb-8">
          <div className="size-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Bell size={30} className="text-main" />
          </div>
          <p className="text-lg font-semibold text-neutral-800 text-center">
            Customize your Notifications
          </p>
        </div>

        <div className="flex flex-col gap-7">
          {/* PUSH NOTIFICATIONS */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Push Notifications
            </p>
            <NotificationRow
              id="toggle-order-updates"
              icon={CheckSquare}
              label="Order Updates"
              description="Status changes & delivery alerts"
              enabled={prefs.orderUpdates}
              onToggle={() => handleToggle("orderUpdates")}
            />
            <div className="h-px bg-neutral-100" />
            <NotificationRow
              id="toggle-promotions"
              icon={TagIcon}
              label="Promotions & Deals"
              description="Discounts and special offers"
              enabled={prefs.promotions}
              onToggle={() => handleToggle("promotions")}
            />
            <div className="h-px bg-neutral-100" />
            <NotificationRow
              id="toggle-chat-messages"
              icon={MessageSquareOff}
              label="Chat Messages"
              description="Messages from buyers & sellers"
              enabled={prefs.chatMessages}
              onToggle={() => handleToggle("chatMessages")}
            />
          </section>

          {/* VERIFICATION */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Verification
            </p>
            <NotificationRow
              id="toggle-newsletter"
              icon={Mail}
              label="Newsletter"
              description="Weekly updates and news"
              enabled={prefs.newsletter}
              onToggle={() => handleToggle("newsletter")}
            />
            <div className="h-px bg-neutral-100" />
            <NotificationRow
              id="toggle-account-activity"
              icon={UserRound}
              label="Account Activity"
              description="Login alerts & security emails"
              enabled={prefs.accountActivity}
              onToggle={() => handleToggle("accountActivity")}
            />
          </section>
        </div>
      </main>

      <Nav />

      {/* Confirmation bottom sheet */}
      <ConfirmSheet
        isOpen={pending !== null}
        prefKey={pending}
        currentlyEnabled={pending ? prefs[pending] : false}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
