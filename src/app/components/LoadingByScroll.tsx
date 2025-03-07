import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';
import { LoadingSpinner, Clapperboard } from '@/lib/Svg';
import { MovieDetails, SearchedMedia, SerieDetails } from '@/types/types';

const league = League_Spartan({ subsets: ['latin'] });

interface LoadingByScrollProps {
  loading: boolean,
  moreMedia: boolean,
  dataMedia: MovieDetails[] | SerieDetails[] | SearchedMedia[],
  text: string
}

const LoadingByScroll = ({ loading, moreMedia, dataMedia, text }: LoadingByScrollProps) => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <>
      {loading && 
      <p className='pb-8 pt-12 flex items-center justify-center gap-4 text-gray'>
        <LoadingSpinner/>
        Cargando más {text}
      </p>}
      {!moreMedia && dataMedia.length > 0 &&
      <div className='flex flex-col gap-4 justify-center items-center py-8'>
        <div className='w-fit -rotate-12'>
          <Clapperboard/>
        </div>
        <p className={`${league.className} font-bold text-xl md:text-2xl`}>
          ¡Vaya!, has llegado al final
        </p>
        <PrimaryButton text={'Volver al inicio'} onClick={handleBackHome}/>
      </div> 
      }
      {!moreMedia && dataMedia.length === 0 && <p className='text-center py-4'>No se han encontrado {text}.</p>} 
    </>
  );
};

export default LoadingByScroll;