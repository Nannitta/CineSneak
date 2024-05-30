'use client';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';

const WatchMedia = () => {
  const {id} = useParams<Params>();

  return(
    <h1>{id}</h1>
  );
};

export default WatchMedia;