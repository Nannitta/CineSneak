'use client';

import { useSeriesStore } from '@/store/series';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/Loading';

const TopSeries = () => {
  const { topRatedSeries, pagesTopRatedSeries, fetchTopRatedSeries } = useSeriesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchTopRatedSeries, numberOfPages: pagesTopRatedSeries});

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Descubre series con las mejores valoraciones
      </h1>
      <ListMedia media={topRatedSeries}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={topRatedSeries} text={'series'}/>
    </main>
  );
};

export default TopSeries;