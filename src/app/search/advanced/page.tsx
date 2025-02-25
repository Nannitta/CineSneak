'use client';

import { useEffect, Suspense, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearchMediaAdvancedStore } from '@/store/advancedSearchMedia';
import ListMedia from '@/components/ListMedia';
import PrimaryButton from '@/components/PrimaryButton';
import BackTopButton from '@/components/BackTopButton';
import ErrorPage from '@/components/ErrorPage';
import { Clapperboard, FilmSpool, LoadingSpinner } from '@/lib/Svg';
import { SearchedMedia } from '@/types/types';

const league = League_Spartan({ subsets: ['latin'] });

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { fetchSearchMedia, searchedMedia, genericError } = useSearchMediaAdvancedStore(state => state);
  const [loading, setLoading] = useState<boolean>(true);
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
    const fetchData = async () => {
      if (keyword) {
        setLoading(true);
        await fetchSearchMedia(keyword, 1);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchSearchMedia, keyword]);

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
          : searchedMedia.length > 0 
            ? <>
              <h1 className="font-bold py-6 px-4 pt-6 text-2xl text-balance md:text-center lg:text-left lg:px-6">
                Resultados para tu búsqueda
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
              <FilmSpool />
              <p className={`${league.className} font-bold text-center text-2xl px-4 lg:px-6`}>No se han encontrado resultados para {keyword && decodeURIComponent(keyword)}.</p>
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