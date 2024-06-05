'use client';

import { useMediaDetailsStore } from '@/store/mediaDetails';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { League_Spartan } from 'next/font/google';
import { formatDate, formatRuntime, formatVoteCount } from '@/lib/format';
import { Calendar, Clock, Play, Star } from '@/lib/Svg';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import Tag from '@/components/Tag';
import { Genre } from '@/types/types';
import PrimaryButton from '@/components/PrimaryButton';
import { useInPictureModeStore } from '@/store/inPictureMode';
import { useMoviesStore } from '@/store/movies';
import WatchTrailer from '@/components/WatchTrailer';

const league = League_Spartan({ subsets: ['latin'] });

const WatchMedia = () => {
  const {media, id} = useParams<Params>();
  const fecthMediaDetails = useMediaDetailsStore(state => state.fetchMediaDetails);
  const mediaDetails = useMediaDetailsStore(state => state.mediaDetails);
  const providers = useMediaDetailsStore(state => state.providers);
  const fetchProviders = useMediaDetailsStore(state => state.fetchProviders);
  const fetchMovieTrailer = useMoviesStore(state => state.fetchMovieTrailers);
  const openInPictureMode = useInPictureModeStore(state => state.openPictureMode);
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const [providersLogo, setProvidersLogo] = useState<any>('');
  const {screenSize} = CheckWindowWidth();

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
        spanishProviders?.forEach((provider: any) => {
          finalProviders.push(provider);
        });
        setProvidersLogo(finalProviders);
      }    
    }           
  };

  const getGenreNames = (genres: Genre[]) => {
    return genres.map(id => {
      const genre = mediaDetails?.genres.find((genre: Genre) => genre.id === id.id);
      if (genre) {
        return <Tag key={genre.id} text={genre.name}/>;
      }
      return null;
    }).filter(Boolean).slice(0,2);
  };

  const handleTrailerClick = async (id: number) => {
    await fetchMovieTrailer(id);
    openInPictureMode();
  };
   
  return(
    <main className='flex-grow flex flex-col relative'>
      <WatchTrailer/>
      {
        mediaDetails &&
        <>
          <div 
            className='w-full h-60 relative'>
            <Image src={`${imgURL + mediaDetails.backdrop_path}`} alt='Portada de la película' fill={true} className='object-cover' priority/>
          </div>
          <div className='w-full h-60 absolute bg-gradient-to-t from-black to-transparent'></div>
          <div 
            className='w-40 h-64 absolute z-10 rounded-lg top-28 left-4 shadow-2xl'>
            <Image src={`${imgURL + mediaDetails.poster_path}`} alt='Póster de la película' fill={true} className='object-cover rounded-lg'/>
          </div>
          {
            providers && providersLogo &&
              <>
                <h3 className='font-bold text-[10px] absolute left-44 pl-2 top-[122px] z-10'>
                  Disponible en
                </h3>
                <div className='flex flex-wrap gap-2 absolute left-44 top-36 pl-2 pr-4'>
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
                    }).slice(0,3)
                  } 
                </div>
              </>
          }
          <div className='w-1/2 self-end pl-1 pr-4 flex justify-between'>
            <h1 className={`uppercase font-black ${league.className} text-balance`}>
              {mediaDetails.title || mediaDetails.name}
            </h1>
            <div className='text-xs flex h-fit'>
              <p>{formatVoteCount(mediaDetails.vote_average)}/</p>
              <span className='text-[8px] text-gray flex gap-[2px] pt-[1px]'>
                10
                <Star width={'14'} height={'14'}/>
              </span>
            </div>
          </div>
          <div className='w-1/2 self-end flex gap-1 text-xs place-items-center pt-1 pl-[2px] pr-4'>
            <Calendar
              width={screenSize === 'sm' ? '12' : '15'}
              height={screenSize === 'sm' ? '12' : '15'}
            />
            <span className='text-gray'>{formatDate(mediaDetails.release_date.toString())}</span>
          </div>
          <div className={`flex font-light w-1/2 self-end pl-[2px] pt-2 ${screenSize === 'sm' ? 'gap-2 text-[10px]' : 'gap-4 text-sm'}`}>
            {
              getGenreNames(mediaDetails.genres)
            }
          </div>
          <div className='px-4 mt-8 mb-2 self-end flex'>
            <PrimaryButton
              text={'Ver tráiler'}
              img={
                <Play
                  width={screenSize === 'sm' ? '12' : '16'}
                  height={screenSize === 'sm' ? '12' : '16'}
                  fill={'white'}
                />
              }
              title={'Ver tráiler'}
              onClick={() => handleTrailerClick(mediaDetails.id)}
            />
          </div>
          <p className='px-4 text-balance font-extralight pt-4'>
            {mediaDetails.overview}
          </p>
          <div className='flex px-4 gap-4 pt-2'>
            <p className='text-xs text-gray'>Idioma original · <span className='uppercase'>{mediaDetails.original_language}</span></p>
            <p className='text-xs flex place-items-center gap-1 text-gray'>
              <Clock
                width={screenSize === 'sm' ? '12' : '15'}
                height={screenSize === 'sm' ? '12' : '15'}
              />
              Duración · {formatRuntime(mediaDetails.runtime)}
            </p>
          </div>
          <h2 className='px-4 pt-4 pb-3 font-black'>Reparto principal</h2>
        </>
      }
    </main>
  );
};

export default WatchMedia;