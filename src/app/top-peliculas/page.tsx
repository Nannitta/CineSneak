'use client';

import { useMoviesStore } from '@/store/movies';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';

const TopMovies = () => {
  const { topRatedMovies, pagesTopRatedMovies, fetchTopRatedMovies } = useMoviesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchTopRatedMovies, numberOfPages: pagesTopRatedMovies});

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Las joyas del cine, descubre películas con las mejores valoraciones
      </h1>
      <ListMedia media={topRatedMovies}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={topRatedMovies} text={'películas'}/>
    </main>
  );
};

export default TopMovies;