import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineSneak",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='min-h-screen'>
      <body className={`${onest.className} min-h-screen flex flex-col`}>
        <Header/>
        <SideMenu/>
        {children}
        <Footer/>
      </body>
    </html>
  );
};
