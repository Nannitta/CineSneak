require('dotenv').config();
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMoviesUpcoming() {
  const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=es', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json(); 
  return response.results.slice(0,10);
}

export async function getMoviesNowPlaying() {
  const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json(); 
  return response.results;
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

export async function getOnAirSeries() {
  const data = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=es-ES&timezone=es', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}

export async function getPopularSeries() {
  const data = await fetch('https://api.themoviedb.org/3/tv/popular?language=es-ES', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}

export async function getTopRatedMovies() {
  const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&region=es', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}

export async function getTopRatedSeries() {
  const data = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=es-ES', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}

export async function getDetails(id: number, isSerie: boolean) {
  if(isSerie) {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
      }
    });
  
    const response = await data.json();
    return response;
  }

  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getProviders(id: number, isSerie: boolean) {
  if(isSerie) {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
      }
    });
  
    const response = await data.json();
    return response.results;
  }

  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}