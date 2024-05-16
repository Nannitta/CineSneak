"use client"

import { useEffect } from 'react';
import { useMoviesStore } from './store/movies';

export default function HomePageNotLog() {
  const fetchMoviesNowPlaying = useMoviesStore(state => state.fetchMoviesNowPlaying);
  const moviesNowPlaying = useMoviesStore(state => state.moviesNowPlaying);

  useEffect(() => {
    fetchMoviesNowPlaying();
  }, []);
  
  return (
    <main className='flex-grow'>
      {
        moviesNowPlaying.map((movie) => {
          return(
            <p key={movie.id}>{movie.title}</p>
          )
        })
      }
    </main>
  );
};
