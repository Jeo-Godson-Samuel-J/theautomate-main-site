import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  highlight,
  align = 'center',
  className = '',
  titleClassName = ''
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right';
  const mxAuto = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`${alignClass} ${className} mb-12`}>
      <h2 className={`text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 ${titleClassName}`}>
        {title} {highlight && <span className="text-[#0166A7] italic">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`text-slate-500 text-lg md:text-xl max-w-2xl ${mxAuto}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
