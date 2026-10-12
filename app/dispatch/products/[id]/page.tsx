"use client";

import { useState } from "react";
import {
  MoreVertical,
  Image as ImageIcon,
  Tag,
  Flag,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  DispatchHeader,
  DispatchBottomSheet,
  DispatchRadioOption,
  DispatchBadge,
} from "../../components";
import { useDispatchContext } from "../../context";

const CATEGORIES = [
  "Fashion & Thrift",
  "Electronics",
  "Books & Stationery",
  "Food & Snacks",
  "Services",
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { products, moderateProduct } = useDispatchContext();
  const matchedProduct = products.find((p) => String(p.id) === String(params.id));
  const product = matchedProduct || products[2] || {
    id: 3,
    name: "Vape Starter Kit",
    price: "₦9,000",
    category: "Others",
    store: "Segun Ola",
    status: "REPORTED",
    reportReason: "3 · prohibited item",
    description: "Vape pen with starter pods.",
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState(product.category);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");

  return (
    <main className="flex-1 flex flex-col pb-16">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="Product Detail"
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
                    View seller profile
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Share listing link
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Product Image Gallery Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-[1.5rem] p-6 border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] aspect-[4/3] flex flex-col justify-between relative overflow-hidden">
          {/* Top Right Badge */}
          <div className="flex justify-end">
            {product.status && (
              <DispatchBadge status={product.status} />
            )}
          </div>

          {/* Center Image Placeholder */}
          <div className="flex items-center justify-center my-auto text-gray-300">
            <ImageIcon size={54} strokeWidth={1.5} />
          </div>

          {/* Bottom Left Carousel Dots */}
          <div className="flex items-center gap-1.5">
            <div
              onClick={() => setActiveImageIndex(0)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeImageIndex === 0 ? "w-6 bg-main" : "w-1.5 bg-gray-200"
              }`}
            />
            <div
              onClick={() => setActiveImageIndex(1)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeImageIndex === 1 ? "w-6 bg-main" : "w-1.5 bg-gray-200"
              }`}
            />
            <div
              onClick={() => setActiveImageIndex(2)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeImageIndex === 2 ? "w-6 bg-main" : "w-1.5 bg-gray-200"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Product Header / Price */}
      <div className="px-6 mb-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[20px] font-bold text-foreground">
            {product.name}
          </h2>
          <span className="text-[20px] font-bold text-foreground shrink-0">
            {product.price}
          </span>
        </div>
        <p className="text-[13px] text-foreground-muted mt-1">
          Listed {product.listedDate || "14 Oct 2023"} &middot; {product.views ?? 412} views
        </p>
      </div>

      {/* Listing Details */}
      <div className="px-6 mb-6">
        <h3 className="text-[16px] font-bold text-foreground mb-3">
          Listing details
        </h3>
        <div className="bg-white rounded-[1.5rem] px-5 py-1 border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
          <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
            <span className="text-[13px] text-foreground-muted">Seller</span>
            <span className="text-[13px] font-bold text-foreground">
              {product.store}
            </span>
          </div>

          <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
            <span className="text-[13px] text-foreground-muted">Category</span>
            <span className="text-[13px] font-bold text-foreground">
              {category}
            </span>
          </div>

          <div className="py-3.5 flex items-center justify-between border-b border-border-default/40">
            <span className="text-[13px] text-foreground-muted">Stock</span>
            <span className="text-[13px] font-bold text-foreground">
              {product.stock ?? 1}
            </span>
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <span className="text-[13px] text-foreground-muted">Reports</span>
            <span className="text-[13px] font-bold text-foreground">
              {product.reportReason || "None"}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6">
        <h3 className="text-[16px] font-bold text-foreground mb-3">Actions</h3>
        <div className="flex gap-3 mb-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-active hover:bg-gray-50 text-foreground font-semibold text-sm"
          >
            <Tag size={16} />
            Update Category
          </button>
          <button
            onClick={() => setIsReportsModalOpen(true)}
            className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-active hover:bg-gray-50 text-foreground font-semibold text-sm"
          >
            <Flag size={16} />
            View Reports
          </button>
        </div>

        <button
          onClick={() => setIsRemoveModalOpen(true)}
          className="w-full bg-red-50/40 border border-red-100 rounded-[14px] py-3.5 flex items-center justify-center gap-2 transition-active hover:bg-red-50/70 text-[#ff8080] font-semibold text-sm"
        >
          <Trash2 size={16} />
          Remove Listing
        </button>
      </div>

      {/* View Reports Modal */}
      {isReportsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px] text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-[18px] mx-auto flex items-center justify-center mb-4">
              <AlertTriangle size={26} />
            </div>
            <h4 className="text-[17px] font-bold text-foreground mb-1">
              3 Member Reports
            </h4>
            <p className="text-[13px] text-foreground-muted mb-4 leading-relaxed">
              Flagged as prohibited nicotine/vaping hardware in university campus zones.
            </p>
            <div className="bg-gray-50 rounded-xl p-3 text-left text-xs text-foreground-muted mb-6 space-y-2">
              <p>• <strong>User #412</strong>: Nicotine products violate policy</p>
              <p>• <strong>User #882</strong>: Inappropriate item</p>
              <p>• <strong>User #104</strong>: Restricted substance</p>
            </div>
            <button
              onClick={() => setIsReportsModalOpen(false)}
              className="w-full bg-foreground text-white rounded-xl py-3.5 font-bold text-[14px] hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Choose a category Bottom Sheet */}
      <DispatchBottomSheet
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Choose a category"
        subtitle="Moving a listing re-indexes it in search."
      >
        {/* Radio Options */}
        <div className="flex flex-col gap-3 mb-6">
          {CATEGORIES.map((cat) => (
            <DispatchRadioOption
              key={cat}
              isSelected={selectedCategory === cat}
              onSelect={() => setSelectedCategory(cat)}
              title={cat}
            />
          ))}
        </div>

        {/* Save Category CTA */}
        <button
          onClick={() => {
            moderateProduct(product.id, "change_category", selectedCategory);
            setCategory(selectedCategory);
            setIsCategoryModalOpen(false);
          }}
          className="w-full bg-main text-white py-4 rounded-[14px] font-bold text-[14px] transition-active hover:bg-main-light shadow-[0_4px_15px_rgba(255,104,31,0.25)]"
        >
          Save category
        </button>
      </DispatchBottomSheet>

      {/* Remove Listing Confirmation Modal */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[320px] text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-[18px] mx-auto flex items-center justify-center mb-4">
              <Trash2 size={24} />
            </div>
            <h4 className="text-[18px] font-bold text-foreground mb-2">
              Remove Listing?
            </h4>
            <p className="text-[13px] text-foreground-muted leading-relaxed mb-6 px-1">
              This product will be immediately taken down from the marketplace.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="flex-1 bg-white border border-border-default rounded-[14px] py-3.5 font-bold text-[14px] text-foreground hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  moderateProduct(product.id, "delete");
                  setIsRemoveModalOpen(false);
                  router.push("/dispatch/products");
                }}
                className="flex-1 bg-[#E34149] text-white rounded-[14px] py-3.5 font-bold text-[14px] hover:opacity-90 transition-opacity shadow-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
