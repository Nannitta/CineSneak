import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import Image from 'next/image';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import PrimaryButton from '@/components/PrimaryButton';
import LastEpisode from '@/components/LastEpisode';
import ListLogoProviders from '@/components/ListLogoProviders';
import MediaInfoSmallDevice from '@/components/MediaInfoSmallDevice';
import MediaInfoLargeDevice from '@/components/MediaInfoLargeDevice';
import SkeletonPoster from '@/components/Skeletons/SkeletonPoster';
import SkeletonWallMedia from '@/components/Skeletons/SkeletonWallMedia';
import { Fav, Play, Star } from '@/lib/Svg';
import { formatVoteCount } from '@/lib/format';
import type { Cast, Genre, ProvidersLogo, SerieDetails, User } from '@/types/types';
import { addFavorites, deleteFavorites, getFavorites } from 'database/favorites';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const league = League_Spartan({ subsets: ['latin'] });

interface SerieDetailsProps {
  media: SerieDetails
  providersLogo: ProvidersLogo[]
  handleTrailerClick: (id: number, isSerie: boolean) => void
  similarMediaStore: SerieDetails[]
  cast: Cast[]
  getGenreNames: (genres: Genre[]) => (JSX.Element | null)[]
  loading: boolean
  token: string
  user: User | null
}

