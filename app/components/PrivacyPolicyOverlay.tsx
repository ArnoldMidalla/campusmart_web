"use client";

import DocumentOverlay from "./DocumentOverlay";
import { PRIVACY_COLLECTED_DATA, PRIVACY_AUTO_DATA } from "@/lib/constants/legal";

interface PrivacyPolicyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function PrivacyPolicyOverlay({ isOpen, onClose, onAccept }: PrivacyPolicyOverlayProps) {
  return (
    <DocumentOverlay
      isOpen={isOpen}
      onClose={onClose}
      onAccept={onAccept}
      title="Privacy Policy"
      effectiveDate="April 21, 2026"
    >
      {/* Introduction */}
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground font-bold text-[16px]">1. Introduction</h3>
        <p className="text-foreground-muted text-[14px] leading-relaxed">
          This Privacy Policy explains how CampusMart collects, uses, and protects your information. By using the app, you agree to this policy.
        </p>
      </div>

      {/* Information We Collect */}
      <div className="flex flex-col gap-4">
        <h3 className="text-foreground font-bold text-[16px]">2. Information We Collect</h3>
        
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground font-bold text-[14px]">2.1 Information You Provide</h4>
          <ul className="flex flex-col gap-2 pl-2">
            {PRIVACY_COLLECTED_DATA.map((item, i) => (
              <li key={i} className="flex gap-3 text-[14px] text-foreground-muted leading-relaxed">
                <span className="text-main font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 pb-8">
          <h4 className="text-foreground font-bold text-[14px]">2.2 Automatically Collected Data</h4>
          <ul className="flex flex-col gap-2 pl-2">
            {PRIVACY_AUTO_DATA.map((item, i) => (
              <li key={i} className="flex gap-3 text-[14px] text-foreground-muted leading-relaxed">
                <span className="text-main font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocumentOverlay>
  );
}
