import { create } from 'zustand';
import { getSeriesByGenreId } from '@/services';
import { SerieDetails } from '@/types/types';

interface State {
  seriesByGenre: SerieDetails[]
  pagesSeriesByGenre: number
  fetchSeriesByGenreId: (id: number, page: number) => Promise<void> 
}

export const useSeriesByGenreId = create<State>((set) => {
  return {
    seriesByGenre: [],
    pagesSeriesByGenre: 0,
    fetchSeriesByGenreId: async (id: number, page: number) => {
      const response = await getSeriesByGenreId(id, page);
      const seriesByGenre = response.results;
      const pagesSeriesByGenre = response.total_pages;

      set({ seriesByGenre: Array.from(seriesByGenre), pagesSeriesByGenre });
    }
  };
});