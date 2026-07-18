"use client";

import { useMemo, useState } from "react";
import CourseCard from "@/components/layout/CourseCard";

interface CourseItem {
  _id: string;
  title: string;
  /** Pre-resolved image URL from urlFor(heroImage) */
  image?: string;
  students?: number;
  hours?: number;
  duration?: string;
  tagline?: string;
  hoverDescription?: string;
  rating?: number;
  price?: number;
  instructorName?: string;
  slug: string;
  level?: string;
  _updatedAt?: string;
  outcomes?: string[];
  keyConcepts?: { title: string }[];
}

interface CourseGridProps {
  courses: CourseItem[];
}

const COURSES_PER_LOAD = 6;

export default function CourseGrid({ courses }: CourseGridProps) {
  const [visibleCount, setVisibleCount] = useState(COURSES_PER_LOAD);

  const visibleCourses = useMemo(
    () => courses.slice(0, visibleCount),
    [courses, visibleCount],
  );

  const canLoadMore = visibleCount < courses.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + COURSES_PER_LOAD, courses.length),
    );
  };

  return (
    <section className="py-4 md:py-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 xl:gap-10">
          {visibleCourses.map((course, index) => (
            <CourseCard
              key={course._id}
              slug={course.slug}
              title={course.title}
              heroImageUrl={course.image ?? "/placeholder.png"}
              tagline={course.tagline}
              hoverDescription={course.hoverDescription}
              rating={course.rating}
              duration={course.duration}
              hours={course.hours}
              students={course.students}
              price={course.price}
              instructorName={course.instructorName}
              level={course.level}
              updatedAt={course._updatedAt}
              outcomes={course.outcomes}
              keyConcepts={course.keyConcepts}
              index={index}
            />
          ))}
        </div>

        {canLoadMore ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/10 transition hover:shadow-xl"
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
