// components/ShoppingPage.jsx
import React, { useEffect,useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import Deck from './Deck';
import { Products, categoryDescriptions } from "../assets/data.js";
import { fetchProducts } from "../utils";

const ShoppingPage = ({ page, ToggleScreen }) => {
  const [products, setProducts] = useState([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  const filteredProducts = showVerifiedOnly
    ? products.filter(product => product.verified)
    : products;

  return (
    <div className='ml-4 mr-4 md:ml-10 md:mr-10'>
      <div className='flex items-center mt-5'>
        <button className='text-4xl mr-2' onClick={() => ToggleScreen("Home")}><GoArrowLeft /></button>
        <div className='font-fancy md:text-3xl lg:text-5xl text-2xl md:mt-2'>{page}</div>
      </div>
      <p className='font-body text-xs md:text-lg md:mt-2 text-gray-500'>
        {categoryDescriptions[page] || "Explore our products and solutions."}
      </p>
      
      <div className='flex items-center mt-4'>
        <label className='flex items-center cursor-pointer'>
          <div className='relative'>
            <input 
              type='checkbox' 
              className='sr-only' 
              checked={showVerifiedOnly} 
              onChange={() => setShowVerifiedOnly(!showVerifiedOnly)} 
            />
            <div className={`block ${showVerifiedOnly ? ' bg-green-500' : ' bg-gray-300'} w-[40px] h-[22px] rounded-full transition duration-300`}></div>
            <div className={`absolute left-1 top-0.5 bg-white w-[18px] h-[18px] rounded-full transition-transform duration-300 ${showVerifiedOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <span className='ml-3 text-green-400 font-semibold'>ECO verified and recommended</span>
        </label>
      </div>
      
      <Deck products={filteredProducts} />
    </div>
  );
};

export default ShoppingPage;
