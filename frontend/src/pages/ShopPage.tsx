import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShopPageProps {
  onNavigate: (path: string) => void;
  initialCategorySlug?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, initialCategorySlug }) => {
  const { products, categories } = useStore();

  const matchedCat = categories.find((c) => c.slug === initialCategorySlug);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    matchedCat ? matchedCat.id : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>(
    'featured'
  );
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const occasionsList = [
    'Birthday',
    'Anniversary',
    'Valentine',
    'Wedding',
    'Housewarming',
    'Diwali',
    'Just Because',
  ];

  const colorsList = [
    'Blush Pink',
    'Peach & Pink',
    'Crimson Red',
    'Gold Leaf',
    'Warm Amber',
    'Pastel Trio',
    'Emerald',
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesTags) {
          return false;
        }
      }

      if (product.price > maxPrice) {
        return false;
      }

      if (customizableOnly && !product.isCustomizable) {
        return false;
      }

      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      if (selectedOccasion !== 'all') {
        const hasOccasion = product.occasion.some(
          (o) => o.toLowerCase() === selectedOccasion.toLowerCase()
        );
        if (!hasOccasion) return false;
      }

      if (selectedColor !== 'all') {
        const hasColor = product.colors.some((c) =>
          c.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    maxPrice,
    customizableOnly,
    inStockOnly,
    selectedOccasion,
    selectedColor,
  ]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(3500);
    setSortBy('featured');
    setCustomizableOnly(false);
    setInStockOnly(false);
    setSelectedOccasion('all');
    setSelectedColor('all');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    maxPrice < 3500 ||
    customizableOnly ||
    inStockOnly ||
    selectedOccasion !== 'all' ||
    selectedColor !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Page Header */}
      <div className="mb-8 border-b border-[#FCE7F3] pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Boutique Collection
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937] mt-1">
              Handmade Treasures
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-xl">
              Explore bespoke bouquets, personalized acrylic plaques, botanical candles, and resin art handcrafted with bold craftsmanship.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1F2937] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#FBCFE8] text-xs font-bold uppercase tracking-wider text-[#1F2937] py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-[#E11D48] cursor-pointer shadow-2xs"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2 bg-white border border-[#FBCFE8] rounded-xl text-[#1F2937] flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E11D48]" /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Shop Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-[#FBCFE8] shadow-card-pink h-fit">
          <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-3">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#E11D48]" /> Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-black uppercase tracking-wider text-[#E11D48] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D] mb-2.5">
              Categories
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-black'
                    : 'text-[#6B7280] hover:bg-[#FFF5F7] hover:text-[#1F2937]'
                }`}
              >
                <span>All Collections</span>
                <span className="font-mono text-[10px]">{products.length}</span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-black'
                        : 'text-[#6B7280] hover:bg-[#FFF5F7] hover:text-[#1F2937]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="font-mono text-[10px]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D]">
                Max Price
              </h4>
              <span className="text-xs font-black text-[#E11D48]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={300}
              max={3500}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#E11D48] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#9CA3AF] mt-1">
              <span>₹300</span>
              <span>₹3,500</span>
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-[#FCE7F3]">
            <label className="flex items-center gap-2.5 text-xs text-[#374151] font-bold uppercase tracking-wider cursor-pointer">
              <input
                type="checkbox"
                checked={customizableOnly}
                onChange={(e) => setCustomizableOnly(e.target.checked)}
                className="rounded text-[#E11D48] focus:ring-[#E11D48]"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E11D48]" /> Customizable Only
              </span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-[#374151] font-bold uppercase tracking-wider cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#E11D48] focus:ring-[#E11D48]"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Occasion Filter */}
          <div className="pt-2 border-t border-[#FCE7F3]">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D] mb-2">
              Occasion
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedOccasion('all')}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                  selectedOccasion === 'all'
                    ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#4B5563] hover:text-[#1F2937]'
                }`}
              >
                All
              </button>
              {occasionsList.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                    selectedOccasion === occ
                      ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#4B5563] hover:text-[#1F2937]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="pt-2 border-t border-[#FCE7F3]">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D] mb-2">
              Color Theme
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedColor('all')}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                  selectedColor === 'all'
                    ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#4B5563] hover:text-[#1F2937]'
                }`}
              >
                All
              </button>
              {colorsList.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                    selectedColor === col
                      ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#4B5563] hover:text-[#1F2937]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {/* Active Filter Chips */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Showing <strong className="text-[#1F2937] font-black">{sortedProducts.length}</strong> handcrafted items
            </span>

            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#FBCFE8] text-[#E11D48] shadow-2xs">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')} className="cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {customizableOnly && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#FBCFE8] text-[#E11D48] shadow-2xs">
                    Customizable
                    <button onClick={() => setCustomizableOnly(false)} className="cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedOccasion !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#FBCFE8] text-[#E11D48] shadow-2xs">
                    {selectedOccasion}
                    <button onClick={() => setSelectedOccasion('all')} className="cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-[#FBCFE8] my-4 shadow-card-pink">
              <div className="w-16 h-16 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto mb-4 text-xl shadow-2xs">
                🌸
              </div>
              <h3 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937] mb-1">
                No matching handmade treasures
              </h3>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-6">
                Try adjusting your price range, clearing filters, or requesting a custom design idea!
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-white border border-[#FBCFE8] hover:border-[#E11D48] text-[#1F2937] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => onNavigate('/custom-orders')}
                  className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Start Custom Order
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white text-[#1F2937] border-l border-[#FBCFE8] shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-3">
                  <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">Filter Crafts</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="cursor-pointer">
                    <X className="w-5 h-5 text-[#6B7280] hover:text-[#1F2937]" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#9D174D] mb-2">
                    Categories
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                        selectedCategory === 'all' ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-bold' : 'text-[#6B7280]'
                      }`}
                    >
                      All Collections
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                          selectedCategory === c.id ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-bold' : 'text-[#6B7280]'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-1">
                    <span className="text-[#6B7280]">Max Price</span>
                    <span className="text-[#E11D48]">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={300}
                    max={3500}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#E11D48]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#FCE7F3] flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 bg-[#FFF5F7] border border-[#FBCFE8] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-[#E11D48] text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
