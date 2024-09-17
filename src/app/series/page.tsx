'use client';

import WatchTrailer from '@/components/WatchTrailer';
import MainCarousel from '@/components/mainCarousel/MainCarousel';
import { useSeriesStore } from '@/store/series';
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect } from 'react';

export default function Series() {
  const { seriesOfTheDay, fetchSeriesOfTheDay, serieGenres, fetchSerieGenre } = useSeriesStore(state => state);

  const OPTIONS: EmblaOptionsType = { loop: true };
  
  useEffect(() => {
    fetchSeriesOfTheDay();
    fetchSerieGenre(true);
  }, [fetchSeriesOfTheDay, fetchSerieGenre]);

  return(
    <main className="flex flex-col flex-grow">
      <WatchTrailer isSerie={true}/>
      <MainCarousel
        media={seriesOfTheDay}
        options={OPTIONS}
        genres={serieGenres}
        isSerie={true}
      />
    </main>
  );
}