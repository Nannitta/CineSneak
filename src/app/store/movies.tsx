import { create } from 'zustand';
import { Genre, MovieTrailer, MoviesNowPalying } from '../types/types';
import { getMovieGenres, getMovieTrailer, getMoviesNowPlaying, getMoviesUpcoming, getPopularMovies } from '../services';

interface State {
  upcomingMovies: MoviesNowPalying[],
  fetchUpcomingMovies: () => Promise<void>
  moviesNowPlaying: MoviesNowPalying[]
  fetchMoviesNowPlaying: () => Promise<void>
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
  movieTrailer: string
  fetchMovieTrailers: (id: number) => Promise<void>
  resetMovieTrailer: () => void
  popularMovies: MoviesNowPalying[]
  fetchPopularMovies: () => Promise<void>
}

export const useMoviesStore = create<State>((set) => {
  return {
    upcomingMovies: [],
    moviesNowPlaying: [],
    movieGenres: [],
    movieTrailer: "",
    popularMovies: [],
    fetchUpcomingMovies: async () => {
      const upcomingMovies = await getMoviesUpcoming()

      set({ upcomingMovies })
    },
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
    },
    fetchPopularMovies: async () => {
      const popularMovies = await getPopularMovies()

      set({ popularMovies })
    }
  }
});