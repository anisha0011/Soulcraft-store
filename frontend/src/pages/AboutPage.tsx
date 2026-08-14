import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const artisans = [
    {
      name: 'Aanya Verma',
      role: 'Founder & Master Floral Artisan',
      bio: 'Pioneered our Korean double-layer bouquet wrapping techniques and hand-pleated chocolate crowns.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Rohan Mehra',
      role: 'Resin & Botanical Preservation Specialist',
      bio: 'Crafts crystal-clear UV resistant resin coasters and custom wedding varmala flower plaques.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Fatima Sheikh',
      role: 'Chief Calligrapher & Keepsake Designer',
      bio: 'Handwrites Urdu & English poetic wax-sealed cards and customized acrylic Spotify night lights.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full space-y-16 sm:space-y-24 bg-[#FFF5F7] text-[#1F2937]">
      {/* 1. Hero Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F3] text-xs font-black uppercase tracking-widest text-[#E11D48] border border-[#FBCFE8] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" /> The Soul Craft Story
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937] leading-tight">
            Crafting Tangible Love For Life’s Softest Moments.
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            Soul Craft began on a sunny monsoon afternoon in Mumbai with a simple question: <em className="text-[#1F2937]">"Why do commercial gifts feel so empty and mass-produced?"</em>
          </p>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            We started with handmade silk chocolate bouquets wrapped in soft Korean waterproof sheets, hand-tied with double-faced satin ribbons. Word spread through whispered recommendations, birthdays, and surprise proposals. Today, our studio creates thousands of customized keepsakes each month — without losing the warmth and human touch of our very first creation.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-[#FBCFE8] shadow-card-pink bg-white aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
              alt="Soul Craft Studio Table"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* 2. Core Craft Ethos */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#FBCFE8] space-y-8 shadow-card-pink">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
            Our Pillars
          </span>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[#1F2937]">
            The Art Of Thoughtful Making
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shadow-2xs">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">No Factory Lines</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Every single order is individually folded, assembled, and glued by an artisan who knows the recipient's name and message.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">Fresh & Authentic Treats</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              We never store pre-assembled food bouquets. Chocolates are sourced fresh daily from verified brand distributors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">Crush-Proof Packaging</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Our 5-ply reinforced corrugated containers and air insulation ensure bouquets arrive as fresh and crisp as in the studio.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Meet the Crafters */}
      <div id="artisans" className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
            The Hands Behind The Magic
          </span>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[#1F2937]">
            Meet Our Studio Artisans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <div
              key={artisan.name}
              className="p-6 rounded-3xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-4 text-center flex flex-col items-center"
            >
              <img
                src={artisan.image}
                alt={artisan.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#E11D48]"
              />
              <div>
                <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">{artisan.name}</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#E11D48]">{artisan.role}</p>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{artisan.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Studio Location & CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#FBCFE8] text-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-pink">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-black text-[#E11D48] uppercase tracking-widest">
            Visit Our Studio
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1F2937]">
            Soul Craft Studio • Bandra West, Mumbai
          </h2>
          <p className="text-xs text-[#6B7280] max-w-md">
            Open for bespoke consultations, custom wedding hamper viewings, and artisan workshops Monday through Saturday.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/custom-orders')}
          className="px-7 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          Book Custom Consultation &rarr;
        </button>
      </div>
    </div>
  );
};
