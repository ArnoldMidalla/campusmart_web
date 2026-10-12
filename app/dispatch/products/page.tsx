"use client";

import { useState } from "react";
import { Search, ListFilter, MoreVertical, Image as ImageIcon } from "lucide-react";
import DispatchNav from "../../components/DispatchNav";
import { DispatchHeader, DispatchBadge } from "../components";
import { useDispatchContext } from "../context";
import { ProductTab } from "../types";
import Link from "next/link";

export default function DispatchProductsPage() {
  const { products, reportedProductsCount } = useDispatchContext();
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    // Tab filter
    if (activeTab === "reported" && p.status !== "REPORTED") return false;
    if (activeTab === "duplicates" && p.status !== "DUPLICATE") return false;
    if (activeTab === "prohibited" && p.status !== "PROHIBITED") return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.store.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <main className="flex-1 flex flex-col pb-28">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Products"
        subtitle="Moderate every marketplace listing"
        rightAction={
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="More options"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
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
                    Bulk approve
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Export listings
                  </button>
                </div>
              </div>
            )}
          </div>
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
            placeholder="Search products or sellers"
            aria-label="Search products or sellers"
            className="w-full bg-white h-12 pl-11 pr-4 rounded-xl border border-border-default text-[13px] text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-main/20"
          />
        </div>
        <button 
          aria-label="Filter products"
          className="w-12 h-12 bg-[#222222] rounded-xl flex items-center justify-center shrink-0 shadow-sm"
        >
          <ListFilter size={20} className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-border-default/60 flex items-center gap-6 overflow-x-auto no-scrollbar">
        {/* All Tab */}
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "all"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          All
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Reported Tab */}
        <button
          onClick={() => setActiveTab("reported")}
          className={`pb-3 pt-2 text-[14px] flex items-center gap-2 relative whitespace-nowrap transition-colors ${
            activeTab === "reported"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          <span>Reported</span>
          <span className="bg-main text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
            {reportedProductsCount}
          </span>
          {activeTab === "reported" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Duplicates Tab */}
        <button
          onClick={() => setActiveTab("duplicates")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "duplicates"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          Duplicates
          {activeTab === "duplicates" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>

        {/* Prohibited Tab */}
        <button
          onClick={() => setActiveTab("prohibited")}
          className={`pb-3 pt-2 text-[14px] relative whitespace-nowrap transition-colors ${
            activeTab === "prohibited"
              ? "text-foreground font-bold"
              : "text-foreground-muted hover:text-foreground font-medium"
          }`}
        >
          Prohibited
          {activeTab === "prohibited" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main rounded-full" />
          )}
        </button>
      </div>

      {/* List Header */}
      <div className="px-6 mt-6 mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-foreground">
          {filteredProducts.length} listings
        </h2>
        <button
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="text-[13px] font-semibold text-main hover:opacity-80 transition-opacity"
        >
          Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Products List */}
      <div className="px-6">
        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const isLast = index === filteredProducts.length - 1;

              return (
                <Link
                  key={product.id}
                  href={`/dispatch/products/${product.id}`}
                  className={`p-4 flex items-center gap-3.5 transition-colors hover:bg-gray-50/50 cursor-pointer ${
                    !isLast ? "border-b border-border-default/60" : ""
                  }`}
                >
                  {/* Thumbnail Placeholder */}
                  <div className="w-12 h-12 bg-orange-50 rounded-[14px] flex items-center justify-center shrink-0 text-[#E65C00]">
                    <ImageIcon size={20} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-[14px] font-bold text-foreground truncate">
                      {product.name}
                    </h3>
                    <p className="text-[12px] text-foreground-muted truncate">
                      {product.store} &middot; {product.category}
                    </p>
                  </div>

                  {/* Price & Status */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[14px] font-bold text-foreground">
                      {product.price}
                    </span>
                    <DispatchBadge status={product.status} />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="p-8 text-center text-foreground-muted text-sm">
              No listings found in this tab.
            </div>
          )}
        </div>
      </div>

      <DispatchNav />
    </main>
  );
}
