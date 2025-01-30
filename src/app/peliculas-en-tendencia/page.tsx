'use client';

import { useScrollPagination } from '@/hooks/useScrollPagination';
import { useMoviesStore } from '@/store/movies';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const PopularMovies = () => {
  const { popularMovies, pagesPopularMovies, fetchPopularMovies, genericError: moviesStoreError } = useMoviesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchPopularMovies, numberOfPages: pagesPopularMovies});

  if (moviesStoreError) {
    return (
      <ErrorPage/>
    );
  }
  
  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Explora las películas que son tendencia esta semana y no te pierdas nada
      </h1>
      <ListMedia media={popularMovies}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={popularMovies} text={'películas'}/>
      <BackTopButton/>
    </main>
  );
};

export default PopularMovies;