import { ButtonProps } from '../types/types';

export default function Button({ text, img }: ButtonProps) {
  return(
    <button className="flex place-items-center px-2 py-[0.3rem] gap-2 bg-gradient-to-r from-lightBlue from-0% via-neonBlue via-51.5% to-purple to-100% rounded text-xs font-semibold">
      {img}
      {text}
    </button>
  );
};