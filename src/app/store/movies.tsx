import { create } from 'zustand';
import { getMovieGenres, getMovieTrailer, getMoviesNowPlaying, getMoviesUpcoming, getPopularMovies, getTopRatedMovies } from '@/services';
import { Genre, Trailer, MediaContent } from '@/types/types';

interface State {
  upcomingMovies: MediaContent[],
  fetchUpcomingMovies: () => Promise<void>
  moviesNowPlaying: MediaContent[]
  fetchMoviesNowPlaying: (page: number) => Promise<void>
  pagesMoviesNowPlaying: number
  movieGenres: Genre[]
  fetchMoviesGenre: () => Promise<void>
  movieTrailer: string
  fetchMovieTrailers: (id: number, isSerie: boolean) => Promise<void>
  resetMovieTrailer: () => void
  popularMovies: MediaContent[]
  fetchPopularMovies: (page: number) => Promise<void>
  pagesPopularMovies: number
  topRatedMovies: MediaContent[]
  fecthTopRatedMovies: (page: number) => Promise<void>
  pagesTopRatedMovies: number
}

export const useMoviesStore = create<State>((set) => {
  return {
    upcomingMovies: [],
    moviesNowPlaying: [],
    pagesMoviesNowPlaying: 0,
    movieGenres: [],
    movieTrailer: '',
    popularMovies: [],
    pagesPopularMovies: 0,
    topRatedMovies: [],
    pagesTopRatedMovies: 0,
    fetchUpcomingMovies: async () => {
      const upcomingMovies = await getMoviesUpcoming();

      set({ upcomingMovies });
    },
    fetchMoviesNowPlaying: async (page: number) => {
      const response = await getMoviesNowPlaying(page);    
      const moviesNowPlaying = response.results;
      const pagesMoviesNowPlaying = response.total_pages;

      set({ moviesNowPlaying, pagesMoviesNowPlaying });
    },
    fetchMoviesGenre: async () => {
      const movieGenres = await getMovieGenres();

      set({ movieGenres });
    },
    fetchMovieTrailers: async (id: number, isSerie: boolean) => {    
      const allVideos = await getMovieTrailer(id, isSerie);            
      const trailers = allVideos.filter((movie: Trailer) => movie.type === 'Trailer' || movie.type === 'Opening Credits');
      if(trailers.length <= 0) return;
        
      const movieTrailer = trailers[0].key;     
            
      set({ movieTrailer });
    },
    resetMovieTrailer: () => {
      const movieTrailer = '';

      set({ movieTrailer });
    },
    fetchPopularMovies: async (page: number) => {
      const response = await getPopularMovies(page);
      const popularMovies = response.results;
      const pagesPopularMovies = response.total_pages;

      set({ popularMovies, pagesPopularMovies });
    },
    fecthTopRatedMovies: async (page: number) => {
      const response = await getTopRatedMovies(page);
      const topRatedMovies = response.results;
      const pagesTopRatedMovies = response.total_pages;

      set({ topRatedMovies, pagesTopRatedMovies });
    }
  };
});