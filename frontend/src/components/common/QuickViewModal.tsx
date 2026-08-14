import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductGallery } from './ProductGallery';
import { RatingStars } from './RatingStars';
import { X, Sparkles, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickViewModalProps {
  onNavigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigate }) => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setCustomText('');
      setSelectedColor(
        quickViewProduct.customizationOptions?.colorOptions?.[0] ||
          quickViewProduct.colors[0] ||
          ''
      );
      setGiftWrap(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);
  const discount = quickViewProduct.compareAtPrice
    ? Math.round(
        ((quickViewProduct.compareAtPrice - quickViewProduct.price) /
          quickViewProduct.compareAtPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, {
      customName: customText.trim() || undefined,
      selectedColor: selectedColor || undefined,
      giftWrap,
    });
    setQuickViewProduct(null);
  };

  const handleGoToProduct = () => {
    setQuickViewProduct(null);
    onNavigate(`/product/${quickViewProduct.slug}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-card-pink border border-[#FBCFE8] overflow-hidden z-10 my-auto text-[#1F2937]"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xl bg-white/90 border border-[#FBCFE8] hover:bg-[#FFF0F3] text-[#6B7280] hover:text-[#1F2937] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
            {/* Left: Product Images */}
            <div className="p-6 bg-[#FFF5F7] border-b md:border-b-0 md:border-r border-[#FCE7F3]">
              <ProductGallery
                images={quickViewProduct.images}
                productName={quickViewProduct.name}
                isCustomizable={quickViewProduct.isCustomizable}
              />
            </div>

            {/* Right: Product Details & Fast Customizer */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#9D174D]">
                    {quickViewProduct.categoryName}
                  </span>
                  <RatingStars
                    rating={quickViewProduct.rating}
                    size={13}
                    showScore={true}
                    totalReviews={quickViewProduct.reviewCount}
                  />
                </div>

                {/* Product Title */}
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#1F2937] leading-snug mb-2">
                  {quickViewProduct.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 mb-3">
                  <span className="text-2xl font-black text-[#1F2937]">
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}
                  </span>
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-sm font-bold text-[#9CA3AF] line-through">
                      ₹{quickViewProduct.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white bg-[#E11D48] rounded-full shadow-2xs">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  {quickViewProduct.shortDescription || quickViewProduct.description.slice(0, 140) + '...'}
                </p>

                {/* Customization Options */}
                {quickViewProduct.isCustomizable && (
                  <div className="p-3.5 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-3 mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E11D48]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Handcrafted Customization</span>
                    </div>

                    {/* Custom Text Field */}
                    {quickViewProduct.customizationOptions?.allowsText && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">
                          {quickViewProduct.customizationOptions.textLabel || 'Personalized Message / Name'}:
                        </label>
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          maxLength={quickViewProduct.customizationOptions.textMaxLength || 60}
                          placeholder="e.g. Happy Birthday Sneha 💗"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#FBCFE8] bg-white text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                        />
                      </div>
                    )}

                    {/* Color selection if available */}
                    {quickViewProduct.customizationOptions?.colorOptions && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">
                          Select Color / Style:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {quickViewProduct.customizationOptions.colorOptions.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setSelectedColor(c)}
                              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                selectedColor === c
                                  ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                                  : 'bg-white border-[#FBCFE8] text-[#4B5563] hover:border-[#E11D48]'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gift Wrap Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-[#4B5563] font-medium">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="rounded text-[#E11D48] focus:ring-[#E11D48]"
                      />
                      <span>Add Signature Gift Wrap with Wax Seal (+₹0 complimentary)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Actions & Quantity */}
              <div className="pt-2 border-t border-[#FCE7F3] space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#FBCFE8] rounded-xl bg-[#FFF5F7]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-2 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-black text-[#1F2937]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-2 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 px-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-2.5 rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] bg-[#FFF5F7] text-[#6B7280] hover:text-[#E11D48] transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleGoToProduct}
                  className="w-full text-center text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:text-[#BE123C] flex items-center justify-center gap-1 cursor-pointer"
                >
                  View Full Product Details & Craft Story <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
