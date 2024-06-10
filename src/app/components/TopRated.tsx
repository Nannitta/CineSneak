'use client';

import BentoGrid from '@/components/BentoGrid';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { MediaContent } from '@/types/types';

interface TopRatedProps {
  movies: MediaContent[]
  isSerie: boolean
}

export default function TopRated({ movies, isSerie }: TopRatedProps) {
  const {screenSize} = CheckWindowWidth();

  return(
    <>
      {
        screenSize !== 'lg'
          ? <VerticalCarousel movies={movies} isSerie={isSerie}/>
          : <BentoGrid movies={movies} isSerie={isSerie}/>
      }
    </>
  );
};