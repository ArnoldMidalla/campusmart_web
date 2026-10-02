import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../orders';
import type { SellerOrder, OrderStatus } from "@/types";

// ─── Query keys ───────────────────────────────────────────────────────────────

export const ordersKeys = {
  all: ['seller-orders'] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all orders received by the currently authenticated seller. */
export function useSellerOrders() {
  return useQuery({
    queryKey: ordersKeys.all,
    queryFn: () => ordersApi.fetchOrders(),
  });
}

/** Select one order from the cache by id — no extra network request. */
export function useSellerOrder(id: string) {
  return useQuery({
    queryKey: ordersKeys.all,
    queryFn: () => ordersApi.fetchOrders(),
    select: (data) => data.find((o) => o.id === id),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Update the fulfillment status of an order, then refetch. */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ordersKeys.all });
    },
  });
}
