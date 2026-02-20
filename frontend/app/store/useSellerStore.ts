import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SellerStats = {
  views: number;
  viewsChange: number;
  orders: number;
  ordersChange: number;
  totalSales: number;
  totalSalesChange: number;
};

export type SellerStore = {
  // Online / Offline status
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;

  // Seller identity
  sellerName: string;
  setSellerName: (name: string) => void;

  // Dashboard stats (would be fetched from API in production)
  stats: SellerStats;
  setStats: (stats: Partial<SellerStats>) => void;
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSellerStore = create<SellerStore>()(
  persist(
    (set) => ({
      isOnline: false,
      setIsOnline: (value) => set({ isOnline: value }),

      sellerName: "Alexander",
      setSellerName: (name) => set({ sellerName: name }),

      stats: {
        views: 1204,
        viewsChange: 12,
        orders: 15,
        ordersChange: 5,
        totalSales: 364500,
        totalSalesChange: -2,
      },
      setStats: (partial) =>
        set((state) => ({ stats: { ...state.stats, ...partial } })),
    }),
    {
      name: "campus-mart-seller",
    }
  )
);
