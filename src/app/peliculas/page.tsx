'use client';

import { League_Spartan } from 'next/font/google';
import CarouselOnTheatres from '@/components/carouselOnTheatres/Carousel';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import WatchTrailer from '@/components/WatchTrailer';
import { useMoviesStore } from '@/store/movies';
import { useMoviesByGenreId } from '@/store/moviesByGenreId';
import { useMoviesCollectionStore } from '@/store/moviesCollection';
import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';

const league = League_Spartan({ subsets: ['latin'] });

export default function Movies() {
  const fetchGenres = useMoviesStore((state) => state.fetchMoviesGenre);
  const fetchPopularMovies = useMoviesStore((state) => state.fetchPopularMovies);
  const fetchMoviesNowPlaying = useMoviesStore((state) => state.fetchMoviesNowPlaying);
  const popularMoviesStore = useMoviesStore((state) => state.popularMovies);
  const genres = useMoviesStore((state) => state.movieGenres);
  const moviesNowPlayingStore = useMoviesStore((state) => state.moviesNowPlaying);
  const moviesByGenreId = useMoviesByGenreId((state) => state.moviesByGenre);
  const fetchMoviesByGenreId = useMoviesByGenreId((state) => state.fetchMoviesByGenreId);
  const moviesCollection = useMoviesCollectionStore((state) => state.moviesCollection);
  const fetchMoviesCollection = useMoviesCollectionStore((state) => state.fetchMoviesCollections);

  const OPTIONS: EmblaOptionsType = { loop: true };
  const popularMovies = Array.from(popularMoviesStore);
  const moviesNowPlaying = Array.from(moviesNowPlayingStore);
  const moviesByGenre = Array.from(moviesByGenreId);

  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [selectedGenreName, setSelectedGenreName] = useState<string>('Acción');

  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  const handleGenreClick = (id: number, name: string) => {
    setSelectedGenreId(id);
    setSelectedGenreName(name);
    fetchMoviesByGenreId(id, 1);
  };

  useEffect(() => {
    fetchGenres();
    fetchPopularMovies(1);
    fetchMoviesNowPlaying(1);
    fetchMoviesByGenreId(28, 1);
    fetchMoviesCollection();
  }, [
    fetchGenres,
    fetchPopularMovies,
    fetchMoviesNowPlaying,
    fetchMoviesByGenreId,
    fetchMoviesCollection,
  ]);
	
  return (
    <main className="flex flex-col flex-grow">
      <WatchTrailer />
      <CarouselOnTheatres
        moviesOnTheatres={popularMovies}
        options={OPTIONS}
        genres={genres}
        isSerie={false}
      />
      <section>
        <div className="flex flex-col p-4 md:flex-row md:gap-4 md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 items-baseline">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
						Nuevos lanzamientos
          </h2>
          <Link
            href={'/exitos-taquilla'}
            className="flex items-baseline text-sm text-gray hover:text-neonBlue"
          >
						Ver todo
          </Link>
        </div>
        <VerticalCarousel
          movies={moviesNowPlaying}
          isSerie={false}
          path={'/exitos-taquilla'}
        />
      </section>
      <section>
        <h2 className="font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl">
					¡Explora! Cada género tiene una historia que contar
        </h2>
        <ul className="flex flex-wrap gap-4 px-4 *:flex *:items-center *:flex-none *:px-4 *:py-2 *:rounded-3xl *:border-2 *:border-white *:cursor-pointer lg:px-6 lg:flex-wrap">
          {genres.map((genre) => {
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
              movies={moviesByGenre}
              isSerie={false}
              path={`/peliculas/${selectedGenreId}/${selectedGenreName}`}
            />
          )}
        </div>
      </section>
      <section className='mb-4 lg:mb-8'>
        <h2 className="font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl">
					Colecciones épicas: ¡Prepara las palomitas y dale al play!
        </h2>
        {
          moviesCollection &&
						<div className='relative w-full h-[27rem] flex flex-col justify-between md:h-[420px] lg:h-[556px] bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url('${moviesCollection.backdrop_path ? imgURL + moviesCollection.backdrop_path : imgURL + moviesCollection.poster_path}')`}}>
						  <div>
						    <div className='absolute inset-0 bg-black bg-opacity-70'></div>
						    <h3 className={`relative z-[1] uppercase font-black ${league.className} px-4 mt-8 mb-4 text-2xl md:w-[85%] lg:mt-20 lg:text-4xl lg:px-6 lg:w-[60%]`}>{(moviesCollection.name).split(' - ')[0]}</h3>
						    <p className='relative z-[1] px-4 mb-4 lg:px-6 text-sm font-normal text-gray text-balance line-clamp-6 md:w-[85%] lg:text-wrap md:text-base lg:w-[60%]'>{moviesCollection.overview}</p>
						  </div>
						  <div className='mb-8 lg:mb-20'>
						    <HorizontalCarousel movies={moviesCollection.parts} isSerie={false}/>
						  </div>
						</div>
        }
      </section>
    </main>
  );
}
