import Link from 'next/link';
import Image from 'next/image';
import SkeletonBentoCards from '@/components/Skeletons/SkeletonBentoCards';
import { Fav, Plus, RightArrow } from '@/lib/Svg';
import { MovieDetails, SerieDetails } from '@/types/types';
import { MouseEvent, useState } from 'react';
import { useLoginStore } from '@/store/userStore';
import { addFavorites } from 'database/favorites';

interface BentoGridProps {
  media: MovieDetails[] | SerieDetails[]
  isSerie: boolean
  path: string
}

const BentoGrid = ({ media, isSerie, path }: BentoGridProps) => {
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const [imgLoader, setImgLoader] = useState<boolean>(false);
  const { token, user } = useLoginStore(state => state);
  const [hovered, setHovered] = useState<boolean>(false);
  const [color, setColor] = useState<string>('transparent');

  const handleImgLoader = () => {
    setImgLoader(true);
  };

  const isSerieMedia = (media: MovieDetails | SerieDetails): media is SerieDetails => {
    return isSerie;
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

  const handleFavorites = (e: MouseEvent<HTMLDivElement>, mediaItem: MovieDetails | SerieDetails, webpImageSrc: string) => {
    e.preventDefault();
    if(user) {
      addFavorites(user.email, mediaItem.id, (isSerieMedia(mediaItem) ? mediaItem.name : mediaItem.title), webpImageSrc, mediaItem.ownType);
    }
  };

  return (
    <div className="max-w-[1920px] px-6 max-h-[897px]">
      <div className="grid grid-cols-top-rated gap-4 grid-rows-top-rated">
        {media.slice(0, 10).map((mediaItem, index: number) => {
          const imageSrc = `${mediaItem.backdrop_path ? imgURL + mediaItem.backdrop_path : imgURL + mediaItem.poster_path}`;
          const webpImageSrc = `/api/convertImage?url=${imageSrc}`;

          return (
            <Link
              href={`/${isSerie ? 'tv' : 'movie'}/${mediaItem.id}`}
              key={mediaItem.id}
              className={`relative group ${
                index === 1 || index === 3 || index === 4
                  ? 'row-span-2'
                  : index === 5
                    ? 'row-span-3'
                    : index === 6
                      ? 'col-start-1 col-end-2 row-start-5 row-end-6'
                      : index === 7
                        ? 'row-start-3 row-end-6'
                        : index === 8
                          ? 'row-start-4 row-end-6'
                          : index === 9
                            ? 'col-start-4 col-end-6 row-start-3 row-end-6'
                            : ''
              }`}
            >
              {!imgLoader && <SkeletonBentoCards/>}
              <Image
                src={webpImageSrc}
                alt={`Cartel de la película ${isSerieMedia(mediaItem) ? mediaItem.name : mediaItem.title}`}
                fill={true}
                className="rounded-lg object-cover"
                onLoad={handleImgLoader}
              />
              <div className="overlay text-gray text-sm p-2 pl-4 rounded-b-lg">
                {isSerieMedia(mediaItem) ? mediaItem.name : mediaItem.title}
              </div>
              <div className='absolute inset-0 z-20 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center rounded-lg' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
                  {
                    token && hovered
                      ? <div className='absolute top-2 right-2 z-20' onClick={(e) => handleFavorites(e, mediaItem, webpImageSrc)}>
                        <Fav width='24' height='24' color={color} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
                      </div>
                      : null
                  }
                  VER MÁS
                  <Plus width={'14'} height={'14'} fill={'white'}/>
                </span>
              </div>
            </Link>
          );
        })}
        <Link
          href={path}
          className='min-w-[300px] bg-black bg-opacity-60 flex items-center justify-center rounded-lg text-sm font-bold text-gray hover:text-white gap-1 row-start-2 row-end-4 col-start-3 col-end-4'
        >
          <div className='flex items-center justify-center'>
            VER TODO
            <RightArrow width={'14'} height={'14'} fill={'white'}/>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BentoGrid;