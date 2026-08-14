import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  Send,
  Heart,
  Palette,
  Gift,
  Copy,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';

interface CustomOrderPageProps {
  onNavigate: (path: string) => void;
}

export const CustomOrderPage: React.FC<CustomOrderPageProps> = ({ onNavigate }) => {
  const { addCustomOrder, showToast } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');

  const [productType, setProductType] = useState('Handmade Chocolate & Plush Bouquet');
  const [occasion, setOccasion] = useState('Birthday');
  const [recipientName, setRecipientName] = useState('');
  const [colorTheme, setColorTheme] = useState('Blush Pink & Peach');
  const [budgetRange, setBudgetRange] = useState('₹1,000 - ₹2,000');
  const [requiredDate, setRequiredDate] = useState('');
  const [description, setDescription] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const productTypes = [
    'Handmade Chocolate & Plush Bouquet',
    'Glitter Velvet Roses with LED Lights',
    'Personalized Spotify / Photo Acrylic Plaque',
    'Resin Keepsake (Coasters, Clock, Trays)',
    'Bridal Garland / Flower Preservation Art',
    'Hand-Crocheted Forever Bouquet',
    'Luxury Festive / Wedding Gift Hamper',
    'Other Unique Custom Craft Vision',
  ];

  const occasions = [
    'Birthday',
    'Anniversary',
    'Valentine / Proposal',
    'Wedding & Bridal',
    'Baby Shower / Newborn',
    'Graduation / Farewell',
    'Diwali / Festive Gifting',
    'Corporate / Bulk Gifting',
    'Just Because / Self Love',
  ];

  const colorThemes = [
    'Blush Pink & Peach',
    'Midnight Black & Crimson Red',
    'Pastel Lavender & Baby Blue',
    'Warm Gold Leaf & Cream',
    'Emerald Green & Botanical White',
    'Rainbow / Multi-Pastel',
    'Custom Surprise Palette',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f: File) => f.name);
      setReferenceImages((prev) => [...prev, ...newFiles]);
      showToast(`${newFiles.length} reference file(s) attached! 📎`, 'heart');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerEmail || !customerPhone || !description) {
      showToast('Please fill in all required contact and idea fields', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = addCustomOrder({
        customerName,
        customerEmail,
        customerPhone,
        productType,
        occasion,
        recipientName: recipientName.trim() || undefined,
        colorTheme,
        budgetRange,
        requiredDate: requiredDate || undefined,
        description,
        referenceImages,
        city: city || undefined,
        pinCode: pinCode || undefined,
      });

      setSubmittedId(order.id);
      setIsSubmitting(false);
      showToast('Custom Order Request Submitted! We will contact you on WhatsApp 💗', 'heart');
    }, 600);
  };

  const handleCopyId = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#FBCFE8] text-xs font-black uppercase tracking-widest text-[#E11D48] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" /> Soul Craft Bespoke Studio
        </div>
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1F2937] leading-tight">
          Have Something Special In Mind?
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
          Tell us your dream vision and our artisans will bring it to life with custom materials, colors, sweets, and personalized touches.
        </p>
      </div>

      {submittedId ? (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-[#FBCFE8] shadow-card-pink text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto text-2xl shadow-2xs">
            🎉
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1F2937]">
              Custom Order Received!
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Thank you, <strong className="text-[#1F2937]">{customerName}</strong>. Our master artisan is already reviewing your request for <em className="text-[#E11D48]">{productType}</em>.
            </p>
          </div>

          {/* Reference ID badge */}
          <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                Custom Request ID
              </span>
              <p className="font-mono text-sm font-black text-[#E11D48]">{submittedId}</p>
            </div>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-xl bg-white border border-[#FBCFE8] text-[#6B7280] hover:text-[#1F2937] hover:border-[#E11D48] transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#E11D48]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* What happens next */}
          <div className="text-left p-4 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-2.5 text-xs text-[#374151]">
            <h4 className="font-black uppercase tracking-wider text-[#E11D48]">What happens next:</h4>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#E11D48] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-2xs">
                1
              </span>
              <span>We calculate the exact price quote and draft design sketches.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#E11D48] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-2xs">
                2
              </span>
              <span>Our studio team messages you on WhatsApp (<strong className="text-[#1F2937]">{customerPhone}</strong>) within 8 hours.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#E11D48] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-2xs">
                3
              </span>
              <span>Once confirmed, our crafter begins assembling your one-of-a-kind keepsake!</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate(`/track-order?id=${submittedId}`)}
              className="flex-1 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
            >
              Track Request Status
            </button>
            <button
              onClick={() => {
                setSubmittedId(null);
                setDescription('');
              }}
              className="flex-1 py-3 bg-white hover:bg-[#FFF0F3] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-widest rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] transition-colors cursor-pointer shadow-2xs"
            >
              Submit Another Idea
            </button>
          </div>
        </motion.div>
      ) : (
        /* The Form Layout: 2 Columns */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form (8 Cols) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#FBCFE8] shadow-card-pink space-y-6"
          >
            {/* Step 1: Craft Type */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2 border-b border-[#FCE7F3] pb-2">
                <Palette className="w-4 h-4 text-[#E11D48]" /> 1. Select Craft Style
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {productTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProductType(type)}
                    className={`p-3 text-left rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      productType === type
                        ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-2xs'
                        : 'bg-[#FFF5F7] border-[#FBCFE8] text-[#374151] hover:border-[#E11D48]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Occasion & Color Palette */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2 border-b border-[#FCE7F3] pb-2">
                <Gift className="w-4 h-4 text-[#E11D48]" /> 2. Occasion & Theme
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Occasion:
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] focus:outline-none focus:border-[#E11D48] cursor-pointer shadow-2xs"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Preferred Color Palette:
                  </label>
                  <select
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] focus:outline-none focus:border-[#E11D48] cursor-pointer shadow-2xs"
                  >
                    {colorThemes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Target Budget Range:
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] focus:outline-none focus:border-[#E11D48] cursor-pointer shadow-2xs"
                  >
                    <option value="₹500 - ₹1,000">₹500 - ₹1,000 (Petite Keepsakes)</option>
                    <option value="₹1,000 - ₹2,000">₹1,000 - ₹2,000 (Classic Bouquets & Plaques)</option>
                    <option value="₹2,000 - ₹3,500">₹2,000 - ₹3,500 (Grand Floral & Resin Sets)</option>
                    <option value="₹3,500+">₹3,500+ (Luxury Wedding / Bridal Preservation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Need By Date (Delivery Deadline):
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] focus:outline-none focus:border-[#E11D48] shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Detailed Vision & Photo Uploads */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2 border-b border-[#FCE7F3] pb-2">
                <Sparkles className="w-4 h-4 text-[#E11D48]" /> 3. Describe Your Idea
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Recipient Name / Personal Note / Song Lyrics (Optional):
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Priya Sharma • 'To infinity and beyond' • Song: Kesariya"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Tell Us Everything About Your Vision <span className="text-[#E11D48]">*</span>:
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe chocolates preferred (KitKat, Ferrero, Dairy Milk), flower types, LED fairy lights, box shapes, or any specific theme..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  required
                />
              </div>

              {/* Reference Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Attach Reference Photos:
                </label>
                <label className="flex flex-col items-center justify-center p-5 border border-dashed border-[#FBCFE8] hover:border-[#E11D48] rounded-2xl bg-[#FFF5F7] cursor-pointer transition-colors text-center">
                  <Upload className="w-6 h-6 text-[#E11D48] mb-1.5" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F2937]">
                    Click to select reference images
                  </span>
                  <span className="text-[10px] text-[#6B7280] mt-0.5 font-mono">
                    Supports JPG, PNG, WEBP up to 10MB
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {referenceImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {referenceImages.map((name, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white border border-[#FBCFE8] rounded-lg text-[11px] font-mono text-[#1F2937] shadow-2xs"
                      >
                        📎 {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2 border-b border-[#FCE7F3] pb-2">
                <Send className="w-4 h-4 text-[#E11D48]" /> 4. Your Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Your Name <span className="text-[#E11D48]">*</span>:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sneha Patel"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Email Address <span className="text-[#E11D48]">*</span>:
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="sneha@gmail.com"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    WhatsApp Phone <span className="text-[#E11D48]">*</span>:
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Delivery City:
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai / Bengaluru / Delhi"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    Pincode:
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 400050"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isSubmitting ? 'Sending to Studio...' : 'Submit Custom Order Request (Free Quote)'}
              </button>
              <p className="text-[11px] text-[#6B7280] text-center mt-2">
                🔒 No advance payment required for inquiry. We message you on WhatsApp to finalize!
              </p>
            </div>
          </form>

          {/* Right Sidebar: Studio Assurance & FAQ (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Craft Summary Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#FBCFE8] space-y-4 shadow-card-pink">
              <h4 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#E11D48]" /> Your Custom Summary
              </h4>

              <div className="space-y-2 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Craft Type:</span>
                  <span className="font-bold text-[#1F2937] text-right truncate max-w-[160px]">
                    {productType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Occasion:</span>
                  <span className="font-bold text-[#1F2937]">{occasion}</span>
                </div>
                <div className="flex justify-between">
                  <span>Color Theme:</span>
                  <span className="font-bold text-[#1F2937]">{colorTheme}</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget Guide:</span>
                  <span className="font-black text-[#E11D48]">{budgetRange}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FFF5F7] rounded-xl border border-[#FBCFE8] text-[11px] text-[#374151] space-y-1">
                <p className="font-black uppercase tracking-wider text-[#E11D48]">✨ Studio Turnaround:</p>
                <p className="text-[#6B7280]">
                  Quote generated in <strong className="text-[#1F2937]">~8 hours</strong>. Crafting takes 2-4 business days.
                </p>
              </div>
            </div>

            {/* Why Custom Craft with Soul Craft */}
            <div className="p-6 rounded-3xl bg-white border border-[#FBCFE8] space-y-3 text-xs text-[#6B7280] shadow-card-pink">
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-[#1F2937]">
                Why Custom Order with Us?
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1F2937]">1-on-1 Crafter Chat:</strong> Direct WhatsApp coordination with progress photos.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1F2937]">Any Brand or Treat:</strong> Request Kinder Joy, Ferrero Rocher, Lindt, or custom keepsakes.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1F2937]">Crush-Proof Packaging:</strong> Double-walled insulated delivery boxes ensure pristine condition.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
