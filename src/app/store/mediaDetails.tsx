import { create } from 'zustand';
import { getCast, getDetails, getProviders, getSimilarMedia } from '@/services';
import { Cast, CountryProvider, MovieDetails, SerieDetails } from '@/types/types';

interface State {
  mediaDetails: MovieDetails | SerieDetails | null
  fetchMediaDetails: (id: number, isSerie: boolean) => Promise<void>
  providers: CountryProvider | null,
  fetchProviders: (id: number, isSerie: boolean) => Promise<void>
  resetProviders: () => void
  cast: Cast[]
  fetchCast: (id: number, isSerie: boolean) => Promise<void>
  similarMedia: MovieDetails[] | SerieDetails[]
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
    resetProviders: () => {
      set({ providers: null });
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