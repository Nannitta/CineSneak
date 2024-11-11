'use client';

import { useSeriesStore } from '@/store/series';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';

const PopularSeries = () => {
  const { popularSeries, pagesPopularSeries, fetchPopularSeries } = useSeriesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchPopularSeries, numberOfPages: pagesPopularSeries});

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Explora las series que son tendencia esta semana y no te pierdas nada
      </h1>
      <ListMedia media={popularSeries}/>
      {loading && <p className='text-center py-4'>Cargando más series...</p>}
      {!moreMedia && popularSeries.length > 0 && <p className='text-center py-4'>¡Vaya!, parece que has llegado al final.</p>}
      {!moreMedia && popularSeries.length === 0 && <p className='text-center py-4'>No se han encontrado series.</p>}
    </main>
  );
};

export default PopularSeries;