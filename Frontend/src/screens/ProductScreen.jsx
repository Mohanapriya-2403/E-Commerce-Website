import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (loading) return <div className="p-20 text-center">Loading product...</div>;
  if (error) return <div className="p-20 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="md:w-1/2 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-[400px] object-contain" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm">{product.brand}</p>
          <h1 className="text-4xl font-black text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-500 text-sm">({product.rating})</span>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          <div className="pt-4">
            <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
              product.countInStock > 0 
              ? 'bg-gray-900 text-white hover:bg-indigo-600 shadow-xl' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.countInStock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;