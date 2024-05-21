import { create } from 'zustand';
import { Genre, MovieTrailer, MoviesNowPalying } from '../types/types';
import { getMovieGenres, getMovieTrailer, getMoviesNowPlaying } from '../services';

interface State {
  moviesNowPlaying: MoviesNowPalying[]
  fetchMoviesNowPlaying: () => Promise<void>
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
  movieTrailers: MovieTrailer[]
  fetchMovieTrailers: (id: number) => Promise<void>
}

export const useMoviesStore = create<State>((set) => {
  return {
    moviesNowPlaying: [],
    movieGenres: [],
    movieTrailers: [],
    fetchMoviesNowPlaying: async () => {
      const moviesNowPlaying = await getMoviesNowPlaying()
     
      set({ moviesNowPlaying })
    },
    fetchMoviesGenre: async () => {
      const movieGenres = await getMovieGenres()

      set({ movieGenres })
    },
    fetchMovieTrailers: async (id: number) => {
      const movieTrailers = await getMovieTrailer(id)      

      set({ movieTrailers })
    }
  }
});