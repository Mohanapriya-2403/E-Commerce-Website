import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, login } = useAuth();

  // Determine where to send the user after login
  // (e.g., if they came from the cart, redirect to shipping)
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      await login(email, password);
      setLoading(false);
    } catch (err) {
      setError(err.response && err.response.data.message 
        ? err.response.data.message 
        : 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-slate-800 mb-2">Sign In</h1>
      <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 border border-red-100 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="name@company.com"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg active:scale-95 disabled:bg-gray-400"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
        New Customer?{' '}
        <Link 
          to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} 
          className="text-blue-600 font-bold hover:underline"
        >
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;