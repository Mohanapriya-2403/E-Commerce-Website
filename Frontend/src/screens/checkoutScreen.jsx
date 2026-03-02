import React from 'react';
import { useNavigate } from 'react-router-dom';

const checkoutScreen = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart'); // Clear cart on success
    window.dispatchEvent(new Event("storage"));
    navigate('/order-success');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-10 text-center">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white/50 p-10 rounded-[2.5rem] border border-[#e2e2da] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#8a8a82]">Full Name</label>
            <input required type="text" className="w-full bg-[#f5f5f0] border-none rounded-xl p-4 text-[#333332] focus:ring-2 focus:ring-[#8a8a82]" placeholder="Enter Your Name" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#8a8a82]">Email Address</label>
            <input required type="email" className="w-full bg-[#f5f5f0] border-none rounded-xl p-4 text-[#333332] focus:ring-2 focus:ring-[#8a8a82]" placeholder="Enter Your EMail Address" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#8a8a82]">Shipping Address</label>
            <textarea required className="w-full bg-[#f5f5f0] border-none rounded-xl p-4 text-[#333332] focus:ring-2 focus:ring-[#8a8a82] h-32" placeholder="Street, City, Zip Code"></textarea>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-[#333332] text-[#f5f5f0] py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-[#1a1a19] transition-all shadow-xl"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default checkoutScreen;