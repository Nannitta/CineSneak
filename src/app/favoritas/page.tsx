'use client';

import { useLoginStore } from '@/store/userStore';
import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFavoritesMovies } from 'database/favorites';
import { User } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

const league = League_Spartan({ subsets: ['latin'] });

const Favoritas = () => {
  const { token, user, rehydrated } = useLoginStore(state => state);
  const router = useRouter();
  const [favorites, setFavorites] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (rehydrated && !token) {
      router.push('/');
    } else {
      if(user) fetchUserFavs(user);
    }
  }, [rehydrated, token, router, user]);

  const fetchUserFavs = async (user: User) => {
    const userFavorites = await getFavoritesMovies(user?.email);      
    setFavorites(userFavorites); 
  };
  
  return (
    <main className="flex flex-col flex-grow px-4">
      <h2 className={`${league.className} font-bold text-3xl py-4`}>¡Explora tus favoritas!</h2>
      <ul className='flex flex-wrap gap-4 justify-center'>
        {Object.entries(favorites).map(([key, media]) => (
          <Link href={`${media.type}/${media.id}`} key={key}>
            <li className='w-[150px]'>
              <div className='w-[150px] h-[225px] relative rounded-lg overflow-hidden'>
                <Image
                  src={media.img}
                  alt={`Portada de la película ${media.title}`}
                  fill={true}
                  className='object-cover rounded-lg'
                />
              </div>
              <p className='pt-2 text-xs text-white line-clamp-1 lg:text-gray lg:group-hover:text-white font-extralight md:text-sm transition duration-300'>
                {media.title}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
};

export default Favoritas;