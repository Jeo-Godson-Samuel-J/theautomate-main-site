import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, XCircle, LayoutList } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface BundleData {
  title: string;
  badge: string;
  price: string;
  image: string;
  instructor: string;
  duration: string;
  batch: string;
  features: PlanFeature[];
}

interface PricingCardProps {
  bundle: BundleData;
}

export function PricingCard({ bundle }: PricingCardProps) {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col border border-slate-100 transition-all duration-300 group">
      {/* Image & Badge */}
      <div className="h-48 md:h-56 relative overflow-hidden">
        <Image
          src={bundle.image}
          alt={bundle.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-100">
          {bundle.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Rating & Price */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={5} showNumber size={16} />
          <span className="font-bold text-slate-900 text-lg">{bundle.price}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-slate-900">{bundle.title}</h3>
        <p className="text-sm text-slate-500 mb-5">{bundle.instructor}</p>

        {/* Metadata */}
        <div className="flex items-center gap-5 text-xs font-medium text-slate-600 mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            {bundle.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <LayoutList className="w-4 h-4 text-slate-400" />
            {bundle.batch}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 w-full mb-6"></div>

        {/* Features List */}
        <ul className="flex-grow space-y-3 mb-8">
          {bundle.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm">
              {feature.included ? (
                <CheckCircle2 className="w-5 h-5 text-[#0166A7] shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-slate-300 shrink-0" />
              )}
              <span className={feature.included ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <Link href="/contact" className="mt-auto">
          <Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-700 font-bold py-6 hover:bg-[#0166A7] hover:text-white hover:border-[#0166A7] transition-all">
            Choose Plan
          </Button>
        </Link>
      </div>
    </div>
  );
}
