"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import DispatchNav from "../../../components/DispatchNav";
import { DispatchHeader, DispatchAvatar, DispatchBadge } from "../../components";
import { useDispatchContext } from "../../context";

type TabType = "pending" | "approved" | "rejected";

export default function SellerVerificationPage() {
  const { verifications, pendingVerificationsCount } = useDispatchContext();
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("oldest");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredApplications = verifications.filter(
    (app) => app.status === activeTab
  );

  return (
    <main className="flex-1 flex flex-col pb-28">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Seller Verification"
        subtitle={`${pendingVerificationsCount} applications awaiting review`}
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
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Refresh list
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Export applications
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Tabs */}
      <div className="px-6 border-b border-border-default/60 flex items-center gap-6">
        {/* Pending Tab */}
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 pt-2 text-[14px] flex items-center gap-2 font-bold relative transition-colors ${
            activeTab === "pending"
              ? "text-foreground"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          <span>Pending</span>
          <span className="bg-main text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
            {pendingVerificationsCount}
          </span>
          {activeTab === "pending" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Approved Tab */}
        <button
          onClick={() => setActiveTab("approved")}
          className={`pb-3 pt-2 text-[14px] relative transition-colors ${
            activeTab === "approved"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          Approved
          {activeTab === "approved" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Rejected Tab */}
        <button
          onClick={() => setActiveTab("rejected")}
          className={`pb-3 pt-2 text-[14px] relative transition-colors ${
            activeTab === "rejected"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          Rejected
          {activeTab === "rejected" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>
      </div>

      {/* List Header */}
      <div className="px-6 mt-6 mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-foreground">
          {sortOrder === "oldest" ? "Oldest first" : "Newest first"}
        </h2>
        <button
          onClick={() =>
            setSortOrder(sortOrder === "oldest" ? "newest" : "oldest")
          }
          className="text-[13px] font-semibold text-main hover:opacity-80 transition-opacity"
        >
          Sort
        </button>
      </div>

      {/* Applications List */}
      <div className="px-6">
        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app, index) => {
              const isLast = index === filteredApplications.length - 1;

              return (
                <Link
                  key={app.id}
                  href={`/dispatch/users/verification/${app.id}`}
                  className={`p-4 flex items-center gap-3.5 transition-colors hover:bg-gray-50/50 ${
                    !isLast ? "border-b border-border-default/60" : ""
                  }`}
                >
                  {/* Avatar */}
                  <DispatchAvatar
                    initials={app.initials}
                    colorTheme="orange"
                    size="md"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-[15px] font-bold text-foreground truncate">
                      {app.name}
                    </h3>
                    <p className="text-[12px] text-foreground-muted truncate">
                      {app.store} &middot; {app.docsCount} docs
                    </p>
                  </div>

                  {/* Time Badge */}
                  <DispatchBadge
                    status={app.timeLabel}
                    variant={app.timeType === "amber" ? "warning" : "info"}
                  />
                </Link>
              );
            })
          ) : (
            <div className="p-8 text-center text-foreground-muted text-sm">
              No applications in this category.
            </div>
          )}
        </div>
      </div>

      <DispatchNav />
    </main>
  );
}
