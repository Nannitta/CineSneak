'use client';

import Logo from '@/components/Logo';
import { Menu, Search, Avatar } from '@/lib/Svg';
import PrimaryButton from '@/components/PrimaryButton';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import Link from 'next/link';
import { useState } from 'react';
import { useSideMenuStore } from '@/store/sideMenu';
import { usePathname } from 'next/navigation';

export default function Header() {
  const {screenSize} = CheckWindowWidth();
  const [color, setColor] = useState<string>('#C3C3C3');
  const openSideMenu = useSideMenuStore(state => state.openSideMenu);
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path ? 'text-white' : 'text-gray';

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#C3C3C3');
  };

  return(
    <header className='flex justify-between p-4 lg:p-6'>
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
        ? <ul className='flex place-items-center gap-5'>
          <li className={`hover:text-white ${isActive('/')}`}><Link href={'/'} title='Página principal'>Home</Link></li>
          <li className={`hover:text-white ${isActive('/peliculas')}`}><Link href={'/peliculas'} title='Películas'>Películas</Link></li>
          <li className={`hover:text-white ${isActive('/series')}`}><Link href={'/'} title='Series'>Series</Link></li>
        </ul>
        : null
      }
      <div className='flex place-items-center gap-4'>
        <button title='Buscar'>
          <Search 
            width={'24'}
            height={'24'}
            color={screenSize === 'sm' ? 'white' : color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </button>
        <PrimaryButton
          text={'Inc. sesión'} 
          img={
            <Avatar 
              width={screenSize === 'sm' ? '12' : '16'}
              height={screenSize === 'sm' ? '12' : '16'}
              fill={'white'}
            />
          }/>
      </div>
    </header>
  );
};