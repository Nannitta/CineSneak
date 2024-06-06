import { getCast, getDetails, getProviders, getSimilarMedia } from '@/services';
import { Cast, MediaContent, MediaDetails } from '@/types/types';
import { create } from 'zustand';

interface State {
  mediaDetails: MediaDetails | null
  fetchMediaDetails: (id: number, isSerie: boolean) => Promise<void>
  providers: any | null,
  fetchProviders: (id: number, isSerie: boolean) => Promise<void>
  cast: Cast[]
  fetchCast: (id: number, isSerie: boolean) => Promise<void>
  similarMedia: MediaContent[]
  fetchSimilarMedia: (id: number, isSerie: boolean) => Promise<void>
}

export const useMediaDetailsStore = create<State>((set) => {
  return{
    mediaDetails: null,
    providers: null,
    cast: [],
    similarMedia: [],
    fetchMediaDetails: async (id: number, isSerie: boolean) => {
      const mediaDetails = await getDetails(id, isSerie);

      set({ mediaDetails });
    },
    fetchProviders: async (id: number, isSerie: boolean) => {
      const providers = await getProviders(id, isSerie);

      set({ providers });
    },
    fetchCast: async (id: number, isSerie: boolean) => {
      const cast = await getCast(id, isSerie);

      set({ cast });
    },
    fetchSimilarMedia: async (id: number, isSerie: boolean) => {
      const similarMedia = await getSimilarMedia(id, isSerie);

      set({ similarMedia });
    }
  };
});