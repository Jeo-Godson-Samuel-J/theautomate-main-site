'use client';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-14 pb-16 md:pb-24 overflow-hidden bg-white">

      {/* --- FLOATING "A" SVGS (Now fully responsive) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Left Side Group */}
        {/* We use 'vw' and 'vh' for mobile to keep them relative to the screen edge */}
        <Image src="/A.svg" className="absolute left-[5vw] top-[15vh] w-10 md:w-20 opacity-25 md:opacity-80" alt="" width={80} height={80} priority />
        <Image src="/A.svg" className="absolute left-[12vw] top-[45vh] w-12 md:w-20 opacity-20 md:opacity-85" alt="" width={80} height={80} />
        <Image src="/A.svg" className="absolute left-[2vw] top-[75vh] w-10 md:w-20 opacity-25 md:opacity-80" alt="" width={80} height={80} />

        {/* Right Side Group */}
        <Image src="/A.svg" className="absolute right-[5vw] top-[20vh] w-10 md:w-20 opacity-25 md:opacity-80" alt="" width={80} height={80} />
        <Image src="/A.svg" className="absolute right-[12vw] top-[55vh] w-12 md:w-20 opacity-10 md:opacity-85" alt="" width={80} height={80} />
        <Image src="/A.svg" className="absolute right-[2vw] top-[80vh] w-10 md:w-20 opacity-15 md:opacity-80" alt="" width={80} height={80} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* --- MAIN TITLE --- */}
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-tight md:leading-[1.2]">
          Your Smart Way To <br className="hidden md:block" /> learn Automation
        </h1>

        {/* --- DESCRIPTION --- */}
        <p className="mt-6 text-gray-700 text-base md:text-lg max-w-2xl leading-relaxed">
          Lead the next wave of innovation. Auto-Mate provides the critical
          automation skills to engineer tomorrow.
        </p>

        <Link href="/courses" className="w-full md:w-auto">
          <Button className="mt-8 md:mt-10 bg-brand-dark text-white px-10 py-7 md:py-6 rounded-full text-lg font-bold shadow-lg hover:translate-y-[-1px] transition-all w-[80%] md:w-auto mx-auto cursor-pointer relative z-20">
            Start Learning
          </Button>
        </Link>

        {/* --- TRUSTED LOGOS SECTION --- */}
        <div className="mt-16 md:mt-24 w-full overflow-hidden">
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