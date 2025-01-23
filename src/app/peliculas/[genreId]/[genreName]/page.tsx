'use client';

import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useMoviesByGenreId } from '@/store/moviesByGenreId';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const MoviesByGenre = () => {
  const {genreId, genreName} = useParams<Params>();
  const decodedGenreName = decodeURIComponent(genreName || '');

  const { moviesByGenre, pagesMoviesByGenre, fetchMoviesByScroll, genericError: moviesGenreStoreError } = useMoviesByGenreId(state => state);
  
  const { loading, moreMedia } = useScrollPagination({
    fetchMedia: (page) => fetchMoviesByScroll(genreId, page),
    numberOfPages: pagesMoviesByGenre
  });

  if (moviesGenreStoreError) {
    return (
      <ErrorPage/>
    );
  }
  
  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        {decodedGenreName} en estado puro, ¡perfectas para una maratón!
      </h1>
      <ListMedia media={moviesByGenre}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={moviesByGenre} text={'películas'}/>
      <BackTopButton/>
    </main>
  );
};

export default MoviesByGenre;