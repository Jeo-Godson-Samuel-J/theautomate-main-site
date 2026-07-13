import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureIconProps {
  icon: LucideIcon;
  iconSize?: number;
  wrapperSize?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  className?: string;
}

export function FeatureIcon({
  icon: Icon,
  iconSize = 26,
  wrapperSize = "w-14 h-14",
  wrapperClassName = "bg-[#e3ecf8]",
  iconClassName = "text-[#0166A7]",
  className
}: FeatureIconProps) {
  return (
    <div className={cn(wrapperSize, "rounded-2xl flex items-center justify-center flex-shrink-0", wrapperClassName, className)}>
      <Icon size={iconSize} className={iconClassName} strokeWidth={2} />
    </div>
  );
}
