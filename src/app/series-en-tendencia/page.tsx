'use client';

import { useScrollPagination } from '@/hooks/useScrollPagination';
import { useSeriesStore } from '@/store/series';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const PopularSeries = () => {
  const { popularSeries, pagesPopularSeries, fetchPopularSeries, genericError: seriesStoreError } = useSeriesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchPopularSeries, numberOfPages: pagesPopularSeries});

  if (seriesStoreError) {
    return (
      <ErrorPage/>
    );
  }
  
  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Explora las series que son tendencia esta semana y no te pierdas nada
      </h1>
      <ListMedia media={popularSeries}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={popularSeries} text={'series'}/>
      <BackTopButton/>
    </main>
  );
};

export default PopularSeries;