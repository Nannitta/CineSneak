import { MoviesNowPalying } from '@/app/types/types'
import Image from 'next/image';
import { Plus } from '@/app/lib/Svg';

interface VerticalCard {
  movie: MoviesNowPalying
}

export default function VerticalCardCarousel({ movie }: VerticalCard) {
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  return (
    <article className="w-[150px]">
      <div className="group">
        <div className="w-[150px] h-[225px] relative rounded-lg overflow-hidden">
          <Image
            src={`${imgURL + movie.poster_path}`}
            alt='Portada de la película'
            fill={true}
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 lg:group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
            <span className='text-white text-sm font-bold opacity-0 lg:group-hover:opacity-100 transition duration-300 flex items-center gap-1'>
              VER MÁS
              <Plus width={"14"} height={"14"} fill={'white'}/>
            </span>
          </div>
        </div>
        <p className="pt-2 text-xs text-white line-clamp-1 lg:text-gray lg:group-hover:text-white font-extralight md:text-sm transition duration-300">
          {movie.title || movie.name}
        </p>
      </div>
    </article>
  );
}