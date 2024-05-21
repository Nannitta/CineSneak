import { SvgProps } from '../types/types';
import Link from 'next/link';

export function Menu() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="#FFFFFF" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"/>
    </svg>
  );
};

export function Search({width, height, color, onMouseEnter, onMouseLeave}: SvgProps) {
  return(
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 256 256">
        <path fill={color} d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"/>
      </svg>
    </div>
  );
};

export function Avatar({width, height, fill}: SvgProps) {
  return(
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6667 4.66667C10.6667 5.37391 10.3857 6.05219 9.88561 6.55229C9.38552 7.05238 8.70724 7.33333 8 7.33333C7.29275 7.33333 6.61447 7.05238 6.11438 6.55229C5.61428 6.05219 5.33333 5.37391 5.33333 4.66667C5.33333 3.95942 5.61428 3.28115 6.11438 2.78105C6.61447 2.28095 7.29275 2 8 2C8.70724 2 9.38552 2.28095 9.88561 2.78105C10.3857 3.28115 10.6667 3.95942 10.6667 4.66667ZM8 9.33333C6.76232 9.33333 5.57533 9.825 4.70016 10.7002C3.82499 11.5753 3.33333 12.7623 3.33333 14H12.6667C12.6667 12.7623 12.175 11.5753 11.2998 10.7002C10.4247 9.825 9.23767 9.33333 8 9.33333Z" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    </svg>
  );
};

export function Github({width, height, fill}: SvgProps) {
  return(
    <Link href={"https://github.com/Nannitta"} target='_blank' title='GitHub'>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32">
        <path fill={fill} d="M16 .396c-8.839 0-16 7.167-16 16c0 7.073 4.584 13.068 10.937
        15.183c.803.151 1.093-.344 1.093-.772c0-.38-.009-1.385-.015-2.719c-4.453.964-5.391-2.151-5.391-2.151c-.729-1.844-1.781-2.339-1.781-2.339c-1.448-.989.115-.968.115-.968c1.604.109
        2.448 1.645 2.448 1.645c1.427 2.448 3.744 1.74 4.661 1.328c.14-1.031.557-1.74
        1.011-2.135c-3.552-.401-7.287-1.776-7.287-7.907c0-1.751.62-3.177 1.645-4.297c-.177-.401-.719-2.031.141-4.235c0
        0 1.339-.427 4.4 1.641a15.436 15.436 0 0 1 4-.541c1.36.009 2.719.187 4 .541c3.043-2.068
        4.381-1.641 4.381-1.641c.859 2.204.317 3.833.161 4.235c1.015 1.12 1.635 2.547 1.635
        4.297c0 6.145-3.74 7.5-7.296 7.891c.556.479 1.077 1.464 1.077 2.959c0 2.14-.02 3.864-.02
        4.385c0 .416.28.916 1.104.755c6.4-2.093 10.979-8.093 10.979-15.156c0-8.833-7.161-16-16-16z"/>
      </svg>
    </Link>
  );
};

export function Linkedin({width, height, fill}: SvgProps) {
  return(
    <Link href={"https://www.linkedin.com/in/nairglez/"} target='_blank' title='Linkedin'>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
        <path fill={fill} d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 
        .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 
        0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 
        1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 
        1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 
        1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    </Link>
  );
};

export function Gmail({width, height, fill}: SvgProps) {
  return(
    <Link href={"mailto:nanaa.gonzalez@gmail.com"} title='Email'>
      <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.32 7.28V9.46667H13.5467C13.3867 10.6933 12.978 11.5913 12.3553 12.222C11.5907 12.9867 10.4 13.822 8.32 13.822C5.102 13.822 2.58667 11.2267 2.58667 8.00867C2.58667 4.79067 5.102 2.19533 8.32 2.19533C10.0533 2.19533 11.3247 2.88 12.258 3.76L13.796 2.222C12.498 0.96 10.7553 0 8.32 0C3.91133 0 0.204666 3.59133 0.204666 8C0.204666 12.4087 3.91133 16 8.32 16C10.702 16 12.498 15.218 13.902 13.76C15.342 12.32 15.7953 10.2847 15.7953 8.64867C15.7953 8.142 15.76 7.67067 15.68 7.28H8.32Z" fill={fill}/>
      </svg>
    </Link>
  );
};

export function Figma({width, height, fill}: SvgProps) {
  return(
    <Link href={"https://www.figma.com/@nairgonzalez"} target='_blank' title='Figma Community'>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 256 256">
        <path fill={fill} d="M192 96a40 40 0 0 0-24-72H96a40 40 0 0 0-24 72a40 40 0 0 0 1.37 65A44 44 0 1 0 144 196v-36a40 40 0 1 0 48-64m0-32a24 24 0 0 1-24 24h-24V40h24a24 24 0 0 1 24 24M72 64a24 24 0 0 1 24-24h32v48H96a24 24 0 0 1-24-24m24 88a24 24 0 0 1 0-48h32v48zm32 44a28 28 0 1 1-28-28h28Zm40-44a24 24 0 1 1 24-24a24 24 0 0 1-24 24"/>
      </svg>
    </Link>
  );
};

export function Calendar({width, height}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill="#C3C3C3" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/>
    </svg>
  );
};

export function Play({width, height, fill}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/>
    </svg>
  );
};

export function Close({width, height, fill}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/>
    </svg>
  )
}