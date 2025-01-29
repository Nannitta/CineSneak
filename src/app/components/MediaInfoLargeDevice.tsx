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

const MediaInfoLargeDevice = ({ mediaInfo, cast }: MediaInfoSmallDeviceProps) => {
  const { media } = useParams<Params>();

  return(
    <>
      <p className="text-balance font-extralight col-start-2 col-end-3 pt-4 lg:row-start-5 lg:row-end-6 line-clamp-6">
        {mediaInfo.overview}
      </p>
      <div className="flex gap-4 col-start-2 col-end-3 items-center lg:row-start-6 lg:row-end-7">
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
      {
        cast.length > 0 &&
          <h2 className="font-black col-start-4 row-start-5 row-end-6 pt-4 laptop:col-start-1 laptop:col-end-3 laptop:row-start-8 laptop:row-end-9">Reparto principal</h2>
      }
      <section className="flex flex-wrap gap-4 col-start-4 row-start-5 row-end-8 pt-14 lg:h-fit laptop:col-start-1 laptop:col-end-5 laptop:row-start-9 laptop:row-end-10 laptop:pt-0">
        {
          cast &&
          cast.filter((actor: Cast) => actor.profile_path !== null).map((actor: Cast) => {
            return (
              <CardActor key={actor.credit_id} actor={actor} />
            );
          }).slice(0, 6)
        }
      </section>
    </>
  );
};

export default MediaInfoLargeDevice;