"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Clock3, Users, Star } from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
export interface CourseCardData {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  shortDescription: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  instructorName: string;
  instructorImage: string;
}

interface Props {
  courses: CourseCardData[];
}

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const AUTOPLAY_MS = 3000;
const DURATION    = 0.55;
const EASE        = "power2.inOut";

/** Cards visible at once per breakpoint */
function getVisible(): number {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

/* ─────────────────────────────────────────
   Card
───────────────────────────────────────── */
const CourseCard = React.memo(function CourseCard({ c }: { c: CourseCardData }) {
  return (
    <Link
      href={`/courses/${c.slug}`}
      className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]
        overflow-hidden flex flex-col h-full
        hover:shadow-[0_8px_32px_rgba(1,102,167,0.15)]
        transition-shadow duration-300 select-none"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
        {c.thumbnail ? (
          <Image
            src={c.thumbnail}
            alt={c.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
            No image
          </div>
        )}
        {c.rating > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white rounded-full px-2.5 py-1 shadow text-xs font-semibold">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {c.rating}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
          {c.title}
        </h3>
        {c.shortDescription && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {c.shortDescription}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {c.duration && (
            <span className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-full px-3 py-1 text-slate-600">
              <Clock3 size={11} /> {c.duration}
            </span>
          )}
          {c.students > 0 && (
            <span className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-full px-3 py-1 text-slate-600">
              <Users size={11} /> {c.students.toLocaleString()} students
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {c.instructorImage ? (
              <Image
                src={c.instructorImage}
                alt={c.instructorName ?? "Instructor"}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#EAF6FF] flex items-center justify-center text-[#0166A7] text-xs font-bold">
                {c.instructorName?.charAt(0) ?? "A"}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-700">
              {c.instructorName}
            </span>
          </div>
          {c.price > 0 && (
            <span className="text-base font-bold text-[#0166A7]">
              ₹{c.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});

/* ─────────────────────────────────────────
   Carousel
   ─────────────────────────────────────────
   Shows `visible` cards at once (3 on desktop, 2 tablet, 1 mobile).
   The track holds ALL unique courses — no duplication.
   Navigation slides by exactly one card at a time.
   When fewer courses exist than the visible count, renders a static
   centered grid — carousel controls are hidden.
───────────────────────────────────────── */
export default function HomeFeaturedCoursesCarousel({ courses }: Props) {
  const total = courses.length;

  const [visible,     setVisible]     = useState(getVisible);
  const [activeIndex, setActiveIndex] = useState(0);  // leftmost visible card

  const trackRef   = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animating  = useRef(false);

  /* true when more cards exist than the viewport can show at once */
  const canScroll = total > visible;
  /* last valid starting index: last group of `visible` cards */
  const maxIndex  = Math.max(0, total - visible);

  /* ── sync visible count on resize ── */
  useEffect(() => {
    const onResize = () => setVisible(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── compute card width as a percentage of the track ──
     Each card takes up (100 / visible)% of the viewport.
     The track is 100% wide (the overflow-hidden parent clips it).
     Sliding by one card = translateX by -(100 / visible)% per step.    */
  const slideToIndex = useCallback(
    (next: number) => {
      if (!trackRef.current || animating.current) return;
      const clamped = Math.max(0, Math.min(next, maxIndex));
      animating.current = true;

      const pct = -(clamped * (100 / visible));
      gsap.to(trackRef.current, {
        x: `${pct}%`,
        duration: DURATION,
        ease: EASE,
        onComplete: () => {
          animating.current = false;
          setActiveIndex(clamped);
        },
      });
    },
    [maxIndex, visible]
  );

  /* ── autoplay ── */
  const scheduleAutoplay = useCallback(() => {
    if (!canScroll) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        if (trackRef.current) {
          animating.current = true;
          gsap.to(trackRef.current, {
            x: `${-(next * (100 / visible))}%`,
            duration: DURATION,
            ease: EASE,
            onComplete: () => { animating.current = false; },
          });
        }
        return next;
      });
    }, AUTOPLAY_MS);
  }, [canScroll, maxIndex, visible]);

  /* restart autoplay when active slide or visible count changes */
  useEffect(() => {
    scheduleAutoplay();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIndex, scheduleAutoplay]);

  /* re-snap track position when visible count changes (resize) */
  useEffect(() => {
    if (!trackRef.current) return;
    const clamped = Math.min(activeIndex, Math.max(0, total - visible));
    gsap.set(trackRef.current, { x: `${-(clamped * (100 / visible))}%` });
    setActiveIndex(clamped);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  /* ── manual navigation ── */
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      slideToIndex(activeIndex + dir);
    },
    [activeIndex, slideToIndex]
  );

  if (total === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Our <span className="text-[#0166A7]">Featured</span> Courses
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Hands-on, industry-focused courses designed to take you from
            beginner to job-ready.
          </p>
        </div>

        {/*
          Viewport — clips the sliding track.
          Cards each take `100 / visible`% of the viewport width via flex.
        */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex will-change-transform"
            /* Each child is (100/visible)% wide; track natural width = total*(100/visible)% */
          >
            {courses.map((c) => (
              <div
                key={c._id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <CourseCard c={c} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation — only when scrollable */}
        {canScroll && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => navigate(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous courses"
              className="flex items-center justify-center w-12 h-12 rounded-full
                bg-[#0166A7] text-white
                shadow-[0_4px_14px_rgba(1,102,167,0.35)]
                hover:bg-[#004d7c] hover:scale-110
                active:scale-95 transition-all duration-200
                disabled:opacity-40 disabled:pointer-events-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot indicators — one per possible starting position */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (timerRef.current) clearTimeout(timerRef.current);
                    slideToIndex(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width:  i === activeIndex ? "28px" : "8px",
                    height: "8px",
                    background: i === activeIndex ? "#0166A7" : "#cbd5e1",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              disabled={activeIndex >= maxIndex}
              aria-label="Next courses"
              className="flex items-center justify-center w-12 h-12 rounded-full
                bg-[#0166A7] text-white
                shadow-[0_4px_14px_rgba(1,102,167,0.35)]
                hover:bg-[#004d7c] hover:scale-110
                active:scale-95 transition-all duration-200
                disabled:opacity-40 disabled:pointer-events-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
