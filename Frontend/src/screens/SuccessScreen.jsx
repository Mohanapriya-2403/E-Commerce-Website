import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SuccessScreen = () => {
  const { clearCart } = useCart();

  // Clear the cart as soon as the user reaches this page
  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 border border-gray-100">
        
        {/* Animated Checkmark Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          Order Placed!
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your tech is on its way. We've sent a confirmation email with your tracking details. 
          <span className="block mt-2 font-bold text-indigo-600">Order ID: #ORD-{Math.floor(Math.random() * 1000000)}</span>
        </p>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="block w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            Continue Shopping
          </Link>
          
          <button 
            onClick={() => window.print()} 
            className="block w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
          >
            Download Receipt
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            Estimated Delivery: 3-5 Business Days
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;