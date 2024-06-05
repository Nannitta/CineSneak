import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray:'#C3C3C3',
      purple: '#7209B7',
      neonBlue: '#4361EE',
      lightBlue: '#4CC9F0',
      white: '#FFFFFF',
      black: '#000000'
    },
    extend: {
      fontFamily: {
        'nimbus': ['Nimbus']
      },
      gridTemplateColumns: {
        'top-rated': '448px 293px 459px 293px 293px',
        'movie-details': '160px 1fr 50px'
      },
      gridTemplateRows: {
        'top-rated': '256px 175px 97px 81px 256px',
        'movie-details': '72px 116px 20px 24px 34px'
      }
    },
  },
  plugins: [],
};
export default config;
