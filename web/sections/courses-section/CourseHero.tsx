"use client";
import React from "react";
// minimal hero uses only text

interface FeaturedCourseData {
  slug: string;
  title: string;
  image: string;
  learners: string;
  duration: string;
  description: string;
  video?: string;
}

interface CourseHeroProps {
  featuredCourse?: FeaturedCourseData;
}

export default function CourseHero({ featuredCourse }: CourseHeroProps) {
  return (
    <section className="py-10 px-6 md:py-16 bg-white">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="font-extrabold text-5xl md:text-7xl leading-[0.92] md:leading-[0.88] text-center mb-5">
          <span className="block">
            Browse Our <span className="text-brand-blue">Courses</span>
          </span>
        </h1>

        <p className="text-slate-600 text-base md:text-xl max-w-3xl mx-auto text-center mb-2">
          Explore 500+ hours of expert-led courses and learn at your own pace.
          Browse now and start your journey!
        </p>
      </div>
    </section>
  );
}
