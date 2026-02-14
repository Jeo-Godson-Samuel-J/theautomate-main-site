'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [inView, value, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="min-h-[50vh] md:min-h-[80vh] bg-white flex items-center">
      <div className="max-w-7xl mx-6 md:mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight md:text-nowrap mb-6">
            Shape Your Future with <br /> Knowledge That Matters
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-6 md:mb-10">
            We simplify online education with honest reviews, verified
            discounts, and guides that help learners make the right choices.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-around mb-6 md:mb-10">
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue">
                <Counter value={500} suffix="+" />
              </p>
              <p className="text-gray-500 text-sm mt-1">Students</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue">
                <Counter value={10} suffix="+" />
              </p>
              <p className="text-gray-500 text-sm mt-1">Courses Covered</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue">
                <Counter value={5} suffix="+" />
              </p>
              <p className="text-gray-500 text-sm mt-1">Years of Training</p>
            </div>
          </div>

          <Link href="/about">
            <Button className="bg-brand-dark text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition hover:scale-105">
              Know more
            </Button>
          </Link>
        </div>

        {/* Right Content */}
        <div className="pl-8 relative flex justify-center items-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[80vh]">
          {/* Person Image */}
          <div className="relative">
            <Image
              src="/stats-image.png"
              alt="Student"
              width={1200}
              height={1200}
              className="object-contain w-full min-h-[300px] md:min-h-[400px] lg:min-h-[600px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}