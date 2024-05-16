import React from 'react';
import Navbar from '../components/Navbar';
import cardHomePage from '../assets/cardHomePage.png';
import '../css/Home.css'
const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="flex  component-card md:p-10  mt-1 w-full h-100">
        {/* Render the background image only for screens smaller than md */}
        <div className="w-full md:w-1/2 p-20 bg-none " >
          <div>
            <h1 className="text-3xl text-center">Join the Movement</h1>
            <p className="font-libre-baskerville text-2xl text-center mt-4">Shop Eco-friendly.Save Water,Change World </p>
          </div>
        </div>
        {/* Render the image only for screens greater than or equal to md */}
        <div className="md:w-1/2  container image-card invisible md:visible w-0">
          <img src={cardHomePage} className="image  object-cover  w-fit h-fit" alt="join-movement"  />
        </div>
      </div>
    </div>
  );
};

export default Home;
