'use client';

import { useEffect, useState } from 'react';
import { useMoviesStore } from '@/store/movies';
import PaginationControlled from '@/components/Pagination';
import ListMedia from '@/components/ListMedia';

const MoviesNowPlaying = () => {
  const {moviesNowPlaying, pagesMoviesNowPlaying, fetchMoviesNowPlaying} = useMoviesStore(state => state);

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
      <ListMedia media={moviesNowPlaying}/>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesMoviesNowPlaying}/>
      </div>
    </main>
  );
};

export default MoviesNowPlaying;