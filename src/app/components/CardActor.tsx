import Image from 'next/image';

export default function CardActor({ actor }: any) {
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;

  return(
    <article>
      <div className='h-14 w-14 relative'>
        <Image src={`${imgURL + actor.profile_path}`} alt={`Foto de ${actor.name}`} fill={true} className='rounded-full object-cover'/>
      </div>
      <p className='text-sm mt-2'>{actor.name}</p>
      <span className='font-extralight text-gray text-xs'>{actor.character}</span>
    </article> 
  );
}