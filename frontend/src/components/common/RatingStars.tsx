import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showScore?: boolean;
  totalReviews?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 14,
  showScore = false,
  totalReviews,
  interactive = false,
  onRatingChange,
}) => {
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= index + 0.4;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
              className={`${
                interactive ? 'cursor-pointer transition-transform hover:scale-125 focus:outline-none' : 'cursor-default'
              }`}
              title={`${starValue} Stars`}
            >
              <Star
                style={{ width: size, height: size }}
                className={`${
                  isFilled
                    ? 'fill-[#F59E0B] text-[#F59E0B]'
                    : isHalf
                    ? 'fill-[#F59E0B]/60 text-[#F59E0B]'
                    : 'fill-transparent text-[#CBD5E1]'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-black text-[#1F2937] ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}

      {totalReviews !== undefined && (
        <span className="text-xs font-bold text-[#6B7280]">
          ({totalReviews})
        </span>
      )}
    </div>
  );
};
