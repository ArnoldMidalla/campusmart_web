"use client";

import { useState, Suspense } from "react";
import {
  MoreVertical,
  Download,
  CheckCircle2,
  XCircle,
  Check,
  RotateCcw,
} from "lucide-react";
import DispatchNav from "../../components/DispatchNav";
import { useSearchParams } from "next/navigation";
import { DispatchHeader, DispatchBottomSheet, DispatchBadge } from "../components";
import { useDispatchContext } from "../context";

type TransactionTab = "All" | "Successful" | "Failed" | "Refunds";

function TransactionsContent() {
  const searchParams = useSearchParams();
  const shouldOpenReport = searchParams.get("report") === "true";
  const { transactions } = useDispatchContext();

  const [activeTab, setActiveTab] = useState<TransactionTab>("All");
  const [isReportSheetOpen, setIsReportSheetOpen] = useState<boolean>(
    shouldOpenReport || false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Report Settings state (matching media_1791814200418.png)
  const [fromDate, setFromDate] = useState("01 Mar 2026");
  const [toDate, setToDate] = useState("24 Mar 2026");
  const [reportFormat, setReportFormat] = useState<"CSV" | "PDF">("CSV");
  const [reportScope, setReportScope] = useState<"All" | "Successful" | "Failed">(
    "All"
  );
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "All") return true;
    if (activeTab === "Successful") return tx.status === "SUCCESS";
    if (activeTab === "Failed") return tx.status === "FAILED";
    if (activeTab === "Refunds") return tx.status === "REFUNDED";
    return true;
  });

  const handleGenerateReport = () => {
    setIsReportGenerated(true);
    setTimeout(() => {
      setIsReportGenerated(false);
      setIsReportSheetOpen(false);
    }, 2000);
  };

  return (
    <main className="flex-1 flex flex-col pb-36">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Transactions"
        subtitle="Payments, failures and reports"
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
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-border-default overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsReportSheetOpen(true);
                    }}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Export statement
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Gateway reconciliation
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Payout settings
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

        {/* Tab Bar */}
        <div className="px-6 mb-5">
          <div className="flex items-center gap-6 border-b border-border-default/60">
            {(["All", "Successful", "Failed", "Refunds"] as TransactionTab[]).map(
              (tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[14px] font-semibold transition-all relative ${
                      isActive
                        ? "text-foreground font-bold"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-main rounded-full" />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Dark Summary Banner: Processed Today */}
        <div className="px-6 mb-5">
          <div className="bg-[#1F1F1F] rounded-[24px] p-6 text-white shadow-sm relative overflow-hidden">
            <p className="text-[13px] text-white/70 font-medium mb-1">
              Processed today
            </p>
            <h2 className="text-[34px] font-extrabold tracking-tight text-white mb-6">
              ₦412,800
            </h2>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[19px] font-bold text-white leading-tight">
                  184
                </p>
                <p className="text-xs text-white/60 mt-0.5">Successful</p>
              </div>
              <div>
                <p className="text-[19px] font-bold text-white leading-tight">6</p>
                <p className="text-xs text-white/60 mt-0.5">Failed</p>
              </div>
              <div>
                <p className="text-[19px] font-bold text-white leading-tight">
                  ₦2,244
                </p>
                <p className="text-xs text-white/60 mt-0.5">Avg. order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="px-6 mb-8">
          <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden divide-y divide-border-default/60">
            {filteredTransactions.map((tx) => {
              const isSuccess = tx.status === "SUCCESS";
              const isFailed = tx.status === "FAILED";

              return (
                <div
                  key={tx.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Status Icon */}
                    <div
                      className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 ${
                        isSuccess
                          ? "bg-[#E8F8F0] text-[#12B76A]"
                          : isFailed
                          ? "bg-red-50 text-red-500"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {isSuccess ? (
                        <CheckCircle2 size={20} strokeWidth={2.2} />
                      ) : isFailed ? (
                        <XCircle size={20} strokeWidth={2.2} />
                      ) : (
                        <RotateCcw size={18} strokeWidth={2.2} />
                      )}
                    </div>

                    {/* Transaction Details */}
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-bold text-foreground truncate">
                        {tx.txCode} &middot; {tx.orderNumber}
                      </h4>
                      <p className="text-[12px] text-foreground-muted truncate mt-0.5">
                        {isFailed ? tx.failureReason : tx.gateway} &middot;{" "}
                        {tx.time}
                      </p>
                    </div>
                  </div>

                  {/* Amount and Badge */}
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-bold text-foreground">
                      {tx.amount}
                    </p>
                    <DispatchBadge status={tx.status} className="mt-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fixed Bottom CTA: Generate Report */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 z-30">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setIsReportSheetOpen(true)}
              className="w-full bg-main hover:bg-main-light text-white py-4 rounded-2xl font-bold text-[15px] transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Download size={18} strokeWidth={2.4} />
              Generate Report
            </button>
          </div>
        </div>

        {/* Report Settings Bottom Sheet (Replicating media_1791814200418.png) */}
        <DispatchBottomSheet
          isOpen={isReportSheetOpen}
          onClose={() => setIsReportSheetOpen(false)}
          title="Report settings"
          subtitle="Exports are emailed and stored for 30 days."
        >
          {/* Date Inputs: From & To */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="report-from-date" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
                From
              </label>
              <div className="relative">
                <input
                  id="report-from-date"
                  type="text"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-white border border-[#D0D5DD] rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-foreground focus:outline-none focus:border-main shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="report-to-date" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
                To
              </label>
              <div className="relative">
                <input
                  id="report-to-date"
                  type="text"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-white border border-[#D0D5DD] rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-foreground focus:outline-none focus:border-main shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Format Segmented Toggle */}
          <div className="mb-4">
            <label className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Format
            </label>
            <div className="bg-[#EAEAEA]/80 p-1 rounded-[16px] flex">
              <button
                type="button"
                onClick={() => setReportFormat("CSV")}
                className={`flex-1 py-3 rounded-[12px] text-[14px] font-bold transition-all ${
                  reportFormat === "CSV"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => setReportFormat("PDF")}
                className={`flex-1 py-3 rounded-[12px] text-[14px] font-medium transition-all ${
                  reportFormat === "PDF"
                    ? "bg-white text-foreground shadow-sm font-bold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                PDF
              </button>
            </div>
          </div>

          {/* Scope Selection Pills */}
          <div className="mb-6">
            <label className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Scope
            </label>
            <div className="flex gap-2.5">
              {(["All", "Successful", "Failed"] as const).map((scope) => {
                const isSelected = reportScope === scope;
                return (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setReportScope(scope)}
                    className={`px-5 py-2 rounded-full text-[13px] transition-all ${
                      isSelected
                        ? "bg-main text-white font-bold shadow-sm"
                        : "bg-white border border-[#D0D5DD] text-foreground-muted hover:text-foreground font-medium"
                    }`}
                  >
                    {scope}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Report Submit Button */}
          <button
            type="button"
            onClick={handleGenerateReport}
            className="w-full bg-main hover:bg-main-light text-white py-4 rounded-2xl font-bold text-[15px] transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] flex items-center justify-center gap-2"
          >
            {isReportGenerated ? (
              <>
                <Check size={18} strokeWidth={2.5} />
                Report queued &middot; Sent to email
              </>
            ) : (
              "Generate report"
            )}
          </button>
        </DispatchBottomSheet>

        <DispatchNav />
      </main>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-muted flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-main border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TransactionsContent />
    </Suspense>
  );
}
