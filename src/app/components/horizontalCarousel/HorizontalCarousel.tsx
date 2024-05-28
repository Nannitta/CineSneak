'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './horizontalCarousel.css';
import { MoviesNowPalying } from '@/types/types';
import HorizontalCardCarousel from './HorizontalCardMovie';

type PropType = {
  movies: MoviesNowPalying[]
  options?: EmblaOptionsType
}

const HorizontalCarousel: React.FC<PropType> = (props) => { 
  const { movies, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container horizontal__container'>
          {movies.map((movie) => (
            <div className='embla__slide horizontal__slide' key={movie.id}>
              <HorizontalCardCarousel movie={movie}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalCarousel;