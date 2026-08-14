import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  onNavigate: (path: string) => void;
}

const POPULAR_SEARCHES = [
  'Teddy Bouquet',
  'Kinder Joy',
  'Glitter Roses',
  'Spotify Plaque',
  'Resin Keychain',
  'Crochet Bouquet',
  'Diwali Hamper',
  'Agate Coasters',
];

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { isSearchModalOpen, setIsSearchModalOpen, products, categories } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  const cleanQuery = query.toLowerCase().trim();
  const searchResults = cleanQuery
    ? products.filter((p) => {
        return (
          p.name.toLowerCase().includes(cleanQuery) ||
          p.categoryName.toLowerCase().includes(cleanQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanQuery)) ||
          p.description.toLowerCase().includes(cleanQuery) ||
          p.materials.some((m) => m.toLowerCase().includes(cleanQuery))
        );
      })
    : [];

  const handleSelectProduct = (slug: string) => {
    setIsSearchModalOpen(false);
    onNavigate(`/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    setIsSearchModalOpen(false);
    onNavigate(`/category/${slug}`);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <AnimatePresence>
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-16 flex justify-center items-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-card-pink border border-[#FBCFE8] overflow-hidden z-10 my-auto sm:my-8 text-[#1F2937]"
          >
            {/* Input Header */}
            <div className="p-4 sm:p-5 border-b border-[#FCE7F3] flex items-center gap-3 bg-[#FFF5F7]">
              <Search className="w-5 h-5 text-[#E11D48] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bouquets, personalized gifts, resin art..."
                className="w-full text-sm sm:text-base font-bold uppercase tracking-wider text-[#1F2937] placeholder-[#9CA3AF] bg-transparent focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="px-2.5 py-1 text-xs font-black rounded-lg bg-white border border-[#FBCFE8] text-[#9D174D] hover:text-[#E11D48] shrink-0 cursor-pointer shadow-2xs"
              >
                ESC
              </button>
            </div>

            {/* Content Body */}
            <div className="max-h-[60vh] overflow-y-auto p-5">
              {query ? (
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-[#9D174D]">
                    <span>Results for "{query}"</span>
                    <span>{searchResults.length} found</span>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm font-bold uppercase tracking-wider text-[#1F2937] mb-1">No handcrafted items found</p>
                      <p className="text-xs text-[#6B7280] mb-4">
                        Try searching for "Bouquet", "Resin", "Spotify", or submit a bespoke idea.
                      </p>
                      <button
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          onNavigate('/custom-orders');
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF0F3] hover:bg-[#FFE4E8] text-[#E11D48] text-xs font-black uppercase tracking-wider rounded-xl border border-[#FBCFE8] transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Request a Custom Order
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.slug)}
                          className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#FFF5F7] border border-transparent hover:border-[#FBCFE8] cursor-pointer transition-all group"
                        >
                          <img
                            src={product.thumbnail || product.images[0]}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-16 object-cover rounded-lg border border-[#FBCFE8] shrink-0 bg-[#FFF0F3]"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#9D174D]">
                              {product.categoryName}
                            </span>
                            <h4 className="font-display text-sm font-bold uppercase tracking-tight text-[#1F2937] group-hover:text-[#E11D48] truncate">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-black text-[#1F2937]">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.isCustomizable && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#E11D48] px-1.5 rounded">
                                  Custom
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#E11D48] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Popular Searches */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D] mb-2.5 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#E11D48]" /> Popular Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => handlePopularSearch(term)}
                          className="px-3 py-1.5 bg-[#FFF5F7] hover:bg-[#FFF0F3] border border-[#FBCFE8] hover:border-[#E11D48] rounded-xl text-xs text-[#374151] hover:text-[#E11D48] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories Quick Link */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D] mb-2.5">
                      Browse Categories
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {categories.slice(0, 4).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSelectCategory(cat.slug)}
                          className="p-2.5 rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] bg-[#FFF5F7] hover:bg-[#FFF0F3] text-left transition-all group cursor-pointer"
                        >
                          <p className="font-display text-xs font-black uppercase tracking-tight text-[#1F2937] group-hover:text-[#E11D48] truncate">
                            {cat.name}
                          </p>
                          <p className="text-[10px] font-mono text-[#9D174D]">{cat.itemCount} items</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
