'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import { TagProps } from '@/types/types';

export default function Tag({ text }: TagProps) {
  const {screenSize} = CheckWindowWidth();

  return(
    <p className={`${screenSize === 'sm' ? 'px-2 py-1' : 'px-3 py-[5px]'}
    tag relative`}>
      {text}
    </p>
  );
};