'use client';

import BentoGrid from '@/components/BentoGrid';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { MovieDetails, SerieDetails } from '@/types/types';

interface TopRatedProps {
  media: MovieDetails[] | SerieDetails[]
  isSerie: boolean
  path: string
}

export default function TopRated({ media, isSerie, path }: TopRatedProps) {
  const {screenSize} = CheckWindowWidth();

  return(
    <>
      {
        screenSize !== 'lg'
          ? <VerticalCarousel media={media} isSerie={isSerie} path={path}/>
          : <BentoGrid media={media} isSerie={isSerie} path={path}/>
      }
    </>
  );
};