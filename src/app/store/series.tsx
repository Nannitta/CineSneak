import { create } from 'zustand';
import { getOnAirSeries, getPopularSeries, getTopRatedSeries } from '@/services';
import { SerieDetails } from '@/types/types';

interface State {
  onAirSeries: SerieDetails[]
  fecthOnAirSeries: (page: number) => Promise<void>
  pagesOnAirSeries: number
  popularSeries: SerieDetails[]
  fecthPopularSeries: (page: number) => Promise<void>
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
    fecthOnAirSeries: async (page: number) => {
      const response = await getOnAirSeries(page);
      const onAirSeries = response.results;
      const pagesOnAirSeries = response.total_pages;

      set({ onAirSeries, pagesOnAirSeries });
    },
    fecthPopularSeries: async (page: number) => {
      const response = await getPopularSeries(page);
      const popularSeries = response.results;
      const pagesPopularSeries = response.total_pages;

      set({ popularSeries, pagesPopularSeries });
    },
    fetchTopRatedSeries: async (page: number) => {
      const response = await getTopRatedSeries(page);
      const topRatedSeries = response.results;
      const pagesTopRatedSeries = response.total_pages;

      set({ topRatedSeries, pagesTopRatedSeries });
    }
  };
});