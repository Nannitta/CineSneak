'use client';

import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { EmblaOptionsType } from 'embla-carousel';
import { useMediaDetailsStore } from '@/store/mediaDetails';
import { useSeriesStore } from '@/store/series';
import { useSeriesByGenreId } from '@/store/seriesByGenreId';
import WatchTrailer from '@/components/WatchTrailer';
import MainCarousel from '@/components/mainCarousel/MainCarousel';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import ListGenres from '@/components/ListGenres';
import { formatEpisodeNumber } from '@/lib/format';
import { SerieDetails } from '@/types/types';

const league = League_Spartan({ subsets: ['latin'] });

const Series = () => {
  const { 
    seriesOfTheDay, 
    fetchSeriesOfTheDay, 
    serieGenres, 
    fetchSerieGenre,
    fetchAiringToday,
    airingToday,
    topRatedSeries,
    fetchTopRatedSeries,
    recommendedSerie,
    getRecommendedSerie 
  } = useSeriesStore(state => state);

  const {
    seriesByGenre,
    fetchSeriesByGenreId
  } = useSeriesByGenreId(state => state);

  const {
    mediaDetails,
    fetchMediaDetails
  } = useMediaDetailsStore(state => state);

  const OPTIONS: EmblaOptionsType = { loop: true };

  const [selectedGenreId, setSelectedGenreId] = useState<number>(10759);
  const [selectedGenreName, setSelectedGenreName] = useState<string>('Action & Adventure');
  const [serieDetails, setSerieDetails] = useState<SerieDetails | null>(null);

  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  const handleGenreClick = (id: number, name: string) => {
    setSelectedGenreId(id);
    setSelectedGenreName(name);
    fetchSeriesByGenreId(id, 1);
  };
  
  useEffect(() => {
    fetchSeriesOfTheDay();
    fetchSerieGenre(true);
    fetchAiringToday(1);
    fetchSeriesByGenreId(10759, 1);
    fetchTopRatedSeries(1);
  }, [fetchSeriesOfTheDay, fetchSerieGenre, fetchAiringToday, fetchSeriesByGenreId, fetchTopRatedSeries]);  
 
  useEffect(() => {
    if (topRatedSeries.length > 0) {
      getRecommendedSerie(topRatedSeries);
    }
  }, [topRatedSeries, getRecommendedSerie]);
  
  useEffect(() => {
    if(recommendedSerie) {
      fetchMediaDetails(recommendedSerie.id, true);
    }
  }, [recommendedSerie, fetchMediaDetails]);

  useEffect(() => {
    if (mediaDetails) {
      setSerieDetails(mediaDetails as SerieDetails);
    }
  }, [mediaDetails]);

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
          media={airingToday}
          isSerie={true}
          path={'/estrenos-series'}
        />
      </section>
      <section>
        <h2 className="font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl">
					Historias únicas en cada género
        </h2>
        <ListGenres handleGenreClick={handleGenreClick} listGenres={serieGenres} selectedGenreId={selectedGenreId}/>
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
      <section>
        <h2 className="font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl">
            La joya del día: ¡Descubre una de las series mejor valoradas!
        </h2>
        <Link href={`tv/${recommendedSerie?.id}`}>
          {
            recommendedSerie && serieDetails &&
              <div className='relative w-full h-[31rem] flex flex-col justify-between md:h-[500px] lg:h-[556px] bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url('${recommendedSerie.backdrop_path ? imgURL + recommendedSerie.backdrop_path : imgURL + recommendedSerie.poster_path}')` }}>
                <div>
                  <div className='absolute inset-0 bg-black bg-opacity-70'></div>
                  <h3 className={`relative z-[1] uppercase font-black ${league.className} px-4 mt-8 mb-4 text-2xl md:w-[85%] lg:mt-20 lg:text-4xl lg:px-6 lg:w-[60%]`}>{recommendedSerie.name}</h3>
                  <h4 className='relative z-[1] px-4 text-gray text-xs mb-2 md:text-sm lg:px-6'>{serieDetails.number_of_seasons} temporadas · {serieDetails.number_of_episodes} capítulos</h4>
                  <p className='relative z-[1] px-4 mb-4 lg:px-6 text-sm font-normal text-gray text-balance line-clamp-6 md:w-[85%] lg:text-wrap md:text-base lg:w-[60%]'>{recommendedSerie.overview}</p>
                  <h4 className='px-4 relative z-[1] text-sm pb-2 lg:px-6 lg:text-lg'>Último capítulo</h4>
                  <div className='min-w-[300px] max-w-[300px] h-[169px] relative mx-4 lg:mx-6'>
                    <div className='w-full h-[169px] absolute z-10 bg-gradient-to-t from-black to-transparent rounded-lg flex gap-2 items-end pb-2 pl-2 text-sm text-gray'>
                      <h5>{serieDetails.last_episode_to_air?.season_number}x{formatEpisodeNumber(serieDetails.last_episode_to_air?.episode_number)}</h5>
                      <h5 className='line-clamp-1'>{serieDetails.last_episode_to_air?.name}</h5>
                    </div>
                    <Image
                      src={`${serieDetails.last_episode_to_air?.still_path ? imgURL + serieDetails.last_episode_to_air.still_path : (serieDetails.backdrop_path ? imgURL + serieDetails.backdrop_path : imgURL + serieDetails.poster_path)}`}
                      alt={`Portada del episodio ${serieDetails.last_episode_to_air?.name}`}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className='object-cover rounded-lg'
                      priority
                    />
                  </div>
                </div>
              </div>
          }
        </Link>
      </section>
    </main>
  );
};

export default Series;