"use client";

import { useState, useRef } from "react";
import { Mail, Paperclip, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";
import { useToast, ToastContainer } from "../../../components/Toast";

const MAX_CHARS = 1000;

/* ─────────────────────────────────────────────
   Attached file pill
───────────────────────────────────────────── */
function FilePill({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5">
      <Paperclip size={12} className="text-main shrink-0" />
      <span className="text-xs text-main font-medium max-w-[120px] truncate">{name}</span>
      <button onClick={onRemove} className="text-main/60 hover:text-main transition-colors">
        <X size={12} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function EmailSupportPage() {
  const router = useRouter();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subject, setSubject] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  const charCount = message.length;
  const canSend = subject.trim().length > 0 && message.trim().length > 0 && !sending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked].slice(0, 3)); // max 3 files
    e.target.value = "";
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success("Message Sent!", "We'll get back to you within 24 hours.");
    setTimeout(() => router.back(), 1800);
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} duration={4000} />

      <main className="pb-36 pt-8 px-6 md:ml-64">
        <PageHeader title="Email Support" showBack={true} />

        {/* Hero */}
        <div className="flex flex-col items-center gap-3 mt-6 mb-8">
          <div className="size-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Mail size={28} className="text-main" />
          </div>
          <p className="text-lg font-semibold text-neutral-800 text-center">
            We&apos;ll respond within 24 hours
          </p>
        </div>

        <div className="flex flex-col gap-5">

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Subject</label>
            <input
              id="email-subject"
              type="text"
              placeholder="What do you need help with?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-neutral-100 rounded-2xl px-4 py-3.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-main/30 transition"
            />
          </div>

          {/* Order Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Order Number{" "}
              <span className="text-neutral-400 font-normal">(optional)</span>
            </label>
            <input
              id="email-order"
              type="text"
              placeholder="#ORD-"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              className="w-full bg-neutral-100 rounded-2xl px-4 py-3.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-main/30 transition"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Message</label>
            <div className="relative">
              <textarea
                id="email-message"
                rows={5}
                maxLength={MAX_CHARS}
                placeholder="I ordered a product last week but received the wrong item. The order was supposed to be a blue shirt but I got a red one instead."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-neutral-100 rounded-2xl px-4 py-3.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none resize-none focus:ring-2 focus:ring-main/30 transition pb-7"
              />
              {/* Char count */}
              <span className="absolute bottom-3 right-4 text-xs text-neutral-400">
                {charCount}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Attached files */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((f, i) => (
                <FilePill key={i} name={f.name} onRemove={() => removeFile(i)} />
              ))}
            </div>
          )}

          {/* Attach files button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length >= 3}
            className="flex items-center justify-center gap-2 w-full border border-neutral-200 rounded-2xl py-3.5 text-sm font-medium text-main hover:bg-orange-50 transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <Paperclip size={16} />
            {files.length >= 3 ? "Max 3 files attached" : "Attach files"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

        </div>
      </main>

      {/* Sticky Send button */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 pt-3 bg-gradient-to-t from-white via-white/90 to-transparent z-50">
        <div className="w-full max-w-md px-6">
          <button
            onClick={handleSend}
            disabled={!canSend}
            className="w-full bg-main text-white rounded-full py-4 font-semibold text-[15px] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-main/30"
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending…
              </span>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </div>
      </div>

      <Nav />
    </>
  );
}
