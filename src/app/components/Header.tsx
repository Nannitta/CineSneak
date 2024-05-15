"use client"

import Logo from "./Logo";
import { Menu, Search, Avatar } from '../lib/Svg';
import PrimaryButton from './PrimaryButton';
import CheckWindowWidth from '../hooks/useWindowWidth';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const {screenSize} = CheckWindowWidth();
  const [color, setColor] = useState<string>("#D9D9D9");

  const handleMouseEnter = () => {
    setColor("white");
  };

  const handleMouseLeave = () => {
    setColor("#D9D9D9");
  };

  return(
    <header className='flex justify-between p-4'>
      <div className='flex place-items-center gap-2'>
        <Logo
          width={screenSize === "sm" ? "16" : (screenSize === "md" ? "25" : "40")}
          height={screenSize === "sm" ? "16" : (screenSize === "md" ? "25" : "40")}
          fill={"white"}
        />
        { screenSize &&
          (screenSize !== "sm")
            ? null
            : <button><Menu/></button>
        }
      </div>
      { screenSize &&
        screenSize !== "sm"
          ? <ul className='flex place-items-center gap-5 *:text-gray'>
              <li className='hover:text-white'><Link href={"/"}>Home</Link></li>
              <li className='hover:text-white'><Link href={"/"}>Películas</Link></li>
              <li className='hover:text-white'><Link href={"/"}>Series</Link></li>
            </ul>
          : null
      }
      <div className='flex place-items-center gap-4'>
        <button>
          <Search 
            width={screenSize === "sm" ? "16" : "24"}
            height={screenSize === "sm" ? "16" : "24"}
            color={color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </button>
        <PrimaryButton 
          text={"Inc. sesión"} 
          img={
            <Avatar 
              width={screenSize === "sm" ? "12" : "16"}
              height={screenSize === "sm" ? "12" : "16"}
              fill={"white"}
            />
          }/>
      </div>
    </header>
  );
};