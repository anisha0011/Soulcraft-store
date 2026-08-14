import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { RatingStars } from './RatingStars';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate?: (path: string) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (onNavigate) {
      onNavigate(`/product/${product.slug}`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isCustomizable) {
      setQuickViewProduct(product);
    } else {
      addToCart(product, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const primaryImage = product.images[0] || product.thumbnail;
  const secondaryImage = product.images[1] || primaryImage;

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#FCE7F3] hover:border-[#E11D48] transition-all duration-300 hover:shadow-card-pink cursor-pointer overflow-hidden"
    >
      {/* Image Container (4:5 Ratio) */}
      <div className="relative w-full aspect-[4/5] bg-[#FFF0F3] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestseller && (
            <span className="px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase bg-[#E11D48] text-white rounded-full shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase bg-[#059669] text-white rounded-full shadow-xs">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] rounded-full">
              {discountPercent}% OFF
            </span>
          )}
          {product.isCustomizable && (
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-white/90 backdrop-blur-xs text-[#1F2937] rounded-full border border-[#FBCFE8] flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-[#E11D48]" /> Custom
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-white/85 backdrop-blur-sm border border-[#FBCFE8] flex items-center justify-center text-[#9CA3AF] hover:text-[#E11D48] hover:bg-white transition-all shadow-xs active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'text-[#E11D48] fill-[#E11D48]' : 'text-[#9CA3AF]'
            }`}
          />
        </button>

        {/* Product Images with Cross-Fade / Zoom */}
        <div className="w-full h-full relative">
          <img
            src={primaryImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              isHovered && product.images.length > 1 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {product.images.length > 1 && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </div>

        {/* Quick Action Overlay (Bottom of Image) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-sm hover:bg-[#FFF0F3] text-[#1F2937] text-xs font-bold uppercase tracking-wider rounded-xl border border-[#FBCFE8] shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#E11D48]" /> Quick View
          </button>
          <button
            onClick={handleQuickAdd}
            className={`p-2 rounded-xl text-xs font-black shadow-sm flex items-center justify-center transition-all cursor-pointer ${
              justAdded
                ? 'bg-[#059669] text-white'
                : 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
            }`}
            title={product.isCustomizable ? 'Customize Product' : 'Add to Bag'}
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : product.isCustomizable ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-black tracking-widest uppercase text-[#9D174D]">
              {product.categoryName}
            </span>
            <RatingStars rating={product.rating} size={11} showScore={false} totalReviews={product.reviewCount} />
          </div>

          {/* Title */}
          <h3 className="font-display text-[14px] font-bold uppercase tracking-tight text-[#1F2937] line-clamp-2 leading-snug group-hover:text-[#E11D48] transition-colors mb-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 border-t border-[#FCE7F3] flex items-center justify-between">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-black text-[#1F2937]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs font-bold text-[#9CA3AF] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className="text-[11px] font-black uppercase tracking-wider text-[#E11D48] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            {product.isCustomizable ? 'Custom' : 'View'} &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
