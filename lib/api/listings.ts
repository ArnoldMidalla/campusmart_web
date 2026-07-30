import { fetchApi } from './client';
import type { SellerProduct } from '@/app/store/useProductsStore';

export const listingsApi = {
  // Fetch all listings for the current seller
  fetchListings: async (): Promise<SellerProduct[]> => {
    return fetchApi<SellerProduct[]>('/listings', {
      method: 'GET',
    });
  },

  // Create a new listing
  createListing: async (data: Omit<SellerProduct, 'id'>): Promise<SellerProduct> => {
    return fetchApi<SellerProduct>('/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update an existing listing
  updateListing: async (id: string, updates: Partial<SellerProduct>): Promise<SellerProduct> => {
    return fetchApi<SellerProduct>(`/listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },

  // Delete a listing
  deleteListing: async (id: string): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>(`/listings/${id}`, {
      method: 'DELETE',
    });
  },
};
