'use client';

import BentoGrid from '@/components/BentoGrid';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { MediaContent, MovieDetails, SerieDetails } from '@/types/types';

interface TopRatedProps {
  movies: MovieDetails[] | SerieDetails[]
  isSerie: boolean
  path: string
}

export default function TopRated({ movies, isSerie, path }: TopRatedProps) {
  const {screenSize} = CheckWindowWidth();

  return(
    <>
      {
        screenSize !== 'lg'
          ? <VerticalCarousel media={movies} isSerie={isSerie} path={path}/>
          : <BentoGrid media={movies} isSerie={isSerie} path={path}/>
      }
    </>
  );
};