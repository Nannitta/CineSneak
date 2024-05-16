"use client"

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "./carousel.css"
import { DotButton, useDotButton } from './DotButtons'
import { Genre, MoviesNowPalying } from '@/app/types/types'
import PrimaryButton from "../PrimaryButton"
import { Play, Calendar } from '@/app/lib/Svg'
import { formatDate } from '@/app/lib/formatDate'
import CheckWindowWidth from '@/app/hooks/useWindowWidth'
import { League_Spartan } from "next/font/google";

type PropType = {
  slides: MoviesNowPalying[]
  options?: EmblaOptionsType
  genres: Genre[]
}
const league = League_Spartan({ subsets: ["latin"] });

const Carousel: React.FC<PropType> = (props) => {
  const {screenSize} = CheckWindowWidth();
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  
  const { slides, options, genres } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 8000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  function getGenreNames(ids: number[]) {
    return ids.map(id => {
      const genre = genres.find(genre => genre.id === id);
      if (genre) {
        return <p key={genre.id}>{genre.name}</p>;
      }
      return null;
    }).filter(Boolean).slice(0,2);
  }

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((movie) => (
            <div className="embla__slide" key={movie.id}>
              <article className="embla__slide__number w-full h-60 bg-cover bg-no-repeat" style={{backgroundImage: `url('${imgURL + movie.backdrop_path}')`}}>
                <h2 className={`uppercase text-sm font-black ${league.className}`}>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>
                  <Calendar 
                    width={screenSize === "sm" ? "8" : (screenSize === "md" ? "12" : "15")} 
                    height={screenSize === "sm" ? "8" : (screenSize === "md" ? "12" : "15")}
                  />
                  <span>{formatDate(movie.release_date)}</span></p>
                <div>
                  {
                    getGenreNames(movie.genre_ids)
                  }
                </div>
                <PrimaryButton 
                  text={"Ver tráiler"} 
                  img={<Play/>}
                  title={"Ver tráiler"}
                />
              </article>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__dots">
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
  )
}

export default Carousel