import { useEffect, useState } from 'react';

function CheckWindowWidth() {
  const [screenSize, setScreenSize] = useState<string>("");
  
  useEffect(() => {
    const handleSize = async () => {
      const screenWidth: number = window.innerWidth;          

      if(screenWidth < 768) {       
        setScreenSize("sm");      
      } else if(screenWidth >= 768 && screenWidth <= 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    handleSize();
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return { screenSize }; 
};

export default CheckWindowWidth;