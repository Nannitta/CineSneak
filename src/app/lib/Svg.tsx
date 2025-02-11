import { SvgProps } from '@/types/types';
import Link from 'next/link';

export function Menu() {
  return(
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
      <path fill='#FFFFFF' d='M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1'/>
    </svg>
  );
};

export function Search({width, height, color, onMouseEnter, onMouseLeave}: SvgProps) {
  return(
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 256 256'>
        <path fill={color} d='M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68'/>
      </svg>
    </div>
  );
};

export function Avatar({width, height, fill}: SvgProps) {
  return(
    <svg width={width} height={height} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10.6667 4.66667C10.6667 5.37391 10.3857 6.05219 9.88561 6.55229C9.38552 7.05238 8.70724 7.33333 8 7.33333C7.29275 7.33333 6.61447 7.05238 6.11438 6.55229C5.61428 6.05219 5.33333 5.37391 5.33333 4.66667C5.33333 3.95942 5.61428 3.28115 6.11438 2.78105C6.61447 2.28095 7.29275 2 8 2C8.70724 2 9.38552 2.28095 9.88561 2.78105C10.3857 3.28115 10.6667 3.95942 10.6667 4.66667ZM8 9.33333C6.76232 9.33333 5.57533 9.825 4.70016 10.7002C3.82499 11.5753 3.33333 12.7623 3.33333 14H12.6667C12.6667 12.7623 12.175 11.5753 11.2998 10.7002C10.4247 9.825 9.23767 9.33333 8 9.33333Z' stroke={fill} strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'/>
    </svg>
  );
};

export function Github({width, height, fill}: SvgProps) {
  return(
    <Link href={'https://github.com/Nannitta'} target='_blank' title='GitHub'>
      <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 32 32'>
        <path fill={fill} d='M16 .396c-8.839 0-16 7.167-16 16c0 7.073 4.584 13.068 10.937
        15.183c.803.151 1.093-.344 1.093-.772c0-.38-.009-1.385-.015-2.719c-4.453.964-5.391-2.151-5.391-2.151c-.729-1.844-1.781-2.339-1.781-2.339c-1.448-.989.115-.968.115-.968c1.604.109
        2.448 1.645 2.448 1.645c1.427 2.448 3.744 1.74 4.661 1.328c.14-1.031.557-1.74
        1.011-2.135c-3.552-.401-7.287-1.776-7.287-7.907c0-1.751.62-3.177 1.645-4.297c-.177-.401-.719-2.031.141-4.235c0
        0 1.339-.427 4.4 1.641a15.436 15.436 0 0 1 4-.541c1.36.009 2.719.187 4 .541c3.043-2.068
        4.381-1.641 4.381-1.641c.859 2.204.317 3.833.161 4.235c1.015 1.12 1.635 2.547 1.635
        4.297c0 6.145-3.74 7.5-7.296 7.891c.556.479 1.077 1.464 1.077 2.959c0 2.14-.02 3.864-.02
        4.385c0 .416.28.916 1.104.755c6.4-2.093 10.979-8.093 10.979-15.156c0-8.833-7.161-16-16-16z'/>
      </svg>
    </Link>
  );
};

export function Linkedin({width, height, fill}: SvgProps) {
  return(
    <Link href={'https://www.linkedin.com/in/nairglez/'} target='_blank' title='Linkedin'>
      <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 16 16'>
        <path fill={fill} d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 
        .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 
        0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 
        1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 
        1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 
        1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z'/>
      </svg>
    </Link>
  );
};

export function Gmail({width, height, fill}: SvgProps) {
  return(
    <Link href={'mailto:nanaa.gonzalez@gmail.com'} title='Email'>
      <svg width={width} height={height} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M8.32 7.28V9.46667H13.5467C13.3867 10.6933 12.978 11.5913 12.3553 12.222C11.5907 12.9867 10.4 13.822 8.32 13.822C5.102 13.822 2.58667 11.2267 2.58667 8.00867C2.58667 4.79067 5.102 2.19533 8.32 2.19533C10.0533 2.19533 11.3247 2.88 12.258 3.76L13.796 2.222C12.498 0.96 10.7553 0 8.32 0C3.91133 0 0.204666 3.59133 0.204666 8C0.204666 12.4087 3.91133 16 8.32 16C10.702 16 12.498 15.218 13.902 13.76C15.342 12.32 15.7953 10.2847 15.7953 8.64867C15.7953 8.142 15.76 7.67067 15.68 7.28H8.32Z' fill={fill}/>
      </svg>
    </Link>
  );
};

