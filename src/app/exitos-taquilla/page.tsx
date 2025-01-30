'use client';

import { useScrollPagination } from '@/hooks/useScrollPagination';
import { useMoviesStore } from '@/store/movies';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const MoviesNowPlaying = () => {
  const { moviesNowPlaying, pagesMoviesNowPlaying, fetchMoviesNowPlaying, genericError: moviesStoreError } = useMoviesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchMoviesNowPlaying, numberOfPages: pagesMoviesNowPlaying});

  if (moviesStoreError) {
    return (
      <ErrorPage/>
    );
  }
  
  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Todos los estrenos que están arrasando en taquilla: ¡no te los pierdas!
      </h1>
      <ListMedia media={moviesNowPlaying}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={moviesNowPlaying} text={'películas'}/>
      <BackTopButton/>
    </main>
  );
};

export default MoviesNowPlaying;