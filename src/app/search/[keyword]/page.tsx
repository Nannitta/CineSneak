'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useSearchMediaStore } from '@/store/searchMedia';
import ListMedia from '@/components/ListMedia';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import LoadingByScroll from '@/components/Loading';

const SearchPage = () => {
  const { searchedMedia, fetchSearchMedia, pagesSearchedMedia, resetSearchResults } = useSearchMediaStore(state => state);
  const { keyword } = useParams<Params>();

  useEffect(() => {
    resetSearchResults();
  }, [keyword, resetSearchResults]);

  const { loading, moreMedia } = useScrollPagination({
    fetchMedia: (page) => fetchSearchMedia(keyword, page),
    numberOfPages: pagesSearchedMedia,
    resetOnKeywordChange: keyword,
  });

  return (
    <main className="flex flex-col flex-grow">
      <h1 className="font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6">
        Resultados para la búsqueda: {decodeURIComponent(keyword)}
      </h1>
      {
        searchedMedia.length > 0 
          ? <>
            <ListMedia media={searchedMedia}/>
            <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={searchedMedia} text={'resultados'}/>
          </>
          : null
      }
    </main>
  );
};

export default SearchPage;