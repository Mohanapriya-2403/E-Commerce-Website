import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  const { userInfo } = useAuth();

  // Price Calculation Logic
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  useEffect(() => {
    if (!paymentMethod) navigate('/payment');
  }, [paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', {
        orderItems: cartItems.map(item => ({ ...item, product: item._id })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }, config);

      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl font-black mb-6">Review Your Order</h1>
        
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-lg mb-2">Shipping To:</h2>
          <p>{shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}</p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-lg mb-2">Order Items:</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b last:border-0">
              <span>{item.qty} x {item.name}</span>
              <span className="font-bold">${(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
        </section>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl h-fit sticky top-24 shadow-xl">
        <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Order Total</h2>
        <div className="space-y-3 mb-8">
          <div className="flex justify-between"><span>Items:</span><span>${itemsPrice.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping:</span><span>${shippingPrice.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax:</span><span>${taxPrice.toFixed(2)}</span></div>
          <div className="flex justify-between text-2xl font-black border-t border-slate-700 pt-4">
            <span>Total:</span><span>${totalPrice}</span>
          </div>
        </div>
        <button
          onClick={placeOrderHandler}
          className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;