import React from "react";
import Image from "next/image";
import Link from "next/link";
// using simple links/buttons; no Button component needed here

interface CourseCardProps {
  slug: string;
  title: string;
  image: string;
  learners: string;
  duration: string;
  description: string;
}

export default function CourseCard({
  slug,
  title,
  image,
  learners,
  duration,
  description,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] flex flex-col h-full">
      <div className="relative h-48 md:h-56 w-full bg-slate-50 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
        />
        
      </div>

      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 leading-tight">
          {title}
        </h3>

        <p className="text-slate-600 text-sm leading-6 mb-4 grow line-clamp-3">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <Link
            href={`/courses/${slug}`}
            className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-white border border-brand-blue text-brand-blue rounded-full text-xs font-semibold hover:bg-brand-blue hover:text-white transition"
          >
            View Course
          </Link>

          <Link
            href={`/payment?course=${slug}`}
            className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-white border border-brand-blue text-brand-blue rounded-full text-xs font-semibold hover:bg-brand-blue hover:text-white transition"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
