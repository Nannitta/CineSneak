import { create } from 'zustand';
import { getGenres, getTrailer, getMoviesNowPlaying, getMoviesUpcoming, getPopularMovies, getTopRatedMovies } from '@/services';
import { Genre, Trailer, MovieDetails } from '@/types/types';

interface State {
  upcomingMovies: MovieDetails[]
  fetchUpcomingMovies: () => Promise<void>
  moviesNowPlaying: MovieDetails[]
  fetchMoviesNowPlaying: (page: number) => Promise<void>
  pagesMoviesNowPlaying: number
  movieGenres: Genre[]
  fetchMoviesGenre: (isSerie: boolean) => Promise<void>
  movieTrailer: string
  fetchMovieTrailers: (id: number, isSerie: boolean) => Promise<void>
  resetMovieTrailer: () => void
  popularMovies: MovieDetails[]
  fetchPopularMovies: (page: number) => Promise<void>
  pagesPopularMovies: number
  topRatedMovies: MovieDetails[]
  fetchTopRatedMovies: (page: number) => Promise<void>
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

      set({ upcomingMovies: Array.from(upcomingMovies) });
    },
    fetchMoviesNowPlaying: async (page: number) => {
      const response = await getMoviesNowPlaying(page);    
      const newMoviesNowPlaying: MovieDetails[] = response.results;
      const pagesMoviesNowPlaying = response.total_pages;

      set(state => {
        const existingIds = new Set(state.moviesNowPlaying.map(movie => movie.id));
        const uniqueNewMovies = newMoviesNowPlaying.filter(movie => !existingIds.has(movie.id));

        return {
          moviesNowPlaying: [...state.moviesNowPlaying, ...uniqueNewMovies],
          pagesMoviesNowPlaying
        };
      });
    },
    fetchMoviesGenre: async (isSerie: boolean) => {
      const movieGenres = await getGenres(isSerie);

      set({ movieGenres });
    },
    fetchMovieTrailers: async (id: number, isSerie: boolean) => {    
      const allVideos = await getTrailer(id, isSerie);            
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
      const newPopularMovies: MovieDetails[] = response.results;
      const pagesPopularMovies = response.total_pages;

      set(state => {
        const existingIds = new Set(state.popularMovies.map(movie => movie.id));
        const uniqueNewMovies = newPopularMovies.filter(movie => !existingIds.has(movie.id));

        return {
          popularMovies: [...state.popularMovies, ...uniqueNewMovies],
          pagesPopularMovies
        };
      });
    },
    fetchTopRatedMovies: async (page: number) => {
      const response = await getTopRatedMovies(page);
      const newTopRatedMovies: MovieDetails[] = response.results;
      const pagesTopRatedMovies = response.total_pages;

      set(state => {
        const existingIds = new Set(state.topRatedMovies.map(movie => movie.id));
        const uniqueNewMovies = newTopRatedMovies.filter(movie => !existingIds.has(movie.id));

        return {
          topRatedMovies: [...state.topRatedMovies, ...uniqueNewMovies],
          pagesTopRatedMovies
        };
      });
    }
  };
});