'use client';

import { useMediaDetailsStore } from '@/store/mediaDetails';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const WatchMedia = () => {
  const {media, id} = useParams<Params>();
  const fecthMediaDetails = useMediaDetailsStore(state => state.fetchMediaDetails);
  const mediaDetails = useMediaDetailsStore(state => state.mediaDetails);

  useEffect(() => {
    if(media === 'movie') fecthMediaDetails(id, false);
    if(media === 'tv') fecthMediaDetails(id, true);
  });

  return(
    <h1>{mediaDetails?.title || mediaDetails?.name}</h1>
  );
};

export default WatchMedia;