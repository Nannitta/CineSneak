'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useSeriesStore } from '@/store/series';
import { useEffect, useState } from 'react';

export default function MoviesNowPlaying() {
  const onAirSeries = useSeriesStore(state => state.onAirSeries);
  const numberPages = useSeriesStore(state => state.pagesOnAirSeries);
  const fetchOnAirSeries = useSeriesStore(state => state.fecthOnAirSeries);

  const [page, setPage] = useState<number>(1);
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchOnAirSeries(page);
  }, [page, fetchOnAirSeries]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold px-4'>
        Todos los estrenos que están arrasando en taquilla: ¡no te los pierdas!
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4'>
          {onAirSeries.filter((movie) => movie.poster_path !== null).map((movie) => {
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