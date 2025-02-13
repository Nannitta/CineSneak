import { createJSONStorage } from 'zustand/middleware';

const storageUserInfo = {
  getItem: (name: string) => {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, JSON.stringify(value));
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const userTokenStorage = createJSONStorage(() => storageUserInfo);