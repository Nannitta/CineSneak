import { create } from 'zustand';
import { getMovieGenres, getMovieTrailer, getMoviesNowPlaying, getMoviesUpcoming, getPopularMovies, getTopRatedMovies } from '@/services';
import { Genre, Trailer, MediaContent } from '@/types/types';

interface State {
  upcomingMovies: MediaContent[],
  fetchUpcomingMovies: () => Promise<void>
  moviesNowPlaying: MediaContent[]
  fetchMoviesNowPlaying: (page: number) => Promise<void>
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
  movieTrailer: string
  fetchMovieTrailers: (id: number, isSerie: boolean) => Promise<void>
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
    fetchMoviesNowPlaying: async (page: number) => {
      const moviesNowPlaying = await getMoviesNowPlaying(page);    
     
      set({ moviesNowPlaying });
    },
    fetchMoviesGenre: async () => {
      const movieGenres = await getMovieGenres();

      set({ movieGenres });
    },
    fetchMovieTrailers: async (id: number, isSerie: boolean) => {    
      const allVideos = await getMovieTrailer(id, isSerie);            
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