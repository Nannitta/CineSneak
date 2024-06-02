'use client';

import BentoGrid from '@/components/BentoGrid';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import CheckWindowWidth from '@/hooks/useWindowWidth';

export default function TopRated({ movies, isSerie }: any) {
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