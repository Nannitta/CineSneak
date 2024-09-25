'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useSeriesByGenreId } from '@/store/seriesByGenreId';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import PaginationControlled from '@/components/Pagination';

const SeriesByGenre = () => {
  const {genreId, genreName} = useParams<Params>();
  const [page, setPage] = useState<number>(1);
  const decodedGenreName = decodeURIComponent(genreName || '');

  const {
    seriesByGenre,
    pagesSeriesByGenre,
    fetchSeriesByGenreId
  } = useSeriesByGenreId(state => state);

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchSeriesByGenreId(genreId, page);
  }, [page, genreId, fetchSeriesByGenreId]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Lo mejor en {decodedGenreName}
      </h1>
      <section>
        <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
          {seriesByGenre.filter((serie) => serie.poster_path !== null).map((serie) => {
            return(
              <li key={serie.id}>
                <VerticalCardCarousel media={serie} isSerie={true}/>
              </li>
            );
          })}
        </ul>
      </section>
      <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
        <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesSeriesByGenre}/>
      </div>
    </main>
  );
};

export default SeriesByGenre;