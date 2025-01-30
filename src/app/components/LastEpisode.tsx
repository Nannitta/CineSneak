import Image from 'next/image';
import SkeletonHorizontalCard from '@/components/Skeletons/SkeletonHorizontalCard';
import { formatDate, formatEpisodeNumber, formatRuntime } from '@/lib/format';
import { Clock } from '@/lib/Svg';
import { SerieDetails } from '@/types/types';

interface LastEpisodeProps {
  media: SerieDetails
  loading: boolean
}

const LastEpisode = ({ media, loading }: LastEpisodeProps) => {
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE_300;
  const posterURL = process.env.NEXT_PUBLIC_POSTER_IMAGE_342;
  const stillURL = process.env.NEXT_PUBLIC_STILL_IMAGE_300;
  const imgSrc: string = `${media.last_episode_to_air?.still_path ? stillURL + media.last_episode_to_air.still_path : (media.backdrop_path ? imgURL + media.backdrop_path : posterURL + media.poster_path)}`;

  if (loading) {
    return (
      <SkeletonHorizontalCard/>
    );
  }
  
  return(
    <div className='flex flex-col px-4 gap-4 lg:px-6 lg:flex-row lg:gap-6'>
      <div className='min-w-[300px] h-[169px] relative'>
        <div
          className='w-full h-[169px] absolute z-10 bg-gradient-to-t from-black to-transparent'>
        </div>
        <Image
          src={imgSrc}
          alt={`Portada del episodio ${media.last_episode_to_air?.name}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className='object-cover rounded-lg'
          priority
        />
      </div>
      <div>
        {
          media.last_episode_to_air?.season_number && media.last_episode_to_air?.episode_number && media.last_episode_to_air?.name ?
            <h3 className='text-sm font-bold flex gap-2 py-2'>
              {media.last_episode_to_air?.season_number}x{formatEpisodeNumber(media.last_episode_to_air?.episode_number)}
              <span>{media.last_episode_to_air?.name}</span>
            </h3>
            : <p className='text-sm font-bold py-2'>No hay información disponible</p>
        }
        <div className='flex flex-col gap-1 mb-2 md:flex-row md:gap-8'>
          {
            media.last_episode_to_air?.air_date &&
            <p className='text-xs text-gray'>Fecha de emisión · {formatDate(media.last_episode_to_air?.air_date.toString())}</p>
          }
          {
            media.last_episode_to_air?.runtime &&
            <p className="text-xs flex place-items-center gap-1 text-gray">
              <Clock
                width={'10'}
                height={'10'} />
              Duración · {formatRuntime(media.last_episode_to_air?.runtime)}
            </p>
          }
        </div>
        <p className='text-balance font-extralight'>{media.last_episode_to_air?.overview}</p>
      </div>
    </div>
  );
};

export default LastEpisode;