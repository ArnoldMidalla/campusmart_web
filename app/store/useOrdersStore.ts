// ─── Types ────────────────────────────────────────────────────────────────────
// These are kept here as the single source of truth for the SellerOrder shape.
// Server-state (fetching / mutating orders) is handled by React Query hooks
// in lib/api/hooks/useSellerOrders.ts

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
