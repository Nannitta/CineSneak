"use client"

import Logo from "./Logo";
import { Menu, Search, Avatar } from '../lib/Svg';
import PrimaryButton from './PrimaryButton';
import CheckWindowWidth from '../hooks/useWindowWidth';

export default function Header() {
  const {screenSize} = CheckWindowWidth();

  return(
    <header className='flex justify-between p-4'>
      <div className='flex place-items-center gap-2'>
        <Logo
          width={screenSize === "sm" ? "16" : (screenSize === "md" ? "25" : "40")}
          height={screenSize === "sm" ? "16" : (screenSize === "md" ? "25" : "40")}
          fill={"white"}
        />
        { screenSize &&
          (screenSize === "md" || screenSize === "lg")
            ? null
            : <button><Menu/></button>
        }
      </div>
      { screenSize &&
        screenSize !== "sm"
          ? <ul className='flex place-items-center gap-5 *:text-gray cursor-pointer'>
              <li className='hover:text-white'>Home</li>
              <li className='hover:text-white'>Películas</li>
              <li className='hover:text-white'>Series</li>
            </ul>
          : null
      }
      <div className='flex place-items-center gap-4'>
        <button>
          <Search width={"16"} height={"16"} fill={"#D9D9D9"}/>
        </button>
        <PrimaryButton text={"Inc. sesión"} img={<Avatar width={"12"} height={"12"} fill={"white"}/>}/>
      </div>
    </header>
  );
};