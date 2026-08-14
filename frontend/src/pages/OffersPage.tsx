import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Tag, Copy, Check } from 'lucide-react';
import { INITIAL_COUPONS } from '../data/mockData';

interface OffersPageProps {
  onNavigate: (path: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onNavigate }) => {
  const { showToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon "${code}" copied to clipboard! ✂️`, 'heart');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F3] text-xs font-black uppercase tracking-widest text-[#E11D48] border border-[#FBCFE8] shadow-2xs">
          <Tag className="w-3.5 h-3.5" /> Studio Perks & Discounts
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
          Festive Deals & Craft Coupons
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Apply these exclusive discount codes at checkout to save on your handmade surprises.
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {INITIAL_COUPONS.map((coupon) => (
          <div
            key={coupon.id}
            className="p-6 rounded-3xl bg-white border border-[#FBCFE8] shadow-card-pink relative overflow-hidden flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black uppercase text-[#E11D48]">
                  {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#E11D48] text-[10px] font-black uppercase tracking-wider border border-[#FBCFE8]">
                  Active Coupon
                </span>
              </div>

              <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">
                {coupon.description}
              </h3>

              <p className="text-xs text-[#6B7280]">
                Min. cart value: <strong className="text-[#1F2937]">₹{coupon.minOrderAmount}</strong>
              </p>
            </div>

            {/* Copy Button Box */}
            <div className="pt-2">
              <div className="p-2.5 rounded-2xl bg-[#FFF5F7] border-2 border-dashed border-[#FBCFE8] flex items-center justify-between">
                <span className="font-mono text-sm font-black text-[#1F2937] tracking-widest pl-2">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="px-3 py-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Free Shipping Highlight Banner */}
      <div className="p-8 rounded-3xl bg-white border border-[#FBCFE8] flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-pink">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-black text-[#E11D48] uppercase tracking-widest">
            All-India Shipping Offer
          </span>
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1F2937]">
            Free Express Delivery On Orders Over ₹999
          </h2>
          <p className="text-xs text-[#6B7280] max-w-md">
            No code needed! Free crush-proof shipping is automatically calculated at checkout.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/shop')}
          className="px-7 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          Shop Qualifying Items &rarr;
        </button>
      </div>
    </div>
  );
};
