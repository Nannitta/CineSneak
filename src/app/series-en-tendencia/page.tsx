'use client';

import { useSeriesStore } from '@/store/series';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/Loading';

const PopularSeries = () => {
  const { popularSeries, pagesPopularSeries, fetchPopularSeries } = useSeriesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchPopularSeries, numberOfPages: pagesPopularSeries});

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Explora las series que son tendencia esta semana y no te pierdas nada
      </h1>
      <ListMedia media={popularSeries}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={popularSeries} text={'series'}/>
    </main>
  );
};

export default PopularSeries;