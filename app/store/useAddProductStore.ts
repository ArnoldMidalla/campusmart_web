import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductImage = {
  id: string;
  /** Object URL created from the File — valid for the current browser session */
  url: string;
};

export type AddProductForm = {
  images: ProductImage[];
  productName: string;
  description: string;
  price: string;
  quantity: number;
  category: string;
  condition: string;
  pickupLocation: string;
  availability: string;
};

export type AddProductStore = AddProductForm & {
  // Image actions
  addImages: (images: ProductImage[]) => void;
  removeImage: (id: string) => void;

  // Field setters
  setProductName: (v: string) => void;
  setDescription: (v: string) => void;
  setPrice: (v: string) => void;
  setQuantity: (v: number | ((prev: number) => number)) => void;
  setCategory: (v: string) => void;
  setCondition: (v: string) => void;
  setPickupLocation: (v: string) => void;
  setAvailability: (v: string) => void;

  // Reset the whole form after successful submission
  resetForm: () => void;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultForm: AddProductForm = {
  images: [],
  productName: "",
  description: "",
  price: "",
  quantity: 1,
  category: "Fashion",
  condition: "New",
  pickupLocation: "Ireti Bakare Compl...",
  availability: "Available",
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAddProductStore = create<AddProductStore>()((set) => ({
  ...defaultForm,

  addImages: (newImages) =>
    set((state) => ({ images: [...state.images, ...newImages] })),

  removeImage: (id) =>
    set((state) => ({ images: state.images.filter((img) => img.id !== id) })),

  setProductName: (v) => set({ productName: v }),
  setDescription: (v) => set({ description: v }),
  setPrice: (v) => set({ price: v }),
  setQuantity: (v) =>
    set((state) => ({
      quantity: typeof v === "function" ? v(state.quantity) : v,
    })),
  setCategory: (v) => set({ category: v }),
  setCondition: (v) => set({ condition: v }),
  setPickupLocation: (v) => set({ pickupLocation: v }),
  setAvailability: (v) => set({ availability: v }),

  resetForm: () => set({ ...defaultForm }),
}));
