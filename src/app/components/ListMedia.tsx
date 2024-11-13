import VerticalCardCarousel from '@/components/verticalCarousel/VerticalCardMovie';
import { MovieDetails, SearchedMedia, SerieDetails } from '@/types/types';

interface ListMediaProps {
  media: MovieDetails[] | SerieDetails[] | SearchedMedia[]
}

const isMovieDetails = (media: any): media is MovieDetails => {  
  return (media as MovieDetails).title !== undefined;
};

const ListMedia = ({ media }: ListMediaProps) => {
  return(
    <section>
      <ul className='flex flex-wrap px-4 gap-4 justify-center lg:px-6'>
        {media.filter((mediaItem) => mediaItem.poster_path !== null).map((mediaItem) => {
          if(isMovieDetails(mediaItem)) {
            return(
              <li key={mediaItem.id}>
                <VerticalCardCarousel media={mediaItem} isSerie={false}/>
              </li>
            );
          } else {
            return(
              <li key={mediaItem.id}>
                <VerticalCardCarousel media={mediaItem} isSerie={true}/>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
};

export default ListMedia;