export function Figma({width, height, fill}: SvgProps) {
  return(
    <Link href={'https://www.figma.com/@nairgonzalez'} target='_blank' title='Figma Community'>
      <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 256 256'>
        <path fill={fill} d='M192 96a40 40 0 0 0-24-72H96a40 40 0 0 0-24 72a40 40 0 0 0 1.37 65A44 44 0 1 0 144 196v-36a40 40 0 1 0 48-64m0-32a24 24 0 0 1-24 24h-24V40h24a24 24 0 0 1 24 24M72 64a24 24 0 0 1 24-24h32v48H96a24 24 0 0 1-24-24m24 88a24 24 0 0 1 0-48h32v48zm32 44a28 28 0 1 1-28-28h28Zm40-44a24 24 0 1 1 24-24a24 24 0 0 1-24 24'/>
      </svg>
    </Link>
  );
};

export function Calendar({width, height}: SvgProps) {
  return(
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path fill='#C3C3C3' d='M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z'/>
    </svg>
  );
};

export function Play({width, height, fill}: SvgProps) {
  return(
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path fill={fill} d='M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712'/>
    </svg>
  );
};

export function Close({width, height, fill}: SvgProps) {
  return(
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path fill={fill} d='m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'/>
    </svg>
  );
}

export function InPicture({width, height, fill}: SvgProps) {
  return(
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <g fill={fill}>
        <path d='M20 12h-6v5h6z'/>
        <path fillRule='evenodd' d='M1 6a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2 0h18v12H3z' clip-rule='evenodd'/>
      </g>
    </svg>
  );
}

export function Plus({width, height, fill}: SvgProps) {
  return(
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path fill={fill} stroke={fill} d='M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z'/>
    </svg>
  );
}

export function RightArrow({width, height, fill}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} stroke={fill} d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42"/>
    </svg>
  );
}

export function Clock({width, height}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill="#C3C3C3" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34M12 6a1 1 0 0 0-.993.883L11 7v5l.009.131a1 1 0 0 0 .197.477l.087.1l3 3l.094.082a1 1 0 0 0 1.226 0l.094-.083l.083-.094a1 1 0 0 0 0-1.226l-.083-.094L13 11.585V7l-.007-.117A1 1 0 0 0 12 6"/>
    </svg>
  );
}

export function Star({width, height, fill}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/>
    </svg>
  );
}

export function LoadingSpinner() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g>
        <circle cx="3" cy="12" r="2" fill="#C3C3C3"/>
        <circle cx="21" cy="12" r="2" fill="#C3C3C3"/>
        <circle cx="12" cy="21" r="2" fill="#C3C3C3"/>
        <circle cx="12" cy="3" r="2" fill="#C3C3C3"/>
        <circle cx="5.64" cy="5.64" r="2" fill="#C3C3C3"/>
        <circle cx="18.36" cy="18.36" r="2" fill="#C3C3C3"/>
        <circle cx="5.64" cy="18.36" r="2" fill="#C3C3C3"/>
        <circle cx="18.36" cy="5.64" r="2" fill="#C3C3C3"/>
        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
      </g>
    </svg>
  );
}

export function Error({width, height, fill}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.493 2 11.953 2M12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8"/>
      <path fill={fill} d="M11 7h2v7h-2zm0 8h2v2h-2z"/>
    </svg>
  );
}

