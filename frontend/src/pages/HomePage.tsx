import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { RatingStars } from '../components/common/RatingStars';
import {
  Sparkles,
  ArrowRight,
  Heart,
  ShieldCheck,
  Truck,
  Instagram,
  CheckCircle2,
  Gift,
  Palette,
  Award,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_TESTIMONIALS } from '../data/mockData';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { products, categories, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 8);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed! Check your inbox for your 10% welcome coupon 💗', 'heart');
    setNewsletterEmail('');
  };

  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80',
      caption: 'Teddy & Silk chocolate bouquet for a 21st birthday surprise ✨',
      likes: '482',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
      caption: 'Starlight LEDs on 12 glitter velvet roses in midnight black wrap 🌹',
      likes: '1.2k',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
      caption: "Kinder Joy baby's breath floral wrap for sweet moments 🐣",
      likes: '839',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
      caption: 'Crystal resin alphabet charms with 24K gold foil flakes ✨',
      likes: '620',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
      caption: 'Hand-crocheted daisy & pastel blush rose bouquet made of milk cotton 🌼',
      likes: '945',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      caption: 'Bespoke couple Spotify wooden LED night plaque 🎵',
      likes: '1.5k',
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-hidden bg-[#FFF5F7] text-[#1F2937]">
      {/* 1. HERO SECTION - Bold Display Typography */}
      <section className="relative pt-8 pb-14 md:py-20 bg-[#FFF5F7] border-b border-[#FCE7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FBCFE8] text-xs font-black uppercase tracking-widest text-[#E11D48] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Handmade Gifting Studio</span>
              </div>

              {/* Main Headline - Bold Display */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#1F2937] leading-[1.05]">
                Made by Hand. <br />
                <span className="text-[#E11D48]">Made with Soul.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                Discover handcrafted floral bouquets, personalized acrylic keepsakes, and bespoke artisan creations crafted with bold precision and human touch for moments worth celebrating.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => onNavigate('/shop')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/custom-orders')}
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#FFF0F3] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-widest rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-[#E11D48]" /> Custom Studio Order
                </button>
              </div>

              {/* Micro Trust Stats */}
              <div className="pt-6 border-t border-[#FCE7F3] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black text-[#1F2937]">10K+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Handmade Smiles</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black text-[#E11D48]">4.95 ★</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Customer Rating</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black text-[#1F2937]">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Artisan Crafted</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visual Presentation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-card-pink border border-[#FBCFE8] bg-white aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] group">
                  <img
                    src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=80"
                    alt="Soul Craft Petite Teddy Bouquet"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Floating Handcrafted Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FBCFE8] text-xs font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-1.5 shadow-xs">
                    <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" /> Mumbai Studio
                  </div>

                  {/* Bottom Hero Overlay */}
                  <div className="absolute bottom-6 inset-x-6 text-white space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FBCFE8]">
                      Featured Keepsake
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      Petite Bear & Silk Chocolate Bouquet
                    </h3>
                    <p className="text-xs text-[#FCE7F3] line-clamp-1">
                      Includes plush teddy, Cadbury Silk, peach wrap & wax seal greeting card.
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xl font-black text-white">₹1,299</span>
                      <button
                        onClick={() => onNavigate('/product/petite-bear-silk-chocolate-keepsake-bouquet')}
                        className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        View Craft &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Secondary Mini Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => onNavigate('/product/midnight-sparkle-red-glitter-roses-with-starlight-leds')}
                  className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl border border-[#FBCFE8] shadow-card-pink items-center gap-3 max-w-xs cursor-pointer hover:border-[#E11D48] transition-all"
                >
                  <img
                    src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=200&q=80"
                    alt="Glitter Roses"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-[#FBCFE8]"
                  />
                  <div>
                    <span className="text-[10px] font-black text-[#E11D48] uppercase tracking-wider">
                      ★ Starlight LEDs
                    </span>
                    <p className="font-display text-xs font-bold uppercase tracking-tight text-[#1F2937] line-clamp-1">
                      Midnight Glitter Roses
                    </p>
                    <p className="text-xs font-black text-[#E11D48]">₹1,799</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Explore by Craft
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937] mt-1">
              Curated Handmade Collections
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:text-[#BE123C] flex items-center gap-1 group cursor-pointer"
          >
            View All Categories{' '}
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#FBCFE8] hover:border-[#E11D48] shadow-xs hover:shadow-card-pink cursor-pointer transition-all duration-300 flex flex-col"
            >
              {/* Category Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FFF0F3] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Category Content */}
              <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="font-display text-sm sm:text-base font-black uppercase tracking-tight text-[#1F2937] group-hover:text-[#E11D48] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#6B7280] line-clamp-1 mt-0.5 font-medium">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-3 flex items-center justify-between text-[11px] text-[#E11D48] font-black uppercase tracking-wider">
                  <span>{cat.itemCount} Items</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS / "MADE WITH LOVE" GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FBCFE8] text-[#E11D48] text-xs font-black uppercase tracking-wider shadow-2xs">
            <Flame className="w-3.5 h-3.5 fill-[#E11D48]" /> Most Cherished
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
            Made with Love
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Our most loved handcrafted pieces, created to turn ordinary days into cherished memories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('/shop')}
            className="px-8 py-3.5 bg-white hover:bg-[#FFF0F3] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-widest rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            Explore Complete Collection <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. CUSTOM ORDER HERO CTA ("Your Idea. Our Craft.") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFE4E8] border border-[#FBCFE8] p-8 sm:p-12 lg:p-16 shadow-card-pink">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-black uppercase tracking-wider text-[#E11D48] border border-[#FBCFE8] shadow-2xs">
                <Palette className="w-3.5 h-3.5" /> Bespoke Custom Craft Studio
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937] leading-tight">
                Your Idea. <span className="text-[#E11D48]">Our Craft.</span>
              </h2>

              <p className="text-sm text-[#4B5563] leading-relaxed max-w-lg">
                Have a special vision that you can't find anywhere else? Whether it's a bridal flower preservation piece, a chocolate proposal crown, or custom resin coasters — our master artisans bring your dream to life.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[#374151] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Share photo references, colors, and target budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Receive custom price quote & design mockup within 8 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Crafted by master artisans with regular photo updates</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/custom-orders')}
                  className="px-8 py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Start a Custom Order
                </button>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
                  alt="Custom gift hamper"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl object-cover h-44 sm:h-52 w-full border border-[#FBCFE8] shadow-card-pink transform -rotate-2 hover:rotate-0 transition-transform bg-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80"
                  alt="Custom resin flowers"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl object-cover h-44 sm:h-52 w-full border border-[#FBCFE8] shadow-card-pink transform rotate-2 hover:rotate-0 transition-transform mt-4 sm:mt-6 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "MADE WITH LOVE" STORYTELLING / CRAFT ETHOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#FBCFE8] aspect-[4/3] sm:aspect-[16/10] bg-white shadow-card-pink">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
                alt="Soul Craft Workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Overlay seal badge */}
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-2xl border border-[#FBCFE8] shadow-card-pink flex items-center gap-3 hidden sm:flex">
              <div className="w-10 h-10 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Small-Batch Made</p>
                <p className="text-[10px] text-[#6B7280]">Never mass-produced</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Our Craft Ethos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937] leading-snug">
              Every Piece Holds a Heartbeat.
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Soul Craft began as a humble studio table covered in Korean wrapping sheets, dried botanicals, and crystal-clear resin. We believe that true gifting isn't about factory-made cardboard boxes; it's about the tangible time, thoughtfulness, and human care infused into every fold, knot, and wax-sealed calligraphy card.
            </p>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              When you unbox a Soul Craft creation, you feel crisp satin ribbons, discover delicate craftsmanship, and know that someone poured their soul into making your surprise memorable.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="text-xs font-black uppercase tracking-widest text-[#E11D48] hover:text-[#BE123C] flex items-center gap-1.5 group cursor-pointer"
              >
                Read The Full Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY SOUL CRAFT? (5 VALUE PILLARS) */}
      <section className="bg-[#FFF0F3] border-y border-[#FCE7F3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937]">
              The Soul Craft Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">100% Handmade</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Individually handcrafted with artisanal tools, premium ribbons, and fresh treats.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Made with Soul</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Warm emotional gifting with handwritten calligraphy tags and wax seals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Customizable</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Add recipient names, custom songs, photo attachments, and color palettes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Quality Checked</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Every piece undergoes strict structure and aesthetic quality checks before packing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-[#1F2937]">Safe Packaging</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Crush-proof corrugated containers with tissue insulation and tamper seals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
            Real Customer Love
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937]">
            People Love Soul Craft
          </h2>
          <p className="text-xs text-[#6B7280]">
            Hear from people across India who celebrated special occasions with our handmade creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <RatingStars rating={t.rating} size={13} showScore={false} />
                <p className="text-xs text-[#374151] italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#FCE7F3] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#FBCFE8]"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#1F2937] truncate">{t.name}</h4>
                  <p className="text-[10px] text-[#9CA3AF] truncate">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM / SOCIAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              @soulcraft.studio
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1F2937] mt-1">
              Follow the Craft
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#FBCFE8] hover:border-[#E11D48] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-wider rounded-xl transition-colors shadow-2xs"
          >
            <Instagram className="w-3.5 h-3.5 text-[#E11D48]" /> Follow @soulcraft
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FFF0F3] border border-[#FBCFE8] shadow-2xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-5 h-5 mb-1 text-[#F472B6]" />
                <p className="text-[10px] text-white/90 line-clamp-2 leading-tight">
                  {post.caption}
                </p>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F472B6] mt-1">♥ {post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F3] via-white to-[#FFE4E8] border border-[#FBCFE8] text-[#1F2937] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-card-pink">
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white text-xs font-black uppercase tracking-widest text-[#E11D48] border border-[#FBCFE8] shadow-2xs">
              ✨ Join Our Handmade Circle
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1F2937]">
              Get A Little More Soul In Your Inbox
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Subscribe for secret seasonal drops, craft studio stories, and an instant 10% coupon code off your first order.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
