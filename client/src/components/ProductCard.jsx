import React from 'react';
import PropTypes from 'prop-types';
import { VerifiedIcon } from '../assets';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };
  const host="https://server-eco.onrender.com"
  const imageUrl = `${host}/${product.image}`;
  console.log(imageUrl);

  return (
    <div className="flex flex-col relative mt-5 ml-0.5 mr-0.5 md:ml-2 md:mr-2 p-1 md:p-2 rounded-lg shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-0.5" onClick={handleClick}  >
      <div className='rounded-lg overflow-hidden'>
        <img src={imageUrl} alt={product.title} className="w-full h-auto" />
      </div>
      <div className="mt-3 text-[14px] md:text-lg font-bold">{product.title}</div>
      {product.discountedPrice ? (
        <>
          <div className="text-base-blue md:text-lg font-semibold text-[16px]">₹{product.discountedPrice}</div>
          <div className="text-gray-500 font-semibold md:text-sm text-xs">
            <span className="line-through">₹{product.price}</span>
          </div>
        </>
      ) : (
        <div className="text-base-blue font-semibold text-[16px]">₹{product.price}</div>
      )}
      {product.verified && (
        <div className="mt-1 flex absolute bottom-7 right-3 items-center">
          <img src={VerifiedIcon} alt="Verified" className="md:w-6 md:h-6 w-4 h-4" />
        </div>
      )}
      {product.stock < 5 && (
        <p className='text-red-500'>{product.stock === 0 ? 'Out of Stock' : `Hurry only ${product.stock} left!`}</p>
      )}
      <div className="mt-1 absolute top-3 left-3 md:top-5 md:left-5 bg-white rounded-md px-1.5 py-0.5 md:px-2 md:py-0 text-xs md:text-xl shadow-sm text-yellow-500">{product.ratings}★</div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number,
    isVerified: PropTypes.bool,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
