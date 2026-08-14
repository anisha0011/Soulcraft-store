import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Order, CustomOrderRequest } from '../types';

interface TrackOrderPageProps {
  initialTrackingId?: string;
  onNavigate: (path: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialTrackingId,
  onNavigate,
}) => {
  const { orders, customOrders } = useStore();
  const [searchId, setSearchId] = useState(initialTrackingId || 'SC-2026-001284');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchedCustom, setSearchedCustom] = useState<CustomOrderRequest | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchId) {
      handleSearch();
    }
  }, [initialTrackingId]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchId.trim();
    if (!clean) return;

    const matchedOrder = orders.find(
      (o) => o.id.toLowerCase() === clean.toLowerCase() || o.trackingNumber?.toLowerCase() === clean.toLowerCase()
    );

    const matchedCustom = customOrders.find(
      (c) => c.id.toLowerCase() === clean.toLowerCase()
    );

    setSearchedOrder(matchedOrder || null);
    setSearchedCustom(matchedCustom || null);
    setSearched(true);
  };

  const steps = [
    { title: 'Order Placed', desc: 'Craft studio received order details' },
    { title: 'Order Confirmed', desc: 'Materials and chocolates allocated' },
    { title: 'Artisan Crafting', desc: 'Master crafter hand-assembling piece' },
    { title: 'Quality Check & Seal', desc: 'Visual inspection & wax sealing' },
    { title: 'Dispatched via Courier', desc: 'In transit with BlueDart Express' },
    { title: 'Delivered', desc: 'Handed over at doorstep' },
  ];

  const getActiveStepIndex = (status: string) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'crafting':
        return 2;
      case 'shipped':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 2;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F3] text-xs font-black uppercase tracking-widest text-[#E11D48] border border-[#FBCFE8] shadow-2xs">
          <Package className="w-3.5 h-3.5" /> Real-time Workshop Tracking
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
          Track Your Handmade Order
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Enter your Order ID (e.g. <code className="text-[#E11D48]">SC-2026-001284</code>) or Custom Request ID to check the crafting status.
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 max-w-lg mx-auto mb-10 bg-white p-2 rounded-2xl border border-[#FBCFE8] shadow-card-pink"
      >
        <div className="flex-1 flex items-center gap-2 pl-3">
          <Search className="w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Order ID / Custom Request ID..."
            className="w-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          Track Order
        </button>
      </form>

      {/* Results Box */}
      {searchedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#FBCFE8] p-6 sm:p-8 shadow-card-pink space-y-8"
        >
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FCE7F3] pb-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B7280]">Order Reference</span>
              <h2 className="font-mono text-xl font-black text-[#E11D48]">{searchedOrder.id}</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN')} by{' '}
                <strong className="text-[#1F2937]">{searchedOrder.shippingAddress.fullName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#FBCFE8] text-xs font-black text-[#E11D48] uppercase">
                Status: {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* Animated Timeline */}
          <div className="space-y-6">
            <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E11D48]" /> Crafting & Delivery Journey
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#FCE7F3] space-y-8 my-4 ml-3 sm:ml-4">
              {steps.map((step, idx) => {
                const activeIdx = getActiveStepIndex(searchedOrder.status);
                const isPassed = idx <= activeIdx;
                const isCurrent = idx === activeIdx;

                return (
                  <div key={step.title} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isPassed
                          ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                          : 'bg-white border-[#FBCFE8] text-transparent'
                      }`}
                    >
                      {isPassed && <CheckCircle2 className="w-4 h-4" />}
                    </div>

                    <div className="space-y-0.5">
                      <h4
                        className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                          isCurrent
                            ? 'text-[#E11D48]'
                            : isPassed
                            ? 'text-[#1F2937]'
                            : 'text-[#9CA3AF]'
                        }`}
                      >
                        {step.title}
                        {isCurrent && (
                          <span className="ml-2 inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#FFF0F3] text-[#E11D48] font-black border border-[#FBCFE8]">
                            Current Stage
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-[#6B7280]">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier & Shipping Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] text-xs">
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[#1F2937] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#E11D48]" /> Carrier Tracking Info
              </p>
              <p className="text-[#6B7280]">
                Carrier: <strong className="text-[#1F2937]">BlueDart Express</strong>
              </p>
              <p className="text-[#6B7280]">
                AWB Tracking #: <strong className="font-mono text-[#E11D48]">{searchedOrder.trackingNumber || 'BD-88492019'}</strong>
              </p>
              <p className="text-[#6B7280]">
                Expected Delivery: <strong className="text-[#1F2937]">{searchedOrder.estimatedDelivery}</strong>
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[#1F2937] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E11D48]" /> Delivery Destination
              </p>
              <p className="text-[#6B7280]">{searchedOrder.shippingAddress.addressLine1}</p>
              <p className="text-[#6B7280]">
                {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.pinCode}
              </p>
              <p className="text-[#6B7280]">Phone: {searchedOrder.shippingAddress.phone}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Searched Custom Order */}
      {searchedCustom && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#FBCFE8] p-6 sm:p-8 shadow-card-pink space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FCE7F3] pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B7280]">Bespoke Craft Request</span>
              <h2 className="font-mono text-xl font-black text-[#E11D48]">{searchedCustom.id}</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">{searchedCustom.productType}</p>
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#FBCFE8] text-xs font-black text-[#E11D48] uppercase self-start">
              Status: {searchedCustom.status}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-2 text-xs text-[#6B7280]">
            <p>
              <strong className="text-[#1F2937]">Customer:</strong> {searchedCustom.customerName} ({searchedCustom.customerPhone})
            </p>
            <p>
              <strong className="text-[#1F2937]">Occasion:</strong> {searchedCustom.occasion} • <strong className="text-[#1F2937]">Theme:</strong> {searchedCustom.colorTheme}
            </p>
            <p>
              <strong className="text-[#1F2937]">Description:</strong> {searchedCustom.description}
            </p>
            {searchedCustom.estimatedPrice && (
              <p className="text-sm font-black text-[#E11D48] pt-2">
                Offered Studio Quote: ₹{searchedCustom.estimatedPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {searched && !searchedOrder && !searchedCustom && (
        <div className="text-center p-12 bg-white rounded-3xl border border-[#FBCFE8] shadow-card-pink space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto shadow-2xs">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937]">Order Not Found</h3>
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
            We couldn’t find an order matching "{searchId}". Try entering <code className="text-[#E11D48]">SC-2026-001284</code> or checking your WhatsApp confirmation message.
          </p>
        </div>
      )}
    </div>
  );
};
