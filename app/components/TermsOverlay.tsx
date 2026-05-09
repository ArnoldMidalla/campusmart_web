"use client";

import { FileText } from "lucide-react";
import Button from "./Button";
import Modal from "./Modal";

interface TermsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsOverlay({ isOpen, onClose, onAccept }: TermsOverlayProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terms & Conditions"
      footer={
        <div className="flex gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Decline
          </Button>
          <Button onClick={onAccept} className="flex-1">
            Accept
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-neutral-500 font-bold text-[12px] uppercase tracking-wider mb-1">
            <FileText size={16} className="text-neutral-400" />
            <span>Legal Document</span>
          </div>
          <p className="text-neutral-600 text-[15px] font-semibold mb-4">CampusMart</p>
          
          <p className="text-neutral-500 text-[14px] mb-6">
            Effective Date: <span className="text-neutral-800 font-semibold">April 21, 2026</span>
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-[#f5f5f5] rounded-2xl p-5 mb-6">
          <h3 className="text-neutral-500 font-bold text-[12px] uppercase tracking-wider mb-4">
            Quick Summary (Read this first)
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "You are buying from other students, not CampusMart",
              "All items are picked up at campus pickup stations",
              "Returns are only allowed within 24 hours of pickup",
              "Sellers must verify their student status",
              "You must act honestly and follow platform rules"
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-[14px] text-neutral-600 leading-relaxed">
                <span className="text-main font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Introduction */}
        <div className="flex flex-col gap-3 pb-8">
          <h3 className="text-neutral-800 font-bold text-[16px]">1. Introduction</h3>
          <p className="text-neutral-600 text-[14px] leading-relaxed">
            CampusMart (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a student marketplace that connects users to buy and sell within their campus.
          </p>
          <p className="text-neutral-600 text-[14px] leading-relaxed">
            By using CampusMart, you agree to these terms. Please read them carefully to understand your rights and responsibilities as a buyer or seller on our platform.
          </p>
        </div>
      </div>
    </Modal>
  );
}
