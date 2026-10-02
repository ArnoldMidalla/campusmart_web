export type OrderStatus = "Awaiting drop-off" | "Dropped off" | "Completed" | "Cancelled";

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
  placedAt: string;
};

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
