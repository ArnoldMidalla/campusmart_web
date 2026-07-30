import { fetchApi } from './client';

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';
export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  trustScore: number;
  verificationStatus: VerificationStatus;
  isActive: boolean;
  isSuspended: boolean;
  institutionId?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export const authApi = {
  login: async (data: any): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  registerBuyer: async (data: any): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/register/buyer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  registerSeller: async (data: any): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/register/seller', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<{ message: string }> => {
    return fetchApi<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async (): Promise<User> => {
    return fetchApi<User>('/auth/me', {
      method: 'GET',
    });
  },
};
