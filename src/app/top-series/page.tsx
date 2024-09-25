'use client';

import { useEffect, useState } from 'react';
import { useSeriesStore } from '@/store/series';
import PaginationControlled from '@/components/Pagination';
import ListMedia from '@/components/ListMedia';

const PopularMovies = () => {
  const { topRatedSeries, pagesTopRatedSeries, fetchTopRatedSeries } = useSeriesStore(state => state);

  const [page, setPage] = useState<number>(1);
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchTopRatedSeries(page);
  }, [page, fetchTopRatedSeries]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Descubre series con las mejores valoraciones
      </h1>
      <ListMedia media={topRatedSeries}/>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesTopRatedSeries}/>
      </div>
    </main>
  );
};

export default PopularMovies;