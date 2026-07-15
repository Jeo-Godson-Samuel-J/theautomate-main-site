import Image from "next/image";
import Link from "next/link";
import { getHomeAbout } from "@/lib/services/homeAbout.service";
import { urlFor } from "@/lib/sanity.client";
import { Button } from "@/components/ui/button";

export default async function HomeAbout() {
  const data = await getHomeAbout();

  if (!data) return null;

  const heroImageUrl = data.heroImage
    ? urlFor(data.heroImage).width(900).height(1000).fit("crop").url()
    : null;

  return (
    <section className="py-16 md:py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Column: Image + Floating Card ── */}
          <div className="relative order-1">
            {heroImageUrl ? (
              <div className="rounded-[32px] overflow-hidden">
                <Image
                  src={heroImageUrl}
                  alt={data.title}
                  width={900}
                  height={1000}
                  className="w-full h-[420px] sm:h-[500px] md:h-[560px] lg:h-[620px] object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="rounded-[32px] bg-slate-100 w-full h-[560px]" />
            )}

            {/* Floating completion card — anchored to bottom-left of image */}
            <div
              className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-6 py-5 min-w-[160px]"
              aria-label={`${data.completionTitle}: ${data.completionPercentage}%`}
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {data.completionTitle}
              </p>
              <p className="text-4xl font-extrabold leading-none text-[#0166A7]">
                {data.completionPercentage}%
              </p>
            </div>
          </div>

          {/* ── Right Column: Content ── */}
          <div className="order-2 pt-8 md:pt-0">

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              {data.title}{" "}
              <span className="text-[#0166A7]">{data.highlightText}</span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
              {data.description}
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-10">
              {/* Stat 1 */}
              <div className="bg-slate-50 rounded-2xl px-6 py-6">
                <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-none mb-2">
                  {data.statOneNumber}
                </p>
                <p className="text-sm text-slate-500 font-medium leading-snug">
                  {data.statOneDescription}
                </p>
              </div>

              {/* Stat 2 */}
              <div className="bg-slate-50 rounded-2xl px-6 py-6">
                <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-none mb-2">
                  {data.statTwoNumber}
                </p>
                <p className="text-sm text-slate-500 font-medium leading-snug">
                  {data.statTwoDescription}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="rounded-full bg-[#0166A7] hover:bg-[#004d7c] text-white px-8 py-4 text-base font-semibold shadow-[0_8px_20px_rgba(1,102,167,0.25)] hover:shadow-[0_10px_25px_rgba(1,102,167,0.35)] transition-all"
            >
              <Link href={data.buttonLink}>{data.buttonText}</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
