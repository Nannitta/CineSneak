import { useEffect, useState } from 'react';

function CheckWindowWidth() {
  const [screenSize, setScreenSize] = useState<string>('');
  const [screenWidth, setScreenWidth] = useState<number>(0);
  
  useEffect(() => {
    const handleSize = async () => {
      const screenWidth: number = window.innerWidth;          

      if(screenWidth < 768) {       
        setScreenSize('sm');      
      } else if(screenWidth >= 768 && screenWidth <= 1024) {
        setScreenSize('md');
      } else if(screenWidth >= 1024 && screenWidth < 1920){
        setScreenSize('laptop');
      } else {
        setScreenSize('lg');
      }

      setScreenWidth(screenWidth);
    };

    handleSize();
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return { screenSize, screenWidth }; 
};

export default CheckWindowWidth;