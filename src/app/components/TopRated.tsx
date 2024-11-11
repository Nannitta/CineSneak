'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import BentoGrid from '@/components/BentoGrid';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import { MovieDetails, SerieDetails } from '@/types/types';

interface TopRatedProps {
  media: MovieDetails[] | SerieDetails[]
  isSerie: boolean
  path: string
}

const TopRated = ({ media, isSerie, path }: TopRatedProps) => {
  const {screenSize} = CheckWindowWidth();

  return(
    <>
      {
        screenSize !== 'lg'
          ? <VerticalCarousel media={media} path={path}/>
          : <BentoGrid media={media} isSerie={isSerie} path={path}/>
      }
    </>
  );
};

export default TopRated;