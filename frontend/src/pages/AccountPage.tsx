import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  Sparkles,
  Heart,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';

interface AccountPageProps {
  initialTab?: string;
  onNavigate: (path: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ initialTab, onNavigate }) => {
  const {
    currentUser,
    isAdmin,
    orders,
    customOrders,
    wishlist,
    loginAsAdmin,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'profile'>(
    (initialTab as any) || 'orders'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full bg-[#FFF5F7] text-[#1F2937]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FCE7F3] pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] text-xl font-black uppercase shadow-2xs">
            {currentUser?.name.charAt(0) || 'S'}
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1F2937]">
              {currentUser?.name || 'Soul Craft Guest'}
            </h1>
            <p className="text-xs text-[#6B7280]">{currentUser?.email || 'guest@soulcraft.in'}</p>
            {isAdmin && (
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                Studio Admin Mode
              </span>
            )}
          </div>
        </div>

        {/* Quick Role Switch for testing */}
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <button
              onClick={() => onNavigate('/admin')}
              className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Go To Admin Studio
            </button>
          ) : (
            <button
              onClick={loginAsAdmin}
              className="px-3.5 py-2 bg-white border border-[#FBCFE8] hover:border-[#E11D48] text-xs font-bold uppercase tracking-wider text-[#6B7280] hover:text-[#1F2937] rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Switch To Admin View
            </button>
          )}
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Nav Tabs */}
        <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-[#FBCFE8] shadow-card-pink h-fit">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8]'
                : 'text-[#6B7280] hover:bg-[#FFF5F7] hover:text-[#1F2937]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8]'
                : 'text-[#6B7280] hover:bg-[#FFF5F7] hover:text-[#1F2937]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Custom Requests ({customOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#FFF0F3] text-[#E11D48] border border-[#FBCFE8]'
                : 'text-[#6B7280] hover:bg-[#FFF5F7] hover:text-[#1F2937]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Addresses</span>
          </button>

          <button
            onClick={() => onNavigate('/wishlist')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 text-[#6B7280] hover:bg-[#FFF5F7] hover:text-[#1F2937] transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-9">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937] mb-4">
                Your Handcrafted Orders
              </h2>

              {orders.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-3xl border border-[#FBCFE8] shadow-card-pink">
                  <Package className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                  <p className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">
                    No Orders Placed Yet
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1 mb-4">
                    Your bespoke creations will show up here once ordered.
                  </p>
                  <button
                    onClick={() => onNavigate('/shop')}
                    className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl cursor-pointer shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#FCE7F3] pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6B7280]">
                          Order ID
                        </span>
                        <p className="font-mono text-sm font-black text-[#E11D48]">{order.orderNumber || order.id}</p>
                        <p className="text-[11px] text-[#6B7280]">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#FBCFE8] text-xs font-black text-[#E11D48] uppercase">
                          {order.orderStatus}
                        </span>
                        <button
                          onClick={() => onNavigate(`/track-order?id=${order.orderNumber || order.id}`)}
                          className="px-3.5 py-1.5 bg-[#FFF5F7] hover:bg-[#FFE4E8] border border-[#FBCFE8] text-xs font-bold uppercase tracking-wider text-[#1F2937] rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#E11D48]" /> Track Live
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={`${item.productId}-${idx}`} className="flex items-center gap-3">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            referrerPolicy="no-referrer"
                            className="w-12 h-14 object-cover rounded-xl border border-[#FBCFE8] bg-[#FFF5F7]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-xs font-black uppercase tracking-tight text-[#1F2937] truncate">
                              {item.productName}
                            </p>
                            <p className="text-[10px] font-mono text-[#6B7280]">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                            {item.customization?.customName && (
                              <p className="text-[10px] text-[#E11D48] truncate">
                                ✨ Note: {item.customization.customName}
                              </p>
                            )}
                          </div>
                          <span className="text-xs font-black text-[#1F2937]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#FCE7F3] flex justify-between items-center text-xs">
                      <span className="text-[#6B7280]">
                        Delivering to: <strong className="text-[#1F2937]">{order.shippingAddress.city}, {order.shippingAddress.pinCode}</strong>
                      </span>
                      <span className="font-bold text-sm text-[#1F2937]">
                        Total: <span className="text-[#E11D48]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: CUSTOM ORDERS */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937]">
                  Custom Order Quotes & Inquiries
                </h2>
                <button
                  onClick={() => onNavigate('/custom-orders')}
                  className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> New Custom Request
                </button>
              </div>

              {customOrders.map((co) => (
                <div
                  key={co.id}
                  className="p-6 rounded-3xl bg-white border border-[#FBCFE8] shadow-card-pink space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6B7280]">
                        Quote ID: {co.requestNumber || co.id}
                      </span>
                      <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1F2937]">
                        {co.productType}
                      </h3>
                      <p className="text-[11px] text-[#6B7280]">
                        Occasion: {co.occasion} • Color: {co.preferredColor}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#FBCFE8] text-xs font-black text-[#E11D48] uppercase">
                      {co.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#374151] bg-[#FFF5F7] p-3 rounded-xl border border-[#FBCFE8]">
                    "{co.description}"
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#6B7280]">
                      Budget: <strong className="text-[#1F2937]">{co.budgetRange}</strong>
                    </span>
                    {co.quotedPrice && (
                      <span className="text-xs font-black text-[#059669]">
                        Studio Quote: ₹{co.quotedPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FBCFE8] shadow-card-pink space-y-6">
              <h2 className="font-display text-lg font-black uppercase tracking-wider text-[#1F2937] border-b border-[#FCE7F3] pb-3">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-1">
                  <span className="text-[#6B7280] uppercase font-bold text-[10px]">Full Name</span>
                  <p className="font-black text-[#1F2937] text-sm uppercase">{currentUser?.name}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-1">
                  <span className="text-[#6B7280] uppercase font-bold text-[10px]">Email Address</span>
                  <p className="font-bold text-[#1F2937] text-sm">{currentUser?.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-1">
                  <span className="text-[#6B7280] uppercase font-bold text-[10px]">Phone</span>
                  <p className="font-mono text-[#1F2937] text-sm">{currentUser?.phone || '+91 98200 12345'}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF5F7] border border-[#FBCFE8] space-y-1">
                  <span className="text-[#6B7280] uppercase font-bold text-[10px]">Default City</span>
                  <p className="font-bold text-[#1F2937] text-sm uppercase">Mumbai, Maharashtra (400050)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
