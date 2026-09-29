import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ordersApi } from "@/lib/api/orders";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  size: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQty: (id: string, size: string) => void;
  decreaseQty: (id: string, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  getItemById: (id: string, size: string) => CartItem | undefined;
  getTotalPrice: () => number;
  checkout: (paymentMethod: number, pickupStationId?: string) => Promise<{ orderId: string; message: string }>;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),

      increaseQty: (id, size) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQty: (id, size) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        })),

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemById: (id, size) =>
        get().cart.find((i) => i.id === id && i.size === size),

      checkout: async (paymentMethod, pickupStationId) => {
        const { cart } = get();
        try {
          const payload = {
            items: cart.map(item => ({
              id: item.id,
              quantity: item.quantity,
              size: item.size
            })),
            paymentMethod,
            pickupStationId,
          };
          
          const result = await ordersApi.createOrder(payload);
          
          // Clear cart on successful checkout
          set({ cart: [] });
          return result;
        } catch (error) {
          console.error("Checkout failed:", error);
          throw error;
        }
      },
    }),
    {
      name: "campus-mart-cart",
    }
  )
);

