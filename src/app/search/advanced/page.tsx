'use client';

import { League_Spartan } from 'next/font/google';
import { useSearchParams, useRouter } from 'next/navigation';
import ListMedia from '@/components/ListMedia';
import PrimaryButton from '@/components/PrimaryButton';
import { Clapperboard, FilmSpool } from '@/lib/Svg';
import { useSearchMediaAdvancedStore } from '@/store/advancedSearchMedia';
import { SearchedMedia } from '@/types/types';
import { useEffect, Suspense } from 'react';
import BackTopButton from '@/components/BackTopButton';

const league = League_Spartan({ subsets: ['latin'] });

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { fetchSearchMedia, searchedMedia } = useSearchMediaAdvancedStore(state => state);
  const router = useRouter();

  const keyword: string | null = searchParams.get('query');
  const category: string | null = searchParams.get('category');
  const genre: string | null = searchParams.get('genre');

  let filterCategory: SearchedMedia[] = [];

  if (category === 'series' && !genre) {
    filterCategory = searchedMedia.filter((serie) => serie.media_type === 'tv');
  } else if (category === 'series' && genre) {
    filterCategory = searchedMedia.filter((serie) => serie.media_type === 'tv' && serie.genre_ids.includes(+genre));
  } else if (category === 'peliculas' && !genre) {
    filterCategory = searchedMedia.filter((movie) => movie.media_type === 'movie');
  } else if (category === 'peliculas' && genre) {
    filterCategory = searchedMedia.filter((movie) => movie.media_type === 'movie' && movie.genre_ids.includes(+genre));
  }

  const handleBackHome = () => {
    router.push('/');
  };
  
  useEffect(() => {
    if(keyword) {
      fetchSearchMedia(keyword, 1);
    }
  }, [fetchSearchMedia, keyword]);

  return (
    <main className="flex flex-col flex-grow">
      <h1 className="font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6">
      Resultados para tu búsqueda
      </h1>
      {
        searchedMedia.length > 0 
          ? <>
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
            <p className={`${league.className} font-bold text-center text-2xl px-4 lg:px-6`}>No se han encontrado resultados para {keyword}.</p>
            <PrimaryButton text={'Volver al inicio'} img={''} onClick={handleBackHome}/>
          </div>
      }
    </main>
  );
};

const SearchPageWrapper = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPageWrapper;