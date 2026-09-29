"use client";

import { FileText } from "lucide-react";
import Button from "./Button";
import Modal from "./Modal";

interface PrivacyPolicyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function PrivacyPolicyOverlay({ isOpen, onClose, onAccept }: PrivacyPolicyOverlayProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Privacy Policy"
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

        {/* Introduction */}
        <div className="flex flex-col gap-3">
          <h3 className="text-neutral-800 font-bold text-[16px]">1. Introduction</h3>
          <p className="text-neutral-600 text-[14px] leading-relaxed">
            This Privacy Policy explains how CampusMart collects, uses, and protects your information. By using the app, you agree to this policy.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="flex flex-col gap-4">
          <h3 className="text-neutral-800 font-bold text-[16px]">2. Information We Collect</h3>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-neutral-700 font-bold text-[14px]">2.1 Information You Provide</h4>
            <ul className="flex flex-col gap-2 pl-2">
              {["Name", "Email address", "Campus", "Profile photo (optional)", "Listings and messages"].map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-neutral-600 leading-relaxed">
                  <span className="text-main font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 pb-8">
            <h4 className="text-neutral-700 font-bold text-[14px]">2.2 Automatically Collected Data</h4>
            <ul className="flex flex-col gap-2 pl-2">
              {["Device type", "IP address"].map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-neutral-600 leading-relaxed">
                  <span className="text-main font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
