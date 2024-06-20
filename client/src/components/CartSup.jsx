import React from 'react'
import { FaShippingFast, FaLeaf, FaSmile, FaHeadset } from 'react-icons/fa';
const CartSup = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 md:px-10">
    <h2 className="text-center text-2xl md:text-3xl font-fancy font-bold mb-10 text-gray-800">
      Why Buy From Us?
    </h2>
    <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">
      <div className="flex flex-col items-center text-center px-4 py-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <FaShippingFast className="text-blue-500 text-4xl mb-4" />
        <h3 className="text-lg md:text-xl font-semibold mb-2">Free Shipping</h3>
        <p className="text-gray-600 max-w-xs">
          Shop now and enjoy free shipping on all orders.
        </p>
      </div>
      <div className="flex flex-col items-center text-center px-4 py-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <FaLeaf className="text-green-500 text-4xl mb-4" />
        <h3 className="text-lg md:text-xl font-semibold mb-2">Eco Friendly Packaging</h3>
        <p className="text-gray-600 max-w-xs">
          Using eco-friendly materials, sustainable and biodegradable.
        </p>
      </div>
      <div className="flex flex-col items-center text-center px-4 py-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <FaSmile className="text-yellow-500 text-4xl mb-4" />
        <h3 className="text-lg md:text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
        <p className="text-gray-600 max-w-xs">
          Our satisfaction guarantee ensures quality products.
        </p>
      </div>
      <div className="flex flex-col items-center text-center px-4 py-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <FaHeadset className="text-blue-500 text-4xl mb-4" />
        <h3 className="text-lg md:text-xl font-semibold mb-2">Fast Response</h3>
        <p className="text-gray-600 max-w-xs">
          24/7 fast and reliable assistance whenever you need it.
        </p>
      </div>
    </div>
  </div>
  )
}

export default CartSup