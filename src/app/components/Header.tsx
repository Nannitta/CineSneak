'use client';

import { useEffect, useRef, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSideMenuStore } from '@/store/sideMenu';
import { useSearchMenuStore } from '@/store/searchMenu';
import Logo from '@/components/Logo';
import PrimaryButton from '@/components/PrimaryButton';
import { Menu, Search, Avatar } from '@/lib/Svg';

const Header = () => {
  const {screenSize} = CheckWindowWidth();
  const [color, setColor] = useState<string>('#C3C3C3');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const openSideMenu = useSideMenuStore(state => state.openSideMenu);
  const { openSearchMenu, isSearchOpen, closeSearchMenu } = useSearchMenuStore(state => state);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathName === path ? 'text-white' : 'text-gray';

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#9ca3af');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
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
    <header className='flex justify-between p-4 items-center lg:p-6'>
      <div className='flex place-items-center gap-2'>
        <Link href={'/'}>
          <Logo
            width={screenSize === 'sm' ? '24' : (screenSize === 'md' ? '25' : '40')}
            height={screenSize === 'sm' ? '24' : (screenSize === 'md' ? '25' : '40')}
            fill={'white'}
          />
        </Link>
        <button onClick={openSideMenu} className='md:hidden'><Menu/></button>
      </div>
      { screenSize &&
        screenSize !== 'sm'
        ? <nav className='flex place-items-center gap-5'>
          <Link href={'/'} title='Página principal' className={`hover:text-white ${isActive('/')}`}>Home</Link>
          <Link href={'/peliculas'} title='Películas' className={`hover:text-white ${isActive('/peliculas')}`}>Películas</Link>
          <Link href={'/series'} title='Series' className={`hover:text-white ${isActive('/series')}`}>Series</Link>
        </nav>
        : null
      }
      <div className='flex place-items-center gap-4 lg:h-9'>
        { screenSize === 'lg' || screenSize ==='laptop' 
          ? <div className={`relative flex items-center justify-end w-[264px] ${isSearchOpen && 'bg-[#141414] border-[1px] border-[#2e2d2df3] p-2 rounded'}`}>
            <button title='Buscar' onClick={openSearchMenu} className='flex items-center'>
              <Search 
                width='24' 
                height='24' 
                color={color} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}/> 
              <input
                type='text'
                ref={searchInputRef}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder='¿Qué estás buscando?'
                className={`transition-all duration-300 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent overflow-hidden ${isSearchOpen ? 'max-w-xs opacity-100 pl-4' : 'max-w-0 opacity-0 pl-0'}`}
                style={{ transitionProperty: 'max-width, opacity, padding-left' }}
              />
            </button>
          </div>
          : <button title='Buscar' onClick={openSearchMenu}>
            <Search
              width={'24'}
              height={'24'}
              color={screenSize === 'sm' ? 'white' : color}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </button>
        }
        <PrimaryButton
          text={'Inc. sesión'}
          img={
            <Avatar
              width={screenSize === 'sm' ? '12' : '16'}
              height={screenSize === 'sm' ? '12' : '16'}
              fill={'white'}
            />
          }
        />
      </div>
    </header>
  );
};

export default Header;