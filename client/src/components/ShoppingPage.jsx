import React, { useEffect, useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import Deck from './Deck';
import { categoryDescriptions } from "../assets/data.js"; // Removed Products since it is not used
import { filterProductsbyPage } from "../utils";

const ShoppingPage = ({ page, ToggleScreen }) => {
  const [products, setProducts] = useState([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await filterProductsbyPage(page);
        console.log(data)
        // Check if data is empty or undefined
        if (!data ||  data.length === 0) {
          setError("No products available for this category.");
          setProducts([]); // Ensure products is an empty array
        } else {
          setError(null); // Reset error if data is valid
          setProducts(data);
        }
      } catch (err) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
        setProducts([]); // Set products to an empty array on error
      }
    };

    getProducts();
  }, [page]); // Added page dependency to re-fetch products when page changes

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
            <div className={`block ${showVerifiedOnly ? 'bg-green-500' : 'bg-gray-300'} w-[40px] h-[22px] rounded-full transition duration-300`}></div>
            <div className={`absolute left-1 top-0.5 bg-white w-[18px] h-[18px] rounded-full transition-transform duration-300 ${showVerifiedOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <span className='ml-3 text-green-400 font-semibold'>ECO verified and recommended</span>
        </label>
      </div>
      
      {error ? (
        <div className="mt-10 text-center text-red-500">
          {error}
        </div>
      ) : (
        <Deck products={filteredProducts} />
      )}
    </div>
  );
};

export default ShoppingPage;
