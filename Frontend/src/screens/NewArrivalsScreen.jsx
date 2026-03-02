import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

const NewArrivalsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNew = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/new');
        setProducts(data);
        setLoading(false);
      } catch (e) { setLoading(false); }
    };
    fetchNew();
  }, []);

  if (loading) return <div className="text-center py-32 text-[#8a8a82] uppercase tracking-[0.3em] font-bold">Curating Latest...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <h1 className="text-5xl font-black text-[#333332] tracking-tighter uppercase mb-12">New Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(p => <Product key={p._id} product={p} />)}
      </div>
    </div>
  );
};

export default NewArrivalsScreen;