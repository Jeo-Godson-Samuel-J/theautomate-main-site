import React from "react";
import Image from "next/image";
import Link from "next/link";
// using simple links/buttons; no Button component needed here

interface CourseCardProps {
  slug: string;
  title: string;
  image: string;
  learners: string | number;
  duration: string | number;
  description: string;
  instructorName?: string;
  instructorImage?: string;
  price?: number;
}

export default function CourseCard({
  slug,
  title,
  image,
  learners,
  duration,
  description,
  instructorName,
  instructorImage,
  price,
}: CourseCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden rounded-[20px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 mt-3">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-slate-900 leading-tight line-clamp-2">
            {title}
          </h3>

          {description ? (
            <p className="text-base leading-7 text-slate-600 line-clamp-2">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href={`/courses/${slug}`}
            className="inline-flex flex-1 min-w-0 items-center justify-center rounded-full border border-white/70 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-blue shadow-sm backdrop-blur-sm transition hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:shadow-md"
          >
            View Course
          </Link>
          <Link
            href={`/plans?course=${slug}`}
            className="inline-flex flex-1 min-w-0 items-center justify-center rounded-full border border-white/70 bg-white/70 px-8 py-3 text-sm font-semibold text-brand-blue whitespace-nowrap shadow-sm backdrop-blur-sm transition hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:shadow-md"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
