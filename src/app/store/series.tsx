import { create } from 'zustand';
import { getPopularSeries } from '@/services';
import { MoviesNowPalying } from '@/types/types';

interface State {
  popularSeries: MoviesNowPalying[]
  fetchPopularSeries: () => Promise<void>
}

export const useSeriesStore = create<State>((set) => {
  return {
    popularSeries: [],
    fetchPopularSeries: async () => {
      const popularSeries = await getPopularSeries();

      set({ popularSeries });
    }
  };
});