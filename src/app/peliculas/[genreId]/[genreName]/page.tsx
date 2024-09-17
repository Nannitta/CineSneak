'use client';

import PaginationControlled from '@/components/Pagination';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { useMoviesByGenreId } from '@/store/moviesByGenreId';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MoviesByGenre = () => {
  const {genreId, genreName} = useParams<Params>();
  const [page, setPage] = useState<number>(1);
  const decodedGenreName = decodeURIComponent(genreName || '');

  const moviesByGenreId = useMoviesByGenreId(state => state.moviesByGenre);
  const pagesMoviesByGenre = useMoviesByGenreId(state => state.pagesMoviesByGenre);
  const fetchMoviesByGenreId = useMoviesByGenreId(state => state.fetchMoviesByGenreId); 

  const moviesByGenre = Array.from(moviesByGenreId);

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchMoviesByGenreId(genreId, page);
  }, [page, genreId, fetchMoviesByGenreId]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        {decodedGenreName} en estado puro, ¡perfectas para una maratón!
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
          {moviesByGenre.filter((movie) => movie.poster_path !== null).map((movie) => {
            return(
              <li key={movie.id}>
                <VerticalCardCarousel media={movie} isSerie={false}/>
              </li>
            );
          })}
        </ul>
      </section>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesMoviesByGenre}/>
      </div>
    </main>
  );
};

export default MoviesByGenre;