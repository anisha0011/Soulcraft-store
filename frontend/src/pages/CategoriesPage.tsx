import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CategoriesPageProps {
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  const { categories } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-6">
        <button onClick={() => onNavigate('/')} className="hover:text-[#E11D48] cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-black text-[#1F2937]">Collections & Categories</span>
      </div>

      <div className="mb-10 text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
          Handcrafted Domains
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
          Shop By Craft Collection
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Explore individual categories hand-assembled by our boutique studio crafters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          return (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="group rounded-3xl overflow-hidden bg-white border border-[#FBCFE8] hover:border-[#E11D48] shadow-card-pink cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FFF5F7] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-full border border-[#FBCFE8] text-[10px] font-mono font-bold text-[#1F2937] shadow-2xs">
                  {cat.itemCount} Crafts
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display text-lg font-black uppercase tracking-tight text-[#1F2937] group-hover:text-[#E11D48] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#E11D48]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
