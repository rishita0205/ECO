import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../utils/index.js';
import { useParams } from 'react-router-dom';
import { Navbar, Notification } from '../components';
import { GoArrowLeft } from "react-icons/go";
import { VerifiedIcon } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

const Product = () => {
  const { id } = useParams();
  const host = "https://server-eco.onrender.com";
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' }); // State for new review
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct.product);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const getReviews = async () => {
      try {
        const { data } = await axios.get(`${host}/products/review/${id}`);
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message);
      }
    };

    getProduct();
    getReviews();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('You need to log in to add items to the cart.');
      return;
    }

    const token = Cookies.get('token');
    try {
      const { data } = await axios.post(
        `${host}/cart`,
        { productId: id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setShowNotification(true);
      console.log('Updated Cart:', data.cart);
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data?.message);
      alert('Failed to add product to cart.');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    try {
      await axios.put(
        `${host}/products/review/${id}`,
        { rated: newReview.rating, comment: newReview.comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowNotification(true);
      const { data } = await axios.get(`${host}/products/review/${id}`);
      setReviews(data.reviews);
      setNewReview({ rating: 0, comment: '' }); // Reset review form after submission
    } catch (error) {
      console.error('Error submitting review:', error.response?.data?.message);
      alert('Failed to submit review.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const generateStars = () => {
    const filledStars = [];
    for (let i = 0; i < product.ratings; i++) {
      filledStars.push(<span key={i} className="text-yellow-500 text-xl">★</span>);
    }
    return filledStars;
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center mt-5 ml-3 mr-3 md:ml-16 xl:ml-32'>
        <a className='text-4xl mr-2' href='/'><GoArrowLeft /></a>
        <div className='font-fancy md:text-3xl lg:text-4xl text-2xl md:mt-2'>Home</div>
      </div>
      {showNotification && (
        <Notification
          message="Operation successful!"
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className='flex flex-col md:flex-row mr-4 ml-4 lg:mr-32 lg:ml-32 mt-4 md:mt-8 border-b-1 pb-3 xl:ml-80 xl:mr-80'>
        <div className="basis-1/2 md:pt-0 md:pb-0">
          {product.image && <img src={`${host}/${product.image}`} alt={product.title} className='w-full object-fill max-w-96' />}
        </div>
        <div className="basis-1/2 flex flex-col p-3 md:pt-0 md:p-9">
          <div className='border-b p-1'>
            <div className='text-black font-fancy font-bold text-2xl md:text-3xl'>{product.title}</div>
            <div className="flex items-center">{generateStars()} | {product.ratings}</div>
            {product.discountedPrice ? (
              <div className='flex flex-row items-center'>
                <div className="text-gray-500 font-semibold text-xl">
                  <span className="line-through">₹{product.price}</span>
                </div>
                <div className="text-blue-600 md:text-3xl ml-2 font-semibold text-[24px]">₹{product.discountedPrice}</div>
              </div>
            ) : (
              <div className="text-blue-600 md:text-3xl font-semibold text-[24px]">₹{product.price}</div>
            )}
            {product.verified && (
              <div className="flex items-center mt-2">
                <img src={VerifiedIcon} alt="Verified" className="md:w-6 md:h-6 w-4 h-4" />
                <span className='ml-2 text-green-400 font-semibold text-sm'>ECO verified and recommended</span>
              </div>
            )}
          </div>
          {product.description && (
            <p className='border-b pb-1 mt-4'>
              {product.description}
            </p>
          )}
          <div className='mt-4'>
            <label className='font-semibold'>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                min="1"
                className='ml-2 border rounded p-1 w-16 text-center'
              />
            </label>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      
      <div className="reviews mt-6 mx-4 lg:mx-32 xl:mx-80">
      {user && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Add a Review</h2>
            <form onSubmit={handleReviewSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Rating:
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
                    className="ml-2 border rounded p-1 w-full"
                  >
                    <option value="0">Select rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Comment:
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="ml-2 border rounded p-2 w-full"
                    rows="4"
                  ></textarea>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review my-4 p-4 bg-white shadow-lg rounded-lg">
              <div className="review-header flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{review.name}</span>
                  <span className="text-yellow-500">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </span>
                </div>
              </div>
              <p className="text-gray-800">{review.comment}</p>
            </div>
          ))
        )}

        
      </div>
    </div>
  );
};

export default Product;
