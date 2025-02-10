import { create } from 'zustand';

interface UserState {
  user: {
    uid: string;
    displayName: string;
    email: string;
  } | null;
  token: string | null;
  setUser: (user: any, token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));
