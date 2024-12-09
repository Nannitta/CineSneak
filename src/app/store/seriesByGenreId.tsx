import { create } from 'zustand';
import { getSeriesByGenreId } from '@/services';
import { SerieDetails } from '@/types/types';

interface State {
  seriesByGenre: SerieDetails[]
  pagesSeriesByGenre: number
  fetchSeriesByGenreId: (id: number, page: number) => Promise<void>
  fetchSeriesByScroll: (id:number, page: number) => Promise<void>
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
    },
    fetchSeriesByScroll: async (id: number, page: number) => {
      const response = await getSeriesByGenreId(id, page);
      const newSeriesByGenre = response.results;
      const pagesSeriesByGenre = response.total_pages;

      set(state => {
        const existingIds = new Set(state.seriesByGenre.map(serie => serie.id));
        const uniqueMedia = newSeriesByGenre.filter((serie: SerieDetails) => !existingIds.has(serie.id));

        return {
          seriesByGenre: [...state.seriesByGenre, ...uniqueMedia],
          pagesSeriesByGenre
        };
      });
    }
  };
});