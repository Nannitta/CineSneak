'use client';

import { useLoginStore } from '@/store/userStore';
import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Favorite } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingSpinner, Plus, Popcorns } from '@/lib/Svg';
import SkeletonVerticalCard from '@/components/Skeletons/SkeletonVerticalCard';
import { useFavoritesStore } from '@/store/favorites';
import PrimaryButton from '@/components/PrimaryButton';

const league = League_Spartan({ subsets: ['latin'] });

const Favoritas = () => {
  const { token, user, rehydrated } = useLoginStore(state => state);
  const router = useRouter();
  const { favorites, fetchFavorites, fecthFavoritesIds } = useFavoritesStore(state => state);
  const [imgLoader, setImgLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (rehydrated && !token) {
      router.push('/');
    } 
    if (user) {
      setLoading(true);
      fetchFavorites(user);
      fecthFavoritesIds(user);
      setLoading(false);
    } 
  }, [rehydrated, token, router, user, fetchFavorites, fecthFavoritesIds]);

  const handleImgLoader = () => {
    setImgLoader(true);
  };  

  const handleBackHome = () => {
    router.push('/');
  };
  
  return (
    <main className={`flex flex-col flex-grow px-4 ${loading ? 'justify-center' : ''}`}>
      {
        loading
          ? <p className='flex items-center justify-center gap-4 text-gray'>
            <LoadingSpinner/>
              Cargando resultados
          </p>
          : <>
            <h1 className={`${league.className} font-bold text-4xl pt-4 welcome`}>Bienvenid@ {user?.displayName.split(' ')[0]},</h1>
            <h2 className={`${league.className} font-bold text-3xl pb-4 lg:pb-0`}>¡Explora tus favoritas!</h2>
            {
              favorites && favorites.length > 0
                ? <ul className='flex flex-wrap gap-4 justify-center'>
                  {
                    favorites.map((media: Favorite) => {
                      return (
                        <Link href={`${media.type}/${media.id}`} key={media.id}>
                          <li className='w-[150px]'>
                            <div className='group'>
                              <div className='w-[150px] h-[225px] relative rounded-lg overflow-hidden'>
                                {!imgLoader && <SkeletonVerticalCard/>}
                                <Image
                                  src={media.img}
                                  alt={`Portada de la película ${media.title}`}
                                  fill={true}
                                  className='object-cover rounded-lg'
                                  onLoad={handleImgLoader}
                                />
                                <div className='absolute inset-0 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center'>
                                  <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
                                    VER MÁS
                                    <Plus />
                                  </span>
                                </div>
                              </div>
                              <p className='pt-2 text-xs text-white line-clamp-1 lg:text-gray lg:group-hover:text-white font-extralight md:text-sm transition duration-300'>
                                {media.title}
                              </p>
                            </div>
                          </li>
                        </Link>
                      );
                    })
                  }
                </ul>
                : <div className='flex flex-col items-center justify-center flex-grow 2xl:flex-row'>
                  <Popcorns/>
                  <div className='flex flex-col gap-4 text-center mb-8 px-12 2xl:w-96 2xl:mb-0'>
                    <p className='2xl:text-2xl'>¡Explora el catálogo y guarda tus joyas favoritas!</p>
                    <PrimaryButton text={'Explora'} img={''} onClick={handleBackHome}/>
                  </div>
                </div>
            }
          </> 
      }
    </main>
  );
};

export default Favoritas;