'use client';

import { useEffect, useState } from 'react';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { usePathname } from 'next/navigation';
import { useInPictureModeStore } from '@/store/inPictureMode';
import { useMoviesStore } from '@/store/movies';
import { useSeriesStore } from '@/store/series';
import BlockScroll from '@/components/BlockScroll';
import { Close } from '@/lib/Svg';

interface TrailerDetails {
  isSerie: boolean
}

const WatchTrailer = ({ isSerie }: TrailerDetails) => {
  const { 
    movieTrailer,
    resetMovieTrailer 
  } = useMoviesStore(state => state);

  const {
    serieTrailer,
    resetSerieTrailer
  } = useSeriesStore(state => state);

  const { 
    minimizePictureMode,
    closePictureMode,
    isMinimize,
    isInPictureMode,
    isHover,
    setHover
  } = useInPictureModeStore(state => state);

  const {screenSize} = CheckWindowWidth();

  const pathName = usePathname();
  const [oldPathName, setOldPathName] = useState<string>('');

  useEffect(() => {
    if(pathName !== oldPathName) {
      if(isSerie) resetSerieTrailer();
      if(!isSerie) resetMovieTrailer();
      closePictureMode();
    } else {
      setOldPathName(pathName);
    }
  },[pathName, oldPathName, closePictureMode, resetMovieTrailer, resetSerieTrailer, isSerie]);

  const handleClose = (isSerie: boolean) => {
    if(isSerie) resetSerieTrailer();
    if(!isSerie) resetMovieTrailer();
    closePictureMode();
  };

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);  

  if(movieTrailer !== '' || serieTrailer !== '') {
    return(
      <div>
        <BlockScroll isModalOpen={isInPictureMode && !isMinimize}/>
        {
          isMinimize
            ? <div onClick={() => handleClose(isSerie)} onTouchStart={() =>handleClose(isSerie)}
              className={`${screenSize === 'sm' 
                ? 'fixed bottom-[250px] right-0 bg-black z-40' 
                : screenSize === 'md'
                  ? 'fixed bottom-[300px] right-0 bg-black z-40' 
                  : ((screenSize === 'lg' || screenSize === 'laptop') && isHover ) 
                    ? 'items-center justify-center fixed bottom-[89px] right-[144px] z-40 md:bottom-[114px] md:right-[214px] lg:bottom-[89px] lg:right-[189px] lg:bg-black lg:bg-opacity-40 lg:rounded-full lg:p-2 cursor-pointer' 
                    : 'hidden'
              }`}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
              <Close width='36' height='36' fill='white'/>
            </div>
            : null
        }
        <aside className={`${(movieTrailer === '' && serieTrailer === '') || isInPictureMode === false 
          ? 'hidden' 
          : (isMinimize 
            ? 'flex fixed bottom-0 right-0 z-30' 
            : 'w-full h-screen flex fixed inset-0 z-30 bg-black bg-opacity-80 items-center justify-center')}
          fade-in`
        } 
        onClick={minimizePictureMode}
        >
          <div className={`min-w-[360px] max-w-[1000px] 
          ${screenSize === 'sm' ? 'h-[250px] w-full' 
        : (screenSize === 'md' ? (isMinimize === false ? 'h-[400px] w-[80%]' : 'h-[300px] w-[500px]') 
          : (isMinimize === false ? 'h-[560px] w-[80%]' : 'h-[250px] w-[450px]'))}`} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
            <iframe
              id='youtube-iframe'
              width={'100%'}
              height={'100%'}
              src={`https://www.youtube.com/embed/${isSerie ? serieTrailer : movieTrailer}?enablejsapi=1&autoplay=1`}
              encrypted-media={'true'}
              allowFullScreen
              allow='autoplay'
            >
            </iframe>
          </div>
        </aside>
      </div>
    );
  }

  return null;
};

export default WatchTrailer;