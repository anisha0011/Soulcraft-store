import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Package,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const {
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchModalOpen,
    currentUser,
    isAdmin,
    loginAsCustomer,
    loginAsAdmin,
    logout,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Custom Orders', path: '/custom-orders', highlight: true },
    { name: 'Offers', path: '/offers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar - Sweet Pink & High Contrast */}
      <div className="bg-[#FFF0F3] border-b border-[#FCE7F3] text-[11px] text-[#9D174D] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#E11D48]">●</span>
            <span className="font-bold tracking-wider uppercase text-[#831843]">
              Handcrafted with Love <span className="text-[#F472B6] mx-1.5">|</span> Free Express Delivery on Orders Over ₹999
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onNavigate('/track-order')}
              className="hover:text-[#E11D48] transition-colors hidden md:flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#9D174D]"
            >
              <Package className="w-3 h-3 text-[#E11D48]" /> Track Order
            </button>

            {/* Quick Mode Toggle (Customer vs Admin Studio) */}
            <div className="flex items-center gap-1 bg-white border border-[#FBCFE8] rounded-full px-2 py-0.5 shadow-2xs">
              <span className="text-[10px] text-[#9D174D] font-bold uppercase tracking-wider hidden sm:inline">Role:</span>
              <button
                onClick={isAdmin ? loginAsCustomer : loginAsAdmin}
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                  isAdmin
                    ? 'bg-[#E11D48] text-white'
                    : 'bg-[#FFF0F3] text-[#9D174D] hover:bg-[#FFE4E8]'
                }`}
                title="Click to switch between Customer Experience and Admin Studio"
              >
                {isAdmin ? (
                  <>
                    <SlidersHorizontal className="w-2.5 h-2.5" /> Studio Admin
                  </>
                ) : (
                  <>
                    <Sparkles className="w-2.5 h-2.5 text-[#E11D48]" /> Customer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-[#FCE7F3] ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card-pink py-2.5'
            : 'bg-white/90 backdrop-blur-sm py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger & Logo Group */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#1F2937] hover:bg-[#FFF0F3] border border-transparent hover:border-[#FBCFE8] transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo Wordmark - Bold Typography */}
            <div
              onClick={() => handleNavClick('/')}
              className="cursor-pointer flex items-center gap-2.5 group select-none"
            >
              {/* Refined Geometric Heart Mark */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF0F3] border border-[#FBCFE8] group-hover:border-[#E11D48] flex items-center justify-center text-[#E11D48] transition-all shadow-2xs group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1F2937] leading-none group-hover:text-[#E11D48] transition-colors">
                  Soul Craft
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-extrabold text-[#9D174D] mt-0.5">
                  Artisan Studio
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links - Bold Uppercase */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative text-xs font-bold tracking-widest uppercase transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#E11D48]'
                      : 'text-[#4B5563] hover:text-[#E11D48]'
                  } ${link.highlight ? 'flex items-center gap-1 text-[#E11D48]' : ''}`}
                >
                  {link.highlight && <Sparkles className="w-3 h-3 text-[#E11D48]" />}
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E11D48] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#FFF0F3] hover:bg-[#FFE4E8] border border-[#FBCFE8] hover:border-[#E11D48] text-[#374151] hover:text-[#E11D48] transition-all cursor-pointer"
              aria-label="Search store"
              title="Search store (Ctrl+K)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('/wishlist')}
              className="relative p-2 sm:p-2.5 rounded-xl bg-[#FFF0F3] hover:bg-[#FFE4E8] border border-[#FBCFE8] hover:border-[#E11D48] text-[#374151] hover:text-[#E11D48] transition-all cursor-pointer"
              aria-label="View Wishlist"
              title="Saved items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E11D48] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-[#FFF0F3] hover:bg-[#FFE4E8] border border-[#FBCFE8] hover:border-[#E11D48] text-[#374151] hover:text-[#E11D48] transition-all flex items-center gap-1 cursor-pointer"
                aria-label="Account Menu"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <ChevronDown className="w-3 h-3 text-[#9CA3AF] hidden sm:block" />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-card-pink border border-[#FBCFE8] py-2 z-50 overflow-hidden"
                  >
                    {currentUser ? (
                      <>
                        <div className="px-4 py-2.5 border-b border-[#FCE7F3] bg-[#FFF0F3]">
                          <p className="text-xs font-black uppercase tracking-wider text-[#1F2937] truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-[11px] text-[#6B7280] truncate">{currentUser.email}</p>
                          {isAdmin && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-[#E11D48] text-white rounded text-[9px] font-extrabold uppercase tracking-wider">
                              Studio Administrator
                            </span>
                          )}
                        </div>

                        {isAdmin && (
                          <button
                            onClick={() => handleNavClick('/admin')}
                            className="w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:bg-[#FFF0F3] flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" /> Admin Dashboard
                          </button>
                        )}

                        <button
                          onClick={() => handleNavClick('/account')}
                          className="w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[#374151] hover:bg-[#FFF0F3] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5 text-[#9CA3AF]" /> My Account & Profile
                        </button>
                        <button
                          onClick={() => handleNavClick('/account?tab=orders')}
                          className="w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[#374151] hover:bg-[#FFF0F3] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Package className="w-3.5 h-3.5 text-[#9CA3AF]" /> Order History
                        </button>
                        <button
                          onClick={() => handleNavClick('/account?tab=custom')}
                          className="w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[#374151] hover:bg-[#FFF0F3] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#9CA3AF]" /> Custom Quotes
                        </button>

                        <div className="my-1 border-t border-[#FCE7F3]" />

                        <button
                          onClick={logout}
                          className="w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[#E11D48] hover:bg-[#FFF0F3] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </>
                    ) : (
                      <div className="p-2 space-y-1">
                        <button
                          onClick={loginAsCustomer}
                          className="w-full py-2 px-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer"
                        >
                          Sign In / Demo
                        </button>
                        <button
                          onClick={loginAsAdmin}
                          className="w-full py-1.5 px-3 text-xs font-bold uppercase tracking-wider text-[#9D174D] hover:text-[#E11D48] text-center cursor-pointer"
                        >
                          Studio Admin Login
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white transition-all shadow-xs group cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#E11D48] text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-xs h-full bg-white border-r border-[#FBCFE8] shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#FCE7F3] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] font-black">
                      SC
                    </div>
                    <span className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937]">Soul Craft</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-[#6B7280] hover:text-[#1F2937]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-between transition-colors ${
                        currentPath === link.path
                          ? 'bg-[#E11D48] text-white'
                          : 'text-[#374151] hover:bg-[#FFF0F3]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.highlight && (
                        <span className="text-[9px] uppercase font-black bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8] px-2 py-0.5 rounded-full">
                          Bespoke
                        </span>
                      )}
                    </button>
                  ))}

                  {isAdmin && (
                    <button
                      onClick={() => handleNavClick('/admin')}
                      className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#E11D48] flex items-center gap-2 mt-4"
                    >
                      <SlidersHorizontal className="w-4 h-4" /> Admin Dashboard
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Mobile info */}
              <div className="pt-6 border-t border-[#FCE7F3] text-xs text-[#6B7280] space-y-1.5">
                <p className="font-bold text-[#1F2937] uppercase tracking-wider">Soul Craft Studio • Mumbai</p>
                <p className="font-mono text-[11px] text-[#9D174D]">care@soulcraft.in</p>
                <p className="text-[10px] text-[#E11D48] uppercase tracking-widest font-bold">Bespoke Artisan Studio</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
