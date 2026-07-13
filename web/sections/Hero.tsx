'use client';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-10 md:pb-12 overflow-hidden bg-white">

      {/* --- FLOATING "A" SVGS (Now fully responsive) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Left */}
        <Image src="/A.svg" className="absolute left-[6vw] top-[12vh] w-14 md:w-28 opacity-30 md:opacity-90" alt="" width={112} height={112} priority />
        
        {/* Bottom Left */}
        <Image src="/A.svg" className="absolute left-[10vw] top-[65vh] md:bottom-[22vh] md:top-auto w-12 md:w-24 opacity-30 md:opacity-90" alt="" width={96} height={96} />

        {/* Top Right */}
        <Image src="/A.svg" className="absolute right-[6vw] top-[16vh] w-14 md:w-28 opacity-30 md:opacity-90" alt="" width={112} height={112} />
        
        {/* Bottom Right */}
        <Image src="/A.svg" className="absolute right-[10vw] top-[60vh] md:bottom-[28vh] md:top-auto w-12 md:w-24 opacity-30 md:opacity-90" alt="" width={96} height={96} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

        {/* --- MAIN TITLE --- */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15] md:leading-[1.1]">
          Your Smart Way To <br className="hidden md:block" />
          <span className="text-[#0166A7]">learn Automation</span>
        </h1>

        {/* --- DESCRIPTION --- */}
        <p className="mt-8 text-slate-600 text-lg md:text-[1.15rem] max-w-2xl leading-relaxed mx-auto">
          Lead the next wave of innovation. Auto-Mate provides the critical
          automation skills to engineer tomorrow.
        </p>

        {/* --- BUTTONS --- */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20 w-full sm:w-auto">
          <Button asChild className="rounded-full bg-[#0166A7] px-8 py-6 text-base font-semibold text-white shadow-[0_8px_20px_rgba(1,102,167,0.25)] hover:bg-[#01538a] hover:shadow-[0_10px_25px_rgba(1,102,167,0.35)] transition-all w-full sm:w-auto">
            <Link href="/courses">Start Learning</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-300 px-8 py-6 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all w-full sm:w-auto">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* --- TRUSTED LOGOS SECTION --- */}
        <div className="mt-16 md:mt-20 w-full overflow-hidden">
          <p className="text-xs md:text-sm font-semibold text-black-400 uppercase tracking-widest mb-8">
            We have trained over 1000+ students and they are now working in top MNC&apos;s
          </p>

          <div className="relative flex whitespace-nowrap overflow-hidden bg-white/50 backdrop-blur-sm p-8 rounded-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="flex animate-scroll gap-12 md:gap-24 items-center min-w-full shrink-0 pr-12 md:pr-24">
              {['tcs', 'cognizant', 'amazon', 'wipro', 'zoho', 'tcs', 'cognizant', 'amazon', 'wipro', 'zoho'].map((logo, idx) => (
                <div key={`${logo}-${idx}`} className="relative h-6 md:h-10 w-24 md:w-32 opacity-80 hover:opacity-100 transition-opacity shrink-0">
                  <Image
                    src={`/${logo}.svg`}
                    fill
                    className="object-contain"
                    alt={logo}
                  />
                </div>
              ))}
            </div>
            {/* Duplicate for seamless scroll */}
            <div className="flex animate-scroll gap-12 md:gap-24 items-center min-w-full shrink-0 pr-12 md:pr-24" aria-hidden="true">
              {['tcs', 'cognizant', 'amazon', 'wipro', 'zoho', 'tcs', 'cognizant', 'amazon', 'wipro', 'zoho'].map((logo, idx) => (
                <div key={`${logo}-duplicate-${idx}`} className="relative h-6 md:h-10 w-24 md:w-32 opacity-80 hover:opacity-100 transition-opacity shrink-0">
                  <Image
                    src={`/${logo}.svg`}
                    fill
                    className="object-contain"
                    alt={logo}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}