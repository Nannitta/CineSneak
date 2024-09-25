import CheckWindowWidth from '@/hooks/useWindowWidth';
import { League_Spartan } from 'next/font/google';
import Image from 'next/image';
import CardActor from '@/components/CardActor';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import PrimaryButton from '@/components/PrimaryButton';
import LastEpisode from '@/components/LastEpisode';
import { Play, Star } from '@/lib/Svg';
import { formatVoteCount } from '@/lib/format';
import type { Cast, CountryProvider, Genre, ProvidersLogo, SerieDetails } from '@/types/types';

const league = League_Spartan({ subsets: ['latin'] });

interface SerieDetailsProps {
  media: SerieDetails
  providers: CountryProvider | null
  providersLogo: ProvidersLogo[]
  handleTrailerClick: (id: number, isSerie: boolean) => void
  similarMediaStore: SerieDetails[]
  cast: Cast[]
  getGenreNames: (genres: Genre[]) => (JSX.Element | null)[]
}

const SerieDetails = ({ media, providers, providersLogo, handleTrailerClick, similarMediaStore, cast, getGenreNames}: SerieDetailsProps) => {
  const { screenSize } = CheckWindowWidth();
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  return (
    <div className="relative">
      <div className="relative">
        <div
          className="w-full h-60 md:h-80 lg:h-[556px] bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${media.backdrop_path ? imgURL + media.backdrop_path : imgURL + media.poster_path}')` }}>
        </div>
        <div className="w-full h-60 absolute bg-gradient-to-t from-black to-transparent md:h-80 lg:h-[556px] top-0"></div>
      </div>
      <section className="relative px-4 grid grid-cols-movie-details-sm grid-rows-movie-details-sm gap-2 md:grid-cols-movie-details-md md:grid-rows-movie-details-md lg:px-6 lg:grid-cols-movie-details-lg 2xl:grid-rows-movie-details-lg lg:-mt-64 laptop:grid-rows-movie-details-laptop">
        <div
          className="w-40 h-64 relative shadow-2xl lg:w-80 lg:h-[540px]">
          <Image src={`${imgURL + media.poster_path}`} alt={`Póster de la película ${media.name}`} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-lg" />
        </div>
        {
          providers && providersLogo.length > 0 &&
        <div className="flex flex-col gap-2 col-start-2 col-end-4 ml-2 mb-8 lg:justify-end lg:ml-0">
          <h3 className="font-bold text-xs">
            Disponible en
          </h3>
          <div className="flex gap-2 lg:gap-4">
            {
              providersLogo.filter((logo) => logo.logo_path !== null).map((logo) => {
                return (
                  <Image src={`${imgURL + logo.logo_path}`}
                    alt={`Logo de ${logo.provider_name}`}
                    key={logo.logo_path}
                    width={40}
                    height={40}
                    priority
                  />
                );
              }).slice(0, 3)
            }
          </div>
        </div>
        }
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
            onClick={() => handleTrailerClick(media.id, true)}
          />
        </div>
        {
          (screenSize === 'laptop' || screenSize === 'lg') &&
        <>
          <p className="text-balance font-extralight col-start-2 col-end-3 pt-4 lg:row-start-5 lg:row-end-6 line-clamp-6">
            {media.overview}
          </p>
          <div className="flex gap-4 col-start-2 col-end-3 items-center lg:row-start-6 lg:row-end-7">
            <p className="text-xs text-gray">Idioma original · <span className="uppercase">{media.original_language}</span></p>
            { media.in_production === true &&
              <p className="text-xs flex place-items-center gap-1 text-gray">
                Estado · En emisión
              </p>
            }
          </div>
          <h2 className="font-black col-start-4 row-start-5 row-end-6 pt-4 laptop:col-start-1 laptop:col-end-3 laptop:row-start-8 laptop:row-end-9">Reparto principal</h2>
          <section className="flex flex-wrap gap-4 col-start-4 row-start-5 row-end-8 pt-14 lg:h-fit laptop:col-start-1 laptop:col-end-5 laptop:row-start-9 laptop:row-end-10 laptop:pt-0">
            {
              cast &&
              cast.filter((actor: Cast) => actor.profile_path !== null).map((actor: Cast) => {
                return (
                  <CardActor key={actor.cast_id} actor={actor} />
                );
              }).slice(0, 6)
            }
          </section>
        </>
        }
      </section>
      {
        (screenSize === 'sm' || screenSize === 'md') &&
      <>
        <p className="px-4 text-balance font-extralight relative bottom-14 mt-20">
          {media.overview}
        </p>
        <div className="flex px-4 gap-4 pt-2 relative bottom-12">
          <p className="text-xs text-gray">Idioma original · <span className="uppercase">{media.original_language}</span></p>
          { media.in_production === true &&
              <p className="text-xs flex place-items-center gap-1 text-gray">
                Estado · En emisión
              </p>
          }
        </div>
        <h2 className="px-4 font-black relative bottom-6 md:text-xl">Reparto principal</h2>
        <section className="flex flex-wrap px-4 gap-4 md:relative">
          {
            cast &&
            cast.filter((actor: Cast) => actor.profile_path !== null).map((actor: Cast) => {
              return (
                <CardActor key={actor.cast_id} actor={actor} />
              );
            }).slice(0, 6)
          }
        </section>
      </>
      }
      <section className='mt-4 laptop:mt-12 lg:mt-8'>
        <h2 className="px-4 pb-4 font-black lg:px-6">
          Último capítulo en emisión
        </h2>
        <LastEpisode media={media}/>
      </section>
      <section className="pb-5 lg:pb-8 2xl:mt-6">
        <h2 className="px-4 font-black pt-5 pb-4 md:text-xl lg:px-6">Explora series similares</h2>
        <HorizontalCarousel media={similarMediaStore} isSerie={true}/>
      </section>
    </div>
  );
};

export default SerieDetails;