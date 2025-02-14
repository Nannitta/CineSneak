import { Favorite, User } from '@/types/types';
import { getFavorites } from 'database/favorites';
import { create } from 'zustand';

interface State {
  favorites: Favorite[] | null
  favoritesIds: number[] | undefined
  fetchFavorites: (user: User) => void
  fecthFavoritesIds: (user: User) => void
  genericError: null | any
}

export const useFavoritesStore = create<State>((set) => ({
  favorites: null,
  genericError: null,
  favoritesIds: [],
  fetchFavorites: async (user: User) => {
    try {
      const favorites = await getFavorites(user.email);

      set({ favorites });
    } catch (error) {
      console.log(error);
      set({ genericError: error });
    }
  },
  fecthFavoritesIds: async (user: User) => {
    const response = await getFavorites(user.email);

    const favoritesIds: number[] = response.map((media) => {
      return (
        media.id
      );
    });
    
    set({ favoritesIds });
  }
}));