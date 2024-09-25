import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import CardActor from '@/components/CardActor';
import { formatRuntime } from '@/lib/format';
import { Clock } from '@/lib/Svg';
import { Cast, MovieDetails, SerieDetails } from '@/types/types';

interface MediaInfoSmallDeviceProps {
  mediaInfo: MovieDetails | SerieDetails
  cast: Cast[]
}

const MediaInfoSmallDevice = ({ mediaInfo, cast }: MediaInfoSmallDeviceProps) => {
  const { media } = useParams<Params>();

  console.log(media);
  

  return(
    <>
      <p className="px-4 text-balance font-extralight relative bottom-14 mt-20">
        {mediaInfo.overview}
      </p>
      <div className="flex px-4 gap-4 pt-2 relative bottom-12">
        <p className="text-xs text-gray">Idioma original · <span className="uppercase">{mediaInfo.original_language}</span></p>
        {
          media === 'movie' &&
          ('runtime' in mediaInfo) &&
          <p className="text-xs flex place-items-center gap-1 text-gray">
            <Clock
              width={'12'}
              height={'12'} />
                Duración · {formatRuntime(mediaInfo.runtime)}
          </p>
        }
      </div>
      <h2 className="px-4 font-black relative bottom-6 md:text-xl">Reparto principal</h2>
      <section className="flex flex-wrap px-4 gap-4 md:relative">
        {
          cast &&
          cast.filter((actor: Cast) => actor.profile_path !== null).map((actor: Cast) => {
            return (
              <CardActor key={actor.cast_id} actor={actor} />
            );
          }).slice(0, 6)
        }
      </section>
    </>
  );
};

export default MediaInfoSmallDevice;