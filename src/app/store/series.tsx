import { create } from 'zustand';
import { getOnAirSeries, getPopularSeries, getTopRatedSeries } from '@/services';
import { MediaContent } from '@/types/types';

interface State {
  onAirSeries: MediaContent[]
  fecthOnAirSeries: () => Promise<void>
  popularSeries: MediaContent[]
  fecthPopularSeries: () => Promise<void>
  topRatedSeries: MediaContent[]
  fetchTopRatedSeries: () => Promise<void>
}

export const useSeriesStore = create<State>((set) => {
  return {
    onAirSeries: [],
    popularSeries: [],
    topRatedSeries: [],
    fecthOnAirSeries: async () => {
      const onAirSeries = await getOnAirSeries();

      set({ onAirSeries });
    },
    fecthPopularSeries: async () => {
      const popularSeries = await getPopularSeries();

      set({ popularSeries });
    },
    fetchTopRatedSeries: async () => {
      const topRatedSeries = await getTopRatedSeries();

      set({ topRatedSeries });
    }
  };
});