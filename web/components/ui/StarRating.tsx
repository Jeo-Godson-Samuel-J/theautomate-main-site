import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: number;
  className?: string;
  starClassName?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  showNumber = false,
  size = 16,
  className,
  starClassName
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
          className={cn(
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300",
            starClassName
          )}
        />
      ))}
      {showNumber && (
        <span className="text-xs text-slate-500 ml-1 font-medium mt-0.5">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}
