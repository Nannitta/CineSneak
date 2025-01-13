import { useEffect, useRef } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { Close, Search } from '@/lib/Svg';
import { Genre } from '@/types/types';

interface SearchMenuLargeProps {
  closeSearchMenu: () => void
  isClosing: boolean
  handleKeyDown: (e:React.KeyboardEvent<HTMLInputElement>) => void
  handleSearchChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  clickedCategory: string | null
  handleCategoryClick: (category: string) => void
  serieGenres: Genre[]
  movieGenres: Genre[]
  clickedGenre: string | null
  handleGenreClick: (genre: string) => void
  isSearchOpen: boolean
  fetchSerieGenre: (isSerie: boolean) => void
  fetchMoviesGenre: (isSerie: boolean) => void    
  handleClearFilters: () => void 
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
  handleClearFilters }: SearchMenuLargeProps) => {
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
      <div className={`absolute top-0 right-0 z-10 w-1/4 bg-black max-h-screen h-screen flex flex-col p-6 gap-4 ${isClosing ? 'side-menu-left' : 'side-menu-right'}`}>
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
              <button className='self-start pl-2 text-sm text-gray underline hover:text-white' 
                onClick={handleClearFilters}>
                Limpiar filtros
              </button>
              <div className='flex h-full justify-end'>
                <div className='flex gap-4 h-8 self-end mb-4 *:w-[82px] *:justify-center'>
                  <PrimaryButton text='Buscar' img={''}/>
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