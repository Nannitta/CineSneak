'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSideMenuStore } from '@/store/sideMenu';
import { Close } from '@/lib/Svg';

const SideMenu = () => {
  const closeSideMenuStore = useSideMenuStore(state => state.closeSideMenu);
  const isSideMenuOpen = useSideMenuStore(state => state.isSideMenuOpen);
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
          ? <div className={`bg-black fixed z-10 w-full flex flex-col place-items-center p-4 shadow-lg ${isClosing ? 'side-menu-closing' : 'side-menu'}`}>
            <button onClick={closeSideMenu} className='self-end'>
              <Close 
                width={'24'}
                height={'24'}
                fill='white'
              />
            </button>
            <ul className='flex jus gap-5 *:text-sm'>
              <li><Link href={'/'} title='Página principal' onClick={closeSideMenu}>Home</Link></li>
              <li><Link href={'/peliculas'} title='Películas' onClick={closeSideMenu}>Películas</Link></li>
              <li><Link href={'/series'} title='Series' onClick={closeSideMenu}>Series</Link></li>
            </ul>
          </div>
          : null
      }
    </>
  );
};

export default SideMenu;