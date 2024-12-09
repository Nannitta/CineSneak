import { create } from 'zustand';
import { getMoviesByGenreId } from '@/services';
import { MovieDetails } from '@/types/types';

interface State {
  moviesByGenre: MovieDetails[]
  pagesMoviesByGenre: number
  fetchMoviesByGenreId: (id: number, page: number) => Promise<void> 
  fetchMoviesByScroll: (id:number, page: number) => Promise<void>
}

export const useMoviesByGenreId = create<State>((set) => {
  return {
    moviesByGenre: [],
    pagesMoviesByGenre: 0,
    fetchMoviesByGenreId: async (id: number, page: number) => {
      const response = await getMoviesByGenreId(id, page);
      const moviesByGenre = response.results;
      const pagesMoviesByGenre = response.total_pages;

      set({ moviesByGenre: Array.from(moviesByGenre), pagesMoviesByGenre });
    },
    fetchMoviesByScroll: async (id:number, page: number) => {
      const response = await getMoviesByGenreId(id, page);
      const newMoviesByGenre = response.results;
      const pagesMoviesByGenre = response.total_pages;

      set(state => {
        const existingIds = new Set(state.moviesByGenre.map(movie => movie.id));
        const uniqueMedia = newMoviesByGenre.filter((movie: MovieDetails) => !existingIds.has(movie.id));

        return {
          moviesByGenre: [...state.moviesByGenre, ...uniqueMedia],
          pagesMoviesByGenre
        };
      });
    }
  };
});