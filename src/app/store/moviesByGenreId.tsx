import { create } from 'zustand';
import { getMoviesByGenreId } from '@/services';
import { MediaContent } from '@/types/types';

interface State {
  moviesByGenre: MediaContent[]
  fetchMoviesByGenreId: (id: number, page: number) => Promise<void> 
}

export const useMoviesByGenreId = create<State>((set) => {
  return {
    moviesByGenre: [],
    fetchMoviesByGenreId: async (id: number, page: number) => {
      const response = await getMoviesByGenreId(id, page);
      const moviesByGenre = response.results;

      set({ moviesByGenre });
    }
  };
});