'use client';

import { useEffect, useRef, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useRouter } from 'next/navigation';
import { useSearchMenuStore } from '@/store/searchMenu';
import { useSeriesStore } from '@/store/series';
import { useMoviesStore } from '@/store/movies';
import { Close, Search } from '@/lib/Svg';
import PrimaryButton from '@/components/PrimaryButton';

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
    if (isSearchOpen) {
      setTimeout(() => {
        if(searchInputRef.current){
          searchInputRef.current.focus();
        }
      }, 500);
    }

    fetchSerieGenre(true);
    fetchMoviesGenre(false);    
    
  }, [isSearchOpen, fetchMoviesGenre, fetchSerieGenre]); 

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
            ? <div className={`w-full h-full md:h-1/2 bg-black fixed top-0 z-10 p-4 flex flex-col ${isClosing ? 'side-menu-up' : 'side-menu-down'}`}>
              <button onClick={closeSearchMenu} className='self-end pb-4'>
                <Close width='24' height='24' fill='white'/>
              </button>
              <div className='flex placeholder:text-gray placeholder:font-normal bg-[#222222f3] border border-[#2e2d2df3] p-2 rounded'>
                <div className='flex items-center gap-2'>
                  <Search width='16' height='16' color='#9ca3af'/>
                  <input ref={searchInputRef} onKeyDown={handleKeyDown} onChange={handleSearchChange} type="text" placeholder='¿Qué estás buscando?' className='bg-transparent font-light text-gray text-sm focus:outline-none'/>
                </div>
              </div>
              <div className='flex flex-col mt-8 h-full'>
                <p className='text-gray text-sm border-b border-b-gray pb-2 px-2'>Buscar por categoría</p>
                <div className='flex gap-4 mt-4 mb-8 *:text-sm'>
                  <button className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedCategory === 'Series' ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]' : ''}`}
                    onClick={() => handleCategoryClick('Series')}>
                      Series
                  </button>
                  <button className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedCategory === 'Peliculas' ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]' : ''}`}
                    onClick={() => handleCategoryClick('Peliculas')}>
                      Películas
                  </button>
                </div>
                {clickedCategory
                  ? 
                  <>
                    <p className='text-gray text-sm border-b border-b-gray pb-2 pl-2'>Buscar por género</p>
                    <div className='flex flex-wrap gap-4 my-4 *:text-sm'>
                      {clickedCategory === 'Series' 
                        ? serieGenres.map((serie) => (
                          <button key={serie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 ${clickedGenre === serie.name ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                            onClick={() => handleGenreClick(serie.name)}>
                            {serie.name}
                          </button>
                        ))
                        : movieGenres.map((movie) => (
                          <button key={movie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 ${clickedGenre === movie.name ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                            onClick={() => handleGenreClick(movie.name)}>
                            {movie.name}
                          </button>
                        ))
                      }
                    </div>
                    <div className='flex h-full justify-end'>
                      <div className='flex gap-4 h-8 self-end mb-4 *:w-20 *:justify-center'>
                        <PrimaryButton text='Buscar' img={''}/>
                        <button className='tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2 py-1 w-fit md:px-3 md:py-[5px] text-xs font-semibold' onClick={closeSearchMenu}>Cancelar</button>
                      </div>
                    </div>
                  </>
                  : null
                }
              </div>
            </div>
            : <div className={`absolute top-0 right-0 z-10 w-1/4 bg-black max-h-screen h-screen flex flex-col p-6 gap-4 ${isClosing ? 'side-menu-left' : 'side-menu-right'}`}>
              <button onClick={closeSearchMenu} className='self-end'>
                <Close width='24' height='24' fill='white'/>
              </button>
              <div className='flex placeholder:text-gray placeholder:font-normal bg-[#222222f3] border border-[#2e2d2df3] p-2 rounded'>
                <div className='flex items-center gap-2'>
                  <Search width='16' height='16' color='#9ca3af'/>
                  <input ref={searchInputRef} onKeyDown={handleKeyDown} onChange={handleSearchChange} type="text" placeholder='¿Qué estás buscando?' className='bg-transparent font-light text-gray focus:outline-none'/>
                </div>
              </div>
              <div className='flex flex-col mt-8 h-full'>
                <p className='text-gray border-b border-b-gray pb-2 px-2'>Buscar por categoría</p>
                <div className='flex gap-4 mt-4 mb-8'>
                  <button className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedCategory === 'Series' ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]' : ''}`}
                    onClick={() => handleCategoryClick('Series')}>
                      Series
                  </button>
                  <button className={`px-2 py-1 w-fit md:px-3 md:py-[5px] ${clickedCategory === 'Peliculas' ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]' : ''}`}
                    onClick={() => handleCategoryClick('Peliculas')}>
                      Películas
                  </button>
                </div>
                {clickedCategory
                  ? 
                  <>
                    <p className='text-gray border-b border-b-gray pb-2 pl-2'>Buscar por género</p>
                    <div className='grid grid-cols-2 gap-2 my-4'>
                      {clickedCategory === 'Series' 
                        ? serieGenres.map((serie) => (
                          <button key={serie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 ${clickedGenre === serie.name ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                            onClick={() => handleGenreClick(serie.name)}>
                            {serie.name}
                          </button>
                        ))
                        : movieGenres.map((movie) => (
                          <button key={movie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 ${clickedGenre === movie.name ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                            onClick={() => handleGenreClick(movie.name)}>
                            {movie.name}
                          </button>
                        ))
                      }
                    </div>
                    <div className='flex h-full justify-end'>
                      <div className='flex gap-4 h-8 self-end mb-4 *:w-[82px] *:justify-center'>
                        <PrimaryButton text='Buscar' img={''}/>
                        <button className='tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2 py-1 w-fit md:px-3 md:py-[5px] text-sm font-semibold' onClick={closeSearchMenu}>Cancelar</button>
                      </div>
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