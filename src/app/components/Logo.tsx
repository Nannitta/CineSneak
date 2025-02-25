const Logo = () => {  
  return(
    <div className='flex place-items-center gap-2 md:gap-4'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.45 123.45" className='w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10'>
        <path fill='white' d="M61.72.28a61.18,61.18,0,0,1,38.93,13.91L46.86,45.24V2.1A61.21,61.21,0,0,1,61.72.28ZM106,19.12a61.25,61.25,0,0,1,17.17,42.6,62,62,0,0,1-.64,8.89L69.66,40.09l36.33-21Zm15.06,58.64a61.59,61.59,0,0,1-34.91,40.36V57.6l34.91,20.16ZM79.21,120.64A61.6,61.6,0,0,1,25.05,111L79.21,79.75v40.89Zm-59.8-14.37A61.28,61.28,0,0,1,.28,61.72a62.4,62.4,0,0,1,.65-8.91L55.44,85.46l-36,20.81Zm-17-60.65A61.6,61.6,0,0,1,39.91,4.27l-.44,63.54-37-22.19Z"/>
      </svg>
      <h1 className='hidden md:flex md:text-2xl md:font-nimbus md:h-[1.6rem] lg:text-4xl lg:font-nimbus lg:h-[1.8rem]'>
        CineSneak
      </h1>
    </div>
  );
};

export default Logo;