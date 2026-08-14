import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Truck,
  Lock,
  QrCode,
  CreditCard,
  Building,
  Banknote,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Order } from '../types';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderPlaced }) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    appliedCoupon,
    createOrder,
    currentUser,
    showToast,
  } = useStore();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [addressLine1, setAddressLine1] = useState('Flat 402, Rosewood Heights, Linking Road');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('400050');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const indianStates = [
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Uttar Pradesh',
    'West Bengal',
    'Telangana',
    'Rajasthan',
    'Kerala',
    'Punjab',
    'Haryana',
    'Goa',
    'Other States',
  ];

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 bg-[#FFF5F7] text-[#1F2937]">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1F2937]">Your Cart Is Empty</h2>
        <p className="text-xs text-[#6B7280]">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-6 py-2.5 bg-[#E11D48] text-white text-xs font-black uppercase tracking-widest rounded-xl cursor-pointer shadow-md"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !addressLine1 || !city || !pinCode) {
      showToast('Please fill out all required address fields', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        items: cart.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          productImage: item.product.thumbnail || item.product.images[0],
          quantity: item.quantity,
          price: item.unitPrice,
          customization: item.customization,
        })),
        shippingAddress: {
          fullName,
          email,
          phone,
          streetAddress: addressLine1,
          city,
          state,
          pinCode,
          country: 'India',
        },
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI'
            : paymentMethod === 'card'
            ? 'CARD'
            : paymentMethod === 'netbanking'
            ? 'NETBANKING'
            : 'COD',
        paymentStatus: paymentMethod === 'cod' ? 'PENDING' : 'PAID',
        orderStatus: 'PLACED',
        trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
        carrier: 'BlueDart Express Handcrafted Logistics',
        subtotal: cartSubtotal,
        discountAmount: cartDiscount,
        appliedCoupon: appliedCoupon?.code,
        shippingFee: cartShippingFee,
        taxAmount: Math.round(cartSubtotal * 0.05),
        totalAmount: cartTotal,
        estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      });

      setIsProcessing(false);
      onOrderPlaced(order);
      onNavigate(`/order-confirmation?orderId=${order.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-6">
        <button onClick={() => onNavigate('/')} className="hover:text-[#E11D48] cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('/cart')} className="hover:text-[#E11D48] cursor-pointer">
          Bag
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-black text-[#1F2937]">Secure Checkout</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
          Secure Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
          Complete your delivery details for handcrafted packaging and express transit.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Shipping & Payment Information (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact & Delivery Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FBCFE8] shadow-card-pink space-y-5">
            <h2 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2 border-b border-[#FCE7F3] pb-3">
              <Truck className="w-5 h-5 text-[#E11D48]" /> 1. Shipping Address (India)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Full Name <span className="text-[#E11D48]">*</span>:
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sneha Patel"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Phone (WhatsApp Updates) <span className="text-[#E11D48]">*</span>:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 12345"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                Email Address <span className="text-[#E11D48]">*</span>:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sneha@example.com"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                House / Flat / Street Address <span className="text-[#E11D48]">*</span>:
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="House / Apartment number, Building name, Street"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  City / Town <span className="text-[#E11D48]">*</span>:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  State <span className="text-[#E11D48]">*</span>:
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] focus:outline-none focus:border-[#E11D48] cursor-pointer shadow-2xs"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Pincode <span className="text-[#E11D48]">*</span>:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="400050"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FBCFE8] shadow-card-pink space-y-5">
            <h2 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2 border-b border-[#FCE7F3] pb-3">
              <Lock className="w-5 h-5 text-[#E11D48]" /> 2. Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* UPI */}
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'upi'
                    ? 'bg-[#FFF0F3] border-[#E11D48] ring-1 ring-[#E11D48]'
                    : 'bg-[#FFF5F7] border-[#FBCFE8] hover:border-[#E11D48]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">UPI Instant Pay</p>
                  <p className="text-[10px] text-[#6B7280]">Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </label>

              {/* Cards */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'card'
                    ? 'bg-[#FFF0F3] border-[#E11D48] ring-1 ring-[#E11D48]'
                    : 'bg-[#FFF5F7] border-[#FBCFE8] hover:border-[#E11D48]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Cards</p>
                  <p className="text-[10px] text-[#6B7280]">RuPay, Visa, Mastercard, Amex</p>
                </div>
              </label>

              {/* NetBanking */}
              <label
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'netbanking'
                    ? 'bg-[#FFF0F3] border-[#E11D48] ring-1 ring-[#E11D48]'
                    : 'bg-[#FFF5F7] border-[#FBCFE8] hover:border-[#E11D48]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Net Banking</p>
                  <p className="text-[10px] text-[#6B7280]">HDFC, ICICI, SBI, Axis & more</p>
                </div>
              </label>

              {/* COD */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'cod'
                    ? 'bg-[#FFF0F3] border-[#E11D48] ring-1 ring-[#E11D48]'
                    : 'bg-[#FFF5F7] border-[#FBCFE8] hover:border-[#E11D48]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Cash on Delivery</p>
                  <p className="text-[10px] text-[#6B7280]">Pay upon doorstep handover</p>
                </div>
              </label>
            </div>

            {/* UPI QR preview */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center gap-4">
                <div className="w-16 h-16 bg-white p-1 rounded-xl border border-[#FBCFE8] flex items-center justify-center shadow-2xs">
                  <QrCode className="w-12 h-12 text-[#1F2937]" />
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold uppercase tracking-wider text-[#1F2937]">UPI Auto-Verification</p>
                  <p className="text-[11px] text-[#6B7280]">
                    VPA / UPI ID: <strong className="text-[#E11D48]">soulcraft@icici</strong>
                  </p>
                  <p className="text-[10px] text-[#059669]">✓ Instant 1-click test simulation enabled</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Action (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#FBCFE8] p-6 space-y-5 shadow-card-pink">
            <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] border-b border-[#FCE7F3] pb-3">
              Order Items ({cart.length})
            </h3>

            {/* Micro items list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#FCE7F3]">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.thumbnail || item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-16 object-cover rounded-xl border border-[#FBCFE8] shrink-0 bg-[#FFF5F7]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-xs font-black uppercase tracking-tight text-[#1F2937] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#6B7280]">Qty: {item.quantity}</p>
                    {item.customization?.customName && (
                      <p className="text-[10px] text-[#E11D48] truncate">
                        ✨ Note: {item.customization.customName}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-black text-[#1F2937]">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#6B7280] pt-3 border-t border-[#FCE7F3]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#1F2937]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#059669] font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-bold text-[#1F2937]">
                  {cartShippingFee === 0 ? (
                    <span className="text-[#059669] font-bold">FREE</span>
                  ) : (
                    `₹${cartShippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#FCE7F3] flex justify-between text-base font-black text-[#1F2937]">
                <span>Total Due</span>
                <span className="text-xl text-[#E11D48]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Handcrafting Your Order...' : `Place Order (₹${cartTotal})`}
            </button>

            <div className="text-center text-[11px] text-[#6B7280] space-y-1">
              <p>🔒 256-Bit SSL Encrypted Artisan Security</p>
              <p>WhatsApp dispatch confirmation sent immediately upon placement.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
