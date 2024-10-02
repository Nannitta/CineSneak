import { searchMedia } from '@/services';
import { SearchedMedia } from '@/types/types';
import { create } from 'zustand';

interface State {
  searchedMedia: SearchedMedia[]
  fetchSearchMedia: (keyword: string, page: number) => Promise<void>
  pagesSearchedMedia: number
}

export const useSearchMediaStore = create<State>((set) => ({
  searchedMedia: [],
  pagesSearchedMedia: 0,
  fetchSearchMedia: async (keyword: string, page: number) => {
    const response = await searchMedia(keyword, page);
    const searchedMedia = response.results.filter((media: SearchedMedia) => media.media_type === 'movie' || media.media_type === 'tv');
    const pagesSearchedMedia = response.total_pages;

    set({ searchedMedia, pagesSearchedMedia });
  }
}));