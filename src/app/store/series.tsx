import { create } from 'zustand';
import { getOnAirSeries, getPopularSeries, getTopRatedSeries } from '@/services';
import { SerieDetails } from '@/types/types';

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
}

export const useSeriesStore = create<State>((set) => {
  return {
    onAirSeries: [],
    pagesOnAirSeries: 0,
    popularSeries: [],
    pagesPopularSeries: 0,
    topRatedSeries: [],
    pagesTopRatedSeries: 0,
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
    }
  };
});