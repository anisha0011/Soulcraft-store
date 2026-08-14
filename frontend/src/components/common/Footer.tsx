import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, Send, Sparkles, Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck, Truck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Welcome to the Soul Craft family! Check your inbox for 10% off 💗', 'heart');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-[#FCE7F3] text-[#1F2937] pt-16 pb-12 mt-20">
      {/* Brand Value Pillars - Soft Pink Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[#FFF5F7] border border-[#FBCFE8] shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-[#1F2937]">100% Handcrafted</h4>
              <p className="text-xs text-[#6B7280]">Made fold by fold with real artisan care</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-[#1F2937]">Bespoke Custom</h4>
              <p className="text-xs text-[#6B7280]">Names, messages & custom colors</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-[#1F2937]">All-India Delivery</h4>
              <p className="text-xs text-[#6B7280]">Crush-proof secure packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-[#1F2937]">Quality Checked</h4>
              <p className="text-xs text-[#6B7280]">6-point inspection before dispatch</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#FCE7F3]">
          {/* Col 1: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('/')}
              className="cursor-pointer inline-flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] font-black">
                SC
              </div>
              <span className="font-display text-2xl font-black uppercase tracking-tight text-[#1F2937]">
                Soul Craft
              </span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm">
              Discover handcrafted pieces created with love, creativity, and a bold personal touch. Every bouquet, photo frame, and resin keepsake is made especially for your most cherished moments.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-[#1F2937] mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E11D48]" /> Join Our Artisan Newsletter
              </h5>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                >
                  Join <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="font-display text-xs font-black text-[#1F2937] uppercase tracking-widest mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B7280] font-bold">
              <li>
                <button onClick={() => onNavigate('/shop')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  All Handmade Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/category/handmade-bouquets')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Handmade Bouquets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/category/personalized-gifts')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Personalized Name & Photo Gifts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/category/resin-keepsakes')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Resin Art & Coasters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/category/festive-wedding')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Festive & Wedding Hampers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/offers')} className="hover:text-[#E11D48] transition-colors font-black text-[#E11D48] cursor-pointer">
                  Special Festive Offers ✨
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-display text-xs font-black text-[#1F2937] uppercase tracking-widest mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B7280] font-bold">
              <li>
                <button onClick={() => onNavigate('/track-order')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/custom-orders')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Create Custom Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Help & Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies?tab=shipping')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies?tab=returns')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Returns & Cancellations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact?faq=true')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Studio */}
          <div>
            <h4 className="font-display text-xs font-black text-[#1F2937] uppercase tracking-widest mb-4">
              Our Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B7280] font-bold">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  The Soul Craft Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about#artisans')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
                  Meet Our Crafters
                </button>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-[#4B5563] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                  Bandstand Studio, Mumbai, MH
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-[#4B5563]">
                  <Phone className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                  +91 98200 98765
                </span>
              </li>
              <li className="pt-2 flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] hover:border-[#E11D48] flex items-center justify-center text-[#6B7280] hover:text-[#E11D48] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] hover:border-[#E11D48] flex items-center justify-center text-[#6B7280] hover:text-[#E11D48] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accepted Payments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p className="font-bold uppercase tracking-wider">© 2026 Soul Craft. All Rights Reserved.</p>

          {/* Payment Badges in India */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#9D174D]">Safe Payments:</span>
            <span className="px-2 py-0.5 bg-[#FFF0F3] border border-[#FBCFE8] rounded text-[10px] font-bold text-[#831843]">
              UPI
            </span>
            <span className="px-2 py-0.5 bg-[#FFF0F3] border border-[#FBCFE8] rounded text-[10px] font-bold text-[#831843]">
              GPay / PhonePe
            </span>
            <span className="px-2 py-0.5 bg-[#FFF0F3] border border-[#FBCFE8] rounded text-[10px] font-bold text-[#831843]">
              Cards
            </span>
            <span className="px-2 py-0.5 bg-[#FFF0F3] border border-[#FBCFE8] rounded text-[10px] font-bold text-[#831843]">
              COD
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
            <button onClick={() => onNavigate('/policies?tab=privacy')} className="hover:text-[#E11D48] transition-colors">
              Privacy
            </button>
            <button onClick={() => onNavigate('/policies?tab=terms')} className="hover:text-[#E11D48] transition-colors">
              Terms
            </button>
            <button onClick={() => onNavigate('/policies?tab=shipping')} className="hover:text-[#E11D48] transition-colors">
              Shipping
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
