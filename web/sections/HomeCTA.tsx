"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingStudents from "@/components/ui/FloatingStudents";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  /* Fade-up on scroll into view */
  useGSAP(
    () => {
      if (!innerRef.current) return;

      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: innerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 bg-white overflow-hidden"
    >
      {/* ── Rounded midnight-blue container ── */}
      <div
        ref={innerRef}
        className="
          relative max-w-5xl mx-auto
          bg-[#0F2746]
          rounded-[40px]
          px-8 py-16 md:px-16 md:py-20
          overflow-hidden
          text-center
          shadow-[0_24px_80px_rgba(15,39,70,0.35)]
        "
      >
        {/* Floating student images (dark variant — positions relative to this container) */}
        <FloatingStudents variant="dark" />

        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#0166A7] opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#0166A7] opacity-15 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Take the First Step –
            <br />
            Start Learning Today!
          </h2>

          {/* Sub-copy */}
          <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed">
            Join thousands of learners who transformed their careers with
            Auto-Mate's industry-focused courses.
          </p>

          {/* CTA Button */}
          <Button
            asChild
            className="
              rounded-full
              bg-white text-[#0F2746]
              px-10 py-6 text-base font-bold
              shadow-[0_8px_24px_rgba(255,255,255,0.15)]
              hover:bg-[#EAF6FF] hover:text-[#0166A7]
              hover:scale-[1.05] hover:shadow-[0_12px_32px_rgba(255,255,255,0.22)]
              active:scale-[0.97]
              transition-all duration-200
            "
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
