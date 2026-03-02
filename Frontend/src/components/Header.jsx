import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCart } from '../utils/cartUtils';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      setCartCount(cart.reduce((acc, item) => acc + item.qty, 0));
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg transition-transform group-hover:scale-105">
            <span className="text-white font-black text-xl italic">T</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
            Tech<span className="text-indigo-600">Shop</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-bold uppercase hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/new-arrivals" className="text-sm font-bold uppercase hover:text-indigo-600 transition-colors">New Arrivals</Link>
        </nav>

        {/* Cart Icon */}
        <Link to="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;