"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Smartphone, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";
import { useToast, ToastContainer } from "../../../components/Toast";
import { useCountdown } from "../../../hooks/useCountdown";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

/* ─────────────────────────────────────────────
   OTP input — 6 individual boxes
───────────────────────────────────────────── */
function OTPInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[index] = digit;
    onChange(next);
    // auto-advance
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const next = [...value];
        next[index] = "";
        onChange(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const next = [...value];
        next[index - 1] = "";
        onChange(next);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!paste) return;
    const next = Array(OTP_LENGTH).fill("");
    paste.split("").forEach((c, i) => (next[i] = c));
    onChange(next);
    // focus last filled
    const lastIndex = Math.min(paste.length, OTP_LENGTH - 1);
    inputRefs.current[lastIndex]?.focus();
    e.preventDefault();
  };

  const filled = value.filter(Boolean).length;

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`size-12 text-center text-xl font-bold rounded-2xl border-2 outline-none transition-all duration-200 ${
            value[i]
              ? "border-main text-neutral-900"
              : i === filled
              ? "border-main/60 bg-white"   // active cursor slot
              : "border-neutral-200 bg-neutral-50 text-transparent"
          }`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
type Step = "phone" | "otp";

export default function PhoneVerificationPage() {
  const router = useRouter();
  const toast = useToast();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [_countdownKey, setCountdownKey] = useState(0); // bump to restart
  const { display: countdown, expired } = useCountdown(RESEND_SECONDS, step === "otp", _countdownKey);

  const otpFilled = otp.every(Boolean);

  const handleSendCode = async () => {
    if (!phone.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setStep("otp");
  };

  const handleVerify = async () => {
    if (!otpFilled) return;
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1200));
    setVerifying(false);
    toast.success("Phone Verified!", "Your phone number is now verified");
    setTimeout(() => router.back(), 2000);
  };

  const handleResend = () => {
    if (!expired) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setCountdownKey((k) => k + 1);
    toast.info("Code Resent", "A new verification code has been sent.");
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} duration={3500} />

      <main className="pb-36 pt-8 px-6">
        <PageHeader title="Phone Verification" showBack={true} />

        {/* Hero */}
        <div className="flex flex-col items-center gap-2 mt-8 mb-8">
          <div className="size-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Smartphone size={28} className="text-main" />
          </div>
          <p className="text-lg font-bold text-neutral-800">Verify Your Phone Number</p>
          <p className="text-sm text-neutral-500">We&apos;ll send a 6-digit code via SMS</p>
        </div>

        {/* ── STEP 1: Phone input ── */}
        {step === "phone" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">Phone Number</label>
              <div className="flex items-center gap-3 bg-neutral-100 rounded-2xl px-4 py-3.5">
                <Phone size={16} className="text-neutral-400 shrink-0" />
                <input
                  id="phone-number"
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: OTP entry ── */}
        {step === "otp" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">Enter OTP Code</label>
              <OTPInput value={otp} onChange={setOtp} />
            </div>

            {/* Countdown */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-neutral-500">Resend code in</p>
              <p className={`text-xl font-bold ${expired ? "text-neutral-300" : "text-main"}`}>
                {countdown}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ── Sticky bottom ── */}
      <div className="fixed bottom-0 left-0 w-full flex flex-col items-center gap-3 pb-6 pt-3 bg-gradient-to-t from-white via-white/90 to-transparent z-50">
        <div className="w-full max-w-md px-6">
          {step === "phone" ? (
            <button
              onClick={handleSendCode}
              disabled={!phone.trim() || sending}
              className="w-full bg-main text-white rounded-full py-4 font-semibold text-[15px] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-main/30"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </span>
              ) : "Send Verification Code"}
            </button>
          ) : (
            <>
              <button
                onClick={handleVerify}
                disabled={!otpFilled || verifying}
                className="w-full bg-main text-white rounded-full py-4 font-semibold text-[15px] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-main/30"
              >
                {verifying ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Verifying…
                  </span>
                ) : "Verify Phone Number"}
              </button>

              {/* Resend */}
              <div className="flex flex-col items-center gap-1 mt-3">
                <p className="text-sm text-neutral-500">Didn&apos;t receive the code?</p>
                <button
                  onClick={handleResend}
                  disabled={!expired}
                  className={`text-sm font-semibold transition-colors ${
                    expired ? "text-main" : "text-neutral-300 pointer-events-none"
                  }`}
                >
                  Resend Code
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Nav />
    </>
  );
}
