"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface Testimonial {
  name: string;
  image: string;
  text: string;
}

interface TestimonialsProps {
  initialData: Testimonial[];
}

export default function Testimonials({ initialData }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const testimonials = initialData || [];

  // Split into groups of 3 for desktop pagination
  const testimonialGroups: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    testimonialGroups.push(testimonials.slice(i, i + 3));
  }

  const totalPages = testimonialGroups.length;
  const maxDots = 3;

  // Handle scroll → active page
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const pageWidth = container.offsetWidth;
      const currentPage = Math.round(container.scrollLeft / pageWidth);
      setActivePage(currentPage);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Dot logic (looped, max 4)
  const visibleDots = Math.min(totalPages, maxDots);
  const activeDot = activePage % visibleDots;

  const scrollToPage = (pageIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: pageIndex * container.offsetWidth,
      behavior: "smooth",
    });
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-24 px-6 overflow-hidden bg-[#0A3D62]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#1E90FF] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#22D3EE] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight">
          What Learners Say About Us
        </h2>
        <p className="text-white/70 lg:mb-12 mb-6">
          Read what people from different industries has to say about us
        </p>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-10 pt-10"
        >
          {testimonialGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="flex shrink-0 w-full md:gap-8 snap-start justify-center"
            >
              {group.map((t, i) => (
                <div
                  key={i}
                  className={`group relative w-full md:w-[420px] shrink-0 rounded-[28px]
                    border border-white/25 bg-white/10 backdrop-blur-sm
                    px-10 py-12 text-center shadow-2xl shadow-black/20
                    ${i > 0 ? "hidden md:block" : "block"}`}
                >
                  <div className="pointer-events-none absolute left-8 top-6 select-none text-6xl font-black leading-none text-white/70">
                    “
                  </div>
                  <div className="pointer-events-none absolute bottom-6 right-8 select-none text-6xl font-black leading-none text-white/70">
                    ”
                  </div>

                  <p className="mx-auto max-w-[34ch] text-white/90 text-sm md:text-base leading-relaxed">
                    {t.text}
                  </p>

                  <div className="mt-10 flex items-center justify-center gap-4">
                    <div className="h-12 w-12 rounded-full border border-white/40 overflow-hidden bg-white/10">
                      <Image
                        src={t.image || "/avatars/placeholder.png"}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold leading-tight">
                        {t.name}
                      </div>
                      <div className="text-white/60 text-xs leading-tight">
                        Learner
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Functional Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: visibleDots }).map((_, i) => (
              <button
                key={i}
                onClick={() =>
                  scrollToPage(activePage - activeDot + i)
                }
                className={`h-2.5 rounded-full transition-all duration-300 ${i === activeDot
                  ? "w-8 bg-[#22D3EE]"
                  : "w-2.5 bg-white/35 hover:bg-white/50"
                  }`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
