'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useMoviesStore } from '@/store/movies';
import { useEffect, useState } from 'react';

export default function MoviesNowPlaying() {
  const moviesNowPlayingStore = useMoviesStore(state => state.moviesNowPlaying);
  const numberPages = useMoviesStore(state => state.pagesMoviesNowPlaying);
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);

  const [page, setPage] = useState<number>(1);
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchMoviesNowPlaying(page);
  }, [page, fetchMoviesNowPlaying]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Todos los estrenos que están arrasando en taquilla: ¡no te los pierdas!
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
          {moviesNowPlayingStore.filter((movie) => movie.poster_path !== null).map((movie) => {
            return(
              <li key={movie.id}>
                <VerticalCardCarousel media={movie} isSerie={false}/>
              </li>
            );
          })}
        </ul>
      </section>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={numberPages}/>
      </div>
    </main>
  );
};