'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EmblaOptionsType } from 'embla-carousel';
import { useMoviesStore } from '@/store/movies';
import { useSideMenuStore } from '@/store/sideMenu';
import { useSearchMenuStore } from '@/store/searchMenu';
import { useSeriesStore } from '@/store/series';
import MainCarousel from '@/components/mainCarousel/MainCarousel';
import WatchTrailer from '@/components/WatchTrailer';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import TopRated from '@/components/TopRated';
import ErrorPage from '@/components/ErrorPage';

const HomePageNotLog = () => {
  const { 
    upcomingMovies, 
    fetchUpcomingMovies, 
    moviesNowPlaying, 
    fetchMoviesNowPlaying, 
    movieGenres, 
    fetchMoviesGenre, 
    popularMovies,
    fetchPopularMovies, 
    topRatedMovies,
    fetchTopRatedMovies ,
    genericError: moviesStoreError
  } = useMoviesStore(state => state);

  const { 
    onAirSeries,
    fetchOnAirSeries,
    popularSeries,
    fetchPopularSeries, 
    topRatedSeries,
    fetchTopRatedSeries,
    genericError: seriesStoreError 
  } = useSeriesStore(state => state);
  
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
  const closeSearchMenu = useSearchMenuStore(state => state.closeSearchMenu);
  const [loading, setLoading] = useState<boolean>(true);

  const closeMenu = () => {
    closeSideMenu();
    closeSearchMenu();
  };

  const OPTIONS: EmblaOptionsType = { loop: true };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUpcomingMovies();
      await fetchMoviesNowPlaying(1);
      await fetchMoviesGenre(false);
      await fetchPopularMovies(1);
      await fetchOnAirSeries(1);
      await fetchPopularSeries(1);
      await fetchTopRatedMovies(1);
      await fetchTopRatedSeries(1);
      setLoading(false);
    };

    fetchData();
  }, [fetchUpcomingMovies, fetchMoviesNowPlaying, fetchMoviesGenre, fetchPopularMovies, fetchOnAirSeries, fetchPopularSeries, fetchTopRatedMovies, fetchTopRatedSeries]);
  
  if (moviesStoreError || seriesStoreError) {
    return (
      <ErrorPage/>
    );
  }

  return (
    <main className='flex-grow flex flex-col relative' onClick={closeMenu}>
      <WatchTrailer isSerie={false} />
      <MainCarousel media={upcomingMovies} options={OPTIONS} genres={movieGenres} isSerie={false}/>
      <section>
        <div className='flex flex-col p-4 items-baseline md:flex-row md:gap-4 md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6'>
          <h2 className='font-bold text-lg md:text-xl lg:text-2xl'>
            Éxitos en taquilla ¡No te los pierdas!
          </h2>
          <Link href={'/exitos-taquilla'} className='flex items-baseline text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <VerticalCarousel media={moviesNowPlaying} path={'/exitos-taquilla'} loading={loading}/>
      </section>
      <section className='flex flex-col md:flex-row md:items-center md:gap-2 md:pt-[30px] lg:pt-14'>
        <div className='flex flex-col py-4 pl-4 items-baseline md:py-0 md:gap-2 lg:px-6'>
          <h2 className='font-bold text-lg md:text-xl md:min-w-44 md:text-balance lg:text-2xl lg:min-w-56'>
            Descubre que películas son tendencia
          </h2>
          <Link href={'/peliculas-en-tendencia'} className='flex items-center text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <HorizontalCarousel media={popularMovies} isSerie={false} path={'/peliculas-en-tendencia'} loading={loading}/>
      </section>
      <section className='mb-4 lg:mb-9'>
        <div className='flex flex-col p-4 items-baseline md:gap-4 md:flex-row md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6'>
          <h2 className='font-bold text-lg md:text-xl lg:text-2xl'>
            Lo más votado
          </h2>
          <Link href={'/top-peliculas'} className='flex items-center text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <TopRated media={topRatedMovies} isSerie={false} path={'/top-peliculas'}/>
      </section>
      <section>
        <div className='flex flex-col py-4 pl-4 items-baseline md:flex-row md:gap-4 md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6'>
          <h2 className='font-bold text-lg text-balance md:text-xl lg:text-2xl'>
            No te pierdas los últimos estrenos en series
          </h2>
          <Link href={'/estrenos-series'} className='flex items-center text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <VerticalCarousel media={onAirSeries} path={'/estrenos-series'} loading={loading}/>
      </section>
      <section className='flex flex-col md:flex-row md:items-center md:gap-2 md:pt-[30px] lg:pt-14'>
        <div className='flex flex-col py-4 pl-4 md:py-0 md:gap-2 lg:px-6'>
          <h2 className='font-bold text-lg md:text-xl md:min-w-44 md:text-balance lg:text-2xl lg:min-w-56'>
            Series que están en boca de todos
          </h2>
          <Link href={'/series-en-tendencia'} className='flex items-center text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <HorizontalCarousel media={popularSeries} isSerie={true} path={'/series-en-tendencia'} loading={loading}/>
      </section>
      <section className='mb-4 lg:mb-14'>
        <div className='flex flex-col p-4 items-baseline md:flex-row md:gap-4 md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6'>
          <h2 className='font-bold text-lg md:text-xl lg:text-2xl'>
            Series aclamadas por la crítica
          </h2>
          <Link href={'/top-series'} className='flex items-center text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <TopRated media={topRatedSeries} isSerie={true} path={'/top-series'}/>
      </section>
    </main>
  );
};

export default HomePageNotLog;