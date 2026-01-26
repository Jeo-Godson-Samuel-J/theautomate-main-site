import React from 'react';

interface CarouselDotsProps {
  count: number;
  selectedIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
  dotClassName?: string;
  activeDotClassName?: string;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  selectedIndex,
  onDotClick,
  className = 'flex justify-center items-center gap-3 mt-12',
  dotClassName = 'h-2.5 w-2.5 rounded-full bg-gray-200 transition-all duration-500',
  activeDotClassName = 'w-10 bg-[#163E72]',
}) => {
  if (count <= 1) return null;

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onDotClick(index)}
          className={`${dotClassName} ${
            index === selectedIndex ? activeDotClassName : 'w-2.5'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
