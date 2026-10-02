"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { type ProductStatus, type SellerProduct } from "@/types";
import { useUpdateListing, useDeleteListing } from "@/lib/api/hooks/useSellerListings";

// ─── Status Badge ─────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    "In Stock": "border-green-500 text-green-600",
    "Out of Stock": "border-red-400 text-red-500",
    "Draft": "border-neutral-400 text-foreground-muted",
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
  const { mutate: updateProduct } = useUpdateListing();
  const { mutate: removeProduct } = useDeleteListing();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuActions: { label: string; action: () => void }[] = useMemo(() => [
    {
      label: "Mark In Stock",
      action: () => { updateProduct({ id: product.id, updates: { status: "In Stock" } }); setMenuOpen(false); },
    },
    {
      label: "Mark Out of Stock",
      action: () => { updateProduct({ id: product.id, updates: { status: "Out of Stock" } }); setMenuOpen(false); },
    },
    {
      label: "Move to Draft",
      action: () => { updateProduct({ id: product.id, updates: { status: "Draft" } }); setMenuOpen(false); },
    },
    {
      label: "Delete",
      action: () => { removeProduct(product.id); setMenuOpen(false); },
    },
  ], [product.id, updateProduct, removeProduct]);

  return (
    <div className="bg-card rounded-lg px-3 py-3 flex flex-col gap-2">
      {/* Top row: image + name + status + menu */}
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-muted">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        {/* Name + SKU */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
          <p className="text-[11px] text-foreground-muted mt-0.5 flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full border border-border-default text-center leading-none text-[8px]">⊙</span>
            {product.sku}
          </p>
        </div>

        {/* Status + menu */}
        <div className="flex items-center gap-1 shrink-0">
          <StatusBadge status={product.status} />
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1 rounded-full hover:bg-surface-muted transition-all duration-150 active:scale-90 active:opacity-80"
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-7 z-20 bg-card rounded-xl shadow-xl border border-border-default py-1 w-44 overflow-hidden">
                  {menuActions.map((a) => (
                    <button
                      key={a.label}
                      onClick={a.action}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-surface-muted transition-all duration-150 active:scale-[0.98] active:opacity-80 ${
                        a.label === "Delete" ? "text-red-500" : "text-foreground"
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
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border-default">
        <div>
          <p className="text-[10px] text-foreground-muted">Category</p>
          <p className="text-xs font-semibold text-foreground mt-0.5">{product.category}</p>
        </div>
        <div>
          <p className="text-[10px] text-foreground-muted">Price</p>
          <p className="text-xs font-semibold text-foreground mt-0.5">
            ₦{product.price.toLocaleString("en-NG")}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-foreground-muted">Quantity</p>
          <p className="text-xs font-semibold text-foreground mt-0.5">{product.quantity}</p>
        </div>
      </div>
    </div>
  );
}
