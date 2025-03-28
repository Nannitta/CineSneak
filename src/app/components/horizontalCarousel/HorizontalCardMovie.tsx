import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonHorizontalCard from '@/components/Skeletons/SkeletonHorizontalCard';
import { Plus } from '@/lib/Svg';
import { MovieDetails, SerieDetails } from '@/types/types';

interface VerticalCard {
  media: MovieDetails | SerieDetails
  isSerie: boolean
}

const HorizontalCardCarousel = ({ media, isSerie }: VerticalCard) => {
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE_300;
  const posterURL: string | undefined = process.env.NEXT_PUBLIC_POSTER_IMAGE_342;
  const imageSrc: string = `${media.backdrop_path ? imgURL + media.backdrop_path : posterURL + media.poster_path}`;  
  const webpImageSrc: string = `/api/convertImage?url=${imageSrc}`;

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const isSerieMedia = (media: MovieDetails | SerieDetails): media is SerieDetails => {
    return isSerie;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <Link href={`/${isSerie ? 'tv' : 'movie'}/${media.id}`} data-test='horizontalCard'>
      <article className='w-[300px]'>
        <div className='group'>
          <div className='w-[300px] h-[168px] relative rounded-lg overflow-hidden'>
            {!imageLoaded && <SkeletonHorizontalCard />}
            <div
              className='overlay w-[300px] h-[168px]'>
            </div>
            <Image
              src={webpImageSrc}
              alt={`Portada de la película ${isSerieMedia(media) ? media.name : media.title}`}
              fill={true}
              className='object-cover rounded-lg'
              onLoad={handleImageLoad}
            />
            <div className='absolute inset-0 z-10 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center'>
              <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
                VER MÁS
                <Plus />
              </span>
            </div>
          </div>
          <p className='min-w-60 max-w-64 line-clamp-1 z-10 absolute bottom-3 pl-4 text-xs text-white lg:text-gray lg:group-hover:text-white font-extralight md:text-sm transition duration-300'>
            {isSerieMedia(media) ? media.name : media.title}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default HorizontalCardCarousel;