"use client"

import CheckWindowWidth from '@/app/hooks/useWindowWidth';
import { MoviesNowPalying } from '@/app/types/types'
import Image from 'next/image';

interface VerticalCard {
  movie: MoviesNowPalying
}

export default function VerticalCardCarousel({ movie }: VerticalCard) {
  const {screenSize} = CheckWindowWidth();
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  return(
    <article className={`${screenSize === "sm" ? "w-[158px]" : (screenSize === "md" ? "w-[178px]" : "w-[293px]")} *:lg:hover:text-white`}>
      <div className={`${screenSize === "sm" ? "w-[158px] h-[237px]" : (screenSize === "md" ? "w-[178px] h-[267px]" : "w-[293px] h-[440px]")} hover:bg-black hover:bg-opacity-60 flex relative z-20`}></div>
        <div className={`${screenSize === "sm" ? "w-[158px] h-[237px]" : (screenSize === "md" ? "w-[178px] h-[267px]" : "w-[293px] h-[440px]")} absolute top-0 object-cover`}>
          <Image
            src={`${imgURL + movie.poster_path}`}
            alt='Portada de la película'
            fill={true}
            className='rounded-lg'
          />
        </div>
      
      <p className='pt-2 text-xs line-clamp-1 font-extralight md:text-sm lg:text-base lg:text-gray'>{movie.title}</p> 
    </article>
  )
};