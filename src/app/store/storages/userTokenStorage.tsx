import { createJSONStorage } from 'zustand/middleware';

const storageToken = {
  getItem: (name: string) => {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const userTokenStorage = createJSONStorage(() => storageToken);