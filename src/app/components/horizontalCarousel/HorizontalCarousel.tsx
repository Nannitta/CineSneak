'use client';

import React, { useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './horizontalCarousel.css';
import { MediaContent } from '@/types/types';
import HorizontalCardCarousel from './HorizontalCardMovie';
import { RightArrow } from '@/lib/Svg';

type PropType = {
  movies: MediaContent[]
  options?: EmblaOptionsType
}

const HorizontalCarousel: React.FC<PropType> = (props) => { 
  const { movies, options } = props;
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
        <div className='embla__container horizontal__container mr-4 lg:mr-6'>
          {movies.map((movie) => (
            <div className='embla__slide horizontal__slide' key={movie.id}>
              <HorizontalCardCarousel movie={movie}/>
            </div>
          ))}
          <div className='min-w-[300px] h-[168px] bg-black bg-opacity-60 rounded-lg flex items-center justify-center text-sm font-bold text-gray hover:text-white gap-1'
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          >
            VER TODO
            <RightArrow width={'14'} height={'14'} fill={color}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalCarousel;