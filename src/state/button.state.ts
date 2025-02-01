import { create } from "zustand";

type TType = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useButtonStore = create<TType>((set) => ({
  count: 5,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
