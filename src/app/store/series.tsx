import { create } from 'zustand';
import { getGenres, getOnAirSeries, getPopularSeries, getSeriesAiringToday, getSeriesOfTheDay, getTopRatedSeries, getTrailer } from '@/services';
import { Genre, SerieDetails, Trailer } from '@/types/types';

interface State {
  onAirSeries: SerieDetails[]
  fetchOnAirSeries: (page: number) => Promise<void>
  pagesOnAirSeries: number
  popularSeries: SerieDetails[]
  fetchPopularSeries: (page: number) => Promise<void>
  pagesPopularSeries: number
  topRatedSeries: SerieDetails[]
  pagesTopRatedSeries: number
  fetchTopRatedSeries: (page: number) => Promise<void>
  seriesOfTheDay: SerieDetails[]
  fetchSeriesOfTheDay: () => Promise<void>
  serieGenres: Genre[]
  fetchSerieGenre: (isSerie: boolean) => Promise<void>
  serieTrailer: string
  fetchSerieTrailers: (id: number, isSerie: boolean) => Promise<void>
  resetSerieTrailer: () => void
  airingToday: SerieDetails[]
  fetchAiringToday: (page: number) => Promise<void>
  pagesAiringToday: number
  recommendedSerie: SerieDetails | null
  getRecommendedSerie: (data: SerieDetails[]) => void
  genericError: any
}

export const useSeriesStore = create<State>((set) => {
  return {
    onAirSeries: [],
    pagesOnAirSeries: 0,
    popularSeries: [],
    pagesPopularSeries: 0,
    topRatedSeries: [],
    pagesTopRatedSeries: 0,
    seriesOfTheDay: [],
    serieGenres: [],
    serieTrailer: '',
    airingToday: [],
    pagesAiringToday: 0,
    recommendedSerie: null,
    genericError: null,
    fetchOnAirSeries: async (page: number) => {
      try {
        const response = await getOnAirSeries(page);
        const onAirSeries = response.results.filter((serie: SerieDetails) => serie.backdrop_path !== null || serie.poster_path !== null);
        const pagesOnAirSeries = response.total_pages;
  
        set({ onAirSeries: Array.from(onAirSeries), pagesOnAirSeries });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchPopularSeries: async (page: number) => {
      try {
        const response = await getPopularSeries(page);
        const newPopularSeries: SerieDetails[] = response.results.filter((serie: SerieDetails) => serie.backdrop_path !== null || serie.poster_path !== null);
        const pagesPopularSeries = response.total_pages;
  
        set(state => {
          const existingIds = new Set(state.popularSeries.map(serie => serie.id));
          const uniqueNewSeries = newPopularSeries.filter(serie => !existingIds.has(serie.id));
  
          return {
            popularSeries: [...state.popularSeries, ...uniqueNewSeries],
            pagesPopularSeries
          };
        });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchTopRatedSeries: async (page: number) => {
      try {
        const response = await getTopRatedSeries(page);
        const newTopRatedSeries: SerieDetails[] = response.results.filter((serie: SerieDetails) => serie.backdrop_path !== null || serie.poster_path !== null);
        const pagesTopRatedSeries = response.total_pages;
  
        set(state => {
          const existingIds = new Set(state.topRatedSeries.map(serie => serie.id));
          const uniqueNewSeries = newTopRatedSeries.filter(serie => !existingIds.has(serie.id));
  
          return {
            topRatedSeries: [...state.topRatedSeries, ...uniqueNewSeries],
            pagesTopRatedSeries
          };
        });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchSeriesOfTheDay: async () => {
      try {
        const response = await getSeriesOfTheDay();
        const seriesOfTheDay = response.results.filter((serie: SerieDetails) => serie.backdrop_path !== null || serie.poster_path !== null);
  
        set({ seriesOfTheDay });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchSerieGenre: async (isSerie: boolean) => {
      try {
        const serieGenres = await getGenres(isSerie);
  
        set({ serieGenres });
      } catch (error) {
        set({ genericError: error });
      }
    },
    fetchSerieTrailers: async (id: number, isSerie: boolean) => {
      try {
        const allVideos = await getTrailer(id, isSerie);                      
        const trailers = allVideos.filter((serie: Trailer) => serie.type === 'Trailer' || serie.type === 'Opening Credits');
        if(trailers.length <= 0) return;
          
        const serieTrailer = trailers[0].key;          
      
        set({ serieTrailer });
      } catch (error) {
        set({ genericError: error });
      }
    },
    resetSerieTrailer: () => {
      const serieTrailer = '';

      set({ serieTrailer });
    },
    fetchAiringToday: async (page: number) => {
      try {
        const response = await getSeriesAiringToday(page);
        const newAiringToday: SerieDetails[] = response.results.filter((serie: SerieDetails) => serie.backdrop_path !== null || serie.poster_path !== null);
        const pagesAiringToday = response.total_pages;
        
        set(state => {
          const existingIds = new Set(state.airingToday.map(series => series.id)); 
          const uniqueNewSeries = newAiringToday.filter(series => !existingIds.has(series.id));
          
          return {
            airingToday: [...state.airingToday, ...uniqueNewSeries],
            pagesAiringToday
          };
        });
      } catch (error) {
        set({ genericError: error });
      }
    },   
    getRecommendedSerie: (data: SerieDetails[]) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const recommendedSerie = data[randomIndex];

      set({ recommendedSerie });
    }
  };
});