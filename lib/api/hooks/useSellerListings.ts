import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listingsApi } from '../listings';
import type { SellerProduct } from "@/types";

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

/** Select one listing from the cache by id — no extra network request. */
export function useSellerListing(id: string) {
  return useQuery({
    queryKey: listingsKeys.all,
    queryFn: () => listingsApi.fetchListings(),
    select: (data) => data.find((p) => p.id === id),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Create a new listing, then optimistically add it to the cache. */
export function useCreateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<SellerProduct, 'id'>) => listingsApi.createListing(data),
    onSuccess: (newProduct) => {
      queryClient.setQueryData(listingsKeys.all, (oldData: SellerProduct[] | undefined) => {
        if (!oldData) return [newProduct];
        return [...oldData, newProduct];
      });
    },
  });
}

/** Update an existing listing field (e.g. status), then update the cache directly. */
export function useUpdateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SellerProduct> }) =>
      listingsApi.updateListing(id, updates),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(listingsKeys.all, (oldData: SellerProduct[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(item => item.id === updatedProduct.id ? updatedProduct : item);
      });
    },
  });
}

/** Delete a listing, then remove it from the cache. */
export function useDeleteListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => listingsApi.deleteListing(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(listingsKeys.all, (oldData: SellerProduct[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter(item => item.id !== deletedId);
      });
    },
  });
}
