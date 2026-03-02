import React from 'react';
import { addToCart } from '../utils/cartUtils';

const Product = ({ product }) => {
  const handleAdd = () => {
    addToCart(product);
    window.dispatchEvent(new Event("storage"));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-4 group">
      {/* Image Area */}
      <div className="aspect-square bg-gray-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Info Area */}
      <div className="mt-5 px-1">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{product.brand}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-indigo-600">
            ₹{product.price.toLocaleString()}
          </span>
          
          <button 
            onClick={handleAdd}
            className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 transition-all active:scale-90 shadow-lg shadow-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;