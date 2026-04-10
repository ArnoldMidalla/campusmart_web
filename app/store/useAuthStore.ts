import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: "BUYER" | "SELLER";
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // TODO: replace with real API call
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        //   method: "POST",
        //   body: JSON.stringify({ email, password }),
        // });
        // const { user, token } = await res.json();

        // Mock for now
        const mockUser: User = {
          id: "mock-uuid",
          firstName: "John",
          lastName: "Doe",
          email,
          password,
          role: email.includes("seller") ? "SELLER" : "BUYER",
        };
        const mockToken = "mock-jwt-token";

        set({ user: mockUser, token: mockToken, isAuthenticated: true });
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: "campus-mart-auth" }
  )
);