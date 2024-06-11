import { useEffect } from 'react';

interface BlockScrollProps {
  isModalOpen: boolean
}

const BlockScroll = ({ isModalOpen }: BlockScrollProps) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if(body) {
      if (isModalOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'auto';
      }
      return () => {
        body.style.overflow = 'auto';
      };
    }
  }, [isModalOpen]);

  return null;
};

export default BlockScroll;