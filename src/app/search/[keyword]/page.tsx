'use client';

import { useEffect } from 'react';
import { League_Spartan } from 'next/font/google';
import { useParams, useRouter } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useSearchMediaByKeywordStore } from '@/store/searchMediaByKeyword';
import { useScrollPagination } from '@/hooks/useScrollPagination';
import ListMedia from '@/components/ListMedia';
import LoadingByScroll from '@/components/LoadingByScroll';
import PrimaryButton from '@/components/PrimaryButton';
import { FilmSpool } from '@/lib/Svg';

const league = League_Spartan({ subsets: ['latin'] });

const SearchPage = () => {
  const { searchedMedia, fetchSearchMedia, pagesSearchedMedia, resetSearchResults } = useSearchMediaByKeywordStore(state => state);
  const { keyword } = useParams<Params>();
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  useEffect(() => {
    resetSearchResults();
  }, [keyword, resetSearchResults]);

  const { loading, moreMedia } = useScrollPagination({
    fetchMedia: (page) => fetchSearchMedia(keyword, page),
    numberOfPages: pagesSearchedMedia,
    resetOnKeywordChange: keyword,
  });
  
  return (
    <main className="flex flex-col flex-grow justify-center">
      {
        searchedMedia.length > 0 
          ? <>
            <h1 className="font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6">
              Resultados para la búsqueda: {decodeURIComponent(keyword)}
            </h1>
            <ListMedia media={searchedMedia}/>
            <LoadingByScroll loading={loading} moreMedia={moreMedia} dataMedia={searchedMedia} text={'resultados'}/>
          </>
          : <div className='flex flex-col items-center gap-4 py-8'>
            <FilmSpool width={'150'} height={'150'}/>
            <p className={`${league.className} font-bold text-center text-2xl px-4 lg:px-6`}>No se han encontrado resultados para {keyword}.</p>
            <PrimaryButton text={'Volver al inicio'} img={''} onClick={handleBackHome}/>
          </div>
      }
    </main>
  );
};

export default SearchPage;