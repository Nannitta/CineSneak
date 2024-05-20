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
import Tag from '../Tag'

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
        return <Tag key={genre.id} text={genre.name}/>;
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
              <article className={`embla__slide__number w-full h-60 md:h-[420px] lg:h-[556px] bg-cover bg-no-repeat bg-center relative ${screenSize === "sm" ? "px-2 pb-4" : "px-4 pb-8"}`} style={{backgroundImage: `url('${imgURL + movie.backdrop_path}')`}}>
                <div className="overlay">
                <h2 className={`uppercase text-sm font-black ${league.className} md:text-2xl`}>{movie.title}</h2>
                <p className='text-[10px] font-normal text-gray text-balance md:w-3/4 lg:text-wrap md:text-sm'>{movie.overview}</p>
                <p className='flex gap-1 place-items-center self-end md:self-start py-2 md:pt-2 md:pb-4'>
                  <Calendar 
                    width={screenSize === "sm" ? "8" : (screenSize === "md" ? "12" : "15")} 
                    height={screenSize === "sm" ? "8" : (screenSize === "md" ? "12" : "15")}
                  />
                  <span className='text-gray font-light'>{formatDate(movie.release_date)}</span></p>
                {screenSize && screenSize === "sm"
                  ? <div className='flex items-baseline relative w-full justify-between'>
                      <PrimaryButton 
                        text={"Ver tráiler"} 
                        img={
                          <Play 
                            width={screenSize === "sm" ? "12" : "16"}
                            height={screenSize === "sm" ? "12" : "16"}
                            fill={"white"}
                          />
                        }
                        title={"Ver tráiler"}
                      />
                      <div className={`flex ${screenSize === "sm" ? "gap-2" : "gap-4"}`}>
                        {
                          getGenreNames(movie.genre_ids)
                        }
                      </div>
                    </div>
                  : <>
                  <div className={`flex ${screenSize === "sm" ? "gap-2" : "gap-4"}`}>
                    {
                      getGenreNames(movie.genre_ids)
                    }
                  </div>
                  <PrimaryButton 
                    text={"Ver tráiler"} 
                    img={
                      <Play 
                        width={screenSize === "sm" ? "12" : "16"}
                        height={screenSize === "sm" ? "12" : "16"}
                        fill={"white"}
                      />
                    }
                    title={"Ver tráiler"}
                  />
                  </>
                }
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      {screenSize && screenSize !== "sm"
        ? <div className="embla__controls">
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
        : null
      }
    </section>
  )
}

export default Carousel