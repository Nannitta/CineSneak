'use client';

import { useMediaDetailsStore } from '@/store/mediaDetails';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const WatchMedia = () => {
  const {media, id} = useParams<Params>();
  const fecthMediaDetails = useMediaDetailsStore(state => state.fetchMediaDetails);
  const mediaDetails = useMediaDetailsStore(state => state.mediaDetails);
  const providers = useMediaDetailsStore(state => state.providers);
  const fetchProviders = useMediaDetailsStore(state => state.fetchProviders);
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const [providersLogo, setProvidersLogo] = useState<any>('');

  useEffect(() => {
    if(media === 'movie') {
      fecthMediaDetails(id, false);
      fetchProviders(id, false);
    };
    if(media === 'tv') {
      fecthMediaDetails(id, true);
      fetchProviders(id, true);
    };
  }, []);

  useEffect(() => {
    getProviders();
  }, [providers]);

  const getProviders = () => {   
    if(providers && Object.keys(providers).length > 0) {          
      if(providers.ES) {
        const spanishProviders: any = providers.ES?.flatrate;
        const finalProviders: any = [];
        spanishProviders.forEach((provider: any) => {
          finalProviders.push(provider);
        });
        setProvidersLogo(finalProviders);
      }    
    }           
  }; 
   
  return(
    <main className='flex-grow flex flex-col relative'>
      {
        mediaDetails &&
        <>
          <div 
            className='w-full h-60 bg-cover bg-no-repeat bg-center' 
            style={{backgroundImage: `url('${imgURL + mediaDetails.backdrop_path}')`}}>
          </div>
          <div className='w-full h-60 absolute bg-gradient-to-t from-black to-transparent'></div>
          <div 
            className='w-40 h-64 absolute z-10 rounded-lg top-1/2 left-4 shadow-2xl bg-cover bg-no-repeat bg-center' 
            style={{backgroundImage: `url('${imgURL + mediaDetails.poster_path}')`}}>
          </div>
          {
            providers && providersLogo &&
              <>
                <h3 className='font-bold text-[10px] absolute left-1/2 pl-2 top-[122px] z-10'>Disponible en</h3>
                <div className='flex flex-wrap gap-2 absolute left-1/2 top-36 px-2'>
                  {
                    providersLogo.map((logo: any) => {
                      return(
                        <Image src={`${imgURL + logo.logo_path}`}
                          alt='Logo'
                          key={logo}
                          width={40}
                          height={40}
                          priority
                        />
                      );
                    })
                  } 
                </div>
              </>
          }
        </>
      }
    </main>
  );
};

export default WatchMedia;