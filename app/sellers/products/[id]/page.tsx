"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import PageHeader from "@/app/components/PageHeader";
import { StatusBadge } from "@/app/sellers/components/SellerProductCard";
import { useSellerListing, useUpdateListing, useDeleteListing } from "@/lib/api/hooks/useSellerListings";
import Modal from "@/app/components/Modal";

// --- Helpers ---

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1 bg-card rounded-2xl py-4 border border-border-default">
      <p className="text-[11px] text-foreground-muted font-medium">{label}</p>
      <p className="text-[22px] font-bold text-foreground leading-none">{value}</p>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "fill-neutral-200 text-neutral-200"}
        />
      ))}
    </div>
  );
}

// --- Page ---

const MOCK_STATS = {
  sold: 42,
  views: "1.2K",
  rating: 5,
  addedOn: "June 10, 2026",
  lastUpdated: "June 22, 2026",
  description:
    "Premium quality cargo pants. Durable cotton blend with 6 functional pockets. Available in multiple colourways. Perfect for campus life - comfortable, stylish, and built to last through long lecture days and weekend outings alike.",
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useSellerListing(id);
  const router = useRouter();
  const { mutate: updateListing, isPending: isUpdating } = useUpdateListing();
  const { mutate: deleteListing, isPending: isDeleting } = useDeleteListing();
  
  const [expanded, setExpanded] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdateStatus = (newStatus: "In Stock" | "Out of Stock" | "Draft") => {
    if (!product) return;
    updateListing({ id: product.id, updates: { status: newStatus } });
    setIsManageModalOpen(false);
  };

  const handleDelete = () => {
    if (!product) return;
    deleteListing(product.id, {
      onSuccess: () => {
        router.push("/sellers/products");
      }
    });
  };

  if (isLoading) {
    return (
      <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted">
        <div className="bg-card px-4 pt-10 pb-4">
          <PageHeader title="Product Details" showBack />
        </div>
        <div className="flex items-center justify-center py-32 text-foreground-muted text-sm">
          Loading...
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted">
        <div className="bg-card px-4 pt-10 pb-4">
          <PageHeader title="Product Details" showBack />
        </div>
        <div className="flex items-center justify-center py-32 text-red-400 text-sm">
          Product not found.
        </div>
      </main>
    );
  }

  const shortDesc = MOCK_STATS.description.slice(0, 80) + "...";

  return (
    <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted pb-32">
      <div className="bg-card px-4 pt-10 pb-4">
        <PageHeader
          title="Product Details"
          showBack
          rightItems={
            <Link
              href={`/sellers/products/${product.id}/edit`}
              className="px-5 py-2 rounded-full bg-seller-main text-white text-sm font-semibold"
            >
              Edit
            </Link>
          }
        />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="bg-surface-muted rounded-3xl overflow-hidden flex flex-col items-center justify-center pt-6 pb-4 gap-3 relative">
          <div className="relative w-40 h-40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
          <p className="text-foreground-muted text-sm">Product Image</p>

          <div className="flex items-center gap-1.5 mt-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`rounded-full transition-all ${
                  i === 0
                    ? "w-4 h-2 bg-seller-main"
                    : "size-2 bg-neutral-300"
                }`}
              />
            ))}
          </div>

          <span className="absolute bottom-4 right-4 bg-neutral-400/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
            1/4
          </span>
        </div>

        <div className="bg-card rounded-3xl p-5 border border-border-default">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold text-foreground leading-snug">
                {product.name}
              </p>
              <p className="text-[12px] text-foreground-muted">
                ID {product.sku} • {product.category}
              </p>
            </div>
            <p className="text-xl font-bold text-seller-main shrink-0">
              ₦{product.price.toLocaleString("en-NG")}
            </p>
          </div>
          <div className="mt-3">
            <StatusBadge status={product.status} />
          </div>
        </div>

        <div className="flex gap-3">
          <StatBox label="Quantity" value={String(product.quantity)} />
          <StatBox label="Sold" value={String(MOCK_STATS.sold)} />
          <StatBox label="Views" value={MOCK_STATS.views} />
        </div>

        <div className="bg-card rounded-3xl p-5 border border-border-default flex flex-col gap-2">
          <p className="text-[11px] font-bold text-foreground-muted uppercase tracking-widest">
            Description
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {expanded ? MOCK_STATS.description : shortDesc}
          </p>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-seller-main text-sm font-semibold self-end"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>

        <div className="bg-card rounded-3xl p-5 border border-border-default flex flex-col gap-0">
          <p className="text-[11px] font-bold text-foreground-muted uppercase tracking-widest mb-3">
            Details
          </p>
          {[
            { label: "Category",     value: product.category },
            { label: "Added On",     value: MOCK_STATS.addedOn },
            { label: "Last Updated", value: MOCK_STATS.lastUpdated },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-border-default last:border-b-0"
            >
              <p className="text-sm text-foreground-muted">{label}</p>
              <p className="text-sm font-bold text-foreground">{value}</p>
            </div>
          ))}
          <div className="flex items-center justify-between py-3">
            <p className="text-sm text-foreground-muted">Rating</p>
            <StarRating rating={MOCK_STATS.rating} />
          </div>
        </div>
      </div>

      {/* Manage Listing CTA */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-8 px-4 z-30 pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
          <button
            onClick={() => setIsManageModalOpen(true)}
            className="w-full py-4 rounded-full bg-card border border-border-default text-foreground font-bold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition active:scale-[0.98]"
          >
            Manage Listing
          </button>
        </div>
      </div>

      {/* Manage Modal */}
      <Modal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        title="Manage Listing"
      >
        <div className="flex flex-col gap-3 mt-4">
          {product.status !== "In Stock" && (
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("In Stock")}
              className="w-full py-4 rounded-full bg-seller-main text-white font-bold text-sm disabled:opacity-50 transition active:scale-[0.98]"
            >
              Mark as In Stock
            </button>
          )}
          {product.status !== "Out of Stock" && (
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("Out of Stock")}
              className="w-full py-4 rounded-full bg-seller-main text-white font-bold text-sm disabled:opacity-50 transition active:scale-[0.98]"
            >
              Mark as Out of Stock
            </button>
          )}
          {product.status !== "Draft" && (
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("Draft")}
              className="w-full py-4 rounded-full bg-card border border-border-default text-foreground font-bold text-sm disabled:opacity-50 transition active:scale-[0.98]"
            >
              Move to Draft
            </button>
          )}
          <button
            onClick={() => {
              setIsManageModalOpen(false);
              setIsDeleteModalOpen(true);
            }}
            className="w-full py-4 rounded-full bg-red-50 text-red-500 font-bold text-sm transition active:scale-[0.98]"
          >
            Delete Product
          </button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product?"
      >
        <p className="text-sm text-foreground-muted mb-6 mt-2">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex flex-col gap-3">
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="w-full py-4 rounded-full bg-red-500 text-white font-bold text-sm disabled:opacity-50 transition active:scale-[0.98]"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete Product"}
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full py-4 rounded-full bg-card border border-border-default text-foreground font-bold text-sm transition active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </main>
  );
}
