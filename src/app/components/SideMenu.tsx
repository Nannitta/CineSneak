'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSideMenuStore } from '@/store/sideMenu';
import { Close } from '@/lib/Svg';

const SideMenu = () => {
  const { closeSideMenu: closeSideMenuStore, isSideMenuOpen } = useSideMenuStore(state => state);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const closeSideMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeSideMenuStore();
      setIsClosing(false);
    }, 500);
  };

  return(
    <>
      {
        isSideMenuOpen || isClosing
          ? <div className={`bg-black fixed z-10 w-full flex flex-col place-items-center p-4 shadow-lg ${isClosing ? 'side-menu-up' : 'side-menu-down'}`}>
            <button onClick={closeSideMenu} className='self-end'>
              <Close 
                width={'24'}
                height={'24'}
              />
            </button>
            <nav className='flex jus gap-5 *:text-sm'>
              <Link href={'/'} title='Página principal' onClick={closeSideMenu}>Home</Link>
              <Link href={'/peliculas'} title='Películas' onClick={closeSideMenu}>Películas</Link>
              <Link href={'/series'} title='Series' onClick={closeSideMenu}>Series</Link>
            </nav>
          </div>
          : null
      }
    </>
  );
};

export default SideMenu;