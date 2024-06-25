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
      <h1 className='font-bold px-4'>
        Más estrenos que están arrasando en taquilla: ¡no te los pierdas!
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4'>
          {moviesNowPlayingStore.filter((movie) => movie.poster_path !== null).map((movie) => {
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