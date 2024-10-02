'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useSearchMediaStore } from '@/store/searchMedia';
import ListMedia from '@/components/ListMedia';
import PaginationControlled from '@/components/Pagination';

const SearchPage = () => {
  const {searchedMedia, fetchSearchMedia, pagesSearchedMedia} = useSearchMediaStore(state => state);
  const {keyword} = useParams<Params>();
  const [page, setPage] = useState<number>(1);

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchSearchMedia(keyword, page);
  }, [fetchSearchMedia, keyword, page]);

  return(
    <main className='flex flex-col flex-grow'>
      <h1 className='font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6'>
        Resultados para la búsqueda: {decodeURIComponent(keyword)}
      </h1>
      {
        searchedMedia.length > 0 
          ? <>
            <ListMedia media={searchedMedia} isSerie={false} />
            <div className='flex justify-center pb-4 pt-8 md:py-6 lg:py-8'>
              <PaginationControlled page={page} handleSetPage={handleSetPage} maxPage={pagesSearchedMedia} />
            </div>
          </>
          : null
      }
    </main>
  );
};

export default SearchPage;