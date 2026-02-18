"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { useProductsStore, type ProductStatus, type SellerProduct } from "@/app/store/useProductsStore";

// ─── Status Badge ─────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    "In Stock": "border-green-500 text-green-600",
    "Out of Stock": "border-red-400 text-red-500",
    "Draft": "border-neutral-400 text-neutral-500",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles[status]} whitespace-nowrap`}
    >
      {status}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

export default function SellerProductCard({ product }: { product: SellerProduct }) {
  const { updateProduct, removeProduct } = useProductsStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuActions: { label: string; action: () => void }[] = [
    {
      label: "Mark In Stock",
      action: () => { updateProduct(product.id, { status: "In Stock" }); setMenuOpen(false); },
    },
    {
      label: "Mark Out of Stock",
      action: () => { updateProduct(product.id, { status: "Out of Stock" }); setMenuOpen(false); },
    },
    {
      label: "Move to Draft",
      action: () => { updateProduct(product.id, { status: "Draft" }); setMenuOpen(false); },
    },
    {
      label: "Delete",
      action: () => { removeProduct(product.id); setMenuOpen(false); },
    },
  ];

  return (
    <div className="bg-white rounded-lg px-3 py-3 flex flex-col gap-2 shadow-md/5">
      {/* Top row: image + name + status + menu */}
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        {/* Name + SKU */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">{product.name}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full border border-neutral-300 text-center leading-none text-[8px]">⊙</span>
            {product.sku}
          </p>
        </div>

        {/* Status + menu */}
        <div className="flex items-center gap-1 shrink-0">
          <StatusBadge status={product.status} />
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1 rounded-full hover:bg-neutral-100 transition"
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-7 z-20 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 w-44 overflow-hidden">
                  {menuActions.map((a) => (
                    <button
                      key={a.label}
                      onClick={a.action}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition ${
                        a.label === "Delete" ? "text-red-500" : "text-neutral-700"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: category / price / quantity */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-100">
        <div>
          <p className="text-[10px] text-neutral-400">Category</p>
          <p className="text-xs font-semibold text-neutral-800 mt-0.5">{product.category}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400">Price</p>
          <p className="text-xs font-semibold text-neutral-800 mt-0.5">
            ₦{product.price.toLocaleString("en-NG")}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400">Quantity</p>
          <p className="text-xs font-semibold text-neutral-800 mt-0.5">{product.quantity}</p>
        </div>
      </div>
    </div>
  );
}
