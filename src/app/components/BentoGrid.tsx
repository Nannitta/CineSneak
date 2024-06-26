'use client';

import { Plus, RightArrow } from '@/lib/Svg';
import { MediaContent } from '@/types/types';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

interface BentoGridProps {
  movies: MediaContent[]
  isSerie: boolean
  path: string
}

const BentoGrid = ({ movies, isSerie, path }: BentoGridProps) => {
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const [color, setColor] = useState<string>('#C3C3C3');

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#C3C3C3');
  };

  return (
    <div className="max-w-[1920px] px-6 max-h-[897px]">
      <div className="grid grid-cols-top-rated gap-4 grid-rows-top-rated">
        {movies.slice(0,10).map((movie: MediaContent, index: number) => (
          <Link href={`/${isSerie ? 'tv' : 'movie'}/${movie.id}`} key={movie.id}
            className={`relative group
              ${index === 1 || index === 3 || index === 4 ? 'row-span-2'
            : (index === 5 ? 'row-span-3'
              : (index === 6 ? 'col-start-1 col-end-2 row-start-5 row-end-6'
                : (index === 7 ? 'row-start-3 row-end-6'
                  : (index === 8 ? 'row-start-4 row-end-6'
                    : (index === 9 ? 'col-start-4 col-end-6 row-start-3 row-end-6' : '')))))}`}>
            <Image
              src={movie.backdrop_path ? imgURL + movie.backdrop_path : imgURL + movie.poster_path}
              alt={`Cartel de la película ${movie.title || movie.name}`}
              fill={true}
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="overlay text-gray text-sm p-2 pl-4 rounded-b-lg">
              {movie.title || movie.name}
            </div>
            <div className='absolute inset-0 z-20 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center rounded-lg'>
              <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
                VER MÁS
                <Plus width={'14'} height={'14'} fill={'white'}/>
              </span>
            </div>
          </Link>
        ))}
        <Link href={path} className='min-w-[300px] bg-black bg-opacity-60 flex items-center justify-center rounded-lg text-sm font-bold text-gray hover:text-white gap-1 row-start-2 row-end-4 col-start-3 col-end-4'>
          <div className='flex items-center justify-center'
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              VER TODO
            <RightArrow width={'14'} height={'14'} fill={color}/>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BentoGrid;