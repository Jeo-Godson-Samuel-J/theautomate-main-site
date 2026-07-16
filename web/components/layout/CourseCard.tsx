import Link from "next/link";
import Image from "next/image";
import { Star, BookOpen, Clock3, Users } from "lucide-react";

/**
 * CourseCard receives individual flat props — NOT a Course object.
 *
 * Every call site (CourseGrid, CoursesPage) already strips the Sanity
 * slug object to a plain string before passing it here, so this
 * component must accept `slug: string`, not `slug: { current: string }`.
 */
interface CourseCardProps {
  slug: string;
  title: string;
  image: string;
  /** Number of enrolled learners, e.g. "4,200+" or 4200 */
  learners: string | number;
  /** Course duration, e.g. "36" hours or "6 Weeks" */
  duration: string | number;
  description: string;
  rating?: number;
  instructorName?: string;
  /** Fully-resolved URL string — already processed by urlFor() at the call site */
  instructorImage?: string;
  price?: number;
  modules?: number;
}

export default function CourseCard({
  slug,
  title,
  image,
  learners,
  duration,
  description,
  rating,
  instructorName,
  instructorImage,
  price,
  modules,
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="group bg-white rounded-3xl border overflow-hidden hover:shadow-xl duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 duration-300"
        />

        {rating != null && (
          <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-2 shadow">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold leading-tight line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {modules != null && (
            <div className="flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs">
              <BookOpen size={13} />
              {modules} Modules
            </div>
          )}
          <div className="flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs">
            <Clock3 size={13} />
            {duration}{typeof duration === "number" ? " hrs" : ""}
          </div>
          <div className="flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs">
            <Users size={13} />
            {learners}{typeof learners === "number" ? " students" : ""}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-6">
          {instructorName && (
            <div className="flex items-center gap-2">
              {instructorImage ? (
                <Image
                  src={instructorImage}
                  alt={instructorName}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                  {instructorName.charAt(0)}
                </div>
              )}
              <span className="text-sm font-semibold">{instructorName}</span>
            </div>
          )}

          {price != null && (
            <span className="text-2xl font-bold text-[#0166A7]">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
