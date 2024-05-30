'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import { useInPictureModeStore } from '@/store/inPictureMode';
import { useMoviesStore } from '@/store/movies';
import { Close } from '@/lib/Svg';

export default function WatchTrailer() {
  const movieTrailer = useMoviesStore(state => state.movieTrailer);
  const resetMovieTrailer = useMoviesStore(state => state.resetMovieTrailer);
  const minimizePictureMode = useInPictureModeStore(state => state.minimizePictureMode);
  const closePictureMode = useInPictureModeStore(state => state.closePictureMode);
  const isMinimize = useInPictureModeStore(state => state.isMinimize);
  const isInPictureMode = useInPictureModeStore(state => state.isInPictureMode);
  const isHover = useInPictureModeStore(state => state.isHover);
  const setHover = useInPictureModeStore(state => state.setHover);
  const {screenSize} = CheckWindowWidth();

  const handleClose = () => {
    closePictureMode();
    resetMovieTrailer();
  };

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return(
    <div>
      {
        isMinimize
          ? <div onClick={handleClose} onTouchStart={handleClose}
            className={`${screenSize === 'sm' && !isHover ? 'fixed bottom-[250px] right-0 bg-black z-40' : (screenSize === 'md' && !isHover) ? 'fixed bottom-[300px] right-0 bg-black' : ((screenSize === 'lg' || screenSize === 'laptop') && isHover ) ? 'items-center justify-center fixed bottom-[89px] right-[144px] z-40 md:bottom-[114px] md:right-[214px] lg:bottom-[89px] lg:right-[189px] lg:bg-black lg:bg-opacity-40 lg:rounded-full lg:p-2 cursor-pointer' : 'hidden'}`}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          >
            <Close width='36' height='36' fill='white'/>
          </div>
          : null
      }
      <aside className={`${movieTrailer === '' || isInPictureMode === false ? 'hidden' : (isMinimize ? 'flex fixed bottom-0 right-0 z-30' : 'w-full h-screen flex fixed inset-0 z-10 bg-black bg-opacity-80 items-center justify-center')} fade-in`} onClick={minimizePictureMode}>
        <div className={`min-w-[360px] max-w-[1000px] 
          ${screenSize === 'sm' ? 'h-[250px] w-full' 
      : (screenSize === 'md' ? (isMinimize === false ? 'h-[700px] w-[80%]' : 'h-[300px] w-[500px]') 
        : (isMinimize === false ? 'h-[560px] w-[80%]' : 'h-[250px] w-[450px]'))}`} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
          <iframe
            id='youtube-iframe'
            width={'100%'}
            height={'100%'}
            src={`https://www.youtube.com/embed/${movieTrailer}?enablejsapi=1&autoplay=1`}
            encrypted-media={'true'}
            allowFullScreen
          >
          </iframe>
        </div>
      </aside>
    </div>
  );
};