'use client';

import React, { useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './horizontalCarousel.css';
import { MovieDetails, SerieDetails } from '@/types/types';
import HorizontalCardCarousel from './HorizontalCardMovie';
import { RightArrow } from '@/lib/Svg';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Link from 'next/link';

interface PropType {
  media: MovieDetails[] | SerieDetails[]
  options?: EmblaOptionsType
  isSerie: boolean
  path?: string
}

const HorizontalCarousel: React.FC<PropType> = (props) => { 
  const { media, options, isSerie, path } = props;
  const [emblaRef] = useEmblaCarousel(options);
  const [color, setColor] = useState<string>('#C3C3C3');
  const params = useParams<Params>(); 

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
          {media.filter((media) => media.poster_path !== null).map((media) => (
            <div className='embla__slide horizontal__slide' key={media.id}>
              <HorizontalCardCarousel media={media} isSerie={isSerie}/>
            </div>
          ))}
          { !params.id && path &&
              <Link href={path}>
                <div className='min-w-[300px] h-[168px] bg-black bg-opacity-60 rounded-lg flex items-center justify-center text-sm font-bold text-gray hover:text-white gap-1'
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                  VER TODO
                  <RightArrow width={'14'} height={'14'} fill={color}/>
                </div>
              </Link>
          }
        </div>
      </div>
    </section>
  );
};

export default HorizontalCarousel;