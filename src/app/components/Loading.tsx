import { MovieDetails, SerieDetails } from '@/types/types';
import { LoadingSpinner } from '@/lib/Svg';
import PrimaryButton from '@/components/PrimaryButton';

interface LoadingByScrollProps {
  loading: boolean,
  moreMedia: boolean,
  dataMedia: MovieDetails[] | SerieDetails[],
  text: string
}

const LoadingByScroll = ({ loading, moreMedia, dataMedia, text }: LoadingByScrollProps) => {
  return (
    <>
      {loading && 
      <p className='pt-8 pb-2 flex items-center justify-center gap-4 text-gray'>
        <LoadingSpinner/>
        Cargando más {text}...
      </p>}
      {!moreMedia && dataMedia.length > 0 && 
      <p className='text-center pt-8 pb-2'>
        ¡Vaya!, parece que has llegado al final.
      </p>}
      {!moreMedia && dataMedia.length === 0 && <p className='text-center py-4'>No se han encontrado {text}.</p>} 
    </>
  );
};

export default LoadingByScroll;