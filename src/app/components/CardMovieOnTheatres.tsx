import { Calendar, Play } from '../lib/Svg';
import PrimaryButton from "./PrimaryButton";
import { formatDate } from '../lib/formatDate';
import { MoviesNowPalying } from '../types/types';
import { League_Spartan } from "next/font/google";
import CheckWindowWidth from '../hooks/useWindowWidth';
import Tag from './Tag';
import { Genre } from '../types/types';
import { useMoviesStore } from '../store/movies';

const league = League_Spartan({ subsets: ["latin"] });

interface CardMovieOnTheatresProps {
  movie: MoviesNowPalying
  genres: Genre[]
}

export default function CardMovieOnTheatres({ movie, genres }: CardMovieOnTheatresProps) {
  const {screenSize} = CheckWindowWidth();
  const imgURL = process.env.NEXT_PUBLIC_BACKDROP_IMAGE;
  const movieVideos = useMoviesStore(state => state);

  function getGenreNames(ids: number[]) {
    return ids.map(id => {
      const genre = genres.find((genre: Genre) => genre.id === id);
      if (genre) {
        return <Tag key={genre.id} text={genre.name}/>;
      }
      return null;
    }).filter(Boolean).slice(0,2);
  }

  function handleTrailerClick(id: number) {
    return async () => {
      await movieVideos.fetchMovieTrailers(id)
      const allVideos = movieVideos.movieTrailers
      const trailers = allVideos.filter((movie) => movie.type === "Trailer")
      const finalTrailer = trailers[0].key 
      console.log(finalTrailer);
    };
  }

  return(
    <article className={`embla__slide__number w-full h-96 md:h-[420px] lg:h-[556px] bg-cover bg-no-repeat bg-center relative ${screenSize === "sm" ? "px-2 pb-4" : "px-4 pb-8"}`} style={{backgroundImage: `url('${imgURL + movie.backdrop_path}')`}}>
      <div className="overlay px-4 pt-4 pb-8 lg:p-6 md:pb-10">
      <h2 className={`uppercase font-black ${league.className} md:text-2xl lg:text-4xl`}>{movie.title}</h2>
      <p className='text-sm font-normal text-gray text-balance line-clamp-6 lg:w-3/4 lg:text-wrap md:text-base'>{movie.overview}</p>
      <div className='flex gap-1 place-items-center text-xs font-light self-end md:self-start py-2 md:pt-2 md:pb-4 md:text-sm'>
        <Calendar 
          width={screenSize === "sm" ? "12" : "15"} 
          height={screenSize === "sm" ? "12" : "15"}
        />
        <span className='text-gray'>{formatDate(movie.release_date)}</span>
      </div>
      {screenSize && screenSize === "sm"
        ? <div className='flex items-baseline relative w-full justify-between'>
            <PrimaryButton 
              text={"Ver tráiler"} 
              img={
                <Play 
                  width={screenSize === "sm" ? "12" : "16"}
                  height={screenSize === "sm" ? "12" : "16"}
                  fill={"white"}
                />
              }
              title={"Ver tráiler"}
              onClick={handleTrailerClick(movie.id)}
            />
            <div className={`flex font-light ${screenSize === "sm" ? "gap-2 text-[10px]" : "gap-4 text-sm"}`}>
              {
                getGenreNames(movie.genre_ids)
              }
            </div>
          </div>
        : <>
            <div className={`flex ${screenSize === "sm" ? "gap-2" : "gap-4 mb-4 text-sm"}`}>
              {
                getGenreNames(movie.genre_ids)
              }
            </div>
            <PrimaryButton 
              text={"Ver tráiler"} 
              img={
                <Play 
                  width={screenSize === "sm" ? "12" : "16"}
                  height={screenSize === "sm" ? "12" : "16"}
                  fill={"white"}
                />
              }
              title={"Ver tráiler"}
              onClick={handleTrailerClick(movie.id)}
            />
          </>
      }
      </div>
    </article>
  )
}