'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useSeriesStore } from '@/store/series';
import { useEffect, useState } from 'react';

export default function PopularMovies() {
  const topRatedSeries = useSeriesStore(state => state.topRatedSeries);
  const numberPages = useSeriesStore(state => state.pagesTopRatedSeries);
  const fetchTopRatedSeries = useSeriesStore(state => state.fetchTopRatedSeries);

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
      <h1 className='font-bold px-4'>
        Las joyas del cine, descubre películas con las mejores valoraciones
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4'>
          {topRatedSeries.filter((movie) => movie.poster_path !== null).map((movie) => {
            return(
              <li key={movie.id}>
                <VerticalCardCarousel movie={movie} isSerie={false}/>
              </li>
            );
          })}
        </ul>
      </section>
      <div className='flex justify-center'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={numberPages}/>
      </div>
    </main>
  );
};