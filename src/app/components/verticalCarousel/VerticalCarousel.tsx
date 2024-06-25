'use client';

import React, { useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './verticalCarousel.css';
import { MediaContent } from '@/types/types';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { RightArrow } from '@/lib/Svg';
import Link from 'next/link';

interface PropType {
  movies: MediaContent[]
  options?: EmblaOptionsType
  isSerie: boolean
  path: string
}

const VerticalCarousel: React.FC<PropType> = (props) => { 
  const { movies, options, isSerie, path } = props;
  const [emblaRef] = useEmblaCarousel(options);
  const [color, setColor] = useState<string>('#C3C3C3');

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#C3C3C3');
  };

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container vertical__container flex mr-4 lg:mr-6'>
          {movies.map((movie) => (
            <div className='embla__slide vertical__slide' key={movie.id}>
              <VerticalCardCarousel movie={movie} isSerie={isSerie}/>
            </div>
          ))}
          <Link href={path}>
            <div className='min-w-[150px] h-[225px] bg-black bg-opacity-60 rounded-lg flex items-center justify-center text-sm font-bold text-gray hover:text-white gap-1'
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
              VER TODO
              <RightArrow width={'14'} height={'14'} fill={color}/>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;