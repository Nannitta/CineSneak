'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import Image from 'next/image';
import { Star, Clock, Calendar, Play } from '@/lib/Svg';
import CardActor from '@/components/CardActor';
import PrimaryButton from '@/components/PrimaryButton';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import { League_Spartan } from 'next/font/google';
import { formatDate, formatRuntime, formatVoteCount } from '@/lib/format';
import { Cast, CountryProvider, Genre, MediaContent, MediaDetails, ProvidersLogo } from '@/types/types';

const league = League_Spartan({ subsets: ['latin'] });

interface MovieDetailsProps {
  mediaDetails: MediaDetails
  providers: CountryProvider | null
  providersLogo: ProvidersLogo[]
  handleTrailerClick: (id: number) => void
  similarMediaStore: MediaContent[]
  cast: Cast[]
  getGenreNames: (genres: Genre[]) => (JSX.Element | null)[]
}

export default function MovieDetails({ mediaDetails, providers, providersLogo, handleTrailerClick, similarMediaStore, cast, getGenreNames}: MovieDetailsProps) {
  const {screenSize} = CheckWindowWidth();  
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  return(
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
                providersLogo.filter((logo) => logo.logo_path !== null).map((logo) => {                                         
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
        cast.filter((actor: Cast) => actor.profile_path !== null).map((actor: Cast) => {          
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
  );
}