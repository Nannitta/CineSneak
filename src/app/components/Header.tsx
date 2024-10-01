'use client';

import { useRef, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
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
  const { openSearchMenu, isSearchOpen } = useSearchMenuStore(state => state);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path ? 'text-white' : 'text-gray';

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#C3C3C3');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
          <li className={`hover:text-white ${isActive('/series')}`}><Link href={'/series'} title='Series'>Series</Link></li>
        </ul>
        : null
      }
      <div className='flex place-items-center gap-4'>
        { screenSize === 'lg' 
          ? <div className='relative flex items-center justify-end w-56'>
            { !isSearchOpen 
              ? <button title='Buscar' onClick={openSearchMenu}>
                <Search width='24' height='24' color={color} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              </button>
              : <div className='flex items-center gap-2 bg-[#222222f3] border-[1px] border-[#2e2d2df3] p-2 rounded'>
                <input
                  ref={searchInputRef}
                  type='text'
                  placeholder='¿Qué estás buscando?'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className='bg-transparent font-light text-gray text-sm focus:outline-none'
                />
                <Search width='16' height='16' color='#9ca3af' />
              </div>
            }
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