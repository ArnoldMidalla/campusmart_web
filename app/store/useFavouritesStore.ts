import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavouriteItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

type FavouritesStore = {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: number) => void;
  toggleFavourite: (item: FavouriteItem) => void;
  isFavourited: (id: number) => boolean;
};

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (item) =>
        set((state) => {
          const already = state.favourites.some((f) => f.id === item.id);
          if (already) return state;
          return { favourites: [...state.favourites, item] };
        }),

      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((f) => f.id !== id),
        })),

      toggleFavourite: (item) => {
        const { isFavourited, addFavourite, removeFavourite } = get();
        if (isFavourited(item.id)) {
          removeFavourite(item.id);
        } else {
          addFavourite(item);
        }
      },

      isFavourited: (id) => get().favourites.some((f) => f.id === id),
    }),
    {
      name: "campus-mart-favourites",
    }
  )
);
