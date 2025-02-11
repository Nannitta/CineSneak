import { createJSONStorage } from 'zustand/middleware';

const storageToken = {
  getItem: (name: string) => {
    const data = sessionStorage.getItem(name);
    return data ? JSON.parse(data) : null;
  },
  setItem: (name: string, value: string) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export const userTokenStorage = createJSONStorage(() => storageToken);