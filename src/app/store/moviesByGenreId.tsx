import { create } from 'zustand';
import { getMoviesByGenreId } from '@/services';
import { MovieDetails } from '@/types/types';

interface State {
  moviesByGenre: MovieDetails[]
  pagesMoviesByGenre: number
  fetchMoviesByGenreId: (id: number, page: number) => Promise<void> 
  fetchMoviesByScroll: (id:number, page: number) => Promise<void>
  genericError: any
}

export const useMoviesByGenreId = create<State>((set) => {
  return {
    moviesByGenre: [],
    pagesMoviesByGenre: 0,
    genericError: null,
    fetchMoviesByGenreId: async (id: number, page: number) => {
      try {
        const response = await getMoviesByGenreId(id, page);
        const moviesByGenre = response.results;
        const pagesMoviesByGenre = response.total_pages;
  
        set({ moviesByGenre: Array.from(moviesByGenre), pagesMoviesByGenre });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchMoviesByScroll: async (id:number, page: number) => {
      try {
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
      } catch (error) {
        set({ genericError: error });
      }
    }
  };
});