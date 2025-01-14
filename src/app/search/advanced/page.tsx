'use client';

import ListMedia from '@/components/ListMedia';
import { useSearchMediaAdvancedStore } from '@/store/advancedSearchMedia';
import { SearchedMedia } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { fetchSearchMedia, searchedMedia } = useSearchMediaAdvancedStore(state => state);

  const keyword: string | null = searchParams.get('query');
  const category: string | null = searchParams.get('category');
  const genre: string | null = searchParams.get('genre');

  let filterCategory: SearchedMedia[] = [];

  if(category === 'series' && genre) {
    filterCategory = searchedMedia.filter((serie) => serie.media_type === 'tv' && serie.genre_ids.includes(+genre)); 
  } else if (genre) {
    filterCategory = searchedMedia.filter((movie) => movie.media_type === 'movie' && movie.genre_ids.includes(+genre));
  }
  
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
          </>
          : null
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