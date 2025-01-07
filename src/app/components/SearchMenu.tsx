'use client';

import { useEffect, useRef, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useRouter } from 'next/navigation';
import { useSearchMenuStore } from '@/store/searchMenu';
import { useSeriesStore } from '@/store/series';
import { useMoviesStore } from '@/store/movies';
import { Close, Search } from '@/lib/Svg';

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
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
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

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    if (clickedCategory && searchInputRef.current) {
      searchInputRef.current.value = '';
    }

    fetchSerieGenre(true);
    fetchMoviesGenre(false);    
    
  }, [isSearchOpen, fetchMoviesGenre, fetchSerieGenre, clickedCategory]);
  
  return(
    <>
      {
        isSearchOpen || isClosing
          ? screenSize !== 'lg' && screenSize !=='laptop'
            && <div className={`w-full h-full bg-black fixed top-0 z-[1] p-4 flex flex-col ${isClosing ? 'side-menu-closing' : 'side-menu'}`}>
              <button onClick={closeSearchMenu} className='self-end pb-4'>
                <Close width='24' height='24' fill='white'/>
              </button>
              <div className='flex placeholder:text-gray placeholder:font-normal bg-[#222222f3] border border-[#2e2d2df3] p-2 rounded'>
                <div className='flex items-center gap-2'>
                  <Search width='16' height='16' color='#9ca3af'/>
                  <input ref={searchInputRef} onKeyDown={handleKeyDown} onChange={handleSearchChange} type="text" placeholder='¿Qué estás buscando?' className='bg-transparent font-light text-gray text-sm focus:outline-none' disabled={clickedCategory ? true : false}/>
                </div>
              </div>
              <div className='flex flex-col mt-8'>
                <p className='text-gray text-sm border-b border-b-gray pb-2'>Buscar por categoría</p>
                <div className='flex gap-4 mt-4 mb-8'>
                  <button className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedCategory === 'Series' ? 'bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded-[0.35rem]' : 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]'}`}
                    onClick={() => handleCategoryClick('Series')}>
                      Series
                  </button>
                  <button className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedCategory === 'Peliculas' ? 'bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded-[0.35rem]' : 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]'}`}
                    onClick={() => handleCategoryClick('Peliculas')}>
                      Películas
                  </button>
                </div>
                {clickedCategory
                  ? 
                  <>
                    <p className='text-gray text-sm border-b border-b-gray pb-2'>Buscar por género</p>
                    <div className='flex flex-wrap gap-y-2 gap-x-4 my-4'>
                      {clickedCategory === 'Series' 
                        ? serieGenres.map((serie) => (
                          <button key={serie.id} className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedGenre === serie.name ? 'bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded-[0.35rem]' : 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]'}`}
                            onClick={() => handleGenreClick(serie.name)}>
                            {serie.name}
                          </button>
                        ))
                        : movieGenres.map((movie) => (
                          <button key={movie.id} className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedGenre === movie.name ? 'bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded-[0.35rem]' : 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]'}`}
                            onClick={() => handleGenreClick(movie.name)}>
                            {movie.name}
                          </button>
                        ))
                      }
                    </div>
                  </>
                  : null
                }
              </div>
            </div>
          : null
      }
    </>
  );
};

export default SearchMenu;