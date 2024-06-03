import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../utils/index.js';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GoArrowLeft } from "react-icons/go";
import { VerifiedIcon } from '../assets';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

const Product = () => {
  const { id } = useParams();
  const host = "https://server-eco.onrender.com";
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id); // Assuming you have a user slice in your Redux store

  useEffect(() => {
    const getProduct = async () => {
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Validate quantity
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(addItemToCart({ userId, product, quantity }));
    } else {
      // Handle invalid quantity
      console.error("Invalid quantity");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
      <div className='flex items-center mt-5 ml-3 mr-3  md:ml-16 xl:ml-32'>
        <a className='text-4xl mr-2' href='/'><GoArrowLeft /></a>
        <div className='font-fancy md:text-3xl lg:text-4xl text-2xl md:mt-2'>Home</div>
      </div>
      <div className='flex flex-col md:flex-row mr-4 ml-4 lg:mr-32 lg:ml-32 mt-4 md:mt-8 border-b-1 pb-3 xl:ml-80 xl:mr-80'>
        <div className="basis-1/2 md:pt-0 md:pb-0">
          {product.image && <img src={`${host}/${product.image}`} alt={product.title} className=' w-full  object-fill max-w-96' />}
        </div>
        <div className="basis-1/2 flex flex-col p-3 md:pt-0 md:p-9">
          <div className='border-b-1 p-1'>
            <div className='text-black font-fancy font-bold text-2xl md:text-3xl'>{product.title}</div>
            <div className="flex items-center">{generateStars()} | {product.rating}</div>
            {product.discountedPrice ? (
              <div className='flex flex-row items-center'>
                <div className="text-gray-500 font-semibold text-xl">
                  <span className="line-through">₹{product.price}</span>
                </div>
                <div className="text-base-blue md:text-3xl ml-2 font-semibold text-[24px]">₹{product.discountedPrice}</div>
              </div>
            ) : (
              <div className="text-base-blue md:text-3xl  font-semibold text-[24px]">₹{product.price}</div>
            )}
            {product.verified && (
              <div className=" flex items-center">
                <img src={VerifiedIcon} alt="Verified" className="md:w-6 md:h-6 w-4 h-4" />
                <span className='ml-2 text-green-400 font-semibold text-sm'>ECO verified and recommended</span>
              </div>
            )}
          </div>
          {product.description && (
            <p className='border-b-1 pb-1'>
              {product.description}
            </p>
          )}
          <div className='mt-4'>
            <label className='font-semibold'>
              Quantity:
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))} 
                min="1"
                className='ml-2 border rounded p-1 w-16 text-center'
              />
            </label>
          </div>
          <button 
            
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;