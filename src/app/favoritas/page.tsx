'use client';

import { useLoginStore } from '@/store/userStore';
import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';

const league = League_Spartan({ subsets: ['latin'] });

const Favoritas = () => {
  const { token, user } = useLoginStore(state => state);
  const router = useRouter();

  if(!token) {
    router.push('/');
  }
  
  return (
    <main className="flex flex-col flex-grow">
      <h1 className={`${league.className} font-extrabold`}>Bienvenid@ {user?.displayName}</h1>
      <h2>¡Explora tus favoritas!</h2>
    </main>
  );
};

export default Favoritas;