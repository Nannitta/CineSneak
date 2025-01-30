import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Arrow } from '@/lib/Svg';

const BackTopButton = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  

  if (scroll) {
    return (
      <Link href={'#top'}>
        <button className='fixed z-[2] bottom-12 right-12 w-11 h-11 flex items-center justify-center'>
          <Arrow/>
        </button>
      </Link>
    );
  };
};

export default BackTopButton;