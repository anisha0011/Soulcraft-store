import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart } from 'lucide-react';

interface WishlistPageProps {
  onNavigate: (path: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, products } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-6 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
            Saved Favorites
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937] mt-1">
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        <button
          onClick={() => onNavigate('/shop')}
          className="text-xs font-black uppercase tracking-widest text-[#E11D48] hover:underline flex items-center gap-1 cursor-pointer"
        >
          Explore More &rarr;
        </button>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-3xl border border-[#FBCFE8] space-y-4 max-w-lg mx-auto shadow-card-pink">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto shadow-2xs">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-display text-xl font-black uppercase tracking-tight text-[#1F2937]">Your Wishlist Is Empty</h2>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Click the heart icon on any handcrafted bouquet or keepsake to save it for upcoming birthdays, anniversaries, and festive celebrations.
          </p>
          <button
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
          >
            Discover Handmade Crafts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
};
