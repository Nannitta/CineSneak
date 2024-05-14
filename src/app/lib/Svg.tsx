import { SvgProps } from '../types/types';

export function Menu() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path fill="#D9D9D9" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"/>
    </svg>
  );
};

export function Search({width, height, fill}: SvgProps) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 256 256">
      <path fill={fill} d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"/>
    </svg>
  );
};

export function Avatar({width, height, fill}: SvgProps) {
  return(
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6667 4.66667C10.6667 5.37391 10.3857 6.05219 9.88561 6.55229C9.38552 7.05238 8.70724 7.33333 8 7.33333C7.29275 7.33333 6.61447 7.05238 6.11438 6.55229C5.61428 6.05219 5.33333 5.37391 5.33333 4.66667C5.33333 3.95942 5.61428 3.28115 6.11438 2.78105C6.61447 2.28095 7.29275 2 8 2C8.70724 2 9.38552 2.28095 9.88561 2.78105C10.3857 3.28115 10.6667 3.95942 10.6667 4.66667ZM8 9.33333C6.76232 9.33333 5.57533 9.825 4.70016 10.7002C3.82499 11.5753 3.33333 12.7623 3.33333 14H12.6667C12.6667 12.7623 12.175 11.5753 11.2998 10.7002C10.4247 9.825 9.23767 9.33333 8 9.33333Z" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    </svg>
  );
};