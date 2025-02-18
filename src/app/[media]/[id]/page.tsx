'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useInPictureModeStore } from '@/store/inPictureMode';
import { useMediaDetailsStore } from '@/store/mediaDetails';
import { useMoviesStore } from '@/store/movies';
import { useSeriesStore } from '@/store/series';
import Tag from '@/components/Tag';
import WatchTrailer from '@/components/WatchTrailer';
import MovieDetailsComponent from '@/components/MovieDetails';
import SerieDetailsComponent from '@/components/SerieDetails';
import ErrorPage from '@/components/ErrorPage';
import type { Genre, MovieDetails, ProvidersLogo, SerieDetails } from '@/types/types';
import { useLoginStore } from '@/store/userStore';

const WatchMedia = () => {
  const {media, id} = useParams<Params>();
  const { token, user } = useLoginStore(state => state);

  const { 
    fetchMediaDetails,
    resetMediaDetails, 
    mediaDetails, 
    providers, 
    fetchProviders,
    resetProviders,
    cast, 
    fetchCast,
    resetCast, 
    similarMedia, 
    fetchSimilarMedia,
    genericError: mediaStoreError
  } = useMediaDetailsStore(state => state);

  const { fetchMovieTrailers: fetchMovieTrailer, genericError: moviesStoreError } = useMoviesStore(state => state);
  const { fetchSerieTrailers: fetchSerieTrailer, genericError: seriesStoreError } = useSeriesStore(state => state);
  const openInPictureMode = useInPictureModeStore(state => state.openPictureMode);

  const [providersLogo, setProvidersLogo] = useState<ProvidersLogo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      resetCast();
      resetMediaDetails();
      if(media === 'movie') {
        Promise.all([
          fetchMediaDetails(id, false),
          fetchProviders(id, false),
          fetchCast(id, false),
          fetchSimilarMedia(id, false)
        ]);
      };
      if(media === 'tv') {
        Promise.all([
          fetchMediaDetails(id, true),
          fetchProviders(id, true),
          fetchCast(id, true),
          fetchSimilarMedia(id, true)
        ]);
      };
    };

    fetchData();
  }, [fetchMediaDetails, fetchCast, fetchProviders, fetchSimilarMedia, id, media, resetCast, resetMediaDetails]);

  useEffect(() => {
    resetProviders();
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
  }, [providers, resetProviders]);

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
    if(isSerie) await fetchSerieTrailer(id, isSerie);
    if(!isSerie) await fetchMovieTrailer(id, isSerie);
    openInPictureMode();
  };
   
  if (mediaStoreError || moviesStoreError || seriesStoreError) {
    return (
      <ErrorPage/>
    );
  }

  return (
    <main className='flex-grow flex flex-col'>
      <WatchTrailer isSerie={media === 'movie' ? false : true}/>
      {
        mediaDetails && media === 'movie' && cast
          ? <MovieDetailsComponent
            media={mediaDetails as MovieDetails}
            providersLogo={providersLogo}
            handleTrailerClick={() => handleTrailerClick(id, false)}
            similarMediaStore={similarMedia as MovieDetails[]}
            cast={cast}
            getGenreNames={getGenreNames}
            token={token}
            user={user}
          />
          : mediaDetails && media === 'tv' && cast
            ? <SerieDetailsComponent
              media={mediaDetails as SerieDetails}
              providersLogo={providersLogo}
              handleTrailerClick={() => handleTrailerClick(id, true)}
              similarMediaStore={similarMedia as SerieDetails[]}
              cast={cast}
              getGenreNames={getGenreNames}
              token={token}
              user={user}
            />
            : null
      }
    </main>
  );
};

export default WatchMedia;