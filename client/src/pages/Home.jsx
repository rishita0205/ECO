import React from 'react';
import Navbar from '../components/Navbar';
import cardHomePage from '../assets/cardHomePage.png';
import '../css/Home.css'
import AllCards from '../components/AllCards';
import { useState } from 'react';
import ShoppingPage from '../components/ShoppingPage';
const Home = () => {
  const [page,changepage]=useState("Home");
  function ToggleScreen(category) {
    changepage(category);
  }
  return (
    <>
    <div className='xl:pd-10'>
      <Navbar />
      {page === "Home" ? (
      <div>
      <div className="flex  component-card md:ml-3 md:mr-3  w-full ">
        {/* Render the background image only for screens smaller than md */}
        <div className="w-full  lg:bg-gray-100 lg:w-1/2 flex items-center justify-center p-8  md:p-20 lg:p-16 bg-none " >
          <div>
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-fancy text-gray-700 text-center">Join the Movement</h1>
            <p className="text-[14px] font-libre-baskerville md:text-xl text-center mt-4">Shop Eco-Friendly, Save Water, Change the World</p>
            
            <div class="mt-2 flex items-center justify-center gap-x-6">
            <a href="#" class="rounded-md text-center  bg-base-blue px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
            </div>
            
          </div>
        </div>
        {/* Render the image only for screens greater than or equal to md */}
        <div className="lg:w-1/2 h-[460px] md:h-80 lg:h-96 invisible lg:visible w-0">
          <img src={cardHomePage} className="image" alt="join-movement"  />
        </div>
        
      </div>
      <AllCards ToggleScreen={ToggleScreen}/>
      </div>
      ):<ShoppingPage page={page}/>}
    </div>
    </>

  );
};

export default Home;

