import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-[#FBCFE8] shadow-card-pink text-[#1F2937]"
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center bg-[#FFF5F7] border border-[#FBCFE8]">
                {toast.type === 'heart' && (
                  <Heart className="w-4 h-4 text-[#E11D48] fill-[#E11D48]" />
                )}
                {toast.type === 'success' && (
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                )}
                {toast.type === 'error' && (
                  <AlertCircle className="w-4 h-4 text-[#E11D48]" />
                )}
                {toast.type === 'info' && (
                  <Info className="w-4 h-4 text-[#E11D48]" />
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#9CA3AF] hover:text-[#1F2937] p-1 rounded-lg hover:bg-[#FFF0F3] transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
