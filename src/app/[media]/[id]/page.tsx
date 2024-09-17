'use client';

import { useMediaDetailsStore } from '@/store/mediaDetails';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Tag from '@/components/Tag';
import type { Genre, MovieDetails, ProvidersLogo, SerieDetails } from '@/types/types';
import { useInPictureModeStore } from '@/store/inPictureMode';
import { useMoviesStore } from '@/store/movies';
import WatchTrailer from '@/components/WatchTrailer';
import MovieDetailsComponent from '@/components/MovieDetails';
import SerieDetailsComponent from '@/components/SerieDetails';

const WatchMedia = () => {
  const {media, id} = useParams<Params>();

  const { 
    fetchMediaDetails, 
    mediaDetails, 
    providers, 
    fetchProviders, 
    cast, 
    fetchCast, 
    similarMedia, 
    fetchSimilarMedia 
  } = useMediaDetailsStore(state => state);

  const fetchMovieTrailer = useMoviesStore(state => state.fetchMovieTrailers);
  const openInPictureMode = useInPictureModeStore(state => state.openPictureMode);

  const [providersLogo, setProvidersLogo] = useState<ProvidersLogo[]>([]);

  useEffect(() => {
    if(media === 'movie') {
      fetchMediaDetails(id, false);
      fetchProviders(id, false);
      fetchCast(id, false);
      fetchSimilarMedia(id, false);
    };
    if(media === 'tv') {
      fetchMediaDetails(id, true);
      fetchProviders(id, true);
      fetchCast(id, true);
      fetchSimilarMedia(id, true);
    };
  }, [fetchMediaDetails, fetchCast, fetchProviders, fetchSimilarMedia, id, media]);

  useEffect(() => {
    const getProviders = () => {   
      if(providers && Object.keys(providers).length > 0) {          
        if(providers.ES) {
          const spanishProviders: ProvidersLogo[] = providers.ES?.flatrate;
          const finalProviders: ProvidersLogo[] = [];
          spanishProviders?.forEach((provider: ProvidersLogo) => {
            finalProviders.push(provider);
          });
          setProvidersLogo(finalProviders);
        }    
      }           
    };
    getProviders();
  }, [providers]);

  const getGenreNames = (genres: Genre[]): (JSX.Element | null)[] => {
    return genres.map(id => {
      const genre = mediaDetails?.genres.find((genre: Genre) => genre.id === id.id);
      if (genre) {
        return <Tag key={genre.name} text={genre.name}/>;
      }
      return null;
    }).filter(Boolean).slice(0,2);
  };

  const handleTrailerClick = async (id: number, isSerie: boolean): Promise<void> => {
    await fetchMovieTrailer(id, isSerie);
    openInPictureMode();
  };
   
  return (
    <main className='flex-grow flex flex-col'>
      <WatchTrailer />
      {
        mediaDetails && media === 'movie'
          ? <MovieDetailsComponent
            media={mediaDetails as MovieDetails}
            providers={providers}
            providersLogo={providersLogo}
            handleTrailerClick={handleTrailerClick}
            similarMediaStore={similarMedia as MovieDetails[]}
            cast={cast}
            getGenreNames={getGenreNames}
          />
          : mediaDetails && media === 'tv'
            ? <SerieDetailsComponent
              media={mediaDetails as SerieDetails}
              providers={providers}
              providersLogo={providersLogo}
              handleTrailerClick={handleTrailerClick}
              similarMediaStore={similarMedia as SerieDetails[]}
              cast={cast}
              getGenreNames={getGenreNames}
            />
            : null
      }
    </main>
  );
};

export default WatchMedia;