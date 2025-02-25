'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useSideMenuStore } from '@/store/sideMenu';
import { useSearchMenuStore } from '@/store/searchMenu';
import Logo from '@/components/Logo';
import PrimaryButton from '@/components/PrimaryButton';
import { Menu, Search, Avatar } from '@/lib/Svg';
import { useLoginStore } from '@/store/userStore';
import { useLoginMenuStore } from '@/store/loginMenu';
import LoginMenu from '@/components/LoginMenu';

const Header = () => {
  const {screenSize} = CheckWindowWidth();
  const [color, setColor] = useState<string>('#C3C3C3');
  const openSideMenu = useSideMenuStore(state => state.openSideMenu);
  const { openSearchMenu, isSearchOpen } = useSearchMenuStore(state => state);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();
  const { token, user } = useLoginStore(state => state);
  const { isLoginMenuOpen, openLoginMenu } = useLoginMenuStore(state => state);  

  const isActive = (path: string) => pathName === path ? 'text-white' : 'text-gray';

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#9ca3af');
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (pathName === '/login' || pathName === '/registro') {
    return (
      <header className='flex justify-between p-4 items-center lg:p-6' id='top'>
        <div className='flex place-items-center gap-2'>
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>
      </header>
    );
  }

  return(
    <header className='flex justify-between p-4 items-center lg:p-6' id='top'>
      <div className='flex place-items-center gap-2'>
        <Link href={'/'}>
          <Logo />
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
        <button title='Buscar' onClick={openSearchMenu} data-test='searchButton'>
          <Search
            width={'24'}
            height={'24'}
            color={screenSize === 'sm' ? 'white' : color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </button>
        {
          token && user
            ? <div className='relative'>
              <button className="relative w-14 h-14 p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" onClick={openLoginMenu}>
                <div className="absolute inset-0 bg-gradientButton rounded-full filter blur-[2px]"></div>
                <div className="relative w-full h-full bg-black flex justify-center items-center font-extrabold rounded-full">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              </button>        
              {
                isLoginMenuOpen
                  ? <LoginMenu/>
                  : null
              } 
            </div> 
            : <Link href={'/login'}>
              <PrimaryButton
                text={'Inc. sesión'}
                img={<Avatar />}
              />
            </Link>
        }
      </div>
    </header>
  );
};

export default Header;