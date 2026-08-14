import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Custom Order Inquiry');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does custom crafting take?',
      a: 'Standard handmade bouquets and personalized plaques take 24–48 hours to craft before dispatch. Special resin flower preservation pieces cure in 4–6 business days.',
    },
    {
      q: 'Do you deliver across India?',
      a: 'Yes! We ship across 19,000+ PIN codes across India using express blue-dart and courier partners in crush-proof reinforced 5-ply packaging.',
    },
    {
      q: 'Can I choose specific chocolates or customized items?',
      a: 'Absolutely! Our Custom Orders builder lets you specify any brand of chocolates (Kinder Joy, Ferrero Rocher, KitKat, Hershey’s, Dairy Milk) or custom photo attachments.',
    },
    {
      q: 'How do I add a personalized handwritten note?',
      a: 'Select the "Personalized Message" option on any product page or check "Velvet Gift Wrap & Wax Seal" during checkout to include your custom message.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    showToast('Message received! Our studio will reply via WhatsApp/Email shortly 💗', 'heart');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full space-y-16 bg-[#FFF5F7] text-[#1F2937]">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
          Get In Touch
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
          We’d Love To Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Have questions about a custom idea, bulk wedding hampers, or your delivery? Reach out to our studio crafters anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Contact Info & Studio Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#FBCFE8] space-y-4 shadow-card-pink">
            <h3 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937]">
              Studio Information
            </h3>

            <div className="space-y-3.5 text-xs text-[#6B7280]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider text-[#1F2937]">Workshop & Studio Address</p>
                  <p>Soul Craft Boutique Studio, Bandstand Road, Bandra West, Mumbai 400050</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider text-[#1F2937]">WhatsApp & Phone Support</p>
                  <p>+91 98200 98765 (Mon–Sat, 10 AM – 8 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider text-[#1F2937]">Email Inquiries</p>
                  <p>care@soulcraft.in • bespoke@soulcraft.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Support Callout */}
          <div className="p-6 rounded-3xl bg-white border border-[#FBCFE8] space-y-3 shadow-card-pink">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E11D48]">
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Need same-day dispatch assistance in Mumbai or urgent custom bridal consultation? Message our studio team directly.
            </p>
            <a
              href="https://wa.me/919820098765"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF0F3] text-[#E11D48] hover:bg-[#FFE4E8] text-xs font-black uppercase tracking-wider rounded-xl border border-[#FBCFE8] transition-colors shadow-2xs"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>
        </div>

        {/* Right: Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-4"
          >
            <h3 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937] border-b border-[#FCE7F3] pb-3">
              Send A Direct Note
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Your Name <span className="text-[#E11D48]">*</span>:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kabir Roy"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kabir@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 XXXXX"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Subject:
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] focus:outline-none focus:border-[#E11D48] cursor-pointer shadow-2xs"
                >
                  <option value="Custom Order Inquiry">Custom Order Inquiry</option>
                  <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                  <option value="Bulk Wedding / Corporate Hampers">Bulk Wedding / Corporate Hampers</option>
                  <option value="Collaboration / Workshop">Collaboration / Workshop</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                Your Message <span className="text-[#E11D48]">*</span>:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about what you need..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#FBCFE8] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E11D48]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="pt-8 border-t border-[#FCE7F3]">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
            Got Questions?
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1F2937]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-[#FBCFE8] overflow-hidden shadow-card-pink"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-display text-sm font-black uppercase tracking-tight text-[#1F2937] hover:text-[#E11D48] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#9CA3AF] transition-transform ${
                    openFaq === index ? 'rotate-180 text-[#E11D48]' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-xs text-[#6B7280] leading-relaxed border-t border-[#FCE7F3] pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
