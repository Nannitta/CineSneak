import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLoginMenuStore } from '@/store/loginMenu';
import { useLoginStore } from '@/store/userStore';

const LoginMenu = () => {
  const { clearSession } = useLoginStore(state => state);
  const { closeLoginMenu } = useLoginMenuStore(state => state);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeLoginMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeLoginMenu]);

  const closeSesion = () => {
    clearSession();
    closeLoginMenu();
  };

  return (
    <div className='bg-black absolute top-[70px] -right-4 z-10 w-44 rounded-bl-lg shadow-lg shadow-skeleton lg:-right-6'
      ref={menuRef}
    >
      <nav className='flex flex-col gap-6 p-4 text-right *:pr-4'>
        <Link href="">Favoritas</Link>
        <Link href="">Ya vistas</Link>
        <Link href="/" onClick={closeSesion} className='border-t border-t-gray pt-4'>Cerrar sesión</Link>
      </nav>
    </div>
  );
};

export default LoginMenu;