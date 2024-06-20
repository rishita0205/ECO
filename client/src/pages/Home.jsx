import React from 'react';
import Navbar from '../components/Navbar';
import cardHomePage from '../assets/cardHomePage.png';
import '../css/Home.css'
import { useState, useEffect } from 'react';
import { AllCards, ShoppingPage, Deck, Footer,Loader } from '../components';
import { filterProducts } from "../utils";
import { ribbon } from '../assets';
import { FaCircle } from 'react-icons/fa';

const Home = () => {
  const [page, changepage] = useState("Home");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await filterProducts();
      setProducts(data);
      setIsLoading(false);
    };

    getProducts();
  }, []);

  function ToggleScreen(category) {
    changepage(category);
  }

  return (
    <>
      <div className='xl:pd-10'>
        <Navbar />
        {page === "Home" ? (
          <div>
            <div className="flex component-card md:ml-3 md:mr-3 w-full ">
              {/* Render the background image only for screens smaller than md */}
              <div className="w-full lg:bg-gray-100 lg:w-1/2 flex items-center justify-center p-8 md:p-20 lg:p-16 bg-none " >
                <div>
                  <h1 className="text-4xl md:text-4xl lg:text-5xl font-fancy text-gray-700 text-center">Join the Movement</h1>
                  <p className="text-[14px] font-libre-baskerville md:text-xl text-center mt-4">Shop Eco-Friendly, Save Water, Change the World</p>

                  <div className="mt-2 flex items-center justify-center gap-x-6">
                    <a href="/water-calculator" className="rounded-md text-center bg-base-blue px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                  </div>
                </div>
              </div>
              {/* Render the image only for screens greater than or equal to md */}
              <div className="lg:w-1/2 h-[460px] md:h-80 lg:h-96 invisible lg:visible w-0">
                <img src={cardHomePage} className="image" alt="join-movement" />
              </div>
            </div>
            <AllCards ToggleScreen={ToggleScreen} />
          </div>
        ) : <ShoppingPage page={page} ToggleScreen={ToggleScreen} />}
        <div className=' h-auto bg-cream flex flex-col items-center'>
          <h1 className='md:text-4xl text-2xl font-fancy mt-6'>Our Most Wanted Products</h1>
          <div className='mr-4 ml-4'>
            {isLoading ? <Loader/> : (
              <Deck products={products} />
            )}
          </div>
        </div>
        <div className="green-component w-full h-auto flex flex-col items-center justify-center p-12 md:p-20 bg-cover">
          <h1 className='text-base text-center font-fancy text-white md:text-3xl'>Shop with Purpose: Contribute to Water Conservation with Every Eco-Friendly Purchase on Our Platform. Join Us in Preserving Precious Resources and Building a Sustainable Future. </h1>
          <img src={ribbon} alt="decoration" className="md:w-96 w-[300px] mt-8" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
