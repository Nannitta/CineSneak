import { MouseEvent, useEffect, useRef } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { Close, Error, Search } from '@/lib/Svg';
import { Genre } from '@/types/types';

interface SearchMenuLargeProps {
  closeSearchMenu: () => void
  isClosing: boolean
  handleKeyDown: (e:React.KeyboardEvent<HTMLElement>) => void
  handleSearchChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  clickedCategory: string | null
  handleCategoryClick: (category: string) => void
  serieGenres: Genre[]
  movieGenres: Genre[]
  clickedGenre: number | null
  handleGenreClick: (genre: number) => void
  isSearchOpen: boolean
  fetchSerieGenre: (isSerie: boolean) => void
  fetchMoviesGenre: (isSerie: boolean) => void    
  handleClearFilters: () => void
  handleClickSearch: (e: MouseEvent<HTMLButtonElement>) => void
  errorMessage: string 
}

const SearchMenuLargeDevice = ({ 
  closeSearchMenu, 
  isClosing, 
  handleKeyDown, 
  handleSearchChange, 
  clickedCategory, 
  handleCategoryClick, 
  serieGenres, 
  movieGenres, 
  clickedGenre, 
  handleGenreClick, 
  isSearchOpen, 
  fetchSerieGenre, 
  fetchMoviesGenre, 
  handleClearFilters,
  handleClickSearch,
  errorMessage }: SearchMenuLargeProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        if(searchInputRef.current){
          searchInputRef.current.focus();
        }
      }, 500);
    }

    if(errorMessage && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  
    fetchSerieGenre(true);
    fetchMoviesGenre(false);    
      
  }, [isSearchOpen, fetchMoviesGenre, fetchSerieGenre, errorMessage]);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-[1] w-full h-full"></div>
      <div className={`absolute top-0 right-0 z-10 w-1/4 bg-black max-h-screen h-screen flex flex-col p-6 gap-4 ${isClosing ? 'side-menu-left' : 'side-menu-right'}`}>
        <button onClick={closeSearchMenu} className='self-end'>
          <Close width='24' height='24' fill='white'/>
        </button>
        <div className='min-h-20 2xl:min-h-[60px]'>
          <div className='flex placeholder:text-gray placeholder:font-normal bg-[#222222f3] border border-[#2e2d2df3] p-2 rounded'>
            <div className='flex items-center gap-2'>
              <Search width='16' height='16' color='#9ca3af'/>
              <input ref={searchInputRef} onKeyDown={handleKeyDown} onChange={handleSearchChange} type="text" placeholder='¿Qué estás buscando?' className='bg-transparent font-light text-gray focus:outline-none'/>
            </div>
          </div>
          {errorMessage && (
            <div className="flex gap-2 items-center mt-2 text-xs 2xl:text-sm text-error">
              <Error width='14' height='14' fill='#EF5350'/>
              {errorMessage}
            </div>
          )}
        </div>
        <div className='flex flex-col h-full 2xl:mt-4'>
          <p className='text-gray border-b border-b-gray pb-2 px-2 text-xs 2xl:text-base'>Buscar por categoría</p>
          <div className='flex gap-4 mt-4 mb-8'>
            <span className={`px-2 py-1 w-fit md:px-3 md:py-[5px] cursor-pointer text-xs 2xl:text-base ${clickedCategory === 'Series' ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]' : ''}`}
              onClick={() => handleCategoryClick('Series')}>
                      Series
            </span>
            <span className={`px-2 py-1 w-fit md:px-3 md:py-[5px] cursor-pointer text-xs 2xl:text-base ${clickedCategory === 'Peliculas' ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem]' : ''}`}
              onClick={() => handleCategoryClick('Peliculas')}>
                      Películas
            </span>
          </div>
          {clickedCategory
            ? 
            <>
              <p className='text-gray border-b border-b-gray pb-2 pl-2 text-xs 2xl:text-base'>Buscar por género</p>
              <div className='grid grid-cols-2 gap-2 my-4'>
                {clickedCategory === 'Series' 
                  ? serieGenres.map((serie) => (
                    <span key={serie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 cursor-pointer text-xs 2xl:text-base ${clickedGenre === serie.id ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                      onClick={() => handleGenreClick(serie.id)}>
                      {serie.name}
                    </span>
                  ))
                  : movieGenres.map((movie) => (
                    <span key={movie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 cursor-pointer text-xs 2xl:text-base ${clickedGenre === movie.id ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                      onClick={() => handleGenreClick(movie.id)}>
                      {movie.name}
                    </span>
                  ))
                }
              </div>
              <button className='self-start pl-2 text-gray underline hover:text-white text-xs 2xl:text-sm' 
                onClick={handleClearFilters}>
                Limpiar filtros
              </button>
              <div className='flex h-full justify-end'>
                <div className='flex gap-4 h-8 self-end mb-4 *:w-[82px] *:justify-center'>
                  <PrimaryButton text='Buscar' img={''} onClick={handleClickSearch}/>
                  <button className='tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2 py-1 w-fit md:px-3 md:py-[5px] text-sm font-semibold hover:bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% hover:rounded-[0.35rem]' onClick={closeSearchMenu}>Cancelar</button>
                </div>
              </div>
            </>
            : null
          }
        </div>
      </div>
    </>
  );
};

export default SearchMenuLargeDevice;