"use client"

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "./carousel.css"
import { DotButton, useDotButton } from './DotButtons'
import { Genre, MoviesNowPalying } from '@/app/types/types'
import CardMovieOnTheatres from './CardMovieOnTheatres'
import { useMoviesStore } from '@/app/store/movies'
import CheckWindowWidth from '@/app/hooks/useWindowWidth'
import { InPicture } from '@/app/lib/Svg'
import { useInPictureModeStore } from '@/app/store/inPictureMode'

type PropType = {
  slides: MoviesNowPalying[]
  options?: EmblaOptionsType
  genres: Genre[]
}

const CarouselOnTheatres: React.FC<PropType> = (props) => { 
  const { slides, options, genres } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 8000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const movieTrailer = useMoviesStore(state => state.movieTrailer);
  const minimizePictureMode = useInPictureModeStore(state => state.minimizePictureMode);
  const isMinimize = useInPictureModeStore(state => state.isMinimize);
  const isInPictureMode = useInPictureModeStore(state => state.isInPictureMode);
  const {screenSize} = CheckWindowWidth();

  return (
    <>
      <div className={`${movieTrailer === "" || isInPictureMode === false ? "hidden" : (isMinimize ? "flex absolute bottom-0 right-0 z-40" : "w-full h-full flex absolute z-30 bg-black bg-opacity-80")}`} onClick={minimizePictureMode}>
        <div className="min-w-[360px] max-w-[800px] w-full">
          <iframe
            id="youtube-iframe"
            width={"100%"}
            height={screenSize === "sm" ? "384px" : (screenSize === "md" ? "420px" : "556px")}
            src={`https://www.youtube.com/embed/${movieTrailer}?enablejsapi=1&autoplay=1`}
            encrypted-media={"true"}
            allowFullScreen
          >
          </iframe>
        </div>
      </div>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
          {slides.map((movie) => (
            <div className="embla__slide" key={movie.id}>
            <CardMovieOnTheatres movie={movie} genres={genres}/>
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
    </>
  )
}

export default CarouselOnTheatres