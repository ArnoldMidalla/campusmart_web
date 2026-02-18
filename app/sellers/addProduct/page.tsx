"use client";

import { useRef } from "react";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import {
  Plus,
  Minus,
  ChevronDown,
  Camera,
  Layers,
  ZoomIn,
  Hand,
  X,
} from "lucide-react";
import { useAddProductStore, type ProductImage } from "@/app/store/useAddProductStore";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_IMAGES = 8;

const angleHints = [
  { label: "Front", Icon: Camera },
  { label: "Back", Icon: Camera },
  { label: "Side", Icon: Layers },
  { label: "Zoom-in", Icon: ZoomIn },
  { label: "In-use", Icon: Hand },
];

// ─── Image Slot ───────────────────────────────────────────────────────────────

function ImageSlot({
  image,
  onAdd,
  onRemove,
  isFirst,
}: {
  image?: ProductImage;
  onAdd: () => void;
  onRemove?: (id: string) => void;
  isFirst?: boolean;
}) {
  if (image) {
    return (
      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-neutral-200 shrink-0">
        <Image src={image.url} alt="product" fill className="object-cover" />
        <button
          type="button"
          onClick={() => onRemove?.(image.id)}
          className="absolute top-1 right-1 size-5 bg-black/60 rounded-full flex items-center justify-center"
        >
          <X size={11} className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onAdd}
      className={`w-24 h-24 rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-1 shrink-0 transition hover:border-[#13368B] hover:bg-[#13368B]/5 ${
        isFirst ? "bg-white" : "bg-neutral-50"
      }`}
    >
      <div className="size-7 rounded-full bg-neutral-100 flex items-center justify-center">
        <Plus size={16} className="text-neutral-500" />
      </div>
      {isFirst && (
        <p className="text-neutral-500 text-[10px] font-medium">Add Image</p>
      )}
    </button>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-neutral-800">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#13368B]/30 focus:border-[#13368B] transition pr-10"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddProductPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    images,
    productName,
    description,
    price,
    quantity,
    category,
    condition,
    pickupLocation,
    availability,
    addImages,
    removeImage,
    setProductName,
    setDescription,
    setPrice,
    setQuantity,
    setCategory,
    setCondition,
    setPickupLocation,
    setAvailability,
    resetForm,
  } = useAddProductStore();

  // ── Image handlers ──────────────────────────────────────────────────────────

  const handleAddImage = () => {
    if (images.length < MAX_IMAGES) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_IMAGES - images.length;
    const newImages: ProductImage[] = files.slice(0, remaining).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }));
    addImages(newImages);
    e.target.value = "";
  };

  // ── Slot layout ─────────────────────────────────────────────────────────────

  const visibleSlots = 4;
  const slots = [
    ...images,
    ...Array(Math.max(0, visibleSlots - images.length)).fill(null),
  ].slice(0, visibleSlots);

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to API — send { productName, description, price, quantity, category, condition, pickupLocation, availability, images }
    console.log("Submitting product:", {
      productName,
      description,
      price,
      quantity,
      category,
      condition,
      pickupLocation,
      availability,
      imageCount: images.length,
    });
    resetForm();
  };

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-[#f1f1f1] text-black font-dmSans tracking-tight">
      <main className="flex flex-col max-w-md w-full pb-10">

        {/* ── Header ── */}
        <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-10 border-b border-neutral-100">
          <PageHeader title="Add Product" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">

          {/* ── Product Images ── */}
          <section className=" px-4 pt-5 pb-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-sm text-neutral-900">Product Images</p>
                <p className="text-neutral-400 text-xs mt-0.5">Upload 6 – 8 images</p>
              </div>
              <p className="text-neutral-400 text-xs">
                {images.length}/{MAX_IMAGES} images uploaded
              </p>
            </div>

            {/* Image slots */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {slots.map((img, i) => (
                <ImageSlot
                  key={img ? img.id : `empty-${i}`}
                  image={img ?? undefined}
                  onAdd={handleAddImage}
                  onRemove={removeImage}
                  isFirst={i === 0 && !img}
                />
              ))}
              {images.length >= visibleSlots && images.length < MAX_IMAGES && (
                <ImageSlot onAdd={handleAddImage} />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Angle hints */}
            <p className="text-neutral-500 text-xs leading-relaxed">
              Upload clear photos from the angles below to get more buyers to trust and sell faster
            </p>
            <div className="flex gap-4">
              {angleHints.map(({ label, Icon }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    <Icon size={18} className="text-neutral-500" />
                  </div>
                  <p className="text-[10px] text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="h-2 bg-[#f1f1f1]" />

          {/* ── Product Name ── */}
          <section className=" px-4 py-5 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-800">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter the name of your product"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#13368B]/30 focus:border-[#13368B] transition"
            />
          </section>

          <div className="h-2 bg-[#f1f1f1]" />

          {/* ── Description ── */}
          <section className=" px-4 py-5 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-800">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a detailed description of your product"
              rows={5}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#13368B]/30 focus:border-[#13368B] transition resize-none"
            />
          </section>

          <div className="h-2 bg-[#f1f1f1]" />

          {/* ── Price & Quantity ── */}
          <section className=" px-4 py-5 grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-800">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-medium">
                  ₦
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-7 pr-3 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#13368B]/30 focus:border-[#13368B] transition"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-800">Quantity</label>
              <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
                <span className="flex-1 text-sm text-neutral-700 font-medium text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="size-6 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-200 transition shrink-0"
                >
                  <Minus size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="size-6 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-200 transition shrink-0"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </section>

          <div className="h-2 bg-[#f1f1f1]" />

          {/* ── Category & Condition ── */}
          <section className=" px-4 py-5 grid grid-cols-2 gap-4">
            <SelectField
              label="Category"
              value={category}
              options={["Fashion", "Electronics", "Food", "Beauty", "Tech", "Services", "Creative"]}
              onChange={setCategory}
            />
            <SelectField
              label="Condition"
              value={condition}
              options={["New", "Fairly used", "Used"]}
              onChange={setCondition}
            />
          </section>

          <div className="h-2 bg-[#f1f1f1]" />

          {/* ── Pickup Location & Availability ── */}
          <section className=" px-4 py-5 grid grid-cols-2 gap-4">
            <SelectField
              label="Pickup Location"
              value={pickupLocation}
              options={["Ireti Bakare Compl...", "Main Gate", "Library", "Faculty Block A", "Faculty Block B"]}
              onChange={setPickupLocation}
            />
            <SelectField
              label="Availability"
              value={availability}
              options={["Available", "Out of Stock", "Pre-order"]}
              onChange={setAvailability}
            />
          </section>

          <div className="h-2 bg-[#f1f1f1]" />

          {/* ── Submit ── */}
          {/* <section className="bg-white px-4 py-5">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#13368B] text-white font-bold text-sm hover:bg-[#0f2a6e] active:scale-[0.98] transition-all shadow-md"
            >
              List Product
            </button>
          </section> */}

        </form>
      </main>
    </div>
  );
}
