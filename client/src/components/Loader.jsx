import React from 'react'
import { FaCircle } from 'react-icons/fa';
const Loader = () => {
  return (
    
        <div className="flex justify-center items-center space-x-2 mt-10">
          <FaCircle className="text-green-700 animate-bounce" style={{ animationDelay: '0s' }} />
          <FaCircle className="text-green-700 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <FaCircle className="text-green-700 animate-bounce" style={{ animationDelay: '0.4s' }} />
          <FaCircle className="text-green-700 animate-bounce" style={{ animationDelay: '0.6s' }} />
        </div>
      
  )
}

export default Loader