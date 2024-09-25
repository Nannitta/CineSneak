import Image from 'next/image';
import Link from 'next/link';
import { Plus } from '@/lib/Svg';
import { MovieDetails, SerieDetails } from '@/types/types';

interface VerticalCard {
  media: MovieDetails | SerieDetails
  isSerie: boolean
}

const VerticalCardCarousel = ({ media, isSerie }: VerticalCard) => {
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  const isSerieMedia = (media: MovieDetails | SerieDetails): media is SerieDetails => {
    return isSerie;
  };
  
  return (
    <Link href={`/${isSerie ? 'tv' : 'movie'}/${media.id}`}>
      <article className='w-[150px]'>
        <div className='group'>
          <div className='w-[150px] h-[225px] relative rounded-lg overflow-hidden'>
            <Image
              src={`${media.poster_path ? imgURL + media.poster_path : imgURL + media.backdrop_path}`}
              alt={`Portada de la película ${isSerieMedia(media) ? media.name : media.title}`}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className='object-cover rounded-lg'
              priority
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center'>
              <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
                VER MÁS
                <Plus width={'14'} height={'14'} fill={'white'}/>
              </span>
            </div>
          </div>
          <p className='pt-2 text-xs text-white line-clamp-1 lg:text-gray lg:group-hover:text-white font-extralight md:text-sm transition duration-300'>
            {isSerieMedia(media) ? media.name : media.title}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default VerticalCardCarousel;