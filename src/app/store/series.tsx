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
    fetchOnAirSeries: async (page: number) => {
      const response = await getOnAirSeries(page);
      const onAirSeries = response.results;
      const pagesOnAirSeries = response.total_pages;

      set({ onAirSeries: Array.from(onAirSeries), pagesOnAirSeries });
    },
    fetchPopularSeries: async (page: number) => {
      const response = await getPopularSeries(page);
      const popularSeries = response.results;
      const pagesPopularSeries = response.total_pages;

      set({ popularSeries: Array.from(popularSeries), pagesPopularSeries });
    },
    fetchTopRatedSeries: async (page: number) => {
      const response = await getTopRatedSeries(page);
      const topRatedSeries = response.results;
      const pagesTopRatedSeries = response.total_pages;

      set({ topRatedSeries: Array.from(topRatedSeries), pagesTopRatedSeries });
    },
    fetchSeriesOfTheDay: async () => {
      const response = await getSeriesOfTheDay();
      const seriesOfTheDay = response.results;

      set({ seriesOfTheDay });
    },
    fetchSerieGenre: async (isSerie: boolean) => {
      const serieGenres = await getGenres(isSerie);

      set({ serieGenres });
    },
    fetchSerieTrailers: async (id: number, isSerie: boolean) => {
      const allVideos = await getTrailer(id, isSerie);                      
      const trailers = allVideos.filter((serie: Trailer) => serie.type === 'Trailer' || serie.type === 'Opening Credits');
      if(trailers.length <= 0) return;
        
      const serieTrailer = trailers[0].key;          
    
      set({ serieTrailer });
    },
    resetSerieTrailer: () => {
      const serieTrailer = '';

      set({ serieTrailer });
    },
    fetchAiringToday: async (page: number) => {
      const response = await getSeriesAiringToday(page);
      const airingToday = response.results;
      const pagesAiringToday = response.total_pages;

      set({ airingToday, pagesAiringToday });
    },
    getRecommendedSerie: (data: SerieDetails[]) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const recommendedSerie = data[randomIndex];

      set({ recommendedSerie });
    }
  };
});