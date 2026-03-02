import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Tailwind CSS
import './index.css';

// Import Global Context Providers
// Ensure these folders and files exist to avoid "Failed to resolve import"
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

/**
 * Entry Point
 * 1. AuthProvider: Manages user login state.
 * 2. CartProvider: Manages shopping cart items (must be inside Auth if cart depends on user).
 * 3. App: The main routing and layout structure.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);