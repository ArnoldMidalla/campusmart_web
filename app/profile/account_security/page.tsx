"use client";

import { useState } from "react";
import {
  ShieldCheck,
  MonitorSmartphone,
  Smartphone as SmsIcon,
  PlusSquare,
  AlertTriangle
} from "lucide-react";
import Nav from "../../components/nav";
import PageHeader from "../../components/PageHeader";
import PageHero from "../../components/PageHero";
import ActionListItem from "../../components/ActionListItem";
import InfoBanner from "../../components/InfoBanner";
import BottomSheet from "../../components/BottomSheet";
import { useToast, ToastContainer } from "../../components/Toast";
import { loginItems, verificationItems, twoFactorOptions } from "../../lib/data";

/* ─────────────────────────────────────────────
   Enable 2FA Sheet
───────────────────────────────────────────── */
type Method2FA = "sms" | "app";

function Enable2FASheet({
  isOpen,
  onClose,
  onEnable,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
}) {
  const [method, setMethod] = useState<Method2FA>("sms");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pt-4 pb-8 flex flex-col gap-5">
        <PageHero
          icon={ShieldCheck}
          iconColor="text-green-500"
          iconBg="bg-green-100"
          title="Enable Two-Factor Authentication?"
          subtitle="Choose how you'd like to verify your identity:"
          className="mt-4 mb-4"
        />

        <div className="flex flex-col gap-3">
          {twoFactorOptions.map((opt) => {
            const selected = method === opt.id;
            return (
              <ActionListItem
                key={opt.id}
                icon={opt.icon}
                label={opt.label}
                description={opt.sub}
                onClick={() => setMethod(opt.id)}
                className={selected ? "border-main bg-white" : "border-neutral-200 bg-white"}
                iconBg={selected ? "bg-orange-50" : "bg-neutral-100"}
                iconColor={selected ? "text-main" : "text-neutral-500"}
                rightElement={
                  <div className={`size-[22px] rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-main" : "border-neutral-300"}`}>
                    {selected && <div className="size-3 rounded-full bg-main" />}
                  </div>
                }
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => { onEnable(); onClose(); }}
            className="w-full bg-main text-white rounded-2xl py-3.5 font-semibold text-[15px] hover:brightness-105 transition-all"
          >
            Enable 2FA
          </button>
          <button
            onClick={onClose}
            className="w-full bg-neutral-100 text-neutral-700 rounded-2xl py-3.5 font-semibold text-[15px] hover:bg-neutral-200 transition-all"
          >
            Not Now
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

/* ─────────────────────────────────────────────
   Disable 2FA Sheet
───────────────────────────────────────────── */
function Disable2FASheet({
  isOpen,
  onClose,
  onDisable,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDisable: () => void;
}) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pt-4 pb-8 flex flex-col gap-5">
        <PageHero
          icon={AlertTriangle}
          iconColor="text-[#ff681f]"
          iconBg="bg-[#fff0e6]"
          title="Disable Two-Factor Authentication?"
          subtitle="This will make your account less secure. You'll only need your password to sign in."
          className="mt-4 mb-2"
        />

        <InfoBanner
          text="Without 2FA, your account is more vulnerable to unauthorized access."
        />

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => { onDisable(); onClose(); }}
            className="w-full bg-[#ff3b30] text-white rounded-2xl py-3.5 font-semibold text-[15px] hover:brightness-105 transition-all"
          >
            Yes, Disable 2FA
          </button>
          <button
            onClick={onClose}
            className="w-full bg-neutral-100 text-neutral-700 rounded-2xl py-3.5 font-semibold text-[15px] hover:bg-neutral-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AccountSecurityPage() {
  const toast = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showEnable2FA, setShowEnable2FA] = useState(false);
  const [showDisable2FA, setShowDisable2FA] = useState(false);

  const handle2FAToggle = () => {
    if (twoFactorEnabled) {
      setShowDisable2FA(true);
    } else {
      setShowEnable2FA(true);
    }
  };

  const handleEnable = () => {
    setTwoFactorEnabled(true);
    toast.success("2FA Enabled!", "Your account is now more secure");
  };

  const handleDisable = () => {
    setTwoFactorEnabled(false);
    toast.warning("2FA Disabled", "Two-factor authentication turned off");
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} duration={3500} />

      <main className="pb-28 pt-8 px-6">
        <PageHeader title="Account Security" showBack={true} />

        <PageHero icon={ShieldCheck} title="Keep your Account Safe and Secure" />

        <div className="flex flex-col gap-7">
          {/* LOGIN & PASSWORD */}
          <section className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Login &amp; Password
            </p>

            {loginItems.map((item) => (
              <ActionListItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                description={item.description}
                href={item.href}
              />
            ))}

            <ActionListItem
              customIcon={<span className="text-[10px] font-bold text-main leading-none">2FA</span>}
              label="Two-Factor Authentication"
              description={
                <p className={`text-xs font-medium ${twoFactorEnabled ? "text-green-500" : "text-neutral-500"}`}>
                  {twoFactorEnabled ? "Enabled — Extra layer active" : "Add extra layer of security"}
                </p>
              }
              rightElement={
                <button
                  onClick={handle2FAToggle}
                  role="switch"
                  aria-checked={twoFactorEnabled}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    twoFactorEnabled ? "bg-main" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              }
            />
          </section>

          {/* VERIFICATION */}
          <section className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Verification
            </p>

            {verificationItems.map((item) => {
              const isVerified = item.status === "verified";
              return (
                <ActionListItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  description={
                    <p className={`text-xs font-medium ${isVerified ? "text-green-500" : "text-red-500"}`}>
                      {item.statusText}
                    </p>
                  }
                />
              );
            })}
          </section>

          {/* SESSIONS */}
          <section className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Sessions
            </p>
            <ActionListItem
              icon={MonitorSmartphone}
              label="Active Sessions"
              description="2 devices currently active"
              href="/profile/account_security/active_sessions"
              badge={
                <span className="flex items-center justify-center size-4 bg-green-500 text-white text-[9px] font-bold leading-none rounded-full">
                  2
                </span>
              }
            />
          </section>
        </div>
      </main>

      <Nav />

      {/* 2FA Sheets */}
      <Enable2FASheet
        isOpen={showEnable2FA}
        onClose={() => setShowEnable2FA(false)}
        onEnable={handleEnable}
      />
      <Disable2FASheet
        isOpen={showDisable2FA}
        onClose={() => setShowDisable2FA(false)}
        onDisable={handleDisable}
      />
    </>
  );
}
