import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonVerticalCard from '@/components/Skeletons/SkeletonVerticalCard';
import { Plus, Fav } from '@/lib/Svg';
import { MovieDetails, SearchedMedia, SerieDetails } from '@/types/types';
import { useLoginStore } from '@/store/userStore';
import { addFavorites } from 'database/favorites';

interface VerticalCard {
  media: MovieDetails | SerieDetails | SearchedMedia
  isSerie: boolean
  loading?: boolean
}

const VerticalCardCarousel = ({ media, isSerie, loading }: VerticalCard) => {
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE_300;
  const posterURL: string | undefined = process.env.NEXT_PUBLIC_POSTER_IMAGE_154;
  const imageSrc: string = `${media.poster_path ? posterURL + media.poster_path : imgURL + media.backdrop_path}`;  
  const webpImageSrc: string = `/api/convertImage?url=${imageSrc}`;

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { token, user } = useLoginStore(state => state);
  const [hovered, setHovered] = useState<boolean>(false);
  const [color, setColor] = useState<string>('transparent');

  const isSerieMedia = (media: MovieDetails | SerieDetails | SearchedMedia): media is SerieDetails => {
    return isSerie;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const onMouseEnter = () => {   
    setColor('#fff');    
  };

  const onMouseLeave = () => {
    setColor('transparent');
  };

  const handleFavorites = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(user) {
      addFavorites(user.email, media.id, (isSerieMedia(media) ? media.name : media.title), webpImageSrc);
    }
  };
  
  if (loading) {
    return (
      <SkeletonVerticalCard/>
    );
  }

  return (
    <Link href={`/${isSerie ? 'tv' : 'movie'}/${media.id}`}>
      <article className='w-[150px]'>
        <div className='group'>
          <div className='w-[150px] h-[225px] relative rounded-lg overflow-hidden'>
            {!imageLoaded && <SkeletonVerticalCard />}
            <Image
              src={webpImageSrc}
              alt={`Portada de la película ${isSerieMedia(media) ? media.name : media.title}`}
              fill={true}
              onLoad={handleImageLoad}
              className='object-cover rounded-lg'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {
                token && hovered
                  ? <div className='absolute top-2 right-2 z-20' onClick={handleFavorites}>
                    <Fav width='24' height='24' color={color} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
                  </div>
                  : null
              }
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