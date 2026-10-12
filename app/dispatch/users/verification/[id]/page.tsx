"use client";

import { useState } from "react";
import { MoreVertical, CreditCard, Mail, User, Check, X, Download } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  DispatchHeader,
  DispatchBottomSheet,
  DispatchRadioOption,
  DispatchAvatar,
  DispatchBadge,
} from "../../../components";
import { useDispatchContext } from "../../../context";

interface ApplicantData {
  id: number;
  initials: string;
  name: string;
  store: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  details: {
    institution: string;
    matricNumber: string;
    department: string;
    submitted: string;
    storeCategory: string;
  };
  documents: {
    id: string;
    title: string;
    subtitle: string;
    isEmail?: boolean;
    status: "VERIFIED" | "REVIEW";
    icon: typeof CreditCard;
  }[];
}

const mockApplicant: ApplicantData = {
  id: 1,
  initials: "KA",
  name: "Kemi Adeyemi",
  store: "Kemi's Thrift Corner",
  status: "PENDING",
  details: {
    institution: "University of Lagos",
    matricNumber: "190401045",
    department: "Mass Communication",
    submitted: "22 March 2026",
    storeCategory: "Fashion & Thrift",
  },
  documents: [
    {
      id: "id_card",
      title: "Student ID card",
      subtitle: "front_id.jpg · 1.2 MB",
      status: "VERIFIED",
      icon: CreditCard,
    },
    {
      id: "email",
      title: "Institutional email",
      subtitle: "[email protected]",
      isEmail: true,
      status: "VERIFIED",
      icon: Mail,
    },
    {
      id: "selfie",
      title: "KYC selfie check",
      subtitle: "Tap to review",
      status: "REVIEW",
      icon: User,
    },
  ],
};

