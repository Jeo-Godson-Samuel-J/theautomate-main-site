"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";

export interface Testimonial {
  name: string;
  image: string;
  text: string;
}

interface TestimonialsProps {
  initialData: Testimonial[];
}

export default function Testimonials({ initialData }: TestimonialsProps) {
  const testimonials = initialData || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const prev = (activeIndex - 1 + total) % total;
  const next = (activeIndex + 1) % total;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return;
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [activeIndex, isAnimating]
  );

  const goPrev = useCallback(() => goTo(prev), [goTo, prev]);
  const goNext = useCallback(() => goTo(next), [goTo, next]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goNext]);

  if (testimonials.length === 0) return null;

  // Card config: position relative to center
  const getCardStyle = (
    position: "center" | "left" | "right"
  ): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      width: "clamp(280px, 38vw, 460px)",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    if (position === "center") {
      return {
        ...base,
        transform: "translateX(-50%) rotate(0deg) scale(1)",
        left: "50%",
        top: "0px",
        zIndex: 20,
        opacity: 1,
      };
    }

    if (position === "left") {
      return {
        ...base,
        transform: "translateX(-102%) rotate(-8deg) scale(0.82)",
        left: "50%",
        top: "30px",
        zIndex: 10,
        opacity: 0.65,
        filter: "brightness(0.75)",
      };
    }

    // right
    return {
      ...base,
      transform: "translateX(2%) rotate(8deg) scale(0.82)",
      left: "50%",
      top: "30px",
      zIndex: 10,
      opacity: 0.65,
      filter: "brightness(0.75)",
    };
  };

  const renderCard = (
    t: Testimonial,
    position: "center" | "left" | "right",
    onClick?: () => void
  ) => {
    const isCenter = position === "center";

    return (
      <div
        style={getCardStyle(position)}
        onClick={!isCenter ? onClick : undefined}
        className={`rounded-[28px] border border-white/20 backdrop-blur-md
          px-8 py-6 text-center select-none
          ${isCenter
            ? "bg-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.5)] cursor-default"
            : "bg-white/8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] cursor-pointer hover:opacity-80"
          }`}
      >
        {/* Opening quote */}
        <div
          className="pointer-events-none absolute left-6 top-4 select-none font-black leading-none text-[#22D3EE]"
          style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", opacity: isCenter ? 0.9 : 0.5 }}
        >
          "
        </div>

        {/* Stars */}
        {isCenter && (
          <div className="flex justify-center mb-5 mt-2">
            <StarRating rating={5} size={16} starClassName="text-[#22D3EE]" />
          </div>
        )}

        {/* Text */}
        <p
          className="mx-auto leading-relaxed text-white/90"
          style={{
            fontSize: isCenter ? "clamp(0.85rem, 1.4vw, 1rem)" : "0.8rem",
            maxWidth: "32ch",
          }}
        >
          {t.text}
        </p>

        {/* Author */}
        <div className={`flex items-center justify-center gap-3 ${isCenter ? "mt-8" : "mt-6"}`}>
          <div
            className="rounded-full border-2 border-white/30 overflow-hidden bg-white/10 shrink-0"
            style={{ width: isCenter ? "52px" : "40px", height: isCenter ? "52px" : "40px" }}
          >
            <Image
              src={t.image || "/avatars/placeholder.png"}
              alt={t.name}
              width={52}
              height={52}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-left">
            <div className="text-white font-bold leading-tight" style={{ fontSize: isCenter ? "0.95rem" : "0.8rem" }}>
              {t.name}
            </div>
            <div className="text-[#22D3EE]/80 text-xs leading-tight mt-0.5">Learner</div>
          </div>
        </div>

        {/* Closing quote */}
        <div
          className="pointer-events-none absolute right-6 bottom-4 select-none font-black leading-none text-[#22D3EE]"
          style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", opacity: isCenter ? 0.9 : 0.5 }}
        >
          "
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-16 md:py-12 overflow-hidden bg-[#0A3D62]">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#1E90FF] opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#22D3EE] opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#1E90FF] opacity-10 blur-3xl" />
      </div>

      {/* Chevron — Far Left */}
      <button
        onClick={goPrev}
        aria-label="Previous testimonial"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-[#22D3EE]/20 hover:border-[#22D3EE]/50 hover:scale-110 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Chevron — Far Right */}
      <button
        onClick={goNext}
        aria-label="Next testimonial"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-[#22D3EE]/20 hover:border-[#22D3EE]/50 hover:scale-110 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="relative max-w-7xl mx-auto text-center px-6">
        <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight">
          What Learners Say{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#1E90FF]">
            About Us
          </span>
        </h2>
        <p className="mt-3 text-white/60 text-base max-w-lg mx-auto">
          Real words from people across different industries who transformed their careers with us.
        </p>

        {/* Card Stage — dots overlaid at bottom center */}
        <div className="relative mx-auto mt-16" style={{ height: "clamp(340px, 45vw, 460px)", maxWidth: "900px" }}>
          {/* Left side card (prev) */}
          {total > 1 && renderCard(testimonials[prev], "left", goPrev)}

          {/* Right side card (next) */}
          {total > 1 && renderCard(testimonials[next], "right", goNext)}

          {/* Center card (active) — rendered last to stay on top */}
          {renderCard(testimonials[activeIndex], "center")}

          {/* Dots — overlaid at the bottom-center of the card stage */}
          {(() => {
            const numDots = Math.min(total, 3);
            const activeDot = activeIndex % numDots;
            return (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {Array.from({ length: numDots }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const stepsForward = (i - activeDot + numDots) % numDots;
                      goTo((activeIndex + stepsForward) % total);
                    }}
                    aria-label={`Go to testimonial group ${i + 1}`}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === activeDot ? "28px" : "8px",
                      height: "8px",
                      background: i === activeDot
                        ? "linear-gradient(90deg, #22D3EE, #1E90FF)"
                        : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
