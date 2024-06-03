import { getDetails, getProviders } from '@/services';
import { MediaDetails } from '@/types/types';
import { create } from 'zustand';

interface State {
  mediaDetails: MediaDetails | null
  fetchMediaDetails: (id: number, isSerie: boolean) => Promise<void>
  providers: any | null,
  fetchProviders: (id: number, isSerie: boolean) => Promise<void>
}

export const useMediaDetailsStore = create<State>((set) => {
  return{
    mediaDetails: null,
    providers: null,
    fetchMediaDetails: async (id: number, isSerie: boolean) => {
      const mediaDetails = await getDetails(id, isSerie);

      set({ mediaDetails });
    },
    fetchProviders: async (id: number, isSerie: boolean) => {
      const providers = await getProviders(id, isSerie);

      set({ providers });
    }
  };
});