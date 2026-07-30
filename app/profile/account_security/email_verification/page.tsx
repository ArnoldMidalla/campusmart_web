"use client";

import { CheckCircle2, Mail, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";
import { useToast, ToastContainer } from "../../../components/Toast";
import { emailVerificationActions } from "../../../lib/data";

const VERIFIED_EMAIL = "campusmart@gmail.com";
const VERIFIED_DATE = "June 25, 2026";

export default function EmailVerificationPage() {
  const toast = useToast();

  const handleChangeEmail = () => {
    toast.info("Coming Soon", "Change email flow will be available soon.");
  };

  const handleResend = () => {
    toast.success("Email Sent!", "A new verification link has been sent to your inbox.");
  };

  const actions = emailVerificationActions.map(action => ({
    ...action,
    onPress: action.id === "change_email" ? handleChangeEmail : handleResend
  }));

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} duration={3500} />

      <main className="pb-28 pt-8 px-6 md:ml-64">
        <PageHeader title="Email Verification" showBack={true} />

        {/* Hero — verified state */}
        <div className="flex flex-col items-center gap-2 mt-8 mb-8">
          <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <p className="text-lg font-bold text-neutral-800">Email Verified</p>
          <p className="text-sm text-neutral-500">Your email address has been verified</p>
        </div>

        <div className="flex flex-col gap-7">

          {/* Email row */}
          <div className="flex items-center gap-3 py-1">
            <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-main" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-800">{VERIFIED_EMAIL}</p>
              <p className="text-xs font-medium text-green-500">
                ● Verified on {VERIFIED_DATE}
              </p>
            </div>
          </div>

          {/* Actions */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Actions
            </p>

            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={action.onPress}
                  className="flex items-center gap-3 py-1 w-full text-left"
                >
                  <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-main" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800">{action.label}</p>
                    <p className="text-xs text-neutral-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </section>

          {/* Info banner */}
          <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-4">
            <AlertCircle size={18} className="text-main shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-neutral-800 mb-1">
                Why verify your email?
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                A verified email helps us secure your account and send important updates about your
                orders and transactions.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Nav />
    </>
  );
}
