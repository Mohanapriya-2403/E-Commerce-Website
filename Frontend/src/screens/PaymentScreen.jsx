import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { shippingAddress, savePaymentMethod } = useCart();

  // 1. Redirect if there is no shipping address (can't pay without an address)
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    // Assuming you have this function in your CartContext to store the choice
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Simple Progress Indicator */}
      <div className="flex justify-between mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
        <span className="text-blue-600">Shipping</span>
        <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Payment</span>
        <span>Place Order</span>
      </div>

      <h1 className="text-3xl font-black text-slate-800 mb-6">Payment Method</h1>
      
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 mb-4">Select Method</label>
          
          {/* PayPal Option */}
          <div className="flex items-center p-4 border rounded-xl hover:bg-blue-50 transition cursor-pointer border-gray-200">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayPal" className="ml-3 flex flex-grow items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-700">PayPal or Credit Card</span>
              <span className="text-2xl">💳</span>
            </label>
          </div>

          {/* Stripe Option (Optional placeholder) */}
          <div className="flex items-center p-4 border rounded-xl hover:bg-blue-50 transition cursor-pointer border-gray-200">
            <input
              type="radio"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Stripe" className="ml-3 flex flex-grow items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-700">Stripe</span>
              <span className="text-2xl">🏦</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg active:scale-95"
        >
          Continue to Summary
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;