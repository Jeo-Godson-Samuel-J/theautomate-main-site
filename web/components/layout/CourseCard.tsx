import Link from "next/link";
import Image from "next/image";
import { Star, Clock3, Users, Timer, ArrowRight } from "lucide-react";

interface CourseCardProps {
  slug: string;
  title: string;
  tagline?: string;
  /** Fully-resolved image URL — already processed by urlFor() at the call site */
  heroImageUrl: string;
  rating?: number;
  duration?: string;
  hours?: number;
  students?: number;
}

export default function CourseCard({
  slug,
  title,
  tagline,
  heroImageUrl,
  rating,
  duration,
  hours,
  students,
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="
        group flex flex-col bg-white rounded-[28px]
        border border-slate-100
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        hover:shadow-[0_8px_32px_rgba(1,102,167,0.14)]
        hover:-translate-y-1
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Hero image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Rating badge */}
        {rating != null && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            <Star size={13} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-slate-800">{rating}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-lg font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#0166A7] transition-colors duration-200">
          {title}
        </h3>

        {tagline && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {tagline}
          </p>
        )}

        {/* Stats row */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {duration && (
            <span className="flex items-center gap-1.5 text-xs font-medium border border-slate-200 rounded-full px-3 py-1 text-slate-600">
              <Clock3 size={11} />
              {duration}
            </span>
          )}
          {hours != null && (
            <span className="flex items-center gap-1.5 text-xs font-medium border border-slate-200 rounded-full px-3 py-1 text-slate-600">
              <Timer size={11} />
              {hours}h
            </span>
          )}
          {students != null && (
            <span className="flex items-center gap-1.5 text-xs font-medium border border-slate-200 rounded-full px-3 py-1 text-slate-600">
              <Users size={11} />
              {students.toLocaleString()} students
            </span>
          )}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-1">
          <span className="text-sm font-semibold text-[#0166A7] group-hover:underline">
            View Course
          </span>
          <ArrowRight
            size={16}
            className="text-[#0166A7] group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  );
}
