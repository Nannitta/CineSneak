"use client"

import { useEffect } from 'react';
import { useMoviesStore } from './store/movies';
import CarouselOnTheatres from './components/carouselOnTheatres/Carousel';
import { EmblaOptionsType } from 'embla-carousel'
import { useSideMenuStore } from './store/sideMenu';
import WatchTrailer from './components/WatchTrailer';
import VerticalCarousel from './components/verticalCarousel/VerticalCarousel';
import { useSeriesStore } from './store/series';
import HorizontalCarousel from './components/horizontalCarousel/HorizontalCarousel';

export default function HomePageNotLog() {
  const fecthUpcomingMovies = useMoviesStore(state => state.fetchUpcomingMovies);
  const upcomingMovies = useMoviesStore(state => state.upcomingMovies);
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const fetchGenres = useMoviesStore(state => state.fetchMoviesGenre);
  const fetchPopularMovies = useMoviesStore(state => state.fetchPopularMovies);
  const moviesNowPlayingStore = useMoviesStore(state => state.moviesNowPlaying);  
  const genres = useMoviesStore(state => state.movieGenres);
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
  const popularMoviesStore = useMoviesStore(state => state.popularMovies);
  const popularSeriesStore = useSeriesStore(state => state.popularSeries);
  const fetchPopularSeries = useSeriesStore(state => state.fetchPopularSeries);

  const OPTIONS: EmblaOptionsType = { loop: true }
  const moviesOnTheatres = Array.from(upcomingMovies)
  const moviesNowPlaying = Array.from(moviesNowPlayingStore)
  const popularMovies = Array.from(popularMoviesStore)
  const popularSeries = Array.from(popularSeriesStore)

  useEffect(() => {
    fecthUpcomingMovies()
    fetchMoviesNowPlaying();
    fetchGenres();
    fetchPopularMovies();
    fetchPopularSeries();
  }, []);
  
  return (
    <main className='flex-grow flex flex-col relative' onClick={closeSideMenu}>
      <WatchTrailer/>
      <CarouselOnTheatres moviesOnTheatres={moviesOnTheatres} options={OPTIONS} genres={genres}/>
      <section>
        <h2 className='font-black p-4 text-lg md:text-xl md:pt-[30px] md:pb-5 lg:text-2xl lg:pt-9 lg:pb-6 lg:px-6'>
          Éxitos en taquilla ¡No te los pierdas!
        </h2>
        <VerticalCarousel movies={moviesNowPlaying}/>
      </section>
      <section className='flex flex-col md:flex-row md:items-center md:gap-2 md:pt-[30px] lg:pt-14 lg:gap-20'>
        <h2 className='font-black py-4 pl-4 text-lg md:text-xl md:pt-0 md:pb-0 md:min-w-44 md:text-balance lg:text-2xl lg:px-6 lg:min-w-56'>
          Descubre que películas son tendencia
        </h2>
        <HorizontalCarousel movies={popularMovies} />
      </section>
      <section>
        <h2 className='font-black py-4 pl-4 text-lg md:text-xl md:pt-[30px] md:pb-5 lg:text-2xl lg:pt-9 lg:pb-6 lg:px-6 text-balance'>
          No te pierdas los últimos estrenos en series
        </h2>
        <VerticalCarousel movies={popularSeries}/>
      </section>
    </main>
  );
};
