'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/store/useAuthStore';
import { authApi } from '@/lib/api/auth';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    // If the store thinks we are authenticated, verify with the backend
    // to ensure the HTTP-only cookie is still valid.
    const verifyAuth = async () => {
      if (isAuthenticated) {
        try {
          const user = await authApi.getMe();
          setUser(user);
        } catch (error) {
          // If verification fails (e.g., 401 Unauthorized because cookie expired)
          clearAuth();
        }
      }
    };

    verifyAuth();
  }, [isAuthenticated, setUser, clearAuth]);

  return <>{children}</>;
}
