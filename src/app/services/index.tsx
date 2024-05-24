require('dotenv').config();
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMoviesNowPlaying() {
  const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json(); 
  return response.results.slice(0,10);
}

export async function getMovieGenres() {
  const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();  
  return response.genres;
}

export async function getMovieTrailer(id: number) {
  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-EN`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();  
  return response.results;
}

export async function getPopularMovies() {
  const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=es-ES&region=es', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}