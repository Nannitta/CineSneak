'use client';

import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import Link from 'next/link';
import { EmblaOptionsType } from 'embla-carousel';
import { useMoviesByGenreId } from '@/store/moviesByGenreId';
import { useMoviesStore } from '@/store/movies';
import { useMoviesCollectionStore } from '@/store/moviesCollection';
import MainCarousel from '@/components/mainCarousel/MainCarousel';
import VerticalCarousel from '@/components/verticalCarousel/VerticalCarousel';
import WatchTrailer from '@/components/WatchTrailer';
import HorizontalCarousel from '@/components/horizontalCarousel/HorizontalCarousel';
import ListGenres from '@/components/ListGenres';

const league = League_Spartan({ subsets: ['latin'] });

const Movies = () => {
  const { 
    fetchMoviesGenre, 
    fetchPopularMovies, 
    fetchMoviesNowPlaying, 
    popularMovies, 
    movieGenres, 
    moviesNowPlaying 
  } = useMoviesStore((state) => state);

  const { moviesByGenre, fetchMoviesByGenreId } = useMoviesByGenreId((state) => state);

  const { moviesCollection, fetchMoviesCollections } = useMoviesCollectionStore((state) => state);

  const OPTIONS: EmblaOptionsType = { loop: true };

  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [selectedGenreName, setSelectedGenreName] = useState<string>('Acción');

  const backdropURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE_300;
  const posterURL: string | undefined = process.env.NEXT_PUBLIC_POSTER_IAMGE_342;

  const handleGenreClick = (id: number, name: string) => {
    setSelectedGenreId(id);
    setSelectedGenreName(name);
    fetchMoviesByGenreId(id, 1);
  };

  useEffect(() => {
    fetchMoviesGenre(false);
    fetchPopularMovies(1);
    fetchMoviesNowPlaying(1);
    fetchMoviesByGenreId(28, 1);
    fetchMoviesCollections();
  }, [
    fetchMoviesGenre,
    fetchPopularMovies,
    fetchMoviesNowPlaying,
    fetchMoviesByGenreId,
    fetchMoviesCollections,
  ]);
	
  return (
    <main className="flex flex-col flex-grow">
      <WatchTrailer isSerie={false}/>
      <MainCarousel
        media={popularMovies}
        options={OPTIONS}
        genres={movieGenres}
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
          media={moviesNowPlaying}
          isSerie={false}
          path={'/exitos-taquilla'}
        />
      </section>
      <section>
        <h2 className="font-bold text-lg p-4 md:text-xl md:pt-[30px] md:pb-5 lg:pt-9 lg:pb-6 lg:px-6 lg:text-2xl">
					¡Explora! Cada género tiene una historia que contar
        </h2>
        <ListGenres handleGenreClick={handleGenreClick} listGenres={movieGenres} selectedGenreId={selectedGenreId}/>
        <div className="py-5">
          {selectedGenreId && (
            <VerticalCarousel
              media={moviesByGenre}
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
						<div className='relative w-full h-[27rem] flex flex-col justify-between md:h-[420px] lg:h-[556px] bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url('${moviesCollection.backdrop_path ? backdropURL + moviesCollection.backdrop_path : posterURL + moviesCollection.poster_path}')`}}>
						  <div>
						    <div className='absolute inset-0 bg-black bg-opacity-70'></div>
						    <h3 className={`relative z-[1] uppercase font-black ${league.className} px-4 mt-8 mb-4 text-2xl md:w-[85%] lg:mt-20 lg:text-4xl lg:px-6 lg:w-[60%]`}>{(moviesCollection.name).split(' - ')[0]}</h3>
						    <p className='relative z-[1] px-4 mb-4 lg:px-6 text-sm font-normal text-gray text-balance line-clamp-6 md:w-[85%] lg:text-wrap md:text-base lg:w-[60%]'>{moviesCollection.overview}</p>
						  </div>
						  <div className='mb-8 lg:mb-20'>
						    <HorizontalCarousel media={moviesCollection.parts} isSerie={false}/>
						  </div>
						</div>
        }
      </section>
    </main>
  );
};

export default Movies;
