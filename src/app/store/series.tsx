import { create } from 'zustand';
import { getOnAirSeries, getPopularSeries } from '@/services';
import { MoviesNowPalying } from '@/types/types';

interface State {
  onAirSeries: MoviesNowPalying[]
  fecthOnAirSeries: () => Promise<void>
  popularSeries: MoviesNowPalying[]
  fecthPopularSeries: () => Promise<void>
}

export const useSeriesStore = create<State>((set) => {
  return {
    onAirSeries: [],
    popularSeries: [],
    fecthOnAirSeries: async () => {
      const onAirSeries = await getOnAirSeries();

      set({ onAirSeries });
    },
    fecthPopularSeries: async () => {
      const popularSeries = await getPopularSeries();

      set({ popularSeries });
    }
  };
});