"use client"

import { useEffect } from 'react';
import { useMoviesStore } from './store/movies';
import Carousel from './components/carousel/Carousel';
import { EmblaOptionsType } from 'embla-carousel'

export default function HomePageNotLog() {
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const fetchGenres = useMoviesStore(state => state.fetchMoviesGenre);
  const moviesNowPlaying = useMoviesStore(state => state.moviesNowPlaying);  
  const genres = useMoviesStore(state => state.movieGenres);

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDES = Array.from(moviesNowPlaying)

  useEffect(() => {
    fetchMoviesNowPlaying();
    fetchGenres();
  }, []);
  
  return (
    <main className='flex-grow'>
      <Carousel slides={SLIDES} options={OPTIONS} genres={genres}/>
    </main>
  );
};
