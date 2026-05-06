import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PickupStation = {
  id: number;
  name: string;
  address: string;
  contactName: string;
  contactPhone: string;
  openingHours: string[];
};

type PickupStore = {
  selectedStation: PickupStation | null;
  setSelectedStation: (station: PickupStation) => void;
  clearSelectedStation: () => void;
};

export const usePickupStore = create<PickupStore>()(
  persist(
    (set) => ({
      selectedStation: null,
      setSelectedStation: (station) => set({ selectedStation: station }),
      clearSelectedStation: () => set({ selectedStation: null }),
    }),
    {
      name: "campus-mart-pickup",
    }
  )
);
