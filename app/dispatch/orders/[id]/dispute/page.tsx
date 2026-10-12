"use client";

import { useState } from "react";
import {
  MoreVertical,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  DispatchHeader,
  DispatchBottomSheet,
  DispatchRadioOption,
} from "../../../components";
import { useDispatchContext } from "../../../context";

interface DisputeData {
  orderNumber: string;
  amount: string;
  openedAgo: string;
  summary: string;
  buyer: {
    name: string;
    claim: string;
    time: string;
  };
  seller: {
    name: string;
    response: string;
    time: string;
  };
}

const mockDispute: DisputeData = {
  orderNumber: "#CM-4821",
  amount: "₦28,000",
  openedAgo: "2 days ago",
  summary:
    "Buyer claims the item received does not match the listing photographs.",
  buyer: {
    name: "Bola Ogun",
    claim:
      "Received a scuffed pair with noticeable color discrepancies compared to the pristine photos in the listing.",
    time: "22 Mar · 14:15",
  },
  seller: {
    name: "Kemi's Thrift Corner",
    response:
      "All photos were taken under natural campus daylight. Item was inspected by rider before sealing.",
    time: "22 Mar · 18:30",
  },
};

type ResolutionOption = "refund" | "release" | "close";

export default function DisputeReviewPage() {
  const params = useParams();
  const { resolveDispute } = useDispatchContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResolveSheetOpen, setIsResolveSheetOpen] = useState(true);
  const [selectedResolution, setSelectedResolution] =
    useState<ResolutionOption>("refund");
  const [resolutionNote, setResolutionNote] = useState("");
  const [resolvedStatus, setResolvedStatus] = useState<string | null>(null);

  const handleConfirmResolution = () => {
    setIsResolveSheetOpen(false);
    const orderId = String(params.id || "4821");
    if (selectedResolution === "refund") {
      resolveDispute(orderId, "refund_buyer", resolutionNote);
      setResolvedStatus("Dispute resolved · Buyer refunded ₦28,000");
    } else if (selectedResolution === "release") {
      resolveDispute(orderId, "release_escrow", resolutionNote);
      setResolvedStatus("Dispute resolved · ₦28,000 released to seller");
    } else {
      resolveDispute(orderId, "split_50_50", resolutionNote);
      setResolvedStatus("Dispute closed with 50/50 split");
    }
  };

  return (
    <main className="flex-1 flex flex-col pb-32">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="Dispute Review"
        backHref={`/dispatch/orders/${params.id || "4821"}`}
        rightAction={
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-default shrink-0 transition-active hover:bg-gray-50"
            >
              <MoreVertical size={20} className="text-foreground" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-border-default overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex flex-col">
                  <Link
                    href={`/dispatch/orders/${params.id || "4821"}`}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    View full order
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Escalate to Senior Admin
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Resolution Confirmation Toast */}
      {resolvedStatus && (
        <div className="px-6 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            <p className="text-[13px] font-semibold">{resolvedStatus}</p>
          </div>
        </div>
      )}

      {/* Dispute Notice Banner */}
      <div className="px-6 mb-6">
        <div className="bg-red-50/50 border border-red-100 rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 text-[#E34149] font-bold text-[14px] mb-2">
            <AlertCircle size={18} />
            <span>Dispute opened {mockDispute.openedAgo}</span>
          </div>
          <p className="text-[13px] text-foreground-muted leading-relaxed">
            {mockDispute.summary}
          </p>
        </div>
      </div>

      {/* Both Claims Section */}
      <div className="px-6 mb-6">
        <h2 className="text-[14px] font-bold text-foreground mb-3">
          Both claims
        </h2>

        {/* Buyer Claim Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-main uppercase tracking-wider">
              Buyer &middot; {mockDispute.buyer.name}
            </span>
            <span className="text-[11px] text-foreground-muted">
              {mockDispute.buyer.time}
            </span>
          </div>
          <p className="text-[13px] text-foreground leading-relaxed mb-3">
            &ldquo;{mockDispute.buyer.claim}&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-border-default/60 rounded-xl text-xs font-semibold text-foreground-muted">
              <ImageIcon size={14} /> 2 Photos Attached
            </span>
          </div>
        </div>

        {/* Seller Response Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Seller &middot; {mockDispute.seller.name}
            </span>
            <span className="text-[11px] text-foreground-muted">
              {mockDispute.seller.time}
            </span>
          </div>
          <p className="text-[13px] text-foreground leading-relaxed mb-3">
            &ldquo;{mockDispute.seller.response}&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-border-default/60 rounded-xl text-xs font-semibold text-foreground-muted">
              <MessageSquare size={14} /> Courier dispatch logs
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 z-30">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setIsResolveSheetOpen(true)}
            className="w-full bg-main text-white py-4 rounded-2xl font-bold text-[14px] hover:bg-main-light transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] flex items-center justify-center gap-2"
          >
            Resolve this dispute
          </button>
        </div>
      </div>

      {/* Resolve Dispute Bottom Sheet */}
      <DispatchBottomSheet
        isOpen={isResolveSheetOpen}
        onClose={() => setIsResolveSheetOpen(false)}
        title="Resolve this dispute"
        subtitle={`Order ${mockDispute.orderNumber} · ${mockDispute.amount} held in escrow.`}
      >
        <div className="space-y-3 mb-4">
          <DispatchRadioOption
            isSelected={selectedResolution === "refund"}
            onSelect={() => setSelectedResolution("refund")}
            title="Refund the buyer"
            icon={
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <ArrowLeft size={18} />
              </div>
            }
          />

          <DispatchRadioOption
            isSelected={selectedResolution === "release"}
            onSelect={() => setSelectedResolution("release")}
            title="Release funds to seller"
            icon={
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                <ArrowRight size={18} />
              </div>
            }
          />

          <DispatchRadioOption
            isSelected={selectedResolution === "close"}
            onSelect={() => setSelectedResolution("close")}
            title="Close with no action"
            icon={
              <div className="w-10 h-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center shrink-0">
                <X size={18} />
              </div>
            }
          />
        </div>

        {/* Optional Resolution Note */}
        <input
          type="text"
          value={resolutionNote}
          onChange={(e) => setResolutionNote(e.target.value)}
          placeholder="Add a resolution note..."
          className="w-full bg-white border border-border-default rounded-xl p-4 text-[13px] text-foreground placeholder:text-foreground-muted/60 mb-6 focus:outline-none focus:border-main focus:ring-1 focus:ring-main/50 transition-all"
        />

        {/* Confirm Resolution Button */}
        <button
          onClick={handleConfirmResolution}
          className="w-full bg-main text-white py-4 rounded-2xl font-bold text-[14px] hover:bg-main-light transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)]"
        >
          Confirm resolution
        </button>
      </DispatchBottomSheet>
    </main>
  );
}
