import CheckWindowWidth from '@/hooks/useWindowWidth';
import Image from 'next/image';
import { League_Spartan } from 'next/font/google';
import PrimaryButton from '@/components/PrimaryButton';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import { Star, Calendar, Play } from '@/lib/Svg';
import { formatDate, formatVoteCount } from '@/lib/format';
import type { Cast, Genre, ProvidersLogo, MovieDetails } from '@/types/types';
import ListLogoProviders from '@/components/ListLogoProviders';
import MediaInfoSmallDevice from '@/components/MediaInfoSmallDevice';
import MediaInfoLargeDevice from '@/components/MediaInfoLargeDevice';

const league = League_Spartan({ subsets: ['latin'] });

interface MovieDetailsProps {
  media: MovieDetails
  providersLogo: ProvidersLogo[]
  handleTrailerClick: (id: number, isSerie: boolean) => void
  similarMediaStore: MovieDetails[]
  cast: Cast[]
  getGenreNames: (genres: Genre[]) => (JSX.Element | null)[]
}

const MovieDetails = ({ media, providersLogo, handleTrailerClick, similarMediaStore, cast, getGenreNames }: MovieDetailsProps) => {
  const { screenSize } = CheckWindowWidth();
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const imgSrc: string = `${media.backdrop_path ? imgURL + media.backdrop_path : imgURL + media.poster_path}`;
  const webpImgSrc: string = `/api/convertImage?url=${imgSrc}`;   
 
  const posterURL: string | undefined = process.env.NEXT_PUBLIC_POSTER_IMAGE_780;
  const posterSrc : string = `${posterURL + media.poster_path}`;
  const webpPosterSrc: string = `/api/convertImage?url=${posterSrc}`;  

  return (
    <div className="relative">
      <div className="relative">
        <div
          className="w-full h-60 md:h-80 lg:h-[556px] bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${webpImgSrc})` }}>
        </div>
        <div className="w-full h-60 absolute bg-gradient-to-t from-black to-transparent md:h-80 lg:h-[556px] top-0"></div>
      </div>
      <section className="relative px-4 grid grid-cols-movie-details-sm grid-rows-movie-details-sm gap-2 md:grid-cols-movie-details-md md:grid-rows-movie-details-md lg:px-6 lg:grid-cols-movie-details-lg 2xl:grid-rows-movie-details-lg lg:-mt-64 laptop:grid-rows-movie-details-laptop">
        <div
          className="w-40 h-64 relative shadow-2xl lg:w-80 lg:h-[540px]">
          <Image src={webpPosterSrc} alt={`Póster de la película ${media.title}`} fill={true} className="object-cover rounded-lg" />
        </div>
        <ListLogoProviders providersLogo={providersLogo}/>
        <h1 className={`uppercase font-black ${league.className} text-balance col-start-2 col-end-3 row-start-2 row-end-3 ml-2 text-sm md:text-xl lg:self-end lg:ml-0`}>
          {media.title}
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
          <Calendar
            width={screenSize === 'sm' ? '12' : '16'}
            height={screenSize === 'sm' ? '12' : '16'}
          />
          <span className="text-gray">{formatDate(media.release_date?.toString())}</span>
        </div>
        <div className={`flex font-light items-end col-start-2 col-end-4 justify-end row-start-4 row-end-5 md:justify-start md:ml-2 lg:ml-0 ${screenSize === 'sm' ? 'gap-2 text-[10px]' : 'gap-4 text-sm'}`}>
          {getGenreNames(media.genres)}
        </div>
        <div className="flex col-start-2 col-end-4 justify-end row-start-5 row-end-6 items-end md:col-start-1 md:col-end-2 md:justify-start lg:col-start-2 lg:col-end-3 lg:ml-0 lg:row-start-7 lg:row-end-8 lg:items-start">
          <PrimaryButton
            text={'Ver tráiler'}
            img={
              <Play
                width={screenSize === 'sm' ? '12' : '16'}
                height={screenSize === 'sm' ? '12' : '16'}
                fill={'white'}
              />
            }
            onClick={() => handleTrailerClick(media.id, false)}
          />
        </div>
        {
          (screenSize === 'laptop' || screenSize === 'lg') &&
          <MediaInfoLargeDevice mediaInfo={media} cast={cast}/>
        }
      </section>
      {
        (screenSize === 'sm' || screenSize === 'md') &&
         <MediaInfoSmallDevice mediaInfo={media} cast={cast}/>
      }
      { similarMediaStore.length > 0 &&  
        <section className="pb-5 lg:pb-8 2xl:mt-6">
          <h2 className="px-4 font-black pt-5 pb-4 md:text-xl lg:px-6">Explora películas similares</h2>
          <HorizontalCarousel media={similarMediaStore} isSerie={false}/>
        </section>
      }
    </div>
  );
};

export default MovieDetails;
