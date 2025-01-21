import { create } from "zustand";

interface AuthState {
  token: string | null;
  profile: Record<string, any> | null;
  setToken: (token: string | null) => void;
  setProfile: (profile: Record<string, any> | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  profile: null,
  setToken: (token) => set({ token }),
  setProfile: (profile) => set({ profile }),
  logout: () => set({ token: null, profile: null }),
}));
