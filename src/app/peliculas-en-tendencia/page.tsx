'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useMoviesStore } from '@/store/movies';
import { useEffect, useState } from 'react';

export default function PopularMovies() {
  const popularMovies = useMoviesStore(state => state.popularMovies);
  const numberPages = useMoviesStore(state => state.pagesPopularMovies);
  const fetchPopularMovies = useMoviesStore(state => state.fetchPopularMovies);

  const [page, setPage] = useState<number>(1);
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page, fetchPopularMovies]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold px-4'>
        Explora las películas que son tendencia esta semana y no te pierdas nada
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4'>
          {popularMovies.filter((movie) => movie.poster_path !== null).map((movie) => {
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