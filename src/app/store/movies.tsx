import { create } from 'zustand';
import { MoviesNowPalying } from '../types/types';
import { getMoviesNowPlaying } from '../services';

interface State {
  moviesNowPlaying: MoviesNowPalying[]
  fetchMoviesNowPlaying: () => Promise<void>
}

export const useMoviesStore = create<State>((set) => {
  return {
    moviesNowPlaying: [],
    fetchMoviesNowPlaying: async () => {
      const moviesNowPlaying = await getMoviesNowPlaying()
     
      set({ moviesNowPlaying })
    }
  }
});