export function Clapperboard () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width='100' height='100' viewBox="0 0 512 512">
      <path fill='#fff' d="m419.682 26.2l-8.66 2.452L32.915 135.81L55.27 214.7l386.77-109.608zm-12.41 22.224l9.074 
      32.014l-41.086-22.942zM350.77 64.438l56.8 31.714l-37.084 10.51l-56.8-31.715l37.084-10.51zm-61.577 17.45l56.803 31.716l-37.084 
      10.51l-56.8-31.718l37.08-10.51zm-61.574 17.45l56.802 31.715l-37.084 10.51l-56.803-31.715l37.084-10.51zm-61.577 17.45l56.803 
      31.716l-37.084 10.51l-56.8-31.717l37.08-10.51zm-61.574 17.45l56.8 31.715l-37.083 10.51l-56.802-31.715l37.084-10.51zm-45.86 
      26.227l41.085 22.94l-32.01 9.072zM55 215v274h402V215zm18 18h33.273L73 266.273zm58.727 0h38.546l-46 46H85.727zm64 0h38.546l-46 
      46h-38.546zm64 0h38.546l-46 46h-38.546zm64 0h38.546l-46 46h-38.546zm64 0h38.546l-46 46h-38.546zM439 245.727V279h-33.273zM73 
      297h366v174H73zm248.635 46.57l-192.44.703l.067 18l192.44-.703zM130.7 391.33l-.134 17.998l92.707.703l.137-18zm127.155.7l-.2 18l63.913.702l.2-17.998l-63.913-.703z"/>
    </svg>
  );
}

export function FilmSpool ({ width, height }: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512">
      <path fill="#fff" d="M208 25C106.8 25 25 106.8 25 208s81.8 183 183 183s183-81.8 183-183S309.2 25 208 25m121.3 22.81c21 15.91 
      38.7 35.83 52.1 58.59c49.1 41.7 93.4 100.9 92 179.2c-.6 34.4-7.3 75.5-19.4 110.3c-12.1 34.7-30.1 62.3-49.7 
      71.7c-3.9 1.8-9.5 2.2-17.5.6c-8-1.7-17.9-5.3-29.3-10c-22.7-9.5-51.2-23.4-84.2-33.5c-66.2-20.1-152-24.2-247.5 50.6l11.1 14.2c91.2-71.5 
      168.3-66.7 231.1-47.6c31.4 9.6 59 23 82.6 32.9c11.7 4.9 22.5 8.9 32.6 11s20 2.3 28.9-2c27.5-13.1 46-45.1 58.9-82s19.8-79.5 
      20.4-115.8c1.6-92.8-55.5-160.5-111.9-204.3c-17.2-13.42-34.5-24.69-50.2-33.89M208 52q24 0 48 12c0 32-32 80-48 80s-48-48-48-80q24-12 48-12M107.4 
      94.4c27.7 16 53.3 67.7 45.4 81.6c-8.1 13.8-65.6 17.5-93.33 1.5c2.14-35.7 18.13-63.4 47.93-83.1m201.2 0q44.85 29.55 48 83.1c-27.7 16-85.3 
      12.3-93.3-1.5c-8-13.9 17.6-65.6 45.3-81.6M208 167c22.5 0 41 18.5 41 41s-18.5 41-41 41s-41-18.5-41-41s18.5-41 41-41m0 18c-12.8 0-23 10.2-23 
      23s10.2 23 23 23s23-10.2 23-23s-10.2-23-23-23m-98.1 42.8c20.3.2 38.6 4.7 42.9 12c7.9 13.9-17.7 65.6-45.4 81.6c-29.83-19.7-45.83-47.4-47.97-83.1c12.97-7.5 
      32.52-10.7 50.47-10.5m196.2 0c18-.2 37.5 3 50.5 10.5q-3.15 53.55-48 83.1c-27.7-16-53.3-67.7-45.3-81.6c4.3-7.3 22.5-11.8 42.8-12M208 271.7c16 .1 48 48.1 48 80.1q-48 24-96 0c0-32 32-80 48-80.1"/>
    </svg>
  );
}

export function Arrow () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
      <path fill="#fff" fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10m-13.53-.47a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-1.72-1.72V16a.75.75 0 0 1-1.5 0V9.81l-1.72 1.72a.75.75 0 0 1-1.06 0" clipRule="evenodd"/>
    </svg>
  );
}

export function Google () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128">
      <path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/>
      <path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/>
      <path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/>
      <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/>
    </svg>
  );
}

export function Eye () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className='absolute right-0 cursor-pointer'>
      <g fill="none" stroke="#C3C3C3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#C3C3C3">
        <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/>
        <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/>
      </g>
    </svg>
  );
}

export function EyeOff () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className='absolute right-0 cursor-pointer'>
      <path fill="none" stroke="#C3C3C3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M22 8s-4 6-10 6S2 8 2 8m13 5.5l1.5 2.5m3.5-5l2 2M2 13l2-2m5 2.5L7.5 16" color="#C3C3C3"/>
    </svg>
  );
}