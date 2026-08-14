import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGallery } from '../components/common/ProductGallery';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/common/ProductCard';
import {
  Sparkles,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Check,
  ChevronRight,
  Upload,
  Clock,
  MapPin,
  Flame,
} from 'lucide-react';

interface ProductDetailsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ slug, onNavigate }) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    showToast,
  } = useStore();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [customName, setCustomName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState(
    product.customizationOptions?.colorOptions?.[0] || product.colors[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.customizationOptions?.sizeOptions?.[0] || ''
  );
  const [uploadedPhotoName, setUploadedPhotoName] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping' | 'reviews'>('details');

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isLiked = isInWishlist(product.id);
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedPhotoName(file.name);
      showToast(`Photo "${file.name}" attached successfully! 📷`, 'heart');
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode || pinCode.length !== 6) {
      showToast('Please enter a valid 6-digit Indian PIN code', 'error');
      return;
    }
    const days = pinCode.startsWith('4') ? '2-3' : '3-5';
    setDeliveryEstimate(`Express Delivery to PIN ${pinCode} in ${days} business days 🚚`);
  };

  const handleAddToCart = (directBuy = false) => {
    addToCart(product, quantity, {
      customName: customName.trim() || undefined,
      customMessage: customMessage.trim() || undefined,
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
      uploadedPhotoName: uploadedPhotoName || undefined,
      giftWrap,
      giftMessage: giftMessage.trim() || undefined,
    });

    if (directBuy) {
      onNavigate('/checkout');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast('Please fill out all review fields', 'error');
      return;
    }
    addReview(product.id, reviewRating, reviewTitle, reviewComment);
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-6 flex-wrap">
        <button onClick={() => onNavigate('/')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('/shop')} className="hover:text-[#E11D48] transition-colors cursor-pointer">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate(`/category/${product.categoryId}`)}
          className="hover:text-[#E11D48] transition-colors cursor-pointer"
        >
          {product.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1F2937] font-black truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            isCustomizable={product.isCustomizable}
          />
        </div>

        {/* Right Column: Information & Interactive Customizer */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Category & Badge header */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
                {product.categoryName}
              </span>
              {product.stock <= product.lowStockThreshold ? (
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E11D48] bg-[#FFE4E8] px-2 py-0.5 rounded-full border border-[#FBCFE8] flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Only {product.stock} left in studio!
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock • Ready to Craft
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937] leading-snug mb-2">
              {product.name}
            </h1>

            {/* Rating Stars & SKU */}
            <div className="flex items-center gap-3 text-xs text-[#6B7280] pb-3 border-b border-[#FCE7F3]">
              <RatingStars
                rating={product.rating}
                size={14}
                showScore={true}
                totalReviews={productReviews.length || product.reviewCount}
              />
              <span>•</span>
              <span className="font-mono text-[11px]">SKU: {product.sku}</span>
            </div>

            {/* Price Display */}
            <div className="pt-3 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#1F2937]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-base font-bold text-[#9CA3AF] line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white bg-[#E11D48] rounded-full shadow-2xs">
                  {discount}% OFF
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#6B7280] mt-0.5">
              Inclusive of all taxes. Free express shipping above ₹999.
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            {product.description}
          </p>

          {/* CUSTOMIZATION SUITE (For Customizable Items) */}
          {product.isCustomizable && (
            <div className="p-4 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E11D48]">
                  <Sparkles className="w-4 h-4" />
                  <span>Personalize Your Craft</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Bespoke Made</span>
              </div>

              {/* Custom Text / Engraving Field */}
              {product.customizationOptions?.allowsText && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    {product.customizationOptions.textLabel || 'Personalized Text / Name'}:
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={product.customizationOptions.textMaxLength || 60}
                    placeholder="e.g. Ananya & Kabir • Best Wishes"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  />
                  <p className="text-[10px] font-mono text-[#9CA3AF] text-right mt-0.5">
                    {customName.length}/{product.customizationOptions.textMaxLength || 60} chars
                  </p>
                </div>
              )}

              {/* Color options */}
              {product.customizationOptions?.colorOptions && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                    Select Color Tone:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.customizationOptions.colorOptions.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                          selectedColor === c
                            ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                            : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#374151] hover:border-[#E11D48]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size / Variation choice if applicable */}
              {product.customizationOptions?.sizeOptions && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                    Select Bouquet Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.customizationOptions.sizeOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                            : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#374151] hover:border-[#E11D48]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Upload Attachment */}
              {product.customizationOptions?.allowsPhoto && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    {product.customizationOptions.photoLabel || 'Upload High-Res Photo'}:
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-[#FBCFE8] hover:border-[#E11D48] rounded-xl bg-[#FFF5F7] cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-[#E11D48]" />
                    <span className="text-xs text-[#6B7280]">
                      {uploadedPhotoName ? (
                        <strong className="text-[#1F2937]">{uploadedPhotoName}</strong>
                      ) : (
                        'Click to upload JPG / PNG photo'
                      )}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Gift Wrap & Handwritten Card */}
              <div className="pt-2 border-t border-[#FCE7F3] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-[#374151]">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded text-[#E11D48] focus:ring-[#E11D48]"
                  />
                  <span>Add Signature Velvet Gift Wrap & Wax Seal (+₹0 Complimentary)</span>
                </label>

                {giftWrap && (
                  <input
                    type="text"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Optional handwritten gift note message..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  />
                )}
              </div>
            </div>
          )}

          {/* Quantity & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#FBCFE8] rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-sm font-black text-[#1F2937]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={() => handleAddToCart(false)}
                className="flex-1 py-3.5 px-6 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Craft Bag
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3.5 rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] bg-white text-[#6B7280] hover:text-[#E11D48] transition-colors cursor-pointer shadow-2xs"
                title={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={() => handleAddToCart(true)}
              className="w-full py-3.5 bg-white hover:bg-[#FFF0F3] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-widest rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] transition-all active:scale-98 cursor-pointer shadow-2xs"
            >
              Buy Now with Instant Checkout
            </button>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="p-4 rounded-xl bg-white border border-[#FBCFE8] shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#374151]">
              <MapPin className="w-3.5 h-3.5 text-[#E11D48]" /> Check Delivery in Your City:
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code (e.g. 400050)"
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#FFF0F3] border border-[#FBCFE8] hover:border-[#E11D48] text-xs font-bold uppercase tracking-wider text-[#E11D48] rounded-xl transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>
            {deliveryEstimate && (
              <p className="text-xs font-bold uppercase tracking-wider text-[#059669] mt-1">{deliveryEstimate}</p>
            )}
          </div>

          {/* Micro Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E11D48]" />
              <span>Ships in {product.processingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
              <span>Safe Transit Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Tabs Section */}
      <div className="mt-16 border-t border-[#FCE7F3] pt-10">
        <div className="flex items-center gap-3 border-b border-[#FCE7F3] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-bold'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Materials & Craft
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer ${
              activeTab === 'care'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-bold'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Care Instructions
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer ${
              activeTab === 'shipping'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-bold'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Shipping & Packaging
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] font-bold'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Reviews ({productReviews.length})
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="py-6 text-xs sm:text-sm text-[#374151] leading-relaxed">
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-[#FBCFE8] shadow-card-pink">
              <div className="space-y-3">
                <h4 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">
                  Handmade Materials
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#6B7280]">
                  {product.materials.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <p className="text-xs pt-2 text-[#374151]">
                  <strong className="text-[#1F2937]">Dimensions:</strong> {product.dimensions}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">
                  Master Artisan Note
                </h4>
                <p className="text-xs text-[#6B7280] italic">
                  "{product.artisanNote || 'Every curve, petal fold, and seal is crafted by hand in our studio with meticulous attention to detail.'}"
                </p>
                <div className="pt-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#E11D48]">Occasion Match: </span>
                  <span className="text-[#6B7280]">{product.occasion.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="bg-white p-6 rounded-2xl border border-[#FBCFE8] shadow-card-pink space-y-3">
              <h4 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">
                How to Care for Your Handmade Treasure
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {product.careInstructions}
              </p>
              <p className="text-xs text-[#6B7280]">
                💡 Tip: Keep in a cool, dry area away from direct moisture to preserve colors and materials.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="bg-white p-6 rounded-2xl border border-[#FBCFE8] shadow-card-pink space-y-3">
              <h4 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">
                Packaging & Delivery Details
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {product.shippingInfo}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-3 bg-[#FFF5F7] rounded-xl border border-[#FBCFE8]">
                  <p className="font-bold uppercase tracking-wider text-xs text-[#1F2937]">Standard Processing</p>
                  <p className="text-[11px] text-[#6B7280]">{product.processingTime}</p>
                </div>
                <div className="p-3 bg-[#FFF5F7] rounded-xl border border-[#FBCFE8]">
                  <p className="font-bold uppercase tracking-wider text-xs text-[#1F2937]">Transit Time</p>
                  <p className="text-[11px] text-[#6B7280]">2-4 business days across India</p>
                </div>
                <div className="p-3 bg-[#FFF5F7] rounded-xl border border-[#FBCFE8]">
                  <p className="font-bold uppercase tracking-wider text-xs text-[#1F2937]">Crush-Proof Box</p>
                  <p className="text-[11px] text-[#6B7280]">5-ply corrugated safety container</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Review summary header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#FBCFE8] shadow-card-pink">
                <div>
                  <h4 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937]">
                    Customer Reviews
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={product.rating} size={15} showScore={true} />
                    <span className="text-xs font-bold text-[#6B7280]">
                      Based on {productReviews.length} authentic verified orders
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Submit Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview}
                  className="p-6 rounded-2xl bg-white border border-[#FBCFE8] space-y-4 shadow-card-pink"
                >
                  <h4 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937]">
                    Share Your Experience
                  </h4>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">Rating:</label>
                    <RatingStars
                      rating={reviewRating}
                      size={20}
                      interactive={true}
                      onRatingChange={(r) => setReviewRating(r)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                      Review Title:
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Such breathtaking finishing and quick delivery!"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                      Detailed Review:
                    </label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="How did the handmade creation look? How was the recipient's reaction?"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Review 💗
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-[#6B7280] text-center py-6">
                    Be the first to leave a review for this handcrafted treasure!
                  </p>
                ) : (
                  productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-[#FBCFE8] shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-black uppercase tracking-wider text-xs text-[#1F2937]">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="px-2 py-0.5 bg-[#FFF0F3] text-[#059669] text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 border border-[#FBCFE8]">
                              <Check className="w-2.5 h-2.5" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-[#9CA3AF]">{rev.date}</span>
                      </div>

                      <RatingStars rating={rev.rating} size={12} />

                      <h5 className="font-display text-sm font-bold uppercase tracking-tight text-[#1F2937]">
                        {rev.title}
                      </h5>

                      <p className="text-xs text-[#6B7280] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-[#FCE7F3]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
                You May Also Cherish
              </span>
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-[#1F2937]">
                Related Handcrafted Pieces
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:text-[#BE123C] cursor-pointer"
            >
              View More &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
