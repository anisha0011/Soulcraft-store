import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    onNavigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    onNavigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white border-l border-[#FBCFE8] shadow-2xl flex flex-col justify-between text-[#1F2937]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#FCE7F3] flex items-center justify-between bg-[#FFF5F7]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shadow-2xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">Artisan Bag</h2>
                    <p className="text-[11px] font-bold text-[#9D174D] uppercase tracking-wider">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'} in studio order
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-8 h-8 rounded-xl hover:bg-white border border-transparent hover:border-[#FBCFE8] flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] transition-all cursor-pointer"
                  aria-label="Close Bag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="px-5 py-3 bg-[#FFF0F3] border-b border-[#FCE7F3]">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#E11D48]" />
                    {amountToFreeShipping === 0 ? (
                      <span className="text-[#059669]">🎉 Free Delivery Unlocked!</span>
                    ) : (
                      <span>
                        Add <strong className="text-[#E11D48]">₹{amountToFreeShipping}</strong> For Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-[#9D174D] font-bold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FCE7F3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E11D48] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#FCE7F3]">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mb-4 shadow-xs">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937] mb-1">Your bag is empty</h3>
                    <p className="text-xs text-[#6B7280] max-w-xs mb-6">
                      Explore handmade floral bouquets, acrylic night lights, and bespoke keepsake designs.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        onNavigate('/shop');
                      }}
                      className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      Explore Handmade Crafts
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.thumbnail || item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-24 object-cover rounded-xl border border-[#FBCFE8] shrink-0 bg-[#FFF0F3]"
                      />

                      {/* Info & Customization */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              onClick={() => {
                                setIsCartDrawerOpen(false);
                                onNavigate(`/product/${item.product.slug}`);
                              }}
                              className="font-display text-xs font-bold uppercase tracking-tight text-[#1F2937] hover:text-[#E11D48] cursor-pointer line-clamp-1"
                            >
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#9CA3AF] hover:text-[#E11D48] transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Customizations summary tags */}
                          {item.customization && (
                            <div className="mt-1 space-y-0.5 text-[11px] text-[#6B7280]">
                              {item.customization.customName && (
                                <p className="flex items-center gap-1">
                                  <Sparkles className="w-2.5 h-2.5 text-[#E11D48]" />
                                  <span>Text: <strong className="text-[#1F2937]">{item.customization.customName}</strong></span>
                                </p>
                              )}
                              {item.customization.selectedColor && (
                                <p>Color: <span className="text-[#1F2937]">{item.customization.selectedColor}</span></p>
                              )}
                              {item.customization.giftWrap && (
                                <span className="inline-block px-1.5 py-0.5 bg-[#FFF0F3] text-[#E11D48] rounded text-[10px] font-bold border border-[#FBCFE8]">
                                  🎁 Gift Box Included
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity & Unit Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#FBCFE8] rounded-lg bg-[#FFF5F7]">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-black text-[#1F2937]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-black text-[#1F2937]">
                              ₹{item.totalPrice.toLocaleString('en-IN')}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-[10px] text-[#6B7280]">₹{item.unitPrice} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer / Checkout info */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#FCE7F3] bg-[#FFF5F7] space-y-3.5">
                  {/* Coupon Promo form */}
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#FBCFE8] text-xs">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span className="font-black uppercase tracking-wider text-[#E11D48]">{appliedCoupon.code}</span>
                        <span className="text-[#6B7280]">applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-[#E11D48] hover:underline font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#FBCFE8] bg-white text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-white hover:bg-[#FFF0F3] text-[#1F2937] border border-[#FBCFE8] text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponMsg && (
                    <p className={`text-[11px] font-bold ${couponMsg.isError ? 'text-[#E11D48]' : 'text-[#059669]'}`}>
                      {couponMsg.text}
                    </p>
                  )}

                  {/* Summary Rows */}
                  <div className="space-y-1.5 text-xs text-[#6B7280] font-bold">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-black text-[#1F2937]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#059669]">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-black text-[#1F2937]">
                        {cartShippingFee === 0 ? (
                          <span className="text-[#059669]">FREE</span>
                        ) : (
                          `₹${cartShippingFee}`
                        )}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#FBCFE8] flex justify-between text-sm font-black text-[#1F2937]">
                      <span className="uppercase tracking-wider">Estimated Total</span>
                      <span className="text-base text-[#E11D48]">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      onClick={handleProceedCheckout}
                      className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                    >
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleViewCart}
                      className="w-full py-2 bg-transparent hover:bg-white text-[#6B7280] hover:text-[#1F2937] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer"
                    >
                      View Detailed Bag
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