export default function VerificationReviewPage() {
  const router = useRouter();
  const params = useParams();
  const { verifications, approveVerification, rejectVerification } = useDispatchContext();
  const matched = verifications.find((v) => String(v.id) === String(params.id));
  const applicantId = matched ? matched.id : 1;

  const [applicantStatus, setApplicantStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">(
    matched ? (matched.status.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED") : mockApplicant.status
  );
  const [documents, setDocuments] = useState(mockApplicant.documents);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  // Reject Bottom Sheet state
  const [isRejectSheetOpen, setIsRejectSheetOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("Incomplete documents");
  const [rejectFeedback, setRejectFeedback] = useState("");

  const REJECT_REASONS = [
    "Incomplete documents",
    "Invalid student ID",
    "Mismatched identity",
    "Other",
  ];

  const activeDoc = documents.find((d) => d.id === selectedDoc);

  const handleApprove = () => {
    approveVerification(applicantId);
    setApplicantStatus("APPROVED");
  };

  const handleReject = () => {
    setIsRejectSheetOpen(true);
  };

  return (
    <main className="flex-1 flex flex-col pb-32">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="Verification Review"
        rightAction={
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="More options"
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-default shrink-0 transition-active hover:bg-gray-50"
            >
              <MoreVertical size={20} className="text-foreground" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-border-default overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex flex-col">
                  <Link
                    href={`/dispatch/users/${params.id || 1}`}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    View user profile
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Download all docs
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Applicant Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-[1.5rem] p-4 flex items-center justify-between border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3.5">
            <DispatchAvatar
              initials={mockApplicant.initials}
              colorTheme={applicantStatus === "APPROVED" ? "green" : "orange"}
              size="md"
            />
            <div>
              <h2 className="text-[15px] font-bold text-foreground">
                {mockApplicant.name}
              </h2>
              <p className="text-[12px] text-foreground-muted">
                {mockApplicant.store}
              </p>
            </div>
          </div>

          <DispatchBadge status={applicantStatus} />
        </div>
      </div>

      {/* Applicant Details (Only shown in review/pending state) */}
      {applicantStatus !== "APPROVED" && (
        <div className="px-6 mb-6">
          <h3 className="text-[16px] font-bold text-foreground mb-3">
            Applicant details
          </h3>
          <div className="bg-white rounded-[1.5rem] px-5 py-1 border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
            <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
              <span className="text-[13px] text-foreground-muted">Institution</span>
              <span className="text-[13px] font-bold text-foreground">
                {mockApplicant.details.institution}
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
              <span className="text-[13px] text-foreground-muted">Matric number</span>
              <span className="text-[13px] font-bold text-foreground">
                {mockApplicant.details.matricNumber}
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
              <span className="text-[13px] text-foreground-muted">Department</span>
              <span className="text-[13px] font-bold text-foreground">
                {mockApplicant.details.department}
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
              <span className="text-[13px] text-foreground-muted">Submitted</span>
              <span className="text-[13px] font-bold text-foreground">
                {mockApplicant.details.submitted}
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <span className="text-[13px] text-foreground-muted">Store category</span>
              <span className="text-[13px] font-bold text-foreground">
                {mockApplicant.details.storeCategory}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Documents */}
      <div className="px-6">
        <h3 className="text-[16px] font-bold text-foreground mb-3">
          Submitted documents
        </h3>
        <div className="bg-white rounded-[1.5rem] border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] overflow-hidden">
          {documents.map((doc, idx) => {
            const Icon = doc.icon;
            const isLast = idx === documents.length - 1;
            const isApproved = applicantStatus === "APPROVED";

            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc.id)}
                className={`p-4 flex items-center gap-3.5 cursor-pointer transition-colors hover:bg-gray-50/50 ${
                  !isLast ? "border-b border-border-default/60" : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isApproved
                      ? "bg-[#EAF7EE] text-[#1E7E34]"
                      : "bg-gray-100 text-foreground-muted"
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-foreground">
                    {doc.title}
                  </h4>
                  {isApproved ? (
                    <p className="text-[12px] text-foreground-muted">
                      Verified 24 Mar
                    </p>
                  ) : doc.isEmail ? (
                    <span className="text-[12px] text-blue-600 underline decoration-blue-600/30 underline-offset-2">
                      {doc.subtitle}
                    </span>
                  ) : (
                    <p className="text-[12px] text-foreground-muted">
                      {doc.subtitle}
                    </p>
                  )}
                </div>

                {/* Badge */}
                <DispatchBadge status={isApproved ? "VERIFIED" : doc.status} />
              </div>
            );
          })}
        </div>
      </div>

      {/* What happens next (Shown in approved state) */}
      {applicantStatus === "APPROVED" && (
        <div className="px-6 mt-6 mb-6 animate-in fade-in duration-300">
          <h3 className="text-[16px] font-bold text-foreground mb-3">
            What happens next
          </h3>
          <div className="bg-white rounded-[1.5rem] px-5 py-1 border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
            <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
              <span className="text-[13px] text-foreground-muted">Badge issued</span>
              <span className="text-[13px] font-bold text-foreground">
                Verified Student Seller
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
              <span className="text-[13px] text-foreground-muted">Store status</span>
              <span className="text-[13px] font-bold text-foreground">
                Can open store
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <span className="text-[13px] text-foreground-muted">Notified</span>
              <span className="text-[13px] font-bold text-foreground">
                Push + email sent
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dark Document Preview Screen / Modal */}
      {selectedDoc && activeDoc && (
        <div className="fixed inset-0 z-50 bg-[#161616] text-white flex flex-col justify-between px-6 pt-12 pb-8 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedDoc(null)}
              className="w-11 h-11 bg-[#282828] hover:bg-[#333333] rounded-xl flex items-center justify-center transition-colors text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-bold text-[15px] text-white">
              {activeDoc.title}
            </h3>

            <button
              onClick={() => {}}
              className="w-11 h-11 bg-[#282828] hover:bg-[#333333] rounded-xl flex items-center justify-center transition-colors text-white"
            >
              <Download size={18} />
            </button>
          </div>

          {/* Document Preview Card */}
          <div className="bg-white text-foreground rounded-[1.5rem] p-6 shadow-2xl w-full max-w-[340px] aspect-[1/1.3] mx-auto my-auto flex flex-col justify-between select-none">
            {/* Top section */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 text-gray-300">
                <User size={26} strokeWidth={1.5} />
              </div>
              <div className="pt-2 flex-1">
                <div className="h-2 bg-gray-200 rounded-full w-32 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full w-20" />
              </div>
            </div>

            {/* Middle body lines */}
            <div className="space-y-2.5 py-4">
              <div className="h-2 bg-gray-200 rounded-full w-full" />
              <div className="h-2 bg-gray-200 rounded-full w-[90%]" />
              <div className="h-2 bg-gray-200 rounded-full w-full" />
              <div className="h-2 bg-gray-200 rounded-full w-[75%]" />
            </div>

            {/* Bottom footer lines */}
            <div>
              <div className="h-2 bg-gray-200 rounded-full w-36 mb-2" />
              <div className="h-2 bg-gray-200 rounded-full w-24" />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex gap-3 w-full max-w-[340px] mx-auto">
            <button
              onClick={() => setSelectedDoc(null)}
              className="flex-1 bg-[#2c2c2e] hover:bg-[#38383a] text-white py-4 rounded-2xl font-bold text-[14px] transition-colors text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                setDocuments((prev) =>
                  prev.map((d) => (d.id === selectedDoc ? { ...d, status: "VERIFIED" } : d))
                );
                setSelectedDoc(null);
              }}
              className="flex-1 bg-main hover:bg-main-light text-white py-4 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-1.5 transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)]"
            >
              <Check size={16} strokeWidth={3} />
              Mark verified
            </button>
          </div>
        </div>
      )}

      {/* Reject Reason Bottom Sheet */}
      <DispatchBottomSheet
        isOpen={isRejectSheetOpen}
        onClose={() => setIsRejectSheetOpen(false)}
        title="Why is this application rejected?"
        subtitle="The applicant is notified and can resubmit."
      >
        {/* Radio Options */}
        <div className="flex flex-col gap-3 mb-4">
          {REJECT_REASONS.map((reason) => (
            <DispatchRadioOption
              key={reason}
              isSelected={rejectReason === reason}
              onSelect={() => setRejectReason(reason)}
              title={reason}
            />
          ))}
        </div>

        {/* Optional Feedback Input */}
        <input
          type="text"
          value={rejectFeedback}
          onChange={(e) => setRejectFeedback(e.target.value)}
          placeholder="Tell them what to fix..."
          className="w-full bg-white border border-border-default rounded-xl p-4 text-[13px] text-foreground placeholder:text-foreground-muted/60 mb-6 focus:outline-none focus:border-main focus:ring-1 focus:ring-main/50 transition-all"
        />

        {/* Confirm Reject Button */}
        <button
          onClick={() => {
            rejectVerification(applicantId, rejectReason);
            setApplicantStatus("REJECTED");
            setIsRejectSheetOpen(false);
          }}
          className="w-full bg-[#E34149] text-white py-4 rounded-[14px] font-bold text-[14px] transition-active hover:bg-[#d0353d] shadow-[0_4px_15px_rgba(227,65,73,0.25)]"
        >
          Confirm reject
        </button>
      </DispatchBottomSheet>

      {/* Bottom Bar: Toast when Approved/Rejected, or Action Buttons when Pending */}
      {applicantStatus === "APPROVED" ? (
        <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-[#1f1f1f] text-white rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-2xl z-40 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#333333] rounded-xl flex items-center justify-center text-white shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-[14px]">
              Seller approved 🎉
            </span>
          </div>
          <button
            onClick={() => setApplicantStatus("PENDING")}
            className="text-main font-bold text-[13px] hover:underline px-2 py-1 transition-all"
          >
            Undo
          </button>
        </div>
      ) : applicantStatus === "REJECTED" ? (
        <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-[#1f1f1f] text-white rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-2xl z-40 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-950/70 text-red-400 rounded-xl flex items-center justify-center shrink-0">
              <X size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-[14px]">
              Application rejected
            </span>
          </div>
          <button
            onClick={() => setApplicantStatus("PENDING")}
            className="text-main font-bold text-[13px] hover:underline px-2 py-1 transition-all"
          >
            Undo
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 z-30">
          <div className="max-w-md mx-auto flex gap-3">
            <button
              onClick={handleReject}
              className="flex-1 bg-red-50 text-[#E34149] hover:bg-red-100 py-3.5 rounded-2xl font-bold text-[14px] transition-colors border border-red-100"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="flex-[2] bg-main text-white hover:bg-main-light py-3.5 rounded-2xl font-bold text-[14px] transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] flex items-center justify-center gap-2"
            >
              Approve Seller
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
