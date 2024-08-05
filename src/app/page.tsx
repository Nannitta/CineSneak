'use client';

import { useEffect } from 'react';
import { useMoviesStore } from '@/store/movies';
import CarouselOnTheatres from '@/components/carouselOnTheatres/Carousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useSideMenuStore } from '@/store/sideMenu';
import WatchTrailer from '@/components/WatchTrailer';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import { useSeriesStore } from '@/store/series';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import TopRated from '@/components/TopRated';
import CheckWindowWidth from '@/hooks/useWindowWidth';

export default function HomePageNotLog() {
  const {screenSize} = CheckWindowWidth();
  const fecthUpcomingMovies = useMoviesStore(state => state.fetchUpcomingMovies);
  const upcomingMovies = useMoviesStore(state => state.upcomingMovies);
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const fetchGenres = useMoviesStore(state => state.fetchMoviesGenre);
  const fetchPopularMovies = useMoviesStore(state => state.fetchPopularMovies);
  const moviesNowPlayingStore = useMoviesStore(state => state.moviesNowPlaying);  
  const genres = useMoviesStore(state => state.movieGenres);
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
  const popularMoviesStore = useMoviesStore(state => state.popularMovies);
  const onAirSeriesStore = useSeriesStore(state => state.onAirSeries);
  const fetchOnAirSeries = useSeriesStore(state => state.fecthOnAirSeries);
  const popularSeriesStore = useSeriesStore(state => state.popularSeries);
  const fetchPopularSeries = useSeriesStore(state => state.fecthPopularSeries);
  const topRatedMoviesStore = useMoviesStore(state => state.topRatedMovies);
  const fetchTopRatedMovies = useMoviesStore(state => state.fecthTopRatedMovies);
  const topRatedSeriesStore = useSeriesStore(state => state.topRatedSeries);
  const fecthTopRatedSeries = useSeriesStore(state => state.fetchTopRatedSeries);

  const OPTIONS: EmblaOptionsType = { loop: true };
  const moviesOnTheatres = Array.from(upcomingMovies);
  const moviesNowPlaying = Array.from(moviesNowPlayingStore);
  const popularMovies = Array.from(popularMoviesStore);
  const onAirSeries = Array.from(onAirSeriesStore);
  const popularSeries = Array.from(popularSeriesStore);
  const topRatedMovies = Array.from(topRatedMoviesStore);
  const topRatedSeries = Array.from(topRatedSeriesStore);

  useEffect(() => {
    fecthUpcomingMovies();
    fetchMoviesNowPlaying(1);
    fetchGenres();
    fetchPopularMovies(1);
    fetchOnAirSeries(1);
    fetchPopularSeries(1);
    fetchTopRatedMovies(1);
    fecthTopRatedSeries(1);
  }, [fecthTopRatedSeries, fecthUpcomingMovies, fetchGenres, fetchMoviesNowPlaying, fetchOnAirSeries, fetchPopularMovies, fetchPopularSeries, fetchTopRatedMovies]);
  
  return (
    <main className='flex-grow flex flex-col relative' onClick={closeSideMenu}>
      <WatchTrailer/>
      <CarouselOnTheatres moviesOnTheatres={moviesOnTheatres} options={OPTIONS} genres={genres} isSerie={false}/>
      <section>
        <h2 className='font-bold p-4 text-lg md:text-xl md:pt-[30px] md:pb-5 lg:text-2xl lg:pt-9 lg:pb-6 lg:px-6'>
          Éxitos en taquilla ¡No te los pierdas!
        </h2>
        <VerticalCarousel movies={moviesNowPlaying} isSerie={false} path={'/exitos-taquilla'}/>
      </section>
      <section className='flex flex-col md:flex-row md:items-center md:gap-2 md:pt-[30px] lg:pt-14 lg:gap-20'>
        <h2 className='font-bold py-4 pl-4 text-lg md:text-xl md:pt-0 md:pb-0 md:min-w-44 md:text-balance lg:text-2xl lg:px-6 lg:min-w-56'>
          Descubre que películas son tendencia
        </h2>
        <HorizontalCarousel movies={popularMovies} isSerie={false} path={'/peliculas-en-tendencia'}/>
      </section>
      <section className={screenSize === 'lg' ? 'mb-14' : ''}>
        <h2 className='font-bold p-4 text-lg md:text-xl md:pt-[30px] md:pb-5 lg:text-2xl lg:pt-9 lg:pb-6 lg:px-6'>
          Lo más votado
        </h2>
        <TopRated movies={topRatedMovies} isSerie={false} path={'/top-peliculas'}/>
      </section>
      <section>
        <h2 className='font-bold py-4 pl-4 text-lg md:text-xl md:pt-[30px] md:pb-5 lg:text-2xl lg:pt-9 lg:pb-6 lg:px-6 text-balance'>
          No te pierdas los últimos estrenos en series
        </h2>
        <VerticalCarousel movies={onAirSeries} isSerie={true} path={'/estrenos-series'}/>
      </section>
      <section className='flex flex-col md:flex-row md:items-center md:gap-2 md:pt-[30px] lg:pt-14 lg:gap-20'>
        <h2 className='font-bold py-4 pl-4 text-lg md:text-xl md:pt-0 md:pb-0 md:min-w-44 md:text-balance lg:text-2xl lg:px-6 lg:min-w-56'>
          Series que están en boca de todos
        </h2>
        <HorizontalCarousel movies={popularSeries} isSerie={true} path={'/series-en-tendencia'}/>
      </section>
      <section className={screenSize === 'lg' ? 'mb-14' : 'mb-4'}>
        <h2 className='font-bold p-4 text-lg md:text-xl md:pt-[30px] md:pb-5 lg:text-2xl lg:pt-9 lg:pb-6 lg:px-6'>
          Series aclamadas por la crítica
        </h2>
        <TopRated movies={topRatedSeries} isSerie={true} path={'/top-series'}/>
      </section>
    </main>
  );
};
