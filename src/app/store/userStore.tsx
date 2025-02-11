import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userTokenStorage } from './storages/userTokenStorage';
import { User } from '@/types/types';

interface LoginState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
}

export const useLoginStore = create<LoginState> () (
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token: string) => set({ token }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: 'loginUser',
      storage: userTokenStorage,
      partialize: (state) => ({ token: state.token, user: state.user })
    }
  )
);
