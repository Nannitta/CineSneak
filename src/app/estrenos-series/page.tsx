'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useSeriesStore } from '@/store/series';
import { useEffect, useState } from 'react';

export default function SeriesAiringToday() {
  const {airingToday, pagesAiringToday, fetchAiringToday} = useSeriesStore(state => state);

  const [page, setPage] = useState<number>(1);
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchAiringToday(page);
  }, [page, fetchAiringToday]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        ¡Las series más esperadas del día ya están aquí! ¿Te las vas a perder?
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
          {airingToday.filter((serie) => serie.poster_path !== null).map((serie) => {
            return(
              <li key={serie.id}>
                <VerticalCardCarousel media={serie} isSerie={true}/>
              </li>
            );
          })}
        </ul>
      </section>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesAiringToday}/>
      </div>
    </main>
  );
};