import React from 'react';
import { IoTrashBin } from "react-icons/io5";

const CartTable = ({ items, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-lg">
      <div className="hidden lg:block">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-4 px-6 font-semibold text-gray-600">Product</th>
              <th className="text-right py-4 px-6 font-semibold text-gray-600">Price</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-600">Quantity</th>
              <th className="text-right py-4 px-6 font-semibold text-gray-600">Subtotal</th>
              <th className="py-4 px-6 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.productId._id} className="border-b">
                <td className="flex items-center py-4 px-6">
                  <img src={`https://server-eco.onrender.com/${item.productId.image}`} alt={item.productId.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <span className="font-medium">{item.productId.name}</span>
                </td>
                <td className="text-right py-4 px-6">{`₹ ${item.productId.price.toFixed(2)}`}</td>
                <td className="text-center py-4 px-6">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.productId._id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-right py-4 px-6">{`₹ ${(item.productId.price * item.quantity).toFixed(2)}`}</td>
                <td className="text-center py-4 px-6">
                  <button
                    onClick={() => onRemoveItem(item.productId._id)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                  >
                    <IoTrashBin />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        {items.map((item) => (
          
          <div key={item.productId._id} className="flex flex-col bg-gray-50 border rounded-lg p-4 mb-4">
              {console.log(item)}
            <div className="flex items-center mb-4">
              <img src={`https://server-eco.onrender.com/${item.productId.image}`} alt={item.productId.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div className="flex flex-col">
                <span className="font-medium text-lg">{item.productId.title}</span>
                <span className="text-gray-500">{`₹ ${item.productId.price.toFixed(2)}`}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(item.productId._id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="text-center">
              <button
                onClick={() => onRemoveItem(item.productId._id)}
                className="text-red-500 hover:text-red-700 text-2xl"
              >
                <IoTrashBin />
              </button>
            </div>
              <span className="text-lg font-semibold">{`₹ ${(item.productId.price * item.quantity).toFixed(2)}`}</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTable;
