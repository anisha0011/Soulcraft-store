import React, { useState } from 'react';
import { Sparkles, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isCustomizable?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  isCustomizable,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const activeImage = images[selectedIndex] || images[0] || '';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div
        className="relative w-full aspect-[4/5] rounded-2xl bg-white border border-[#FBCFE8] overflow-hidden group cursor-crosshair shadow-2xs"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        />

        {/* Handcrafted Seal Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-[#FBCFE8] text-[11px] font-black uppercase tracking-wider text-[#1F2937] flex items-center gap-1.5 shadow-xs pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" /> 100% Handcrafted
        </div>

        {/* Hover Zoom Hint */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#1F2937] border border-[#FBCFE8] px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xs">
          <ZoomIn className="w-3 h-3 text-[#E11D48]" /> Roll over to zoom
        </div>
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? 'border-[#E11D48] ring-2 ring-[#E11D48]/20 scale-105 shadow-xs'
                  : 'border-[#FBCFE8] hover:border-[#F472B6] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumb ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
