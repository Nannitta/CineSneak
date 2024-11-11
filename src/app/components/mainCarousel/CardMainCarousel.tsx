import CheckWindowWidth from '@/hooks/useWindowWidth';
import { League_Spartan } from 'next/font/google';
import PrimaryButton from '@/components/PrimaryButton';
import Tag from '@/components//Tag';
import { Calendar, Play } from '@/lib/Svg';
import { formatDate } from '@/lib/format';
import { Genre, MovieDetails, SerieDetails } from '@/types/types';

const league = League_Spartan({ subsets: ['latin'] });

interface CardMainCarouselProps {
  media: MovieDetails | SerieDetails
  genres: Genre[]
  isSerie: boolean
  handleTrailerClick: (id: number, isSerie: boolean) => Promise<void>
}

const CardMainCarousel = ({ media, genres, isSerie, handleTrailerClick }: CardMainCarouselProps) => {
  const {screenSize} = CheckWindowWidth();
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const imageSrc: string = `${media.backdrop_path ? imgURL + media.backdrop_path : imgURL + media.poster_path}`;  
  const webpImageSrc: string = `/api/convertImage?url=${imageSrc}`;

  const getGenreNames = (ids: number[]) => {
    return ids.map(id => {
      const genre: Genre | undefined = genres.find((genre: Genre) => genre.id === id);
      if (genre) {
        return <Tag key={genre.id} text={genre.name}/>;
      }
      return null;
    }).filter(Boolean).slice(0,2);
  };

  const isSerieMedia = (media: MovieDetails | SerieDetails): media is SerieDetails => {
    return isSerie;
  };
  
  return(
    <article className='embla__slide__number w-full h-96 md:h-[420px] lg:h-[700px] bg-cover bg-no-repeat bg-center relative px-2 pb-4 md:px-4 md:pb-8' style={{backgroundImage: `url(${webpImageSrc})`}}>
      <div className='overlay px-4 pt-4 pb-8 lg:p-6 md:pb-10'>
        <h2 className={`uppercase font-black ${league.className} md:text-2xl lg:text-4xl`}>
          {
            isSerieMedia(media) ? media.name : media.title
          }
        </h2>
        <p className='text-sm font-normal text-gray text-balance line-clamp-6 lg:w-3/4 lg:text-wrap md:text-base'>{media.overview}</p>
        <div className='flex gap-1 place-items-center text-xs font-light self-end md:self-start py-2 md:pt-2 md:pb-4 md:text-sm'>
          <Calendar
            width={screenSize === 'sm' ? '12' : '15'}
            height={screenSize === 'sm' ? '12' : '15'}
          />
          <span className='text-gray'>{formatDate(isSerieMedia(media) ? media.first_air_date : media.release_date)}</span>
        </div>
        {screenSize && screenSize === 'sm'
          ? <div className='flex items-baseline relative w-full justify-between'>
            <PrimaryButton
              text={'Ver tráiler'}
              img={
                <Play
                  width={screenSize === 'sm' ? '12' : '16'}
                  height={screenSize === 'sm' ? '12' : '16'}
                  fill={'white'}
                />
              }
              onClick={isSerie ? () => handleTrailerClick(media.id, true) : () => handleTrailerClick(media.id, false)}
            />
            <div className='flex font-light gap-2 text-[10px] md:gap-4 md:text-sm'>
              {
                getGenreNames(media.genre_ids)
              }
            </div>
          </div>
          : <>
            <div className='flex gap-2 md:gap-4 md:mb-4 md:text-sm'>
              {
                getGenreNames(media.genre_ids)
              }
            </div>
            <PrimaryButton
              text={'Ver tráiler'}
              img={
                <Play
                  width={screenSize === 'sm' ? '12' : '16'}
                  height={screenSize === 'sm' ? '12' : '16'}
                  fill={'white'}
                />
              }
              onClick={isSerie ? () => handleTrailerClick(media.id, true) : () => handleTrailerClick(media.id, false)}
            />
          </>
        }
      </div>
    </article>
  );
};

export default CardMainCarousel;