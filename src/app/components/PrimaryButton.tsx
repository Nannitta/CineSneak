import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  text: string
  img: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, img, onClick }: ButtonProps) {
  return(
    <button className='primaryButton flex place-items-center gap-2 bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded font-semibold relative text-xs px-2 py-[0.3rem] lg:text-sm lg:px-4 lg:py-2
    before:lg:absolute before:lg:z-[-1] before:lg:inset-0 before:lg:bg-gradientButton before:lg:rounded before:lg:hover:blur-[8px]'
    onClick={onClick}
    >
      {img}
      {text}
    </button>
        
  );
};