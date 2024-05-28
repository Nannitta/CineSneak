'use client';

import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import CheckWindowWidth from '@/hooks/useWindowWidth';

export default function TopRated({ movies }: any) {
  const {screenSize} = CheckWindowWidth();

  return(
    <>
      {
        screenSize !== 'lg'
          ? <VerticalCarousel movies={movies}/>
          : null
      }
    </>
  );
};