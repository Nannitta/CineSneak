'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './carousel.css';
import { DotButton, useDotButton } from '@/components/carouselOnTheatres/DotButtons';
import { Genre, MediaContent } from '@/types/types';
import CardMovieOnTheatres from '@/components/carouselOnTheatres/CardMovieOnTheatres';

interface PropType {
  moviesOnTheatres: MediaContent[]
  options?: EmblaOptionsType
  genres: Genre[]
  isSerie: boolean
}

const CarouselOnTheatres: React.FC<PropType> = (props) => { 
  const { moviesOnTheatres, options, genres, isSerie } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 8000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {moviesOnTheatres.map((movie) => (
            <div className='embla__slide' key={movie.id}>
              <CardMovieOnTheatres movie={movie} genres={genres} isSerie={isSerie}/>
            </div>
          ))}
        </div>
      </div>
      <div className='embla__controls'>
        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselOnTheatres;