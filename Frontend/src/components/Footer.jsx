import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a19] text-[#ecece7] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-[#f5f5f0] rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#d1d1ca]">
                <span className="text-[#1a1a19] font-black italic">T</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-[#f5f5f0] uppercase">
                Tech<span className="text-[#8a8a82]">Shop</span>
              </span>
            </Link>
            <p className="text-sm text-[#8a8a82] leading-relaxed">
              Premium tech gear and creator essentials curated for the modern professional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#f5f5f0] font-bold mb-6 uppercase text-[10px] tracking-[0.2em]">Shop</h4>
            <ul className="space-y-4 text-sm text-[#8a8a82]">
              <li><Link to="/" className="hover:text-[#f5f5f0] transition-colors">Home</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-[#f5f5f0] transition-colors">New Arrivals</Link></li>
              <li><Link to="/cart" className="hover:text-[#f5f5f0] transition-colors">Your Bag</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[#f5f5f0] font-bold mb-6 uppercase text-[10px] tracking-[0.2em]">Contact</h4>
            <ul className="space-y-4 text-sm text-[#8a8a82]">
              <li className="flex items-start gap-3">
                <span className="opacity-50">📍</span>
                <span>TamilNadu, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="opacity-50">✉️</span>
                <a href="mailto:support@techshop.com" className="hover:text-[#f5f5f0] transition-colors">
                  support@techshop.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-[#f5f5f0] font-bold mb-6 uppercase text-[10px] tracking-[0.2em]">Follow</h4>
            <div className="flex gap-4">
              {['IG', 'TW', 'FB'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 border border-[#333332] rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#f5f5f0] hover:text-[#1a1a19] transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333332] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-[#555552]">
          <p>© 2026 TECHSHOP. CURATED QUALITY.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#8a8a82] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#8a8a82] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;