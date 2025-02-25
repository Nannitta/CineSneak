import React, { useState } from 'react';
import Link from 'next/link';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { RightArrow } from '@/lib/Svg';
import { MovieDetails, SerieDetails } from '@/types/types';
import './verticalCarousel.css';

interface PropType {
  media: MovieDetails[] | SerieDetails[]
  options?: EmblaOptionsType
  path: string
}

const VerticalCarousel: React.FC<PropType> = (props) => { 
  const { media, options, path } = props;  
  const [emblaRef] = useEmblaCarousel(options);
  const [color, setColor] = useState<string>('#C3C3C3');

  const handleMouseEnter = () => {
    setColor('white');
  };

  const handleMouseLeave = () => {
    setColor('#C3C3C3');
  };

  const isMovieDetails = (media: any): media is MovieDetails => {
    return (media as MovieDetails).title !== undefined;
  };

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container vertical__container flex mr-4 lg:mr-6'>
          {media.map((media, index) => {
            if(isMovieDetails(media)) {
              return (
                <div className='embla__slide vertical__slide' key={media.id}>
                  <VerticalCardCarousel media={media} isSerie={false}/>
                </div>
              );
            } else {
              return (
                <div className='embla__slide vertical__slide' key={media.id}>
                  <VerticalCardCarousel media={media} isSerie={true}/>
                </div>
              );
            }
          })}
          <Link href={path}>
            <div className='min-w-[150px] h-[225px] bg-black bg-opacity-60 rounded-lg flex items-center justify-center text-sm font-bold text-gray hover:text-white gap-1'
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
              VER TODO
              <RightArrow fill={color}/>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;