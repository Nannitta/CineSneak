import { MediaContent } from '@/types/types';
import Image from 'next/image';
import { Plus } from '@/lib/Svg';
import Link from 'next/link';

interface VerticalCard {
  movie: MediaContent
  isSerie: boolean
}

export default function HorizontalCardCarousel({ movie, isSerie }: VerticalCard) {
  const imgURL: string | undefined = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  
  return (
    <Link href={`/${isSerie ? 'tv' : 'movie'}/${movie.id}`}>
      <article className='w-[300px]'>
        <div className='group'>
          <div className='w-[300px] h-[168px] relative rounded-lg overflow-hidden'>
            <div
              className='overlay w-[300px] h-[168px]'>
            </div>
            <Image
              src={`${movie.backdrop_path ? imgURL + movie.backdrop_path : imgURL + movie.poster_path}`}
              alt={`Portada de la película ${movie.title || movie.name}`}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className='object-cover rounded-lg'
            />
            <div className='absolute inset-0 z-10 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center'>
              <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
                VER MÁS
                <Plus width={'14'} height={'14'} fill={'white'}/>
              </span>
            </div>
          </div>
          <p className='min-w-60 max-w-64 line-clamp-1 z-10 absolute bottom-3 pl-4 text-xs text-white lg:text-gray lg:group-hover:text-white font-extralight md:text-sm transition duration-300'>
            {movie.title || movie.name}
          </p>
        </div>
      </article>
    </Link>
  );
}