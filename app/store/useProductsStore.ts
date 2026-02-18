import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductStatus = "In Stock" | "Out of Stock" | "Draft";

export type SellerProduct = {
  id: string;
  name: string;
  sku: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  status: ProductStatus;
};

type ProductsStore = {
  products: SellerProduct[];
  addProduct: (product: SellerProduct) => void;
  updateProduct: (id: string, updates: Partial<SellerProduct>) => void;
  removeProduct: (id: string) => void;
};

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedProducts: SellerProduct[] = [
  {
    id: "1",
    name: "UrbanFlex Cargo...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&auto=format&fit=crop&q=60",
    category: "Fashion",
    price: 14500,
    quantity: 25,
    status: "In Stock",
  },
  {
    id: "2",
    name: "The Ordinary Fac...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&auto=format&fit=crop&q=60",
    category: "Beauty",
    price: 14500,
    quantity: 25,
    status: "Out of Stock",
  },
  {
    id: "3",
    name: "Unisex Oversized...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&auto=format&fit=crop&q=60",
    category: "Fashion",
    price: 12000,
    quantity: 25,
    status: "Draft",
  },
  {
    id: "4",
    name: "Custom Name Po...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop&q=60",
    category: "Creative",
    price: 3200,
    quantity: 25,
    status: "In Stock",
  },
  {
    id: "5",
    name: "Delicious rice and...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop&q=60",
    category: "Food",
    price: 4800,
    quantity: 25,
    status: "Out of Stock",
  },
  {
    id: "6",
    name: "Wireless Bluetoot...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&auto=format&fit=crop&q=60",
    category: "Tech",
    price: 9500,
    quantity: 25,
    status: "Draft",
  },
  {
    id: "7",
    name: "Vintage Denim J...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&auto=format&fit=crop&q=60",
    category: "Fashion",
    price: 18000,
    quantity: 25,
    status: "Out of Stock",
  },
  {
    id: "8",
    name: "Vitamin C Brighte...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=60",
    category: "Beauty",
    price: 11500,
    quantity: 25,
    status: "Draft",
  },
  {
    id: "9",
    name: "Small Chops Part...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&auto=format&fit=crop&q=60",
    category: "Food",
    price: 6500,
    quantity: 25,
    status: "In Stock",
  },
  {
    id: "10",
    name: "Custom Phone C...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&auto=format&fit=crop&q=60",
    category: "Creative",
    price: 4000,
    quantity: 25,
    status: "Out of Stock",
  },
  {
    id: "11",
    name: "Wireless Power B...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&auto=format&fit=crop&q=60",
    category: "Tech",
    price: 15800,
    quantity: 25,
    status: "Draft",
  },
  {
    id: "12",
    name: "Campus Laundry...",
    sku: "2873823",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=200&auto=format&fit=crop&q=60",
    category: "Services",
    price: 3500,
    quantity: 25,
    status: "Draft",
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set) => ({
      products: seedProducts,

      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    { name: "campus-mart-seller-products" }
  )
);
