import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listingsApi } from '../listings';
import type { SellerProduct } from '@/app/store/useProductsStore';

// ─── Query keys ───────────────────────────────────────────────────────────────

export const listingsKeys = {
  all: ['seller-listings'] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all listings for the currently authenticated seller. */
export function useSellerListings() {
  return useQuery({
    queryKey: listingsKeys.all,
    queryFn: () => listingsApi.fetchListings(),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Create a new listing, then refetch the list. */
export function useCreateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<SellerProduct, 'id'>) => listingsApi.createListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingsKeys.all });
    },
  });
}

/** Update an existing listing field (e.g. status), then refetch the list. */
export function useUpdateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SellerProduct> }) =>
      listingsApi.updateListing(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingsKeys.all });
    },
  });
}

/** Delete a listing, then refetch the list. */
export function useDeleteListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => listingsApi.deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingsKeys.all });
    },
  });
}
