import { Profile, Store } from "@/types/global";
import { create } from "zustand";

export const useProfileStore = create<Store<Profile | null, { set: (data: Profile | null) => void; getFullName: () => string | null }>>((set, get) => ({
  data: null,
  fn: {
    set: (data) => set((state) => ({ data: data ? { ...state.data, ...data } : null })),
    getFullName: () => {
      const { data } = get();
      return data ? `${data.firstName ?? ""} ${data.lastName ?? ""}` : null;
    },
  },
}));
