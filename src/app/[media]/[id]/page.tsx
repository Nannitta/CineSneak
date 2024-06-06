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
import CardActor from '@/components/CardActor';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';

const league = League_Spartan({ subsets: ['latin'] });

const WatchMedia = () => {
  const {media, id} = useParams<Params>();
  const fecthMediaDetails = useMediaDetailsStore(state => state.fetchMediaDetails);
  const mediaDetails = useMediaDetailsStore(state => state.mediaDetails);
  const providers = useMediaDetailsStore(state => state.providers);
  const fetchProviders = useMediaDetailsStore(state => state.fetchProviders);
  const fetchMovieTrailer = useMoviesStore(state => state.fetchMovieTrailers);
  const openInPictureMode = useInPictureModeStore(state => state.openPictureMode);
  const cast = useMediaDetailsStore(state => state.cast);
  const fetchCast = useMediaDetailsStore(state => state.fetchCast);
  const similarMediaStore = useMediaDetailsStore(state => state.similarMedia);
  const fetchSimilarMedia = useMediaDetailsStore(state => state.fetchSimilarMedia);
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const [providersLogo, setProvidersLogo] = useState<any>('');
  const {screenSize} = CheckWindowWidth();

  useEffect(() => {
    if(media === 'movie') {
      fecthMediaDetails(id, false);
      fetchProviders(id, false);
      fetchCast(id, false);
      fetchSimilarMedia(id, false);
    };
    if(media === 'tv') {
      fecthMediaDetails(id, true);
      fetchProviders(id, true);
      fetchCast(id, true);
      fetchSimilarMedia(id, true);
    };
  }, [fecthMediaDetails, fetchCast, fetchProviders, fetchSimilarMedia, id, media]);

  useEffect(() => {
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
    getProviders();
  }, [providers]);

  const getGenreNames = (genres: Genre[]) => {
    return genres.map(id => {
      const genre = mediaDetails?.genres.find((genre: Genre) => genre.id === id.id);
      if (genre) {
        return <Tag key={genre.name} text={genre.name}/>;
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
            <Image src={`${mediaDetails.backdrop_path ? imgURL + mediaDetails.backdrop_path : imgURL + mediaDetails.poster_path}`} alt='Portada de la película' fill={true} className='object-cover' priority/>
          </div>
          <div className='w-full h-60 absolute bg-gradient-to-t from-black to-transparent'></div>
          <section className='px-4 grid grid-cols-movie-details grid-rows-movie-details gap-2 relative bottom-[72px]'>
            <div
              className='w-40 h-64 relative shadow-2xl'>
              <Image src={`${imgURL + mediaDetails.poster_path}`} alt='Póster de la película' fill={true} className='object-cover rounded-lg'/>
            </div>
            {
              providers && providersLogo &&
                <div className='flex flex-col gap-2 col-start-2 col-end-4 ml-2'>
                  <h3 className='font-bold text-[10px]'>
                    Disponible en
                  </h3>
                  <div className='flex gap-2'>
                    {
                      providersLogo.filter((logo: any) => logo.logo_path !== null).map((logo: any) => {                        
                        return(
                          <Image src={`${imgURL + logo.logo_path}`}
                            alt='Logo'
                            key={logo.logo_path}
                            width={40}
                            height={40}
                            priority
                          />
                        );
                      }).slice(0,3)
                    }
                  </div>
                </div>
            }
            <h1 className={`uppercase font-black ${league.className} text-balance col-start-2 col-end-3 row-start-2 row-end-3 ml-2`}>
              {mediaDetails.title || mediaDetails.name}
            </h1>
            <div className='text-xs flex h-fit col-start-3 col-end-4 row-start-2 row-end-3'>
              <p>{formatVoteCount(mediaDetails.vote_average)}/</p>
              <span className='text-[8px] text-gray flex gap-[2px] pt-[1px]'>
                  10
                <Star width={'14'} height={'14'}/>
              </span>
            </div>
            <div className='flex gap-1 text-[10px] items-center justify-end col-start-2 col-end-4 row-start-3 row-end-4'>
              <Calendar
                width={screenSize === 'sm' ? '12' : '15'}
                height={screenSize === 'sm' ? '12' : '15'}
              />
              <span className='text-gray'>{formatDate(mediaDetails.release_date.toString())}</span>
            </div>
            <div className={`flex font-light items-end col-start-2 col-end-4 justify-end row-start-4 row-end-5 ${screenSize === 'sm' ? 'gap-2 text-[10px]' : 'gap-4 text-sm'}`}>
              {
                getGenreNames(mediaDetails.genres)
              }
            </div>
            <div className='flex col-start-2 col-end-4 justify-end row-start-5 row-end-6 items-end'>
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
          </section>
          <p className='px-4 text-balance font-extralight relative bottom-14'>
            {mediaDetails.overview}
          </p>
          <div className='flex px-4 gap-4 pt-2 relative bottom-12'>
            <p className='text-xs text-gray'>Idioma original · <span className='uppercase'>{mediaDetails.original_language}</span></p>
            <p className='text-xs flex place-items-center gap-1 text-gray'>
              <Clock
                width={screenSize === 'sm' ? '12' : '15'}
                height={screenSize === 'sm' ? '12' : '15'}
              />
              Duración · {formatRuntime(mediaDetails.runtime)}
            </p>
          </div>
          <h2 className='px-4 font-black relative bottom-6'>Reparto principal</h2>
          <section className='flex flex-wrap px-4 gap-4'>
            {
              cast &&
              cast.filter((actor) => actor.profile_path !== null).map((actor) => {
                return(
                  <CardActor key={actor.cast_id} actor={actor}/>
                );
              }).slice(0,6)
            }
          </section>
          <section className='pb-5'>
            <h2 className='px-4 font-black pt-5 pb-4'>Explora películas similares</h2>
            <HorizontalCarousel movies={similarMediaStore} isSerie={false}/>
          </section>
        </>
      }
    </main>
  );
};

export default WatchMedia;