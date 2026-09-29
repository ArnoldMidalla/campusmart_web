// ─── Types ────────────────────────────────────────────────────────────────────
// These are kept here as the single source of truth for the SellerProduct shape.
// Server-state (fetching / mutating listings) is handled by React Query hooks
// in lib/api/hooks/useSellerListings.ts

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
