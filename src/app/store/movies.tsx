import { create } from 'zustand';
import { Genre, MovieTrailer, MoviesNowPalying } from '../types/types';
import { getMovieGenres, getMovieTrailer, getMoviesNowPlaying } from '../services';

interface State {
  moviesNowPlaying: MoviesNowPalying[]
  fetchMoviesNowPlaying: () => Promise<void>
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
  movieTrailer: string
  fetchMovieTrailers: (id: number) => Promise<void>
  resetMovieTrailer: () => void
}

export const useMoviesStore = create<State>((set) => {
  return {
    moviesNowPlaying: [],
    movieGenres: [],
    movieTrailer: "",
    fetchMoviesNowPlaying: async () => {
      const moviesNowPlaying = await getMoviesNowPlaying()
     
      set({ moviesNowPlaying })
    },
    fetchMoviesGenre: async () => {
      const movieGenres = await getMovieGenres()

      set({ movieGenres })
    },
    fetchMovieTrailers: async (id: number) => {
      const allVideos = await getMovieTrailer(id)      
      const trailers = allVideos.filter((movie: MovieTrailer) => movie.type === "Trailer")
      const movieTrailer = trailers[0].key     
            
      set({ movieTrailer })
    },
    resetMovieTrailer: () => {
      const movieTrailer = "";

      set({ movieTrailer })
    }
  }
});