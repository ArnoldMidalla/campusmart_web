"use client";

import { useState, useMemo } from "react";

import { type ProductStatus } from "@/app/store/useProductsStore";
import { useSellerListings } from "@/lib/api/hooks/useSellerListings";
import SearchBar from "@/app/components/SearchBar";
import SellerProductCard from "@/app/sellers/components/SellerProductCard";

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type FilterTab = "All" | ProductStatus;

const TABS: FilterTab[] = ["All", "In Stock", "Out of Stock", "Draft"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const { data: products = [], isLoading, isError } = useSellerListings();
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      return activeTab === "All" || p.status === activeTab;
    });
  }, [products, activeTab]);

  return (
    <main className="flex flex-col max-w-md w-full pb-32">

        {/* ── Sticky top bar ── */}
        <div className="sticky top-0 z-10 bg-white pt-10 pb-3 px-4 flex flex-col gap-3">

          <SearchBar/>

          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  activeTab === tab
                    ? "bg-seller-main text-white border-seller-main"
                    : "bg-white text-neutral-600 border-neutral-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product list ── */}
        <div className="flex flex-col gap-3 px-4 pt-1 mt-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-400">
              <p className="text-sm">Loading products…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-400">
              <p className="text-sm">Failed to load products. Please try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-400">
              <p className="text-sm">No products found</p>
            </div>
          ) : (
            filtered.map((product) => (
              <SellerProductCard key={product.id} product={product} />
            ))
          )}
        </div>

    </main>
  );
}
