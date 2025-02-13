import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userTokenStorage } from './storages/userTokenStorage';
import { User } from '@/types/types';

interface LoginState {
  token: string;
  user: User | null;
  rehydrated: boolean; // Agrega un flag para saber si el estado se ha restaurado
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
  setRehydrated: (rehydrated: boolean) => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      token: '',
      user: null,
      rehydrated: false,
      setToken: (token: string) => set({ token }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ token: '', user: null }),
      setRehydrated: (rehydrated: boolean) => set({ rehydrated }),
    }),
    {
      name: 'loginUser',
      storage: userTokenStorage,
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setRehydrated(true);
      },
    }
  )
);

