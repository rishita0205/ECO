import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { TfiFaceSad } from "react-icons/tfi";
import { Navbar, CartTable,CartSup } from '../components';
import { GoArrowLeft } from 'react-icons/go';
// Adjust the path as necessary

const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      const fetchCart = async () => {
        try {
          const { data } = await axios.get('https://server-eco.onrender.com/cart', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCartData(data.cart);
        } catch (error) {
          console.error('Error fetching cart:', error.response.data.message);
        }
      };
      fetchCart();
    }
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const token = Cookies.get('token');
    try {
      await axios.put(
        `https://server-eco.onrender.com/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update the local state
      setCartData((prevState) => ({
        ...prevState,
        items: prevState.items.map(item =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      }));
    } catch (error) {
      console.error('Error updating quantity:', error.response.data.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    const token = Cookies.get('token');
    try {
      await axios.delete(`https://server-eco.onrender.com/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the local state
      setCartData((prevState) => ({
        ...prevState,
        items: prevState.items.filter(item => item.productId._id !== productId)
      }));
    } catch (error) {
      console.error('Error removing item:', error.response.data.message);
    }
  };

  if (!cartData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (cartData.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <div className="text-6xl mb-4"> <TfiFaceSad /></div>
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Lonely!</h2>
          <p className="text-gray-500 mb-6">Add something to make it happy.</p>
          <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            Browse Products
          </Link>
        </div>
      </>
    );
  }

  const subtotal = cartData.items.reduce((total, item) => 
    total + ( item.productId.price) * item.quantity, 0
  ).toFixed(2);

  const totalDiscount = cartData.items.reduce((total, item) => 
    total + ((item.productId.discountedPrice ?? 0)) * item.quantity, 0
  ).toFixed(2);

  const total = cartData.items.reduce((total, item) => 
    total + item.productId.price * item.quantity, 0
  ).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-6 ">
      <Navbar />
      <div className='flex items-center mt-5 mb-10'>
        <a href="/" className='text-4xl mr-2'><GoArrowLeft /></a>
        <div className='font-fancy md:text-3xl lg:text-5xl text-2xl md:mt-2'>Shopping Cart</div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-1">
          <CartTable
            items={cartData.items}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
        <div className="lg:w-1/3 h-[260px] bg-white border rounded-lg shadow-lg p-6 mt-6 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-medium">{`₹ ${subtotal}`}</span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Discount</span>
              <span className="font-medium text-green-500">{`- ₹ ${totalDiscount}`}</span>
            </div>
          )}
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">Total</span>
            <span className="text-blue-500 font-bold text-lg">{`₹ ${(total - totalDiscount).toFixed(2)}`}</span>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
            Check Out
          </button>
        </div>
        
      </div>
      <div className="mt-9">
      <CartSup/>
      </div>
    </div>
  );
};

export default Cart;
