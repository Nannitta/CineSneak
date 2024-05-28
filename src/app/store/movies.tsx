import { create } from 'zustand';
import { getMovieGenres, getMovieTrailer, getMoviesNowPlaying, getMoviesUpcoming, getPopularMovies, getTopRatedMovies } from '@/services';
import { Genre, Trailer, MediaContent } from '@/types/types';

interface State {
  upcomingMovies: MediaContent[],
  fetchUpcomingMovies: () => Promise<void>
  moviesNowPlaying: MediaContent[]
  fetchMoviesNowPlaying: () => Promise<void>
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
  movieTrailer: string
  fetchMovieTrailers: (id: number) => Promise<void>
  resetMovieTrailer: () => void
  popularMovies: MediaContent[]
  fetchPopularMovies: () => Promise<void>
  topRatedMovies: MediaContent[]
  fecthTopRatedMovies: () => Promise<void>
}

export const useMoviesStore = create<State>((set) => {
  return {
    upcomingMovies: [],
    moviesNowPlaying: [],
    movieGenres: [],
    movieTrailer: '',
    popularMovies: [],
    topRatedMovies: [],
    fetchUpcomingMovies: async () => {
      const upcomingMovies = await getMoviesUpcoming();

      set({ upcomingMovies });
    },
    fetchMoviesNowPlaying: async () => {
      const moviesNowPlaying = await getMoviesNowPlaying();
     
      set({ moviesNowPlaying });
    },
    fetchMoviesGenre: async () => {
      const movieGenres = await getMovieGenres();

      set({ movieGenres });
    },
    fetchMovieTrailers: async (id: number) => {
      const allVideos = await getMovieTrailer(id);      
      const trailers = allVideos.filter((movie: Trailer) => movie.type === 'Trailer');
      const movieTrailer = trailers[0].key;     
            
      set({ movieTrailer });
    },
    resetMovieTrailer: () => {
      const movieTrailer = '';

      set({ movieTrailer });
    },
    fetchPopularMovies: async () => {
      const popularMovies = await getPopularMovies();

      set({ popularMovies });
    },
    fecthTopRatedMovies: async () => {
      const topRatedMovies = await getTopRatedMovies();

      set({ topRatedMovies });
    }
  };
});