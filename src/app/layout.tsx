import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import SearchMenu from '@/components/SearchMenu';
import Footer from '@/components/Footer';
import './globals.css';

const onest = Onest({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineSneak',
  description: '',
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
