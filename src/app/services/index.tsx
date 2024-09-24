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

export async function getMoviesNowPlaying(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${page}&region=ES`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json(); 
  return response;
}

export async function getPopularMovies(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=${page}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getTopRatedMovies(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=es-ES&region=es&page=${page}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getGenres(isSerie: boolean) {
  if(isSerie) {
    const data = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=es', {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
      }
    });

    const response = await data.json();  
    return response.genres;

  }
  const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();  
  return response.genres;
}

export async function getTrailer(id: number, isSerie: boolean) {
  if(isSerie) {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-EN`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
      }
    });
  
    const response = await data.json();
    return response.results;
  }

  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-EN`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json(); 
  return response.results;
}

export async function getOnAirSeries(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=es-ES&timezone=es&page=${page}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getPopularSeries(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/trending/tv/week?language=es-ES&page=${page}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getTopRatedSeries(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=${page}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
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

export async function getCast(id: number, isSerie: boolean) {
  if(isSerie) {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=es-ES`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
      }
    });
  
    const response = await data.json();
    return response.cast;
  }

  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.cast;
}

export async function getSimilarMedia(id: number, isSerie: boolean) {
  if(isSerie) {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
      }
    });
  
    const response = await data.json();
    return response.results;
  }

  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=es-ES&page=1`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response.results;
}

export async function getMoviesByGenreId(id: number, page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&region=es&sort_by=popularity.desc&with_genres=${id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getCollectionMovies(id: number) {
  const data = await fetch(`https://api.themoviedb.org/3/collection/${id}?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getSeriesOfTheDay() {
  const data = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=es-ES', {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getSeriesByGenreId(id: number, page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();
  return response;
}

export async function getSeriesAiringToday(page: number) {
  const data = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=es-ES&page=${page}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`
    }
  });

  const response = await data.json();  
  return response;
}