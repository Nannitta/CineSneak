'use client';

import CarouselOnTheatres from '@/components/carouselOnTheatres/Carousel';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import WatchTrailer from '@/components/WatchTrailer';
import { useMoviesStore } from '@/store/movies';
import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Movies() {
  const fetchGenres = useMoviesStore(state => state.fetchMoviesGenre);
  const fetchPopularMovies = useMoviesStore(state => state.fetchPopularMovies);
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const popularMoviesStore = useMoviesStore((state) => state.popularMovies);
  const genres = useMoviesStore(state => state.movieGenres);
  const moviesNowPlayingStore = useMoviesStore(state => state.moviesNowPlaying);  

  const OPTIONS: EmblaOptionsType = { loop: true };
  const popularMovies = Array.from(popularMoviesStore);
  const moviesNowPlaying = Array.from(moviesNowPlayingStore);

  useEffect(() => {
    fetchGenres();
    fetchPopularMovies(1);
    fetchMoviesNowPlaying(1);
  }, [fetchGenres, fetchPopularMovies, fetchMoviesNowPlaying]);

  return(
    <main className='flex flex-col flex-grow'>
      <WatchTrailer/>
      <CarouselOnTheatres moviesOnTheatres={popularMovies} options={OPTIONS} genres={genres} isSerie={false}/>
      <section>
        <div className='flex flex-col p-4 md:flex-row md:gap-4 md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 items-baseline'>
          <h2 className='font-bold text-lg md:text-xl lg:text-2xl'>
            Nuevos lanzamientos
          </h2>
          <Link href={'/exitos-taquilla'} className='flex items-baseline text-sm text-gray hover:text-neonBlue'>
            Ver todo
          </Link>
        </div>
        <VerticalCarousel movies={moviesNowPlaying} isSerie={false} path={'/exitos-taquilla'}/>
      </section>
      <section>
        <h2 className='font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl'>
          ¡Explora! Cada género tiene una historia que contar
        </h2>
        <ul className='hide-scrollbar flex overflow-x-scroll gap-4 px-4 *:flex *:items-center *:flex-none *:px-4 *:py-2 *:rounded-3xl *:border-2 *:border-white *:cursor-pointer lg:px-6 lg:flex-wrap'>
          <li className='hover:bg-white hover:text-black'>Acción</li>
          <li className='hover:bg-white hover:text-black'>Ciencia Ficción</li>
          <li className='hover:bg-white hover:text-black'>Aventura</li>
          <li className='hover:bg-white hover:text-black'>Animación</li>
          <li className='hover:bg-white hover:text-black'>Comedia</li>
          <li className='hover:bg-white hover:text-black'>Fantasía</li>
          <li className='hover:bg-white hover:text-black'>Documental</li>
          <li className='hover:bg-white hover:text-black'>Crimen</li>
          <li className='hover:bg-white hover:text-black'>Drama</li>
          <li className='hover:bg-white hover:text-black'>Terror</li>
          <li className='hover:bg-white hover:text-black'>Romance</li>
          <li className='hover:bg-white hover:text-black'>Familia</li>
          <li className='hover:bg-white hover:text-black'>Historia</li>
          <li className='hover:bg-white hover:text-black'>Música</li>
          <li className='hover:bg-white hover:text-black'>Misterio</li>
          <li className='hover:bg-white hover:text-black'>Película de TV</li>
          <li className='hover:bg-white hover:text-black'>Suspense</li>
          <li className='hover:bg-white hover:text-black'>Bélica</li>
          <li className='hover:bg-white hover:text-black'>Western</li>
        </ul>
      </section>
    </main>
  );
}