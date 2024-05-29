'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import { Figma, Github, Gmail, Linkedin } from '@/lib/Svg';
import Logo from '@/components/Logo';

export default function Footer() {
  const {screenSize} = CheckWindowWidth();  

  return(
    <footer className='flex flex-col place-items-center gap-4 p-4 md:flex-row md:gap-36 md:pb-6 lg:items-start lg:gap-32 lg:py-6 lg:px-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-32'>
        <div className='flex font-nimbus h-[1.3rem] gap-2'>
          <Logo
            width={screenSize === 'sm' ? '16' : (screenSize === 'md' ? '25' : '40')}
            height={screenSize === 'sm' ? '16' : (screenSize === 'md' ? '25' : '40')}
            fill={'white'}
          />
          {
            screenSize && screenSize === 'sm' ? 'CineSneak' : null
          }
        </div>
        <div className='flex flex-col'>
          <h3 className='font-bold text-xs md:text-sm lg:min-w-max'>DESARROLLADO CON</h3>
          <ul className='*:text-[10px] *:text-center *:pt-2 *:text-gray *:md:text-left *:md:text-sm *:lg:pt-4'>
            <li>React.js</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col gap-4 place-items-center md:place-items-start lg:flex-row lg:gap-32'>
        <div className='flex flex-col gap-4'>
          <h3 className='font-bold text-xs text-center md:text-left lg:text-center md:text-sm'>CONTÁCTAME</h3>
          <ul className='flex gap-6'>
            <li>
              <Github
                width={screenSize === 'sm' ? '16' : '24'}
                height={screenSize === 'sm' ? '16' : '24'}
                fill={screenSize === 'sm' ? 'white' : '#C3C3C3'}
              />
            </li>
            <li>
              <Linkedin
                width={screenSize === 'sm' ? '16' : '24'}
                height={screenSize === 'sm' ? '16' : '24'}
                fill={screenSize === 'sm' ? 'white' : '#C3C3C3'}
              />
            </li>
            <li>
              <Gmail
                width={screenSize === 'sm' ? '16' : '24'}
                height={screenSize === 'sm' ? '16' : '24'}
                fill={screenSize === 'sm' ? 'white' : '#C3C3C3'}
              />
            </li>
            <li>
              <Figma
                width={screenSize === 'sm' ? '16' : '24'}
                height={screenSize === 'sm' ? '16' : '24'}
                fill={screenSize === 'sm' ? 'white' : '#C3C3C3'}
              />
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='font-bold text-xs text-center md:text-left md:text-sm'>POR QUÉ CINESNEAK</h3>
          <p className='text-[10px] text-gray text-center leading-5 font-light md:text-left md:text-sm md:text-balance lg:leading-7'>CineSneak ha sido creada con el propósito de aprender y desarrollar nuevas habilidades. A través de esta plataforma, he buscado expandir mi conocimiento tecnológico mientras construyo una experiencia de entretenimiento digital para ti.</p>
        </div>
      </div>
    </footer>
  );
};