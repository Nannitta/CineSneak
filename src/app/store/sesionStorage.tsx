import { createJSONStorage } from 'zustand/middleware';

const storageToken = {
  getItem: (name: string) => {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: (name: string, value: string) => {
    sessionStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export const customSessionStorage = createJSONStorage(() => storageToken);