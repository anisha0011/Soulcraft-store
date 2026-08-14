import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center bg-[#FFF5F7] text-[#1F2937]">
        <div className="w-20 h-20 rounded-2xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto mb-5 shadow-card-pink">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937] mb-2">
          Your Craft Bag Is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven’t added any handcrafted treasures yet. Discover our latest bouquets, resin pieces, and personalized gifts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/shop')}
            className="px-8 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
          >
            Explore Handmade Shop
          </button>
          <button
            onClick={() => onNavigate('/custom-orders')}
            className="px-6 py-3.5 bg-white hover:bg-[#FFF0F3] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-widest rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] transition-colors cursor-pointer shadow-2xs"
          >
            Create A Custom Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-6">
        <button onClick={() => onNavigate('/')} className="hover:text-[#E11D48] cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-black text-[#1F2937]">Shopping Bag</span>
      </div>

      <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-4 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937]">
          Shopping Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:underline cursor-pointer"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Progress bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#374151] mb-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#E11D48]" />
                {amountToFreeShipping === 0 ? (
                  <strong className="text-[#059669]">
                    🎉 You have unlocked Free Express Shipping!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="text-[#E11D48]">₹{amountToFreeShipping}</strong> more to
                    unlock Free All-India Shipping
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-[#6B7280]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#FFF0F3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E11D48] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-3xl border border-[#FBCFE8] p-6 shadow-card-pink divide-y divide-[#FCE7F3]">
            {cart.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Thumbnail */}
                <img
                  src={item.product.thumbnail || item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-28 object-cover rounded-2xl border border-[#FBCFE8] shrink-0 bg-[#FFF5F7]"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E11D48]">
                          {item.product.categoryName}
                        </span>
                        <h3
                          onClick={() => onNavigate(`/product/${item.product.slug}`)}
                          className="font-display text-base font-black uppercase tracking-tight text-[#1F2937] hover:text-[#E11D48] cursor-pointer transition-colors"
                        >
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-[#9CA3AF] hover:text-[#E11D48] transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customization Details Pills */}
                    {item.customization && (
                      <div className="mt-2 space-y-1 text-xs text-[#6B7280]">
                        {item.customization.customName && (
                          <p className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                            <Sparkles className="w-3 h-3 text-[#E11D48]" />
                            <span>
                              Name / Note: <strong className="text-[#1F2937]">{item.customization.customName}</strong>
                            </span>
                          </p>
                        )}
                        {item.customization.selectedColor && (
                          <p className="text-[11px] font-bold uppercase tracking-wider">
                            Color Palette: <span className="text-[#1F2937]">{item.customization.selectedColor}</span>
                          </p>
                        )}
                        {item.customization.uploadedPhotoName && (
                          <p className="text-[11px] font-bold uppercase tracking-wider">
                            Photo Attached: <span className="text-[#1F2937]">📷 {item.customization.uploadedPhotoName}</span>
                          </p>
                        )}
                        {item.customization.giftWrap && (
                          <span className="inline-block px-2 py-0.5 bg-[#FFF0F3] text-[#E11D48] rounded-lg text-[10px] font-bold uppercase tracking-wider border border-[#FBCFE8]">
                            🎁 Signature Velvet Gift Wrap & Wax Seal Included
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity and Subtotal */}
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#FCE7F3]">
                    <div className="flex items-center border border-[#FBCFE8] rounded-xl bg-white shadow-2xs">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-black text-[#1F2937]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black text-[#1F2937]">
                        ₹{item.totalPrice.toLocaleString('en-IN')}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] font-mono text-[#6B7280]">₹{item.unitPrice} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('/shop')}
            className="text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:underline flex items-center gap-1 cursor-pointer"
          >
            &larr; Continue shopping handcrafted items
          </button>
        </div>

        {/* Right Column: Summary & Checkout */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-[#FBCFE8] p-6 space-y-5 shadow-card-pink">
            <h2 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937] border-b border-[#FCE7F3] pb-3">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#E11D48]" /> Promo / Discount Coupon:
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-[#E11D48]">{appliedCoupon.code}</span>
                    <span className="text-[#6B7280]">
                      ({appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}%` : `₹${appliedCoupon.discountValue}`} off applied)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#E11D48] font-bold uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="flex-1 px-3 py-2 text-xs font-bold uppercase rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FFF0F3] hover:bg-[#FFE4E8] border border-[#FBCFE8] text-[#E11D48] text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p
                  className={`text-[11px] mt-1.5 font-bold uppercase tracking-wider ${
                    couponFeedback.isError ? 'text-[#E11D48]' : 'text-[#059669]'
                  }`}
                >
                  {couponFeedback.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-[#6B7280] pt-2 border-t border-[#FCE7F3]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#1F2937]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#059669] font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-[#1F2937]">
                  {cartShippingFee === 0 ? (
                    <span className="text-[#059669] font-bold">FREE</span>
                  ) : (
                    `₹${cartShippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#FCE7F3] flex justify-between text-base font-black text-[#1F2937]">
                <span>Total Amount</span>
                <span className="text-xl text-[#E11D48]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => onNavigate('/checkout')}
              className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B7280]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>100% Safe Checkout & Artisan Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
