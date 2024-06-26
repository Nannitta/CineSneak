import { Cast } from '@/types/types';
import Image from 'next/image';

interface CardActorProps {
  actor: Cast
}

export default function CardActor({ actor }: CardActorProps) {
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  return(
    <article className='w-28 h-fit'>
      <div className='h-14 w-14 relative lg:h-20 lg:w-20'>
        <Image src={`${imgURL + actor.profile_path}`} alt={`Foto de ${actor.name}`} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='rounded-full object-cover'/>
      </div>
      <p className='text-sm mt-2 lg:text-base'>{actor.name}</p>
      <span className='font-extralight text-gray text-xs lg:text-sm'>{actor.character}</span>
    </article> 
  );
}