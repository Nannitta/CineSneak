import { create } from 'zustand';
import { getCast, getDetails, getProviders, getSimilarMedia } from '@/services';
import { Cast, CountryProvider, MovieDetails, SerieDetails } from '@/types/types';

interface State {
  mediaDetails: MovieDetails | SerieDetails | null
  fetchMediaDetails: (id: number, isSerie: boolean) => Promise<void>
  resetMediaDetails: () => void
  providers: CountryProvider | null,
  fetchProviders: (id: number, isSerie: boolean) => Promise<void>
  resetProviders: () => void
  cast: Cast[] | null
  fetchCast: (id: number, isSerie: boolean) => Promise<void>
  resetCast: () => void
  similarMedia: MovieDetails[] | SerieDetails[]
  fetchSimilarMedia: (id: number, isSerie: boolean) => Promise<void>
  genericError: any
}

export const useMediaDetailsStore = create<State>((set) => {
  return{
    mediaDetails: null,
    providers: null,
    cast: [],
    similarMedia: [],
    genericError: null,
    fetchMediaDetails: async (id: number, isSerie: boolean) => {
      try {
        const mediaDetails = await getDetails(id, isSerie);
  
        set({ mediaDetails });
      } catch (error) {
        set({ genericError: error });
      }
    },
    resetMediaDetails: () => {
      set({ mediaDetails: null });
    },
    fetchProviders: async (id: number, isSerie: boolean) => {
      try {
        const providers = await getProviders(id, isSerie);     
        
        set({ providers });
      } catch (error) {
        set({ genericError: error });
      }
    },
    resetProviders: () => {
      set({ providers: null });
    },
    fetchCast: async (id: number, isSerie: boolean) => {
      try {
        const cast = await getCast(id, isSerie);
        
        set({ cast });
      } catch (error) {
        set({ genericError: error });
      }
    },
    resetCast: () => {
      set({ cast: null });
    },
    fetchSimilarMedia: async (id: number, isSerie: boolean) => {
      try {
        const similarMedia = await getSimilarMedia(id, isSerie);
        
        set({ similarMedia });
      } catch (error) {
        set({ genericError: error });
      }
    }
  };
});