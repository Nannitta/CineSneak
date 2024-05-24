"use client"

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import "./verticalCarousel.css"
import { MoviesNowPalying } from '@/app/types/types'
import VerticalCardCarousel from './VerticalCardMovie'

type PropType = {
  movies: MoviesNowPalying[]
  options?: EmblaOptionsType
}

const VerticalCarousel: React.FC<PropType> = (props) => { 
  const { movies, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container vertical__container">
          {movies.map((movie) => (
            <div className="embla__slide vertical__slide" key={movie.id}>
              <VerticalCardCarousel movie={movie}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VerticalCarousel