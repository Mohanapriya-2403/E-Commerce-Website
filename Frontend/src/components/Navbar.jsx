import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter">
          TECH<span className="text-gray-900">STORE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/new-arrivals" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
            New Arrivals
          </Link>
          
          {/* Cart Icon (Placeholder for now) */}
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition-colors">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 flex flex-col">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">
            Home
          </Link>
          <Link to="/new-arrivals" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">
            New Arrivals
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">
            My Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
