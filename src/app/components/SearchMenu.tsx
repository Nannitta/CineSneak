'use client';

import { useEffect, useRef, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useRouter } from 'next/navigation';
import { useSearchMenuStore } from '@/store/searchMenu';
import { Close, Search } from '@/lib/Svg';

const SearchMenu = () => {
  const { screenSize } = CheckWindowWidth();
  const { closeSearchMenu: closeSearchMenuStore, isSearchOpen } = useSearchMenuStore(state => state);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  return(
    <>
      {
        isSearchOpen || isClosing
          ? screenSize !== 'lg' && screenSize !=='laptop'
            && <div className={`w-full h-28 bg-black fixed top-0 z-[1] p-4 flex flex-col ${isClosing ? 'side-menu-closing' : 'side-menu'}`}>
              <button onClick={closeSearchMenu} className='self-end pb-4'>
                <Close width='24' height='24' fill='white'/>
              </button>
              <div className='flex items-center gap-2 placeholder:text-gray placeholder:font-normal bg-[#222222f3] border border-[#2e2d2df3] p-2 rounded'>
                <Search width='16' height='16' color='#9ca3af'/>
                <input ref={searchInputRef} onKeyDown={handleKeyDown} onChange={handleSearchChange} type="text" placeholder='¿Qué estás buscando?' className='bg-transparent font-light text-gray text-sm focus:outline-none'/>
              </div>
            </div>
          : null
      }
    </>
  );
};

export default SearchMenu;