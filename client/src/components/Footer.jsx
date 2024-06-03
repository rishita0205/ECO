import React from 'react';
import { logo,background } from "../assets";
const Footer = () => {
  return (
    <div className='bg-white pt-6'>
    
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'contain', // This makes the background cover the whole div
        backgroundPosition: 'center', // This centers the background image
        height: '100px', // Adjust the height as needed
      }}

      className='flex flex-row justify-center items-center '
    >
    <h1 className='text-center text-gray-700'> © 2024 Eco Shop. All Rights Reserved.</h1>
    </div>
    
    </div>
  );
}

export default Footer;
