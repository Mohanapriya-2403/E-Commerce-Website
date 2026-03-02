import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added navigation import
import axios from 'axios';
import Hero from '../components/Hero'; 
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Hero />

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-2 block">
              Premium Selection
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
              Featured Gear
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/new-arrivals')}
            className="text-sm font-bold uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600 pb-1 hover:text-indigo-800 hover:border-indigo-800 transition-all"
          >
            View All
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-400 font-bold uppercase tracking-widest">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* SHOP THE SALE SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-100">
          
          {/* Background Decorative Glows */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
              Shop the Sale
            </h2>
            <p className="text-indigo-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
              Our biggest clearance of the season. Save up to 50% on selected "Next Gen" peripherals and essential tech gear.
            </p>
            <button 
              onClick={() => navigate('/new-arrivals')}
              className="bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
            >
              Explore Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;