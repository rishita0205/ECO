import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../utils/index.js';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GoArrowLeft } from "react-icons/go";
import { VerifiedIcon } from '../assets';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const host = "http://localhost:8080";

  useEffect(() => {
    const getProduct = async () => {
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Function to generate filled stars based on product rating
  const generateStars = () => {
    const filledStars = [];
    for (let i = 0; i < product.rating; i++) {
      filledStars.push(<span key={i} className="text-yellow-500 text-xl">★</span>);
    }
    return filledStars;
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center mt-5 ml-3 mr-3'>
        <a className='text-4xl mr-2' href='/'><GoArrowLeft /></a>
        <div className='font-fancy md:text-3xl lg:text-5xl text-2xl md:mt-2'>Home</div>
      </div>
      <div className='flex flex-col md:flex-row mr-4 ml-4 md:mr-10 md:ml-10 mt-4' >
       <div className="basis-1/2">
       {product.image && <img src={`${host}/${product.image}`} alt={product.title} className=' w-full'/>}
      </div>
      <div className="basis-1/2 flex flex-col p-3 md:pt-0">
      <div className='border-b-1 p-1'>
      <div className='text-black font-fancy font-bold text-2xl md:text-3xl'>{product.title}</div>
      <div className="flex items-center">{generateStars()} | {product.rating}</div>
      {product.discountedPrice ? (
        <div className='flex flex-row items-center'>
           <div className="text-gray-500 font-semibold md:text-2xl text-xl">
            <span className="line-through">₹{product.price}</span>
          </div>
          <div className="text-base-blue md:text-lg ml-2 font-semibold text-[24px]">₹{product.discountedPrice}</div>
        </div>
      ) : (
        <div className="text-base-blue md:text-lg  font-semibold text-[24px]">₹{product.price}</div>
      )}
      {product.verified && (
        <div className=" flex items-center">
          <img src={VerifiedIcon} alt="Verified" className="md:w-6 md:h-6 w-4 h-4" />
          <span className='ml-2 text-green-400 font-semibold text-sm'>ECO verified and recommended</span>
        </div>
      )}
      </div>
      {product.description&&(
        <p>
          {product.description}
        </p>
      )}
      
      
       </div>

      </div>
     
      
    </div>
  );
};

export default Product;