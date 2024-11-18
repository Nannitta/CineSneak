import { searchMedia } from '@/services';
import { SearchedMedia } from '@/types/types';
import { create } from 'zustand';

interface State {
  searchedMedia: SearchedMedia[]
  fetchSearchMedia: (keyword: string, page: number) => Promise<void>
  resetSearchResults: () => void
  pagesSearchedMedia: number
}

export const useSearchMediaStore = create<State>((set) => ({
  searchedMedia: [],
  pagesSearchedMedia: 0,
  resetSearchResults: () => set({ searchedMedia: [], pagesSearchedMedia: 0 }),
  fetchSearchMedia: async (keyword: string, page: number) => {
    const response = await searchMedia(keyword, page);
    const newSearchedMedia = response.results.filter((media: SearchedMedia) => media.media_type === 'movie' || media.media_type === 'tv');
    const pagesSearchedMedia = response.total_pages;

    set(state => {
      const existingIds = new Set(state.searchedMedia.map(media => media.id));
      const uniqueMedia = newSearchedMedia.filter((media: SearchedMedia) => !existingIds.has(media.id));
      
      return {
        searchedMedia: [...state.searchedMedia, ...uniqueMedia],
        pagesSearchedMedia
      };
    });
  }
}));