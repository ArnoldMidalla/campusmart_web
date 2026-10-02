"use client";

import DocumentOverlay from "./DocumentOverlay";
import { TERMS_SUMMARY } from "@/lib/constants/legal";

interface TermsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsOverlay({ isOpen, onClose, onAccept }: TermsOverlayProps) {
  return (
    <DocumentOverlay
      isOpen={isOpen}
      onClose={onClose}
      onAccept={onAccept}
      title="Terms & Conditions"
      effectiveDate="April 21, 2026"
    >
      {/* Quick Summary Box */}
      <div className="bg-surface-muted rounded-2xl p-5 mb-6">
        <h3 className="text-foreground-muted font-bold text-[12px] uppercase tracking-wider mb-4">
          Quick Summary (Read this first)
        </h3>
        <ul className="flex flex-col gap-3">
          {TERMS_SUMMARY.map((item, i) => (
            <li key={i} className="flex gap-3 text-[14px] text-foreground-muted leading-relaxed">
              <span className="text-main font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Introduction */}
      <div className="flex flex-col gap-3 pb-8">
        <h3 className="text-foreground font-bold text-[16px]">1. Introduction</h3>
        <p className="text-foreground-muted text-[14px] leading-relaxed">
          CampusMart (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a student marketplace that connects users to buy and sell within their campus.
        </p>
        <p className="text-foreground-muted text-[14px] leading-relaxed">
          By using CampusMart, you agree to these terms. Please read them carefully to understand your rights and responsibilities as a buyer or seller on our platform.
        </p>
      </div>
    </DocumentOverlay>
  );
}
