import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
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
  increaseQty: (id: number, size: string) => void;
  decreaseQty: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  getItemById: (id: number | string, size: string) => CartItem | undefined;
  getTotalPrice: () => number;
};

// export const useCartStore = create<CartStore>((set, get) => ({
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
    }),
    {
      name: "campus-mart-cart",
    }
  )
);

