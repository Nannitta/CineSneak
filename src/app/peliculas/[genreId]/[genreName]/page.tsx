'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useMoviesByGenreId } from '@/store/moviesByGenreId';
import PaginationControlled from '@/components/Pagination';
import ListMedia from '@/components/ListMedia';

const MoviesByGenre = () => {
  const {genreId, genreName} = useParams<Params>();
  const [page, setPage] = useState<number>(1);
  const decodedGenreName = decodeURIComponent(genreName || '');

  const { moviesByGenre, pagesMoviesByGenre, fetchMoviesByGenreId } = useMoviesByGenreId(state => state);

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
      <ListMedia media={moviesByGenre} isSerie={false}/>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesMoviesByGenre}/>
      </div>
    </main>
  );
};

export default MoviesByGenre;