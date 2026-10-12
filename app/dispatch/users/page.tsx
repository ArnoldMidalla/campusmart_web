"use client";

import { useState } from "react";
import { Search, ListFilter, MoreVertical } from "lucide-react";
import DispatchNav from "../../components/DispatchNav";
import Link from "next/link";
import { DispatchHeader, DispatchAvatar, DispatchBadge } from "../components";
import { useDispatchContext } from "../context";

const FILTERS = ["All", "Buyers", "Sellers", "Riders", "Suspended"];

export default function DispatchUsersPage() {
  const { users } = useDispatchContext();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => {
    if (activeFilter === "Buyers" && !user.role.toUpperCase().includes("BUYER")) return false;
    if (activeFilter === "Sellers" && !user.role.toUpperCase().includes("SELLER")) return false;
    if (activeFilter === "Riders" && !user.role.toUpperCase().includes("RIDER")) return false;
    if (activeFilter === "Suspended" && user.status !== "SUSPENDED") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <main className="flex-1 flex flex-col pb-28">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="User Management"
        subtitle="Manage every registered account"
        rightAction={
          <button
            aria-label="More options"
            className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-default shrink-0 transition-active hover:bg-gray-50"
          >
            <MoreVertical size={20} className="text-foreground" />
          </button>
        }
      />

      {/* Search & Filter */}
      <div className="px-6 mb-4 flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-foreground-muted" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or role"
            aria-label="Search users"
            className="w-full bg-white h-12 pl-11 pr-4 rounded-xl border border-border-default text-[13px] text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-main/20"
          />
        </div>
        <button 
          aria-label="Filter users"
          className="w-12 h-12 bg-[#222222] rounded-xl flex items-center justify-center shrink-0 shadow-sm"
        >
          <ListFilter size={20} className="text-white" />
        </button>
      </div>

      {/* Filter Tags */}
      <div className="px-6 mb-8 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors border ${
              activeFilter === filter
                ? "bg-[#222222] text-white border-[#222222]"
                : "bg-white text-foreground-muted border-border-default hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* List Header */}
      <div className="px-6 mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-foreground">{filteredUsers.length} users</h2>
        <button className="text-[13px] font-semibold text-main hover:opacity-80">
          Sort: Newest
        </button>
      </div>

      {/* Users List */}
      <div className="px-6">
        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => {
              const isLast = index === filteredUsers.length - 1;

            return (
              <Link
                href={`/dispatch/users/${user.id}`}
                key={user.id}
                className={`p-4 flex items-center gap-3 transition-colors hover:bg-gray-50/50 ${
                  !isLast ? "border-b border-border-default/60" : ""
                }`}
              >
                {/* Avatar */}
                <DispatchAvatar
                  initials={user.initials}
                  colorTheme={user.colorTheme}
                  size="md"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-[14px] font-bold text-foreground truncate">
                      {user.name}
                    </h3>
                    <DispatchBadge status={user.role} />
                  </div>
                  <div className="text-[12px] text-foreground-muted truncate">
                    <span className="text-blue-600 underline decoration-blue-600/30 underline-offset-2">
                      {user.email}
                    </span>{" "}
                    &middot; {user.date}
                  </div>
                </div>

                {/* Status Badge */}
                <DispatchBadge status={user.status} />
              </Link>
            );
          })
        ) : (
          <div className="p-8 text-center text-foreground-muted text-sm">
            No users match this filter.
          </div>
        )}
      </div>
      </div>

      <DispatchNav />
    </main>
  );
}
