import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#0f172a] rounded-[2rem] overflow-hidden my-8 mx-4 md:mx-12 min-h-[450px] flex items-center shadow-2xl border border-white/5">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      
      {/* 1. Removed 'max-w-7xl' and 'mx-auto' to allow content to hit the edge.
          2. Set 'pr-0' (Padding Right Zero) on the main wrapper.
      */}
      <div className="flex flex-col lg:flex-row items-center w-full relative z-10 h-full">
        
        {/* Left Content: Added generous left padding, but kept right side open */}
        <div className="flex-1 py-16 pl-12 md:pl-20 pr-6">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6">
            NEXT GEN <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              TECH STORE.
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-md mb-10 opacity-80 leading-relaxed">
            Premium hardware for developers, gamers, and creators. Elevate your setup today.
          </p>
          
          <button 
            onClick={() => navigate('/new-arrivals')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Explore Store
          </button>
        </div>

        {/* Right Content: 
            1. 'flex-1' ensures it takes half the space.
            2. 'flex justify-end' pushes image to the right border.
            3. 'p-0' and 'm-0' ensures no gaps.
        */}
        <div className="flex-1 flex justify-end items-center h-full self-stretch p-0 m-0 overflow-hidden">
          <img 
            src="/macbook.png" 
            alt="Tech Gear" 
            /* 'w-full' + 'h-full' + 'object-cover' ensures it fills the box.
               'translate-x-1' is a tiny push to make sure it covers the border.
            */
            className="w-full h-full object-cover object-left lg:scale-125 lg:translate-x-10 drop-shadow-[-30px_0_40px_rgba(0,0,0,0.6)]"
            onError={(e) => { 
              e.target.src = "https://images.unsplash.com/photo-1517336714481-489aef0ef041?q=80&w=1000&auto=format&fit=crop"; 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;