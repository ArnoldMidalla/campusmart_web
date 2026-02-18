"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import SellersNav from "@/app/sellers/components/sellersNav";
import { useProductsStore, type ProductStatus } from "@/app/store/useProductsStore";
import SearchBar from "@/app/components/SearchBar";
import SellerProductCard from "@/app/sellers/components/SellerProductCard";

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type FilterTab = "All" | ProductStatus;

const TABS: FilterTab[] = ["All", "In Stock", "Out of Stock", "Draft"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const { products } = useProductsStore();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesTab = activeTab === "All" || p.status === activeTab;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [products, activeTab, query]);

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-[#f1f1f1] text-black font-dmSans tracking-tight">
      <main className="flex flex-col max-w-md w-full pb-32">

        {/* ── Sticky top bar ── */}
        <div className="sticky top-0 z-10 bg-white pt-10 pb-3 px-4 flex flex-col gap-3">

          {/* Search */}
          {/* <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-neutral-200 shadow-sm">
              <Search size={15} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your products"
                className="flex-1 text-sm bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
              />
            </div>
            <button className="size-10 rounded-full bg-main flex items-center justify-center shadow-md shrink-0">
              <Search size={16} className="text-white" />
            </button>
          </div> */}

          <SearchBar/>

          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  activeTab === tab
                    ? "bg-[#13368B] text-white border-[#13368B]"
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
          {filtered.length === 0 ? (
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

      {/* ── FAB: Add product ── */}
      {/* <Link
        href="/sellers/addProduct"
        className="fixed bottom-28 right-1/2 translate-x-[calc(50%+80px)] z-30 size-12 rounded-full bg-[#13368B] flex items-center justify-center shadow-xl hover:bg-[#0f2a6e] transition"
      >
        <Plus size={22} className="text-white" />
      </Link> */}

      <SellersNav />
    </div>
  );
}
