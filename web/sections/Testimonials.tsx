"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/* ─────────────────────────────────────────
   Types  (kept identical to original so
   page.tsx props stay untouched)
───────────────────────────────────────── */
export interface Testimonial {
  name: string;
  image: string;
  text: string;
}

interface TestimonialsProps {
  initialData: Testimonial[];
}

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const AUTOPLAY_MS = 2000;
const EASE = "power2.inOut";
const DURATION = 0.55;

/* ─────────────────────────────────────────
   Individual card  (memoised)
───────────────────────────────────────── */
const TestimonialCard = React.memo(function TestimonialCard({
  t,
}: {
  t: Testimonial;
}) {
  return (
    <div
      className="
        flex-shrink-0
        w-[85vw] sm:w-[320px] md:w-[360px] lg:w-[420px]
        bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]
        px-8 py-8 flex flex-col gap-5
        select-none
      "
    >
      {/* Faded quote icon */}
      <div
        aria-hidden="true"
        className="text-[#0166A7] font-serif leading-none"
        style={{ fontSize: "4.5rem", lineHeight: 1, opacity: 0.12 }}
      >
        {"\u201C"}
      </div>

      {/* Review text */}
      <p className="text-slate-600 text-sm md:text-base leading-relaxed -mt-4 flex-1">
        {t.text}
      </p>

      {/* Author row */}
      <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#0166A7]/20">
          <Image
            src={t.image || "/avatars/placeholder.png"}
            alt={t.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm leading-tight">
            {t.name}
          </p>
          <p className="text-[#0166A7] text-xs mt-0.5 font-medium">Learner</p>
        </div>
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function Testimonials({ initialData }: TestimonialsProps) {
  const testimonials = useMemo(() => initialData ?? [], [initialData]);
  const total = testimonials.length;

  /* We render the list THREE times (tripled) so we can loop infinitely
     without any visible jump.  The strip starts positioned at the
     centre copy and wraps back to it whenever it drifts outside bounds. */
  const tripled = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [testimonials],
  );

  /* ── refs ── */
  const stripRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const indexRef = useRef<number>(total); // start in the middle copy
  const cardWidthRef = useRef<number>(0);
  const gapRef = useRef<number>(0);
  const visibleRef = useRef<number>(3);

  /* ── measure card + gap once mounted, update on resize ── */
  const measure = useCallback(() => {
    if (!stripRef.current) return;
    const card = stripRef.current.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap =
      parseInt(getComputedStyle(stripRef.current).gap || "0", 10) || 24;
    cardWidthRef.current = card.offsetWidth;
    gapRef.current = gap;

    const vw = window.innerWidth;
    visibleRef.current = vw < 640 ? 1 : vw < 1024 ? 2 : 3;
  }, []);

  /* ── build / rebuild the auto-play timeline ── */
  const buildTimeline = useCallback(() => {
    if (!stripRef.current || total === 0) return;

    // kill existing
    tlRef.current?.kill();

    const step = cardWidthRef.current + gapRef.current;
    const n = tripled.length;

    // Ensure the strip is at the correct starting x for indexRef.current
    const startX = -(indexRef.current * step);
    gsap.set(stripRef.current, { x: startX });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    tl.to(stripRef.current, {
      x: `+=${-step}`,
      duration: DURATION,
      ease: EASE,
      delay: AUTOPLAY_MS / 1000,
      onComplete: () => {
        indexRef.current += 1;
        // if we've entered the last copy, silently snap back to middle copy
        if (indexRef.current >= total * 2) {
          indexRef.current = total;
          gsap.set(stripRef.current, { x: -(indexRef.current * step) });
        }
      },
    });

    tlRef.current = tl;
  }, [total, tripled.length]);

  /* ── initial setup ── */
  useEffect(() => {
    measure();
    buildTimeline();

    const onResize = () => {
      measure();
      buildTimeline();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      tlRef.current?.kill();
    };
  }, [measure, buildTimeline]);

  /* ── manual navigation ── */
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!stripRef.current || total === 0) return;

      // kill autoplay
      tlRef.current?.kill();

      const step = cardWidthRef.current + gapRef.current;
      indexRef.current = Math.max(
        total,
        Math.min(total * 2 - 1, indexRef.current + dir),
      );

      gsap.to(stripRef.current, {
        x: -(indexRef.current * step),
        duration: DURATION,
        ease: EASE,
        onComplete: () => {
          // restart autoplay after manual navigation
          buildTimeline();
        },
      });
    },
    [total, buildTimeline],
  );

  if (total === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Heading ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            What <span className="text-[#0166A7]">Learners</span> Say About{" "}
            <span className="text-[#0166A7]">The-Automate</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Real words from people across different industries who transformed
            their careers with us.
          </p>
        </div>

        {/* ── Carousel viewport (clips overflow) ── */}
        <div className="overflow-hidden">
          {/* Strip — rendered 3× for seamless loop */}
          <div
            ref={stripRef}
            className="flex gap-6 will-change-transform"
            style={{ width: "max-content" }}
          >
            {tripled.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* ── Navigation buttons ── */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous testimonials"
            className="
              flex items-center justify-center
              w-12 h-12 rounded-full
              bg-[#0166A7] text-white
              shadow-[0_4px_14px_rgba(1,102,167,0.35)]
              hover:bg-[#004d7c] hover:scale-110
              active:scale-95
              transition-all duration-200
            "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => navigate(1)}
            aria-label="Next testimonials"
            className="
              flex items-center justify-center
              w-12 h-12 rounded-full
              bg-[#0166A7] text-white
              shadow-[0_4px_14px_rgba(1,102,167,0.35)]
              hover:bg-[#004d7c] hover:scale-110
              active:scale-95
              transition-all duration-200
            "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
