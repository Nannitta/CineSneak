'use client';

import { useEffect, useRef, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useRouter } from 'next/navigation';
import { useSearchMenuStore } from '@/store/searchMenu';
import { useSeriesStore } from '@/store/series';
import { useMoviesStore } from '@/store/movies';
import SearchMenuLargeDevice from '@/components/SearchMenuLargeDevice';
import SearchMenuSmallDevice from '@/components/SearchMenuSmallDevice';

const SearchMenu = () => {
  const { screenSize } = CheckWindowWidth();
  const { closeSearchMenu: closeSearchMenuStore, isSearchOpen } = useSearchMenuStore(state => state);
  const { fetchSerieGenre, serieGenres } = useSeriesStore(state => state);
  const { fetchMoviesGenre, movieGenres } = useMoviesStore(state => state);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);
  const [clickedGenre, setClickedGenre] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); 

  const closeSearchMenu = () => {
    setIsClosing(true);
    setClickedCategory(null);
    setClickedGenre(null);
    setTimeout(() => {
      closeSearchMenuStore();
      setIsClosing(false);
    }, 500);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      if (clickedCategory && clickedGenre) {
        router.push(`/search/advanced?query=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(clickedCategory.toLowerCase())}&genre=${encodeURIComponent(clickedGenre.toLowerCase())}`);
      } else {
        router.push(`/search/${encodeURIComponent(searchQuery)}`);
      }

      closeSearchMenu();
      setSearchQuery('');

      if(searchInputRef.current) {
        searchInputRef.current.value = '';
      }
    }
  };

  const handleCategoryClick = (category: string) => {
    setClickedCategory(category);
  };

  const handleGenreClick = (genre: string) => {
    setClickedGenre(genre);
  };

  const handleClearFilters = () => {
    setClickedGenre(null);
    setClickedCategory(null);
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchOpen]);

  return(
    <>
      {
        isSearchOpen || isClosing
          ? screenSize !== 'lg' && screenSize !=='laptop'
            ? <SearchMenuSmallDevice 
              closeSearchMenu={closeSearchMenu} 
              isClosing={isClosing} 
              handleKeyDown={handleKeyDown} 
              handleSearchChange={handleSearchChange} 
              clickedCategory={clickedCategory} 
              handleCategoryClick={handleCategoryClick} 
              serieGenres={serieGenres} 
              movieGenres={movieGenres}
              clickedGenre={clickedGenre}
              handleGenreClick={handleGenreClick}
              isSearchOpen={isSearchOpen}
              fetchSerieGenre={fetchSerieGenre}
              fetchMoviesGenre={fetchMoviesGenre}
              handleClearFilters={handleClearFilters}/> 
            : <SearchMenuLargeDevice 
              closeSearchMenu={closeSearchMenu} 
              isClosing={isClosing} 
              handleKeyDown={handleKeyDown} 
              handleSearchChange={handleSearchChange} 
              clickedCategory={clickedCategory} 
              handleCategoryClick={handleCategoryClick} 
              serieGenres={serieGenres} 
              movieGenres={movieGenres}
              clickedGenre={clickedGenre}
              handleGenreClick={handleGenreClick}
              isSearchOpen={isSearchOpen}
              fetchSerieGenre={fetchSerieGenre}
              fetchMoviesGenre={fetchMoviesGenre}
              handleClearFilters={handleClearFilters}/> 
          : null
      }
    </>
  );
};

export default SearchMenu;