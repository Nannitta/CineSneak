import { TagProps } from '@/types/types';

const Tag = ({ text }: TagProps) => {
  return(
    <p className='tag relative px-2 py-1 md:px-3 md:py-[5px] before:absolute before:inset-0 before:rounded-[0.35rem]'>
      {text}
    </p>
  );
};

export default Tag;