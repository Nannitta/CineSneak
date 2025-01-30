'use client';

import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import { useSeriesByGenreId } from '@/store/seriesByGenreId';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const SeriesByGenre = () => {
  const {genreId, genreName} = useParams<Params>();
  const decodedGenreName = decodeURIComponent(genreName || '');

  const {
    seriesByGenre,
    pagesSeriesByGenre,
    fetchSeriesByScroll,
    genericError: seriesGenreStoreError
  } = useSeriesByGenreId(state => state);

  const { loading, moreMedia } = useScrollPagination({
    fetchMedia: (page) => fetchSeriesByScroll(genreId, page),
    numberOfPages: pagesSeriesByGenre
  });

  if (seriesGenreStoreError) {
    return (
      <ErrorPage/>
    );
  }

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Lo mejor en {decodedGenreName}
      </h1>
      <ListMedia media={seriesByGenre}/>
      <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={seriesByGenre} text={'series'}/>
      <BackTopButton/>
    </main>
  );
};

export default SeriesByGenre;