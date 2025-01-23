import { create } from 'zustand';
import { getCollectionMovies } from '@/services';
import { MoviesCollection } from '@/types/types';

interface State {
  moviesCollection: MoviesCollection | null
  fetchMoviesCollections: () => Promise<void>
  genericError: any
}

export const useMoviesCollectionStore = create<State>((set) => {
  return {
    moviesCollection: null,
    genericError: null,
    fetchMoviesCollections: async () => {
      try {
        const collectionsId = [10, 173710, 328, 748, 9485, 1241, 119, 86311];
        const randomIndex = Math.floor(Math.random() * collectionsId.length);
        const moviesCollection = await getCollectionMovies(collectionsId[randomIndex]);
  
        set({ moviesCollection });
      } catch (error) {
        set({ genericError: error });
      }
    }
  };
});