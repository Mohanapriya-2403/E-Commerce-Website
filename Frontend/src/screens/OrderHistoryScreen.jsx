import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message 
          ? err.response.data.message 
          : err.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyOrders();
    }
  }, [userInfo]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-black text-slate-800 mb-8">My Orders</h1>

      {loading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">{error}</div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 p-10 text-center rounded-xl border-2 border-dashed">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">ID</th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">Date</th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">Total</th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">Paid</th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">Delivered</th>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-blue-50/50 transition">
                  <td className="p-4 text-xs font-mono text-gray-500">{order._id}</td>
                  <td className="p-4 text-sm text-slate-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-4 text-sm">
                    {order.isPaid ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Not Paid</span>
                    )}
                  </td>
                  <td className="p-4 text-sm">
                    {order.isDelivered ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Pending</span>
                    )}
                  </td>
                  <td className="p-4 text-sm">
                    <Link 
                      to={`/order/${order._id}`} 
                      className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-slate-200 transition"
                    >
                      View
                    </Link>
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

export default OrderHistoryScreen;