'use client';

import CheckWindowWidth from '@/hooks/useWindowWidth';
import { SvgProps } from '@/types/types';


export default function Logo({width, height, fill}: SvgProps) {
  const {screenSize} = CheckWindowWidth();  
  
  return(
    <div className={`flex place-items-center gap-4 ${screenSize === 'sm' ? 'gap-2' : 'gap-4'}`}>
      <svg version='1.0' xmlns='http://www.w3.org/2000/svg'
        width={width} height={height} viewBox='0 0 1280.000000 1280.000000'
        preserveAspectRatio='xMidYMid meet'>
        <g transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)'
          fill={fill} stroke='none'>
          <path d='M6020 12790 c-314 -20 -657 -66 -942 -127 l-78 -16 -58 -76 c-519
          -671 -854 -1838 -991 -3451 -49 -570 -63 -962 -62 -1670 1 -327 5 -623 9 -656
          l7 -61 574 994 574 995 86 55 c973 630 2143 1246 3066 1615 999 400 1824 590
          2498 577 97 -2 177 -2 176 1 -2 11 -261 245 -389 352 -564 469 -1217 844
          -1910 1096 -519 188 -1040 304 -1615 358 -192 17 -756 26 -945 14z'/>
          <path d='M4500 12513 c-999 -313 -1902 -861 -2638 -1602 -686 -690 -1191
          -1501 -1518 -2437 l-55 -158 32 -80 c211 -534 710 -1154 1429 -1774 783 -674
          1803 -1354 3034 -2021 52 -29 77 -38 73 -27 -6 16 -1025 1784 -1102 1911 -23
          39 -42 77 -42 85 0 8 -6 173 -13 365 -9 235 -11 542 -7 935 6 577 12 763 42
          1195 113 1607 435 2871 916 3598 22 32 39 60 39 63 0 7 -7 5 -190 -53z'/>
          <path d='M10375 10764 c-16 -2 -79 -9 -140 -15 -1004 -99 -2464 -665 -4049
          -1568 -215 -123 -673 -397 -729 -436 -19 -13 103 -15 1127 -15 l1149 0 186
          -97 c727 -377 1576 -889 2201 -1327 1206 -844 2027 -1659 2413 -2394 32 -62
          61 -112 62 -110 8 7 56 215 84 358 39 201 76 459 98 685 24 251 24 856 0 1110
          -81 843 -287 1571 -648 2295 -211 422 -444 789 -724 1137 -121 151 -280 335
          -300 345 -34 20 -281 38 -485 37 -118 -1 -228 -4 -245 -5z'/>
          <path d='M7943 8388 c3 -9 261 -458 573 -998 456 -790 568 -991 571 -1024 23
          -294 31 -1343 13 -1801 -55 -1424 -231 -2546 -535 -3400 -119 -333 -275 -658
          -417 -868 -22 -32 -38 -60 -36 -62 1 -2 86 23 188 54 1544 477 2861 1538 3668
          2956 181 318 371 739 497 1105 l46 134 -32 81 c-42 108 -161 337 -240 463
          -299 480 -830 1032 -1524 1587 -666 532 -1510 1087 -2430 1597 -331 183 -349
          192 -342 176z'/>
          <path d='M171 7873 c-207 -861 -225 -1817 -50 -2713 207 -1063 698 -2079 1403
          -2903 61 -71 122 -142 136 -159 46 -53 232 -73 589 -65 451 11 881 90 1475
          274 992 306 2248 907 3499 1674 l137 84 -1152 5 -1153 5 -160 84 c-2335 1226
          -4031 2592 -4627 3728 -33 62 -61 113 -63 113 -2 0 -17 -57 -34 -127z'/>
          <path d='M8320 5072 l-575 -995 -138 -89 c-641 -411 -1442 -859 -2121 -1184
          -1375 -660 -2519 -989 -3384 -973 -100 2 -182 2 -181 -1 1 -9 252 -236 362
          -329 1486 -1249 3432 -1750 5354 -1380 l162 31 59 77 c424 549 727 1431 897
          2616 73 514 117 1007 146 1655 11 268 13 1408 1 1506 l-7 62 -575 -996z'/>
        </g>
      </svg>
      { screenSize && screenSize !== 'sm'
        ? <h1
          className={screenSize === 'md' ? 'text-2xl font-nimbus h-[1.6rem]' : 'text-4xl font-nimbus h-[1.8rem]'}
        >
          CineSneak
        </h1> 
        : null
      }
    </div>
  );
};