import { useEffect, useRef } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { Close, Search } from '@/lib/Svg';
import { Genre } from '@/types/types';

interface SearchMenuSmallProps {
  closeSearchMenu: () => void
  isClosing: boolean
  handleKeyDown: (e:React.KeyboardEvent<HTMLInputElement>) => void
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
}

const SearchMenuSmallDevice = ({ 
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
  handleClearFilters }: SearchMenuSmallProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-[1] w-full h-full"></div>
      <div className={`w-full h-full md:h-1/2 bg-black fixed top-0 z-10 p-4 flex flex-col ${isClosing ? 'side-menu-up' : 'side-menu-down'}`}>
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
                    <button key={serie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 ${clickedGenre === serie.id ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                      onClick={() => handleGenreClick(serie.id)}>
                      {serie.name}
                    </button>
                  ))
                  : movieGenres.map((movie) => (
                    <button key={movie.id} className={`py-1 w-fit md:px-3 md:py-[5px] px-2 ${clickedGenre === movie.id ? 'tag relative before:absolute before:inset-0 before:rounded-[0.35rem] px-2' : ''}`}
                      onClick={() => handleGenreClick(movie.id)}>
                      {movie.name}
                    </button>
                  ))
                }
              </div>
              <button className='self-start pl-2 text-xs text-gray underline' 
                onClick={handleClearFilters}>
                Limpiar filtros
              </button>
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
    </>
  );
};

export default SearchMenuSmallDevice;