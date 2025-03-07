import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';

const league = League_Spartan({ subsets: ['latin'] });

const ErrorPage = () => {
  const router = useRouter();
  
  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <main className='flex flex-grow relative justify-center items-center'>
      <div className='w-screen h-full absolute -z-10'>
        <video src="/video/404.mp4" className='w-screen h-full object-cover opacity-20' muted autoPlay loop></video>
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <p className={`${league.className} font-bold text-8xl md:text-9xl`}>Oops</p>
        <p className={`${league.className} text-center pb-4 md:text-2xl`}>¡Vaya! Ha ocurrido un error inesperado.</p>
        <div>
          <PrimaryButton text={'Volver al inicio'} onClick={handleBackHome}/>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;