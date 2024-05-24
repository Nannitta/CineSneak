"use client"

import { useEffect } from 'react';
import { useMoviesStore } from './store/movies';
import CarouselOnTheatres from './components/carouselOnTheatres/Carousel';
import { EmblaOptionsType } from 'embla-carousel'
import { useSideMenuStore } from './store/sideMenu';
import WatchTrailer from './components/WatchTrailer';
import VerticalCarousel from './components/verticalCarousel/VerticalCarousel';

export default function HomePageNotLog() {
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const fetchGenres = useMoviesStore(state => state.fetchMoviesGenre);
  const fetchPopularMovies = useMoviesStore(state => state.fetchPopularMovies);
  const moviesNowPlaying = useMoviesStore(state => state.moviesNowPlaying);  
  const genres = useMoviesStore(state => state.movieGenres);
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);
  const popularMoviesStore = useMoviesStore(state => state.popularMovies);

  const OPTIONS: EmblaOptionsType = { loop: true }
  const moviesOnTheatres = Array.from(moviesNowPlaying)
  const popularMovies = Array.from(popularMoviesStore)

  useEffect(() => {
    fetchMoviesNowPlaying();
    fetchGenres();
    fetchPopularMovies();
  }, []);
  
  return (
    <main className='flex-grow flex flex-col relative' onClick={closeSideMenu}>
      <WatchTrailer/>
      <CarouselOnTheatres moviesOnTheatres={moviesOnTheatres} options={OPTIONS} genres={genres}/>
      <h2 className='font-black text-xs py-4 px-4 md:text-xl md:pt-[30px] md:px-4 lg:text-2xl lg:pt-9 lg:px-6'>
        Éxitos en taquilla ¡No te los pierdas!
      </h2>
      <VerticalCarousel movies={popularMovies}/>
    </main>
  );
};
