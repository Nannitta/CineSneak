import { create } from 'zustand';
import { Genre, MoviesNowPalying } from '../types/types';
import { getBackDropMovie, getMovieGenres, getMoviesNowPlaying } from '../services';

interface State {
  moviesNowPlaying: MoviesNowPalying[]
  fetchMoviesNowPlaying: () => Promise<void>
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
}

export const useMoviesStore = create<State>((set) => {
  return {
    moviesNowPlaying: [],
    movieGenres: [],
    movieBackDrop: "",
    fetchMoviesNowPlaying: async () => {
      const moviesNowPlaying = await getMoviesNowPlaying()
     
      set({ moviesNowPlaying })
    },
    fetchMoviesGenre: async () => {
      const movieGenres = await getMovieGenres()

      set({ movieGenres })
    }
  }
});