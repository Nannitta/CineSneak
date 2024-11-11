'use client';

import { useSeriesStore } from '@/store/series';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';

const SeriesAiringToday = () => {
  const { airingToday, pagesAiringToday, fetchAiringToday } = useSeriesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchAiringToday, numberOfPages: pagesAiringToday});

  return (
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        ¡Las series más esperadas del día ya están aquí! ¿Te las vas a perder?
      </h1>
      <ListMedia media={airingToday} />
      {loading && <p className='text-center py-4'>Cargando más series...</p>}
      {!moreMedia && airingToday.length > 0 && <p className='text-center py-4'>¡Vaya!, parece que has llegado al final.</p>}
      {!moreMedia && airingToday.length === 0 && <p className='text-center py-4'>No se han encontrado series.</p>}
    </main>
  );
};

export default SeriesAiringToday;
