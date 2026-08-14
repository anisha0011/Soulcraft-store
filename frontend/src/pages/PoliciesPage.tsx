import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface PoliciesPageProps {
  initialTab?: string;
  onNavigate: (path: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialTab, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(
    (initialTab as any) || 'shipping'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8 bg-[#FFF5F7] text-[#1F2937]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
        <button onClick={() => onNavigate('/')} className="hover:text-[#E11D48] cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-black text-[#1F2937]">Store Policies</span>
      </div>

      <div className="border-b border-[#FCE7F3] pb-4">
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
          Studio Policies & Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
          Learn about our handcrafted shipping standards, packaging safety, returns, and privacy.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex gap-2 border-b border-[#FCE7F3] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'shipping'
              ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] shadow-2xs'
              : 'text-[#6B7280] hover:text-[#1F2937]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" /> Shipping Policy
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'returns'
              ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] shadow-2xs'
              : 'text-[#6B7280] hover:text-[#1F2937]'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Returns & Refunds
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] shadow-2xs'
              : 'text-[#6B7280] hover:text-[#1F2937]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] shadow-2xs'
              : 'text-[#6B7280] hover:text-[#1F2937]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Terms of Service
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FBCFE8] shadow-card-pink text-xs sm:text-sm text-[#374151] leading-relaxed space-y-4">
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#1F2937]">
              Shipping & Delivery Information
            </h2>
            <p>
              At <strong className="text-[#1F2937]">Soul Craft</strong>, every creation is hand-crafted individually upon order placement. Because our products include delicate paper folds, real chocolates, and cured resin, we adhere to strict packaging guidelines.
            </p>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#E11D48]">Processing Time:</h3>
            <p>
              Standard bouquets and personalized gifts require <strong className="text-[#1F2937]">24 to 48 hours</strong> of crafting time. Custom resin preservation orders require <strong className="text-[#1F2937]">4 to 6 business days</strong> for full UV resin curing and polish.
            </p>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#E11D48]">Transit & Delivery:</h3>
            <p>
              We partner with trusted express couriers (BlueDart, Delhivery, DTDC). Standard transit takes <strong className="text-[#1F2937]">2–4 business days</strong> for metro cities and <strong className="text-[#1F2937]">3–5 business days</strong> for rest of India.
            </p>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#E11D48]">Free Shipping:</h3>
            <p>
              All orders with a subtotal exceeding <strong className="text-[#1F2937]">₹999</strong> automatically qualify for Free Express Delivery across India.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#1F2937]">
              Returns, Refunds & Cancellations
            </h2>
            <p>
              Because our items are personalized and customized specifically with names, custom colors, and edible confections, customized products are <strong className="text-[#1F2937]">not eligible for generic buyer-remorse returns</strong> once crafted.
            </p>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#E11D48]">Transit Damage Guarantee:</h3>
            <p>
              If your parcel arrives damaged in transit, simply record a brief unboxing video or take photos within <strong className="text-[#1F2937]">24 hours of delivery</strong> and send it to our WhatsApp helpline (+91 98200 98765) or care@soulcraft.in. We will instantly dispatch a replacement free of charge.
            </p>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#E11D48]">Order Cancellations:</h3>
            <p>
              Orders may be cancelled within <strong className="text-[#1F2937]">2 hours</strong> of placement for a 100% full refund before the artisan begins physical assembly.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#1F2937]">
              Privacy & Data Security
            </h2>
            <p>
              Your personal privacy and confidentiality are sacred to us. Any recipient photos, customized love messages, or phone numbers shared with Soul Craft are used strictly to craft and deliver your order.
            </p>
            <p>
              We never sell, rent, or share customer contact details with third-party advertising brokers. All payments are processed through RBI-approved SSL encrypted gateways.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#1F2937]">
              Terms of Service
            </h2>
            <p>
              By accessing or purchasing from Soul Craft (soulcraft.in), you agree to our standard handcrafted service terms. Minor artistic variations in petal arrangements, ribbon bow shades, or resin pigment swirl patterns are natural hallmarks of authentic handmade crafts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
