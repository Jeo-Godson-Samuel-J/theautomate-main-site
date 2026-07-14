"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const StarDustSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={{ fill: "currentColor" }}
  >
    <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
  </svg>
);

export default function AboutHero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about-story-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 px-6 md:py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 text-blue-200">
        <StarDustSVG className="absolute top-10 left-5 w-8 h-8 md:w-12 md:h-12 opacity-20" />
        <StarDustSVG className="absolute top-1/4 right-5 w-10 h-10 md:w-16 md:h-16 opacity-10 rotate-45" />
        <StarDustSVG className="absolute bottom-10 left-1/4 w-6 h-6 md:w-10 md:h-10 opacity-15" />
        <StarDustSVG className="hidden md:block absolute top-1/2 left-1/2 w-8 h-8 opacity-20 -rotate-12" />
        <StarDustSVG className="absolute bottom-1/4 right-1/4 w-10 h-10 md:w-14 md:h-14 opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-8xl font-bold bg-clip-text text-transparent
                       bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-[1.15] md:leading-[1.2] mb-5"
          >
            About Automate
          </h1>

          <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed mb-8 px-2">
            At Auto-Mate, we're not just teaching skills; we're cultivating the
            next generation of leaders who will shape the future of technology.
            Our mission is to empower professionals with the practical,
            high-demand skills needed to thrive in an automated world.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
