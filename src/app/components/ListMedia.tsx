import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { MovieDetails, SearchedMedia, SerieDetails } from '@/types/types';

interface ListMediaProps {
  media: MovieDetails[] | SerieDetails[] | SearchedMedia[]
  isSerie: boolean
}

const ListMedia = ({ media, isSerie }: ListMediaProps) => {
  return(
    <section>
      <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
        {media.filter((mediaItem) => mediaItem.poster_path !== null).map((mediaItem) => {
          return(
            <li key={mediaItem.id}>
              <VerticalCardCarousel media={mediaItem} isSerie={isSerie}/>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ListMedia;