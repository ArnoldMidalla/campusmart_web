"use client";

import { useState } from "react";
import { MoreVertical, List, Mail, Ban, TriangleAlert, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  DispatchHeader,
  DispatchBottomSheet,
  DispatchRadioOption,
  DispatchAvatar,
  DispatchBadge,
} from "../../components";
import { useDispatchContext } from "../../context";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { users, suspendUser, deleteUser } = useDispatchContext();
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  
  // Suspend Reason Flow
  const [isSuspendReasonSheetOpen, setIsSuspendReasonSheetOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Fraudulent activity");
  const [suspendNote, setSuspendNote] = useState("");

  const SUSPEND_REASONS = [
    "Violation of policy",
    "Fraudulent activity",
    "Spam or misleading listings",
    "Other"
  ];

  // Dynamic lookup with fallback
  const matchedUser = users.find((u) => String(u.id) === String(id));
  const user = matchedUser
    ? {
        id: matchedUser.id,
        initials: matchedUser.initials,
        name: matchedUser.name,
        email: matchedUser.email,
        roles: [matchedUser.role, matchedUser.status],
        stats: [
          { label: "Orders", value: String(matchedUser.stats?.orders || "142") },
          { label: "Listings", value: String(matchedUser.stats?.listings || "38") },
          { label: "Rating", value: matchedUser.stats?.rating || "4.8" },
        ],
        accountInfo: [
          { label: "Role", value: matchedUser.role },
          { label: "Institution", value: matchedUser.institution || "University of Lagos" },
          { label: "Joined", value: matchedUser.date },
          { label: "Store", value: matchedUser.store || "Kemi's Thrift Corner" },
        ],
      }
    : {
        id: 1,
        initials: "KA",
        name: "Kemi Adeyemi",
        email: "kemi@example.com",
        roles: ["VERIFIED SELLER", "ACTIVE"],
        stats: [
          { label: "Orders", value: "142" },
          { label: "Listings", value: "38" },
          { label: "Rating", value: "4.8" },
        ],
        accountInfo: [
          { label: "Role", value: "Student Seller" },
          { label: "Institution", value: "University of Lagos" },
          { label: "Joined", value: "2 March 2026" },
          { label: "Store", value: "Kemi's Thrift Corner" },
        ],
      };

  return (
    <main className="flex-1 flex flex-col pb-10">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="User Detail"
        backHref="/dispatch/users"
        rightAction={
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="More options"
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-default shrink-0 transition-active hover:bg-gray-50"
            >
              <MoreVertical size={20} className="text-foreground" />
            </button>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-border-default overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex flex-col">
                  <button className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50">
                    Edit User
                  </button>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="px-4 py-3 text-[13px] font-bold text-red-600 text-left hover:bg-red-50 transition-colors flex items-center justify-between"
                  >
                    Delete Account
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Profile Summary */}
      <div className="flex flex-col items-center mt-2 mb-8">
        <DispatchAvatar
          initials={user.initials}
          size="xl"
          colorTheme="orange"
          isVerified
          className="mb-4"
        />

        <h2 className="text-[20px] font-bold text-foreground mb-1">
          {user.name}
        </h2>
        <span className="text-[13px] text-blue-600 underline decoration-blue-600/30 underline-offset-2 mb-3">
          {user.email}
        </span>

        <div className="flex gap-2">
          {user.roles.map((role) => (
            <DispatchBadge key={role} status={role} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex">
          {user.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex-1 py-5 flex flex-col items-center ${
                idx !== user.stats.length - 1
                  ? "border-r border-border-default/40"
                  : ""
              }`}
            >
              <span className="text-[18px] font-bold text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-[11px] text-foreground-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Information */}
      <div className="px-6 mb-8">
        <h3 className="text-[16px] font-bold text-foreground mb-4">
          Account information
        </h3>
        <div className="bg-white rounded-2xl border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] px-5">
          {user.accountInfo.map((info, idx) => (
            <div
              key={info.label}
              className={`py-4 flex items-center justify-between ${
                idx !== user.accountInfo.length - 1
                  ? "border-b border-border-default/40"
                  : ""
              }`}
            >
              <span className="text-[13px] text-foreground-muted">
                {info.label}
              </span>
              <span className="text-[13px] font-bold text-foreground">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6">
        <h3 className="text-[16px] font-bold text-foreground mb-4">Actions</h3>
        <div className="flex gap-3 mb-3">
          <Link 
            href={`/dispatch/users/${id}/activity`}
            className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-active hover:bg-gray-50 text-foreground font-semibold text-sm"
          >
            <List size={18} />
            View Activity
          </Link>
          <button className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-active hover:bg-gray-50 text-foreground font-semibold text-sm">
            <Mail size={18} />
            Message
          </button>
        </div>
        <button
          onClick={() => setIsSuspendModalOpen(true)}
          className="w-full bg-red-50/30 border border-red-100 rounded-[14px] py-3.5 flex items-center justify-center gap-2 transition-active hover:bg-red-50/50 text-[#ff8080] font-semibold text-sm"
        >
          <Ban size={16} />
          Suspend Account
        </button>
      </div>

      {/* Suspend Modal */}
      {isSuspendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[320px] text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-orange-50 rounded-[18px] mx-auto flex items-center justify-center mb-5">
              <TriangleAlert size={24} className="text-[#B56D19]" />
            </div>
            
            <h3 className="text-[18px] font-bold text-foreground mb-3">
              Suspend {user.name}?
            </h3>
            
            <p className="text-[13px] text-foreground-muted leading-relaxed mb-6 px-1">
              This user will lose immediate access to CampusMart. Their listings stay online but cannot be edited.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsSuspendModalOpen(false)}
                className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 font-bold text-[14px] text-foreground transition-active hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSuspendModalOpen(false);
                  setIsSuspendReasonSheetOpen(true);
                }}
                className="flex-1 bg-[#B56D19] text-white rounded-[14px] py-3.5 font-bold text-[14px] transition-active hover:opacity-90 shadow-sm"
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Reason Bottom Sheet */}
      <DispatchBottomSheet
        isOpen={isSuspendReasonSheetOpen}
        onClose={() => setIsSuspendReasonSheetOpen(false)}
        title="Select a reason"
        subtitle="This is recorded in the audit log and shared with the user."
      >
        {/* Radio Options */}
        <div className="flex flex-col gap-3 mb-4">
          {SUSPEND_REASONS.map((reason) => (
            <DispatchRadioOption
              key={reason}
              isSelected={selectedReason === reason}
              onSelect={() => setSelectedReason(reason)}
              title={reason}
            />
          ))}
        </div>

        {/* Optional Note */}
        <input
          type="text"
          value={suspendNote}
          onChange={(e) => setSuspendNote(e.target.value)}
          placeholder="Add an optional note..."
          className="w-full bg-white border border-border-default rounded-xl p-4 text-[13px] text-foreground placeholder:text-foreground-muted/60 mb-6 focus:outline-none focus:border-main focus:ring-1 focus:ring-main/50 transition-all"
        />

        {/* Confirm Button */}
        <button
          onClick={() => {
            suspendUser(user.id, selectedReason, suspendNote);
            setIsSuspendReasonSheetOpen(false);
          }}
          className="w-full bg-main text-white py-4 rounded-[14px] font-bold text-[14px] transition-active hover:bg-main-light shadow-[0_4px_15px_rgba(255,104,31,0.25)]"
        >
          Confirm suspension
        </button>
      </DispatchBottomSheet>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[320px] text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-red-50 rounded-[18px] mx-auto flex items-center justify-center mb-5">
              <Trash2 size={24} className="text-red-500" />
            </div>
            
            <h3 className="text-[18px] font-bold text-foreground mb-3">
              This cannot be undone
            </h3>
            
            <p className="text-[13px] text-foreground-muted leading-relaxed mb-6 px-1">
              Permanently deletes {user.name}&apos;s account, 12 listings, and all order history. Type <span className="font-bold text-foreground">DELETE</span> to confirm.
            </p>

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
              placeholder="DELETE"
              className="w-full text-center font-bold tracking-[3px] text-[14px] text-foreground placeholder:text-foreground-muted/50 border border-[#f09a9d] rounded-[14px] py-3.5 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 font-bold text-[14px] text-foreground transition-active hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmation !== "DELETE"}
                onClick={() => {
                  deleteUser(user.id);
                  setIsDeleteModalOpen(false);
                  router.push("/dispatch/users");
                }}
                className="flex-[1.2] bg-[#E34149] text-white rounded-[14px] py-3.5 font-bold text-[13px] transition-active hover:opacity-90 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
