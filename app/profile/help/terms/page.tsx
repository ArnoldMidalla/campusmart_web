"use client";

import { useState } from "react";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";

/* ─────────────────────────────────────────────
   Content
───────────────────────────────────────────── */
const EFFECTIVE_DATE = "April 21, 2026";

const termsContent = (
  <div className="flex flex-col gap-5 text-sm text-neutral-700 leading-relaxed">
    <div>
      <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Campus Mart</p>
      <p className="text-xs text-neutral-500 mt-0.5">
        Effective Date: <strong className="text-neutral-800">{EFFECTIVE_DATE}</strong>
      </p>
    </div>

    <div>
      <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-2">
        Quick Summary (Read This First)
      </p>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>You are buying from other students, not CampusMart</li>
        <li>All items are picked up at campus pickup stations</li>
        <li>Returns are only allowed within 24 hours of pickup</li>
        <li>Sellers must verify their student status</li>
        <li>You must act honestly and follow platform rules</li>
      </ul>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">1. Introduction</p>
      <p>
        CampusMart (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a student marketplace that
        connects users to buy and sell within their campus.
      </p>
      <p className="mt-1">By using CampusMart, you agree to these Terms.</p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">2. User Accounts</p>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>You must provide accurate information</li>
        <li>You are responsible for your account</li>
        <li>You must be a registered student to sell</li>
        <li>Accounts found to be fraudulent will be banned</li>
      </ul>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">3. Buying & Selling</p>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Sellers set their own prices</li>
        <li>CampusMart takes a small platform fee per transaction</li>
        <li>All sales are final unless a dispute is raised within 24 hours</li>
        <li>Prohibited items (alcohol, weapons, etc.) are not allowed</li>
      </ul>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">4. Payments</p>
      <p>
        Payments are processed securely. Funds are held in escrow until the buyer confirms receipt
        at a campus pickup station.
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">5. Dispute Resolution</p>
      <p>
        Disputes must be raised within 24 hours of pickup. CampusMart&apos;s decision in disputes
        is final and binding.
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">6. Termination</p>
      <p>
        We reserve the right to suspend or terminate accounts that violate these Terms without prior
        notice.
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">7. Changes to Terms</p>
      <p>
        We may update these Terms periodically. Continued use of CampusMart after changes means you
        accept the new Terms.
      </p>
    </div>
  </div>
);

const privacyContent = (
  <div className="flex flex-col gap-5 text-sm text-neutral-700 leading-relaxed">
    <div>
      <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Campus Mart</p>
      <p className="text-xs text-neutral-500 mt-0.5">
        Effective Date: <strong className="text-neutral-800">{EFFECTIVE_DATE}</strong>
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">1. Introduction</p>
      <p>
        This Privacy Policy explains how CampusMart collects, uses, and protects your information.
        By using the app, you agree to this policy.
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">
        2. Information We Collect
      </p>
      <p className="font-semibold text-neutral-800 mt-1 mb-0.5">2.1 Information You Provide</p>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Name</li>
        <li>Email address</li>
        <li>Campus</li>
        <li>Profile photo (optional)</li>
        <li>Listings and messages</li>
      </ul>
      <p className="font-semibold text-neutral-800 mt-2 mb-0.5">2.2 Automatically Collected Data</p>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Device type</li>
        <li>IP address</li>
        <li>Usage data</li>
      </ul>
      <p className="font-semibold text-neutral-800 mt-2 mb-0.5">2.3 Seller Verification Data</p>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Student ID or verification details</li>
      </ul>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">
        3. How We Use Your Information
      </p>
      <p>We use your data to:</p>
      <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
        <li>Operate and improve the platform</li>
        <li>Process transactions securely</li>
        <li>Communicate order updates and support</li>
        <li>Detect and prevent fraud</li>
      </ul>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">4. Data Sharing</p>
      <p>
        We do not sell your data. We may share it with trusted service providers (e.g., payment
        processors) strictly to operate CampusMart.
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">5. Data Retention</p>
      <p>
        Your data is retained as long as your account is active. Deleted accounts are purged within
        30 days.
      </p>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">6. Your Rights</p>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Access your personal data</li>
        <li>Request correction or deletion</li>
        <li>Opt out of marketing communications</li>
      </ul>
    </div>

    <div>
      <p className="text-[13px] font-bold text-neutral-800 uppercase mb-1">7. Contact</p>
      <p>
        For privacy questions, email us at{" "}
        <a href="mailto:privacy@campusmart.ng" className="text-main font-medium">
          privacy@campusmart.ng
        </a>
        .
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
type Tab = "terms" | "privacy";

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("terms");

  return (
    <>
      <main className="pb-28 pt-8 px-6 md:ml-64">
        <PageHeader title="Terms & Privacy" showBack={true} />

        {/* Tab switcher */}
        <div className="flex bg-neutral-100 rounded-2xl p-1 mt-5 mb-6">
          {(["terms", "privacy"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-main shadow-sm"
                  : "text-neutral-500"
              }`}
            >
              {tab === "terms" ? "Terms of Service" : "Privacy Policy"}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "terms" ? termsContent : privacyContent}
      </main>

      <Nav />
    </>
  );
}
