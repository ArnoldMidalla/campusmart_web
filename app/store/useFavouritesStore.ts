import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavouriteItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type FavouritesStore = {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
  toggleFavourite: (item: FavouriteItem) => void;
  isFavourited: (id: string) => boolean;
};

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (item) =>
        set((state) => {
          const already = state.favourites.some((f) => String(f.id) === String(item.id));
          if (already) return state;
          return { favourites: [...state.favourites, { ...item, id: String(item.id) }] };
        }),

      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((f) => String(f.id) !== String(id)),
        })),

      toggleFavourite: (item) => {
        const { isFavourited, addFavourite, removeFavourite } = get();
        if (isFavourited(String(item.id))) {
          removeFavourite(String(item.id));
        } else {
          addFavourite(item);
        }
      },

      isFavourited: (id) => get().favourites.some((f) => String(f.id) === String(id)),
    }),
    {
      name: "campus-mart-favourites",
    }
  )
);
