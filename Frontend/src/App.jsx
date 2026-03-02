import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- SCREENS ---
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
// Match your lowercase file name from the screenshot
import CheckoutScreen from './screens/checkoutScreen'; 
import NewArrivalsScreen from './screens/NewArrivalsScreen';

// --- COMPONENTS ---
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f5f5f0] font-sans text-[#333332]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/new-arrivals" element={<NewArrivalsScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/order-success" element={
              <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
                <div className="w-20 h-20 bg-[#ecece7] text-[#333332] rounded-full flex items-center justify-center text-3xl mb-6">✓</div>
                <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">Order Received</h1>
                <button onClick={() => window.location.href = '/'} className="bg-[#333332] text-[#f5f5f0] mt-10 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm">Continue Shopping</button>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;