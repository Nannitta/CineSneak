'use client';

import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { useParams, useRouter } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useSearchMediaByKeywordStore } from '@/store/searchMediaByKeyword';
import ListMedia from '@/components/ListMedia';
import PrimaryButton from '@/components/PrimaryButton';
import { Clapperboard, FilmSpool, LoadingSpinner } from '@/lib/Svg';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';

const league = League_Spartan({ subsets: ['latin'] });

const SearchPage = () => {
  const { searchedMedia, fetchSearchMedia, resetSearchResults, genericError } = useSearchMediaByKeywordStore(state => state);
  const { keyword } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const filterCategory = searchedMedia.filter((media) => media.media_type === 'tv' || media.media_type === 'movie');
  
  const handleBackHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        setLoading(true);
        await fetchSearchMedia(keyword, 1);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchSearchMedia, keyword]);

  useEffect(() => {
    resetSearchResults();
  }, [keyword, resetSearchResults]);

  if (genericError) {
    return (
      <ErrorPage/>
    );
  }
   
  return (
    <main className="flex flex-col flex-grow justify-center">
      {
        loading
          ? <p className='flex items-center justify-center gap-4 text-gray'>
            <LoadingSpinner/>
              Cargando resultados
          </p>
          : filterCategory.length > 0 
            ? <>
              <h1 className="font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6">
                Resultados para la búsqueda: {decodeURIComponent(keyword)}
              </h1>
              <ListMedia media={filterCategory}/>
              <div className='flex flex-col gap-4 justify-center items-center py-8'>
                <div className='w-fit -rotate-12'>
                  <Clapperboard/>
                </div>
                <p className={`${league.className} font-bold text-xl md:text-2xl`}>
                  ¡Vaya!, has llegado al final
                </p>
                <PrimaryButton text={'Volver al inicio'} img={''} onClick={handleBackHome}/>
              </div> 
              <BackTopButton/>
            </>
            : <div className='flex flex-col items-center gap-4 py-8'>
              <FilmSpool width={'150'} height={'150'}/>
              <p className={`${league.className} font-bold text-center text-2xl px-4 lg:px-6`}>No se han encontrado resultados para {keyword && decodeURIComponent(keyword)}.</p>
              <PrimaryButton text={'Volver al inicio'} img={''} onClick={handleBackHome}/>
            </div>        
      }
    </main>
  );
};

export default SearchPage;