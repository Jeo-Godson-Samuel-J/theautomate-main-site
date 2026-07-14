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
    <section className="py-8 px-6 md:py-12 bg-white">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="font-extrabold text-[48px] md:text-[72px] leading-[0.95] md:leading-[0.9] text-center mb-6">
          <span className="block">
            Browse Our <span className="text-brand-blue">Courses</span>
          </span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto text-center mb-4">
          Explore 500+ hours of expert-led courses and learn at your own pace.
          Browse now and start your journey!
        </p>
      </div>
    </section>
  );
}
