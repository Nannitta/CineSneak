"use client"

import { useEffect } from 'react';
import { useMoviesStore } from './store/movies';
import CarouselOnTheatres from './components/carouselOnTheatres/Carousel';
import { EmblaOptionsType } from 'embla-carousel'
import { useSideMenuStore } from './store/sideMenu';

export default function HomePageNotLog() {
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const fetchGenres = useMoviesStore(state => state.fetchMoviesGenre);
  const moviesNowPlaying = useMoviesStore(state => state.moviesNowPlaying);  
  const genres = useMoviesStore(state => state.movieGenres);
  const closeSideMenu = useSideMenuStore(state => state.closeSideMenu);

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDES = Array.from(moviesNowPlaying)

  useEffect(() => {
    fetchMoviesNowPlaying();
    fetchGenres();
  }, []);
  
  return (
    <main className='flex-grow' onClick={closeSideMenu}>
      <CarouselOnTheatres slides={SLIDES} options={OPTIONS} genres={genres}/>
      <h2 className='font-black text-xs pt-4 px-2 md:text-xl md:pt-[30px] md:px-4 lg:text-2xl lg:pt-9 lg:px-6'>Éxitos en taquilla ¡No te los pierdas!</h2>
    </main>
  );
};
