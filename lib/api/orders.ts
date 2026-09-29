import { fetchApi } from './client';
import type { SellerOrder, OrderStatus } from '@/app/store/useOrdersStore';

// SellerOrder / OrderStatus types live in useOrdersStore.ts (types-only).
// When the backend is built, the shape might be slightly different
// (e.g., nesting order items), but this API layer will handle it.

export const ordersApi = {
  // Fetch orders received by the seller
  fetchOrders: async (): Promise<SellerOrder[]> => {
    return fetchApi<SellerOrder[]>('/orders', {
      method: 'GET',
    });
  },

  // Update the status of an order (e.g. from 'Awaiting drop-off' to 'Dropped off')
  updateOrderStatus: async (id: string, status: OrderStatus): Promise<SellerOrder> => {
    return fetchApi<SellerOrder>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Create a new order (called by the buyer during checkout)
  createOrder: async (data: {
    items: Array<{ id: number | string; quantity: number; size?: string }>;
    paymentMethod: number;
    pickupStationId?: string;
  }): Promise<{ orderId: string; message: string }> => {
    return fetchApi<{ orderId: string; message: string }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