const SerieDetails = ({ media, providersLogo, handleTrailerClick, similarMediaStore, cast, getGenreNames, loading, token, user }: SerieDetailsProps) => {
  const { screenSize } = CheckWindowWidth();
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const imgSrc: string = `${media.backdrop_path ? imgURL + media.backdrop_path : imgURL + media.poster_path}`;
  const webpImgSrc: string = `/api/convertImage?url=${imgSrc}`;
  const [imgLoader, setImgLoader] = useState<boolean>(false);   
   
  const posterURL: string | undefined = process.env.NEXT_PUBLIC_POSTER_IMAGE_780;
  const posterSrc : string = `${posterURL + media.poster_path}`;
  const webpPosterSrc: string = `/api/convertImage?url=${posterSrc}`; 
  const [posterLoader, setPosterLoader] = useState<boolean>(false); 

  const [color, setColor] = useState<string>('transparent');
  const [favorite, setFavorite] = useState<boolean>(false);
  const { media: type } = useParams<Params>();  

  const handleImgLoad = () => {
    setImgLoader(true);
  };

  const handlePosterLoad = () => {
    setPosterLoader(true);
  };

  const onMouseEnter = () => {   
    setColor('#fff');    
  };

  const onMouseLeave = () => {
    setColor('transparent');
  };

  const handleAddFavorite = async () => {
    if(user) {   
      if(!favorite) {
        await addFavorites(user.email, media.id, media.name, webpPosterSrc, type);
        setFavorite(true);
      } else {
        await deleteFavorites(user.email, media.id);
        setFavorite(false);
      }             
    }
  };

  useEffect(() => {
    const checkFavorites = async () => {
      if (user) {
        const favs = await getFavorites(user.email);
        const favoriteIds = favs.map((mediaFav) => mediaFav.id);
        const isCurrentFavorite = favoriteIds.includes(media.id);
        
        setFavorite(isCurrentFavorite);
      }
    };
  
    checkFavorites();
  }, [user, media.id, favorite]);

  return (
    <div className="relative">
      <div className="relative">
        <div className="w-full h-60 md:h-80 lg:h-[556px] bg-cover bg-no-repeat bg-center relative">
          {!imgLoader && <SkeletonWallMedia/>}
          <Image src={webpImgSrc} alt={`Cabecera de la película ${media.name}`} fill={true} className='object-cover' onLoad={handleImgLoad} />
        </div>
        <div className="w-full h-60 absolute bg-gradient-to-t from-black to-transparent md:h-80 lg:h-[556px] top-0"></div>
      </div>
      <section className="relative px-4 grid grid-cols-movie-details-sm grid-rows-movie-details-sm gap-2 md:grid-cols-movie-details-md md:grid-rows-movie-details-md lg:px-6 lg:grid-cols-movie-details-lg 2xl:grid-rows-movie-details-lg lg:-mt-64 laptop:grid-rows-movie-details-laptop">
        <div className="w-40 h-64 relative shadow-2xl lg:w-80 lg:h-[540px]">
          {!posterLoader && <SkeletonPoster/>}
          <Image src={webpPosterSrc} alt={`Póster de la película ${media.name}`} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-lg" onLoad={handlePosterLoad}/>
        </div>
        <ListLogoProviders providersLogo={providersLogo}/>
        <h1 className={`uppercase font-black ${league.className} text-balance col-start-2 col-end-3 row-start-2 row-end-3 ml-2 text-sm md:text-xl lg:self-end lg:ml-0`}>
          {media.name}
        </h1>
        <div className="text-xs flex h-fit col-start-3 col-end-4 row-start-2 row-end-3 md:text-base md:justify-end lg:text-xl lg:self-center lg:justify-start lg:col-start-4 lg:col-end-5 lg:row-start-4 lg:row-end-5">
          <p>{formatVoteCount(media.vote_average)} /</p>
          <span className="text-[8px] text-gray flex gap-[2px] pt-[1px] md:text-xs md:items-end md:pt-0 md:pb-[3px] md:gap-1 lg:text-sm lg:items-end">
          10
            <div className="mb-[2px] flex items-end md:mb-[1px]">
              <Star width={screenSize === 'sm' ? '12' : '16'} height={screenSize === 'sm' ? '12' : '16'} fill="white" />
            </div>
          </span>
        </div>
        <div className="flex gap-1 text-[10px] items-center justify-end col-start-2 col-end-4 row-start-3 row-end-4 md:text-sm md:justify-start md:ml-2 lg:ml-0">
          <p>{media.number_of_seasons} temporadas · {media.number_of_episodes} capítulos</p>
        </div>
        <div className='flex font-light items-end col-start-2 col-end-4 justify-end row-start-4 row-end-5 gap-2 text-[10px] md:justify-start md:ml-2 md:gap-4 md:text-sm lg:ml-0'>
          {getGenreNames(media.genres)}
        </div>
        <div className="flex flex-row-reverse col-start-1 col-end-4 justify-between row-start-5 row-end-6 items-end md:col-start-1 md:col-end-2 md:flex-row lg:col-start-2 lg:col-end-3 lg:ml-0 lg:row-start-7 lg:row-end-8 lg:items-end lg:justify-start lg:gap-6">
          <PrimaryButton
            text={'Ver tráiler'}
            img={
              <Play
                width={screenSize === 'sm' ? '12' : '16'}
                height={screenSize === 'sm' ? '12' : '16'}
                fill={'white'}
              />
            }
            onClick={() => handleTrailerClick(media.id, true)}
          />
          {
            token && 
            <div className='cursor-pointer w-8 h-8' onClick={handleAddFavorite}>
              <Fav width='32' height='32' color={favorite ? '#fff' : color} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} animation={`${favorite ? 'like' : 'dislike'}`}/>
            </div>
          }
        </div>
        {
          (screenSize === 'laptop' || screenSize === 'lg') &&
           <MediaInfoLargeDevice mediaInfo={media} cast={cast} />
        }
      </section>
      {
        (screenSize === 'sm' || screenSize === 'md') &&
        <MediaInfoSmallDevice mediaInfo={media} cast={cast} />
      }
      <section className='mt-4 laptop:mt-12 lg:mt-8' data-test='lastEpisode'>
        <h2 className="px-4 pb-4 font-black lg:px-6">
          Último capítulo en emisión
        </h2>
        <LastEpisode media={media} loading={loading}/>
      </section>
      <section className="pb-5 lg:pb-8 2xl:mt-6">
        {
          similarMediaStore.length > 0 &&
          <>
            <h2 className="px-4 font-black pt-5 pb-4 md:text-xl lg:px-6">Explora series similares</h2>
            <HorizontalCarousel media={similarMediaStore} isSerie={true} loading={loading}/>
          </>
        }
      </section>
    </div>
  );
};

export default SerieDetails;