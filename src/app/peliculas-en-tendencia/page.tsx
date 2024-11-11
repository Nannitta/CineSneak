'use client';

import { useMoviesStore } from '@/store/movies';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';

const PopularMovies = () => {
  const { popularMovies, pagesPopularMovies, fetchPopularMovies } = useMoviesStore(state => state);
  const { loading, moreMedia } = useScrollPagination({fetchMedia: fetchPopularMovies, numberOfPages: pagesPopularMovies});

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Explora las películas que son tendencia esta semana y no te pierdas nada
      </h1>
      <ListMedia media={popularMovies} isSerie={false}/>
      {loading && <p className='text-center py-4'>Cargando más películas...</p>}
      {!moreMedia && popularMovies.length > 0 && <p className='text-center py-4'>¡Vaya!, parece que has llegado al final.</p>}
      {!moreMedia && popularMovies.length === 0 && <p className='text-center py-4'>No se han encontrado películas.</p>}
    </main>
  );
};

export default PopularMovies;