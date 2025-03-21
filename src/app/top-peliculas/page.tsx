'use client';

import { useScrollPagination } from '@/hooks/useScrollPagination';
import { useMoviesStore } from '@/store/movies';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const TopMovies = () => {
  const { topRatedMovies, pagesTopRatedMovies, fetchTopRatedMovies, genericError: moviesStoreError } = useMoviesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchTopRatedMovies, numberOfPages: pagesTopRatedMovies});

  if (moviesStoreError) {
    return (
      <ErrorPage/>
    );
  }
  
  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Las joyas del cine, descubre películas con las mejores valoraciones
      </h1>
      <ListMedia media={topRatedMovies}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={topRatedMovies} text={'películas'}/>
      <BackTopButton/>
    </main>
  );
};

export default TopMovies;