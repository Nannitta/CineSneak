'use client';

import { useScrollPagination } from '@/hooks/useScrollPagination';
import { useSeriesStore } from '@/store/series';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const SeriesAiringToday = () => {
  const { airingToday, pagesAiringToday, fetchAiringToday, genericError: seriesStoreError } = useSeriesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchAiringToday, numberOfPages: pagesAiringToday});
  
  if (seriesStoreError) {
    return (
      <ErrorPage/>
    );
  }
  
  return (
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        ¡Las series más esperadas del día ya están aquí! ¿Te las vas a perder?
      </h1>
      <ListMedia media={airingToday} />
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={airingToday} text={'series'}/>
      <BackTopButton/>
    </main>
  );
};

export default SeriesAiringToday;
