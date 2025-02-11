import { create } from 'zustand';

interface State {
  isLoginMenuOpen: boolean,
  openLoginMenu: () => void,
  closeLoginMenu: () => void
}

export const useLoginMenuStore = create<State>((set) => ({
  isLoginMenuOpen: false,
  openLoginMenu: () => set({ isLoginMenuOpen: true }),
  closeLoginMenu: () => set({ isLoginMenuOpen: false })
}));