import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  token: string | null;
  profile: Record<string, any> | null;
  setToken: (token: string | null) => void;
  setProfile: (profile: Record<string, any> | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogged: false,
      setIsLogged: (isLogged: boolean) => set({ isLogged }),
      token: null,
      profile: null,
      setToken: (token) => set({ token }),
      setProfile: (profile) => set({ profile }),
      logout: () => set({ token: null, profile: null }),
    }),
    { name: "auth-storage" }, // Key penyimpanan di localStorage
  ),
);
