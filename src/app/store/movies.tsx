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
  genericError: any
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
    genericError: null,
    fetchUpcomingMovies: async () => {
      try {
        const response = await getMoviesUpcoming();
        const upcomingMovies = response.filter((movie: MovieDetails) => movie.backdrop_path !== null || movie.poster_path !== null).map((movie: MovieDetails) => ({ ...movie, ownType: 'movie' }));
        
        set({ upcomingMovies: Array.from(upcomingMovies) });
      } catch (error) {
        console.log(error);
        set({ genericError: error });
      }
    },
    fetchMoviesNowPlaying: async (page: number) => {
      try {
        const response = await getMoviesNowPlaying(page);    
        const newMoviesNowPlaying: MovieDetails[] = response.results.filter((movie: MovieDetails) => movie.backdrop_path !== null || movie.poster_path !== null).map((movie: MovieDetails) => ({ ...movie, ownType: 'movie' }));
        const pagesMoviesNowPlaying = response.total_pages;
  
        set(state => {
          const existingIds = new Set(state.moviesNowPlaying.map(movie => movie.id));
          const uniqueNewMovies = newMoviesNowPlaying.filter(movie => !existingIds.has(movie.id));
  
          return {
            moviesNowPlaying: [...state.moviesNowPlaying, ...uniqueNewMovies],
            pagesMoviesNowPlaying
          };
        });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchMoviesGenre: async (isSerie: boolean) => {
      try {
        const movieGenres = await getGenres(isSerie);
        
        set({ movieGenres });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchMovieTrailers: async (id: number, isSerie: boolean) => {   
      try {
        const allVideos = await getTrailer(id, isSerie);            
        const trailers = allVideos.filter((movie: Trailer) => movie.type === 'Trailer' || movie.type === 'Opening Credits');
        if(trailers.length <= 0) return;
          
        const movieTrailer = trailers[0].key;     
              
        set({ movieTrailer });
      } catch (error) {
        set({ genericError: error });
      } 
    },
    resetMovieTrailer: () => {
      const movieTrailer = '';

      set({ movieTrailer });
    },
    fetchPopularMovies: async (page: number) => {
      try {
        const response = await getPopularMovies(page);
        const newPopularMovies: MovieDetails[] = response.results.filter((movie: MovieDetails) => movie.backdrop_path !== null || movie.poster_path !== null).map((movie: MovieDetails) => ({ ...movie, ownType: 'movie' }));
        const pagesPopularMovies = response.total_pages;
  
        set(state => {
          const existingIds = new Set(state.popularMovies.map(movie => movie.id));
          const uniqueNewMovies = newPopularMovies.filter(movie => !existingIds.has(movie.id));
  
          return {
            popularMovies: [...state.popularMovies, ...uniqueNewMovies],
            pagesPopularMovies
          };
        });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchTopRatedMovies: async (page: number) => {
      try {
        const response = await getTopRatedMovies(page);
        const newTopRatedMovies: MovieDetails[] = response.results.filter((movie: MovieDetails) => movie.backdrop_path !== null || movie.poster_path !== null).map((movie: MovieDetails) => ({ ...movie, ownType: 'movie' }));
        const pagesTopRatedMovies = response.total_pages;
  
        set(state => {
          const existingIds = new Set(state.topRatedMovies.map(movie => movie.id));
          const uniqueNewMovies = newTopRatedMovies.filter(movie => !existingIds.has(movie.id));
  
          return {
            topRatedMovies: [...state.topRatedMovies, ...uniqueNewMovies],
            pagesTopRatedMovies
          };
        });
      } catch (error) {
        set({ genericError: error });
      }
    }
  };
});