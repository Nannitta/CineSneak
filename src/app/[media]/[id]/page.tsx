'use client';

import { useMediaDetailsStore } from '@/store/mediaDetails';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Tag from '@/components/Tag';
import { CountryProvider, Genre, ProvidersLogo } from '@/types/types';
import { useInPictureModeStore } from '@/store/inPictureMode';
import { useMoviesStore } from '@/store/movies';
import WatchTrailer from '@/components/WatchTrailer';
import MovieDetails from '@/components/MovieDetails';

const WatchMedia = () => {
  const {media, id} = useParams<Params>();
  const fecthMediaDetails = useMediaDetailsStore(state => state.fetchMediaDetails);
  const mediaDetails = useMediaDetailsStore(state => state.mediaDetails);
  const providers = useMediaDetailsStore(state => state.providers);
  const fetchProviders = useMediaDetailsStore(state => state.fetchProviders);
  const fetchMovieTrailer = useMoviesStore(state => state.fetchMovieTrailers);
  const openInPictureMode = useInPictureModeStore(state => state.openPictureMode);
  const cast = useMediaDetailsStore(state => state.cast);
  const fetchCast = useMediaDetailsStore(state => state.fetchCast);
  const similarMediaStore = useMediaDetailsStore(state => state.similarMedia);
  const fetchSimilarMedia = useMediaDetailsStore(state => state.fetchSimilarMedia);
  const [providersLogo, setProvidersLogo] = useState<ProvidersLogo[]>([]);

  useEffect(() => {
    if(media === 'movie') {
      fecthMediaDetails(id, false);
      fetchProviders(id, false);
      fetchCast(id, false);
      fetchSimilarMedia(id, false);
    };
    if(media === 'tv') {
      fecthMediaDetails(id, true);
      fetchProviders(id, true);
      fetchCast(id, true);
      fetchSimilarMedia(id, true);
    };
  }, [fecthMediaDetails, fetchCast, fetchProviders, fetchSimilarMedia, id, media]);

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

  const handleTrailerClick = async (id: number): Promise<void> => {
    await fetchMovieTrailer(id);
    openInPictureMode();
  };
   
  return(
    <main className='flex-grow flex flex-col'>
      <WatchTrailer/>
      {
        mediaDetails && media === 'movie'
          ? <MovieDetails mediaDetails={mediaDetails} providers={providers} providersLogo={providersLogo} handleTrailerClick={handleTrailerClick} similarMediaStore={similarMediaStore} cast={cast} getGenreNames={getGenreNames}/>
          : <>
            {console.log(mediaDetails)}
            <div>Hola</div>
          </>
      }
    </main>
  );
};

export default WatchMedia;