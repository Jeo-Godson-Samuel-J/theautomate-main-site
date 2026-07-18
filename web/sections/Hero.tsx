"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingStudents from "@/components/ui/FloatingStudents";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt- pb-16 md:pb-20 bg-white overflow-hidden">

      {/*
        ── Content + floating images share the same relative container ──
        FloatingStudents uses `absolute` positioning, so it anchors to
        this div — keeping images close to the heading text at every
        screen size, matching the inspiration reference.
      */}
      <div className="relative max-w-6xl mx-auto px-6">

        {/* Floating student avatars — positioned relative to this container */}
        <FloatingStudents variant="light" />

        {/* ── Centered hero text ── */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
            Learn and Grow with
            <br />
            <span className="text-[#0166A7]">Online Courses</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
            Discover top online courses to upgrade your skills and stay ahead.
            Learn from experts and enhance your expertise at your own pace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button
              asChild
              className="
                rounded-full bg-[#0166A7] px-8 py-6 text-base font-semibold text-white
                shadow-[0_8px_20px_rgba(1,102,167,0.28)]
                hover:bg-[#004d7c] hover:shadow-[0_10px_28px_rgba(1,102,167,0.38)]
                hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-200
                w-full sm:w-auto
              "
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="
                rounded-full border-slate-300 px-8 py-6 text-base font-semibold text-slate-700
                hover:bg-slate-50 hover:border-[#0166A7] hover:text-[#0166A7]
                hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-200
                w-full sm:w-auto
              "
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* ── Trusted logos ticker ── */}
          <div className="mt-20 w-full overflow-hidden">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              Our students are now working at top MNCs
            </p>

            <div className="relative flex whitespace-nowrap overflow-hidden bg-slate-50 p-6 rounded-[24px] border border-slate-100 shadow-sm">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex animate-scroll gap-12 md:gap-20 items-center min-w-full shrink-0 pr-12 md:pr-20"
                >
                  {["tcs", "cognizant", "amazon", "wipro", "zoho"].map((logo) => (
                    <div
                      key={logo}
                      className="relative h-6 md:h-9 w-20 md:w-28 opacity-60 hover:opacity-100 transition-opacity shrink-0"
                    >
                      <Image
                        src={`/${logo}.svg`}
                        fill
                        className="object-contain"
                        alt={logo}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
