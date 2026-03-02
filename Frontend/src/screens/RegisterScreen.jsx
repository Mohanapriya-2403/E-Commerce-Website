import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, login } = useAuth();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Frontend validation: Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setMessage(null);
      setError(null);
      setLoading(true);

      // 1. Post to the Register endpoint
      const { data } = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password,
      });

      // 2. Log the user in immediately after successful registration
      // This assumes your backend returns the user object + token upon registration
      await login(email, password); 
      
      setLoading(false);
    } catch (err) {
      setError(
        err.response && err.response.data.message 
          ? err.response.data.message 
          : err.message
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-slate-800 mb-2">Create Account</h1>
      <p className="text-gray-500 mb-8">Join us to start shopping today.</p>

      {message && (
        <div className="bg-amber-50 text-amber-600 p-3 rounded-lg mb-6 border border-amber-100 text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 border border-red-100 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 mt-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg active:scale-95 disabled:bg-gray-400"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link 
          to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'} 
          className="text-blue-600 font-bold hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
