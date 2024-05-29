'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import { ButtonProps } from '@/types/types';

export default function Button({ text, img, onClick }: ButtonProps) {
  const {screenSize} = CheckWindowWidth();

  return(
    <>
      { screenSize &&
          screenSize === 'lg' || screenSize === 'laptop'
        ? <button className={'primaryButton flex place-items-center gap-2 bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded text-sm px-4 py-2 font-semibold relative'}
          title={text}
          onClick={onClick}
        >
          {img}
          {text}
        </button>
        : <button className={`flex place-items-center gap-2 bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded 
                ${screenSize !== 'sm' ? 'text-sm px-4 py-2' : 'text-xs px-2 py-[0.3rem]'}
                font-semibold`}
        title={text}
        onClick={onClick}
        >
          {img}
          {text}
        </button>
      }
    </>
  );
};