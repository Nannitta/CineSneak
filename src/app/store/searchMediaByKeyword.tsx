import { searchMedia } from '@/services';
import { SearchedMedia } from '@/types/types';
import { create } from 'zustand';

interface State {
  searchedMedia: SearchedMedia[]
  fetchSearchMedia: (keyword: string, page: number) => Promise<void>
  resetSearchResults: () => void
  pagesSearchedMedia: number
  genericError: any
}

export const useSearchMediaByKeywordStore = create<State>((set) => ({
  searchedMedia: [],
  pagesSearchedMedia: 0,
  genericError: null,
  resetSearchResults: () => set({ searchedMedia: [], pagesSearchedMedia: 0 }),
  fetchSearchMedia: async (keyword: string, page: number) => {
    try {
      const response = await searchMedia(keyword, page);
      let pagesSearchedMedia = response.total_pages;
      let mediaResults = response.results.filter((media: SearchedMedia) => media.media_type === 'movie' || media.media_type === 'tv');

      if(pagesSearchedMedia > 50) {
        pagesSearchedMedia = 50;
      }

      if (pagesSearchedMedia > 1) {
        const results = [];
        for (let i = 2; i <= pagesSearchedMedia; i++) {
          results.push(searchMedia(keyword, i));
        }
        const additionalResults = await Promise.all(results);

        additionalResults.forEach((result) => {
          mediaResults = mediaResults.concat(result.results);
        });
      }

      set({
        searchedMedia: mediaResults,
        pagesSearchedMedia
      });
    } catch (error) {
      set({ genericError: error });
    }
  }
}));