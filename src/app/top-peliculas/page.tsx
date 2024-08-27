'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useMoviesStore } from '@/store/movies';
import { useEffect, useState } from 'react';

export default function PopularMovies() {
  const topRatedMovies = useMoviesStore(state => state.topRatedMovies);
  const numberPages = useMoviesStore(state => state.pagesTopRatedMovies);
  const fetchTopRatedMovies = useMoviesStore(state => state.fecthTopRatedMovies);

  const [page, setPage] = useState<number>(1);
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchTopRatedMovies(page);
  }, [page, fetchTopRatedMovies]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Las joyas del cine, descubre películas con las mejores valoraciones
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
          {topRatedMovies.filter((movie) => movie.poster_path !== null).map((movie) => {
            return(
              <li key={movie.id}>
                <VerticalCardCarousel movie={movie} isSerie={false}/>
              </li>
            );
          })}
        </ul>
      </section>
      <div className='flex justify-center pb-4 pt-8 md:py-6'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={numberPages}/>
      </div>
    </main>
  );
};