import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle,
  Package,
  Printer,
  Copy,
  Check,
  Truck,
} from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId?: string;
  onNavigate: (path: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId,
  onNavigate,
}) => {
  const { orders } = useStore();
  const [copied, setCopied] = React.useState(false);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handleCopyId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-16 text-center bg-[#FFF5F7] text-[#1F2937]">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1F2937]">No Order Found</h2>
        <button
          onClick={() => onNavigate('/')}
          className="mt-4 px-6 py-2.5 bg-[#E11D48] text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-md"
        >
          Return To Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full bg-[#FFF5F7] text-[#1F2937]">
      <div className="bg-white rounded-3xl border border-[#FBCFE8] p-6 sm:p-10 shadow-card-pink space-y-8 text-center">
        {/* Celebration Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFF0F3] border border-[#FBCFE8] flex items-center justify-center text-[#E11D48] mx-auto shadow-2xs">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#E11D48]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
            ✨ Order Successfully Placed
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
            Thank You For Supporting Handcrafted Art!
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-lg mx-auto leading-relaxed">
            Your order has been forwarded to our studio workshop. Our crafters are preparing your bespoke items with love and precision.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6B7280]">Order Reference</span>
            <p className="font-mono text-base font-black text-[#E11D48]">{order.id}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#FBCFE8] text-xs font-bold uppercase tracking-wider text-[#1F2937] hover:border-[#E11D48] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#E11D48]" />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#FBCFE8] text-xs font-bold uppercase tracking-wider text-[#1F2937] hover:border-[#E11D48] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Print Slip</span>
            </button>
          </div>
        </div>

        {/* Timeline & Expected Delivery */}
        <div className="p-5 rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E11D48]">
            <Truck className="w-4 h-4" />
            <span>Estimated Handover & Delivery Timeline</span>
          </div>
          <p className="text-xs text-[#1F2937]">
            Expected Arrival: <strong className="text-[#E11D48]">{order.estimatedDeliveryDate}</strong> to{' '}
            <span className="text-[#6B7280]">
              {order.shippingAddress.city}, {order.shippingAddress.pinCode}
            </span>
          </p>
          <div className="text-[11px] text-[#6B7280]">
            You will receive WhatsApp notifications when the parcel is packed and dispatched.
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="text-left space-y-4">
          <h3 className="font-display text-base font-black uppercase tracking-wider text-[#1F2937] border-b border-[#FCE7F3] pb-2">
            Crafted Items
          </h3>
          <div className="space-y-3 divide-y divide-[#FCE7F3]">
            {order.items.map((item, idx) => (
              <div key={`${item.productId}-${idx}`} className="pt-3 first:pt-0 flex items-center gap-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl border border-[#FBCFE8] shrink-0 bg-[#FFF5F7]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-xs font-black uppercase tracking-tight text-[#1F2937]">
                    {item.productName}
                  </h4>
                  <p className="text-[11px] font-mono text-[#6B7280]">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                  {item.customization?.customName && (
                    <p className="text-[10px] text-[#E11D48]">
                      ✨ Custom Note: "{item.customization.customName}"
                    </p>
                  )}
                </div>
                <span className="text-xs font-black text-[#1F2937]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#FCE7F3] flex justify-between text-sm font-bold text-[#1F2937]">
            <span>Total Paid ({order.paymentMethod}):</span>
            <span className="text-base font-black text-[#E11D48]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
          <button
            onClick={() => onNavigate(`/track-order?id=${order.id}`)}
            className="px-6 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Package className="w-4 h-4" /> Live Track Order
          </button>
          <button
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3.5 bg-white hover:bg-[#FFF0F3] text-[#1F2937] hover:text-[#E11D48] text-xs font-black uppercase tracking-widest rounded-xl border border-[#FBCFE8] hover:border-[#E11D48] transition-colors cursor-pointer shadow-2xs"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
