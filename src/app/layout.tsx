import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import SearchMenu from '@/components/SearchMenu';
import Footer from '@/components/Footer';
import './globals.css';

const onest = Onest({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineSneak | Todo sobre películas y series',
  description: 'Descubre información actualizada sobre películas y series: desde estrenos y próximos lanzamientos hasta clásicos inolvidables. Consulta en qué plataformas se transmiten y regístrate para guardar tus favoritas.',
  openGraph: {
    title: 'CineSneak | Todo sobre películas y series',
    description: 'Descubre información actualizada sobre películas y series: desde estrenos y próximos lanzamientos hasta clásicos inolvidables. Consulta en qué plataformas se transmiten y regístrate para guardar tus favoritas.',
    url: 'https://cinesneak.vercel.app',
    siteName: 'CineSneak',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dx12cvidp/image/upload/v1741363055/portada_y9dsjl.png',
        alt: 'Portada',
        width: 1800,
        height: 1600,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineSneak',
    description: 'Descubre información actualizada sobre películas y series: desde estrenos y próximos lanzamientos hasta clásicos inolvidables. Consulta en qué plataformas se transmiten y regístrate para guardar tus favoritas.',
    images: {
      url: 'https://res.cloudinary.com/dx12cvidp/image/upload/v1741363055/portada_y9dsjl.png',
      alt: 'Portada'
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='min-h-screen'>
      <body className={`${onest.className} min-h-screen flex flex-col text-white my-0 mx-auto max-w-[1920px] bg-gradient-to-b from-black to-[#0D0016]`}>
        <Header/>
        <SideMenu/>
        <SearchMenu/>
        {children}
        <Footer/>
      </body>
    </html>
  );
};
