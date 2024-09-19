'use client';

import WatchTrailer from '@/components/WatchTrailer';
import MainCarousel from '@/components/mainCarousel/MainCarousel';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import { useSeriesStore } from '@/store/series';
import { useSeriesByGenreId } from '@/store/seriesByGenreId';
import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Series() {
  const { 
    seriesOfTheDay, 
    fetchSeriesOfTheDay, 
    serieGenres, 
    fetchSerieGenre,
    fetchOnAirSeries,
    onAirSeries 
  } = useSeriesStore(state => state);

  const {
    seriesByGenre,
    fetchSeriesByGenreId
  } = useSeriesByGenreId(state => state);

  const OPTIONS: EmblaOptionsType = { loop: true };

  const [selectedGenreId, setSelectedGenreId] = useState<number>(10759);
  const [selectedGenreName, setSelectedGenreName] = useState<string>('Action & Adventure');

  const handleGenreClick = (id: number, name: string) => {
    setSelectedGenreId(id);
    setSelectedGenreName(name);
    fetchSeriesByGenreId(id, 1);
  };
  
  useEffect(() => {
    fetchSeriesOfTheDay();
    fetchSerieGenre(true);
    fetchOnAirSeries(1);
    fetchSeriesByGenreId(10759, 1);
  }, [fetchSeriesOfTheDay, fetchSerieGenre, fetchOnAirSeries, fetchSeriesByGenreId]);

  return(
    <main className="flex flex-col flex-grow">
      <WatchTrailer isSerie={true}/>
      <MainCarousel
        media={seriesOfTheDay}
        options={OPTIONS}
        genres={serieGenres}
        isSerie={true}
      />
      <section>
        <div className="flex flex-col p-4 md:flex-row md:gap-4 md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 items-baseline">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
						¡No te lo pierdas! Se estrenan hoy
          </h2>
          <Link
            href={'/estrenos-series'}
            className="flex items-baseline text-sm text-gray hover:text-neonBlue"
          >
						Ver todo
          </Link>
        </div>
        <VerticalCarousel
          media={onAirSeries}
          isSerie={true}
          path={'/estrenos-series'}
        />
      </section>
      <section>
        <h2 className="font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl">
					Historias únicas en cada género
        </h2>
        <ul className="flex flex-wrap gap-4 px-4 *:flex *:items-center *:flex-none *:px-4 *:py-2 *:rounded-3xl *:border-2 *:border-white *:cursor-pointer lg:px-6 lg:flex-wrap">
          {serieGenres.map((genre) => {
            const isSelected = genre.id === selectedGenreId;
            return (
              <li
                key={genre.id}
                className={`cursor-pointer px-4 py-2 rounded-3xl border-2 border-white ${
                  isSelected
                    ? 'bg-white text-black'
                    : 'hover:bg-white hover:text-black'
                }`}
                onClick={() => handleGenreClick(genre.id, genre.name)}
              >
                {genre.name}
              </li>
            );
          })}
        </ul>
        <div className="py-5">
          {selectedGenreId && (
            <VerticalCarousel
              media={seriesByGenre}
              isSerie={true}
              path={`/series/${selectedGenreId}/${selectedGenreName}`}
            />
          )}
        </div>
      </section>
    </main>
  );
}