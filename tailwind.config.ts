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
      black: '#000000',
      transparent: '#00000000',
      error: '#EF5350',
      skeleton: '#0D001670'
    },
    extend: {
      backgroundImage: {
        'gradientButton': 'linear-gradient(263deg, #7209b7 0%, #4361ee 51.5%, #4cc9f0 100%)',
        'gradientSkeleton': 'linear-gradient(to right, #0D001670 8%, #4361ee1f 18%, #0D001670 33%)'
      },
      backgroundSize: {
        'bgSizeGradient': '200% 100%',
      },
      fontFamily: {
        'nimbus': ['Nimbus']
      },
      gridTemplateColumns: {
        'top-rated': '448px 293px 459px 293px 293px',
        'movie-details-sm': '160px 1fr 50px',
        'movie-details-md': '160px 1fr 72px',
        'movie-details-lg': '340px 640px 49px 1fr'
      },
      gridTemplateRows: {
        'top-rated': '256px 175px 97px 81px 256px',
        'movie-details-sm': '72px 105px 20px 35px 34px',
        'movie-details-md': '77px 101px 20px 34px 55px',
        'movie-details-laptop': '127px 34px 20px 34px 213px 28px 36px 56px 160px',
        'movie-details-lg': '127px 34px 20px 34px 213px 26px 36px'
      },
      screens: {
        'laptop': {'min': '1366px', 'max': '1538px'}
      }
    },
  },
  plugins: [],
};
export default config;
