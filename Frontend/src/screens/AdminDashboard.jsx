import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { userInfo } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const fetchAdminData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      
      const { data: productsData } = await axios.get('http://localhost:5000/api/products', config);
      // Note: You would typically create a specific admin route for orders
      const { data: ordersData } = await axios.get('http://localhost:5000/api/orders', config);
      
      setProducts(productsData);
      setOrders(ordersData);
    };

    fetchAdminData();
  }, [userInfo]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Logic for axios.delete('/api/products/' + id) goes here
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Admin Management</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b mb-6">
        <button 
          onClick={() => setActiveTab('products')}
          className={`pb-2 px-4 font-semibold ${activeTab === 'products' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-4 font-semibold ${activeTab === 'orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Orders
        </button>
      </div>

      {/* Products Table */}
      {activeTab === 'products' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 uppercase text-sm text-gray-600">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-xs font-mono">{product._id}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 space-x-2">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 uppercase text-sm text-gray-600">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-4 text-xs font-mono">{order._id}</td>
                  <td className="p-4">{order.user && order.user.name}</td>
                  <td className="p-4">${order.totalPrice}</td>
                  <td className="p-4">
                    {order.isPaid ? <span className="text-green-500">✔</span> : <span className="text-red-500">✘</span>}
                  </td>
                  <td className="p-4">
                    {order.isDelivered ? <span className="text-green-500">✔</span> : <span className="text-red-500">✘</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;