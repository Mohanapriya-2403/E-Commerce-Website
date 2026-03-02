import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../utils/cartUtils';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
    window.dispatchEvent(new Event("storage"));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (cartItems.length === 0) return (
    <div className="text-center py-40">
      <h2 className="text-2xl font-bold text-[#8a8a82] mb-6 uppercase tracking-widest">Bag is Empty</h2>
      <Link to="/" className="bg-[#333332] text-[#f5f5f0] px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Shop Now</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-10">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white/50 p-6 rounded-3xl border border-[#e2e2da]">
              <div className="flex items-center gap-6">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mix-blend-multiply" />
                <div><h3 className="font-bold">{item.name}</h3><p className="text-sm text-[#8a8a82]">Qty: {item.qty}</p></div>
              </div>
              <button onClick={() => handleRemove(item._id)} className="text-[#8a8a82] hover:text-red-500 font-bold uppercase text-[10px]">Remove</button>
            </div>
          ))}
        </div>
        <div className="bg-[#ecece7] p-8 rounded-[2.5rem] h-fit border border-[#e2e2da]">
          <h2 className="text-xl font-black uppercase mb-6 tracking-widest">Total: ₹{totalPrice.toLocaleString()}</h2>
          <button onClick={() => navigate('/checkout')} className="w-full bg-[#333332] text-[#f5f5f0] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;