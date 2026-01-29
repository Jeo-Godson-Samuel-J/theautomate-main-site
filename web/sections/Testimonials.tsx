"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const singleSet = [
  {
    name: "Mr. Kannan",
    image: "/kanan.png",
    text: "We approached The Auto-Mate to develop a framework for our QA team and provide training. They delivered an exceptional framework supporting both mobile and desktop applications. Truly glad to have found The Auto-Mate!",
  },
  {
    name: "Mr. Sakthipratheesh",
    image: "/sathi.png",
    text: "\"The Auto-Mate\" is a great platform for students and working professionals who are looking to get inspired and start or advance their journey into automation testing. It helped me alot with lots of challenges.",
  },
  {
    name: "Mrs. Varsha",
    image: "/varsha.png",
    text: "The Auto-Mate transformed my career! Their Playwright course and real-world training helped me switch to automation testing and land a product-based role with a 200% hike. Highly recommend!",
  },
];


//remove these multiple pages after recieving all the testimonials 
// Simulated multiple pages
const testimonialGroups = [singleSet, singleSet, singleSet, singleSet, singleSet];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

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

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1B262C]">
          What Learners Say About Us
        </h2>
        <p className="text-gray-500 lg:mb-12 mb-6">
          Read what people from different industries has to say about us
        </p>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-12 pt-12"
        >
          {testimonialGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="flex shrink-0 w-full md:gap-8 snap-start justify-center"
            >
              {group.map((t, i) => (
                <div
                  key={i}
                  className={`relative bg-[#163E72] p-8 pt-16 text-left shadow-2xl
                    rounded-[40px] w-full md:w-[380px] shrink-0
                    ${i > 0 ? "hidden md:block" : "block"}`}
                >
                  {/* Avatar */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex text-[#22D3EE] mb-4 text-xl">★★★★★</div>

                  <h3 className="text-white font-bold text-xl mb-3">
                    {t.name}
                  </h3>
                  <p className="text-blue-100 text-[14px] leading-relaxed font-light">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Functional Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: visibleDots }).map((_, i) => (
            <button
              key={i}
              onClick={() =>
                scrollToPage(activePage - activeDot + i)
              }
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "bg-[#163E72] scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial page ${i + 1}`}
            />
          ))}
        </div>
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
