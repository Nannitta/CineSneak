"use client"

import Link from 'next/link';
import { useSideMenuStore } from '../store/sideMenu';
import { Close } from '../lib/Svg';

export default function SideMenu() {
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
  const isSideMenuOpen = useSideMenuStore(state => state.isSideMenuOpen);
  return(
    <>
      {
        isSideMenuOpen
          ? <div className='bg-black fixed z-10 w-full flex flex-col place-items-center p-4 shadow-lg'>
              <button onClick={closeSideMenu} className='self-end'>
                <Close 
                  width={"16"}
                  height={"16"}
                  fill='#C3C3C3'
                />
              </button>
              <ul className='flex jus gap-5 *:text-gray *:text-[10px]'>
                <li><Link href={"/"} title='Página principal' onClick={closeSideMenu}>Home</Link></li>
                <li><Link href={"/"} title='Películas' onClick={closeSideMenu}>Películas</Link></li>
                <li><Link href={"/"} title='Series' onClick={closeSideMenu}>Series</Link></li>
              </ul>
            </div>
          : null
      }
    </>
  );
};