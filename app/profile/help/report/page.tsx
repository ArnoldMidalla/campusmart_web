"use client";

import { useState, useRef } from "react";
import { AlertTriangle, ChevronDown, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";
import PageHero from "../../../components/PageHero";
import { useToast, ToastContainer } from "../../../components/Toast";
import { problemTypes, screenOptions } from "../../../lib/data";

const MAX_CHARS = 1000;

/* ─────────────────────────────────────────────
   Custom select
───────────────────────────────────────────── */
function SelectField({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  accent,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl px-4 py-3.5 text-sm outline-none transition pr-10 ${
            value
              ? accent
                ? "bg-white border-2 border-main text-neutral-800 font-medium"
                : "bg-neutral-100 text-neutral-800"
              : "bg-neutral-100 text-neutral-400"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
            accent && value ? "text-main" : "text-neutral-400"
          }`}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screenshot slot
───────────────────────────────────────────── */
function ScreenshotSlot({
  file,
  onPick,
  onRemove,
}: {
  file: File | null;
  onPick: () => void;
  onRemove: () => void;
}) {
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="relative">
      {previewUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="screenshot"
            className="size-24 rounded-2xl object-cover border border-neutral-200"
          />
          <button
            onClick={onRemove}
            className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-neutral-700 text-white flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </>
      ) : (
        <button
          onClick={onPick}
          className="size-24 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-all"
        >
          <span className="text-neutral-400 text-2xl font-light">+</span>
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Toggle
───────────────────────────────────────────── */
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ${
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
   Page
───────────────────────────────────────────── */
export default function ReportPage() {
  const router = useRouter();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<number>(0);

  const [problemType, setProblemType] = useState("");
  const [screen, setScreen] = useState("");
  const [description, setDescription] = useState("");
  const [screenshots, setScreenshots] = useState<(File | null)[]>([null, null, null]);
  const [includeDevice, setIncludeDevice] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = problemType && description.trim().length > 0 && !submitting;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setScreenshots((prev) => {
        const next = [...prev];
        next[activeSlot] = file;
        return next;
      });
    }
    e.target.value = "";
  };

  const removeScreenshot = (i: number) => {
    setScreenshots((prev) => {
      const next = [...prev];
      next[i] = null;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Report Submitted!", "We'll review and get back to you");
    setTimeout(() => router.back(), 1800);
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} duration={4000} />

      <main className="pb-36 pt-8 px-6 md:ml-64">
        <PageHeader title="Report a Problem" showBack={true} />

        <PageHero icon={AlertTriangle} title="Help us fix issues by reporting them" />

        <div className="flex flex-col gap-5">

          {/* Problem type */}
          <SelectField
            id="report-problem-type"
            label="Problem Type"
            placeholder="Select problem type"
            options={problemTypes}
            value={problemType}
            onChange={setProblemType}
            accent
          />

          {/* Where does it happen */}
          <SelectField
            id="report-screen"
            label="Where does it happen?"
            placeholder="Select a screen or feature"
            options={screenOptions}
            value={screen}
            onChange={setScreen}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Describe the Problem
            </label>
            <div className="relative">
              <textarea
                id="report-description"
                rows={5}
                maxLength={MAX_CHARS}
                placeholder="Tell us what happened and how to reproduce the issue…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-100 rounded-2xl px-4 py-3.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none resize-none focus:ring-2 focus:ring-main/30 transition pb-7"
              />
              <span className="absolute bottom-3 right-4 text-xs text-neutral-400">
                {description.length}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Screenshots */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700">
              Screenshots{" "}
              <span className="text-neutral-400 font-normal">(optional)</span>
            </label>
            <div className="flex gap-3">
              {screenshots.map((file, i) => (
                <ScreenshotSlot
                  key={i}
                  file={file}
                  onPick={() => {
                    setActiveSlot(i);
                    fileInputRef.current?.click();
                  }}
                  onRemove={() => removeScreenshot(i)}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-400">Max 3 screenshots, up to 5 MB each</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Include device info */}
          <div className="flex items-center justify-between py-1">
            <p className="text-sm font-medium text-neutral-800">Include device information</p>
            <Toggle enabled={includeDevice} onToggle={() => setIncludeDevice((v) => !v)} />
          </div>

        </div>
      </main>

      {/* Sticky submit */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 pt-3 bg-gradient-to-t from-white via-white/90 to-transparent z-50">
        <div className="w-full max-w-md px-6">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-main text-white rounded-full py-4 font-semibold text-[15px] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-main/30"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting…
              </span>
            ) : (
              <>
                <Send size={16} />
                Submit Report
              </>
            )}
          </button>
        </div>
      </div>

      <Nav />
    </>
  );
}
