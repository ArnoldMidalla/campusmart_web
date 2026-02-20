import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus = "Awaiting drop-off" | "Dropped off" | "Completed";

export type SellerOrder = {
  id: string;
  productName: string;
  productImage: string;
  orderId: string;
  category: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  buyerName: string;
  placedAt: string; // ISO date string
};

type OrdersStore = {
  orders: SellerOrder[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedOrders: SellerOrder[] = [
  {
    id: "o1",
    productName: "Delicious rice and...",
    productImage:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop&q=60",
    orderId: "3873823",
    category: "Food",
    price: 4800,
    quantity: 25,
    status: "Awaiting drop-off",
    buyerName: "Chidi Okafor",
    placedAt: "2026-02-18T08:30:00Z",
  },
  {
    id: "o2",
    productName: "UrbanFlex Cargo Pants",
    productImage:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&auto=format&fit=crop&q=60",
    orderId: "3873824",
    category: "Fashion",
    price: 14500,
    quantity: 1,
    status: "Awaiting drop-off",
    buyerName: "Amaka Eze",
    placedAt: "2026-02-18T09:10:00Z",
  },
  {
    id: "o3",
    productName: "Noise-Cancelling Headphones",
    productImage:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&auto=format&fit=crop&q=60",
    orderId: "3873825",
    category: "Tech",
    price: 32000,
    quantity: 1,
    status: "Dropped off",
    buyerName: "Tunde Bello",
    placedAt: "2026-02-17T14:00:00Z",
  },
  {
    id: "o4",
    productName: "Vitamin C Brightening Serum",
    productImage:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=60",
    orderId: "3873826",
    category: "Beauty",
    price: 11500,
    quantity: 2,
    status: "Dropped off",
    buyerName: "Ngozi Adeyemi",
    placedAt: "2026-02-17T10:45:00Z",
  },
  {
    id: "o5",
    productName: "Unisex Oversized Hoodie",
    productImage:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&auto=format&fit=crop&q=60",
    orderId: "3873827",
    category: "Fashion",
    price: 12000,
    quantity: 3,
    status: "Completed",
    buyerName: "Emeka Nwosu",
    placedAt: "2026-02-16T16:20:00Z",
  },
  {
    id: "o6",
    productName: "Small Chops Party Pack",
    productImage:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&auto=format&fit=crop&q=60",
    orderId: "3873828",
    category: "Food",
    price: 6500,
    quantity: 5,
    status: "Completed",
    buyerName: "Blessing Obi",
    placedAt: "2026-02-15T12:00:00Z",
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: seedOrders,
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),
    }),
    { name: "campus-mart-seller-orders" }
  )
);
