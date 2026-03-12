
import { client, urlFor } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CurriculumAccordion from "@/components/layout/CurriculumAccordion";
import {
  CheckCircle2,
  Users,
  Clock,
  Star,
  Phone,
  Monitor,
} from "lucide-react";
import BookingForm from "@/components/layout/BookingForm";

export const revalidate = 60;

const COURSE_QUERY = `
*[_type == "course" && slug.current == $slug][0]{
  title,
  tagline,
  heroImage,
  rating,
  instructorName,
  instructorImage,
  hours,
  students,
  whoFor,
  curriculum[]{
    subheading,
    points,
    summary
  },
  outcomes,
  keyConcepts[]{
    title,
    description,
    icon
  },
  careerOpportunities[]{
    role,
    description
  },
  highlights[]{
    title,
    icon
  },
  duration,
  batchDetails
}
`;

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await client.fetch(COURSE_QUERY, { slug });

  if (!course) return notFound();

  return (
    <main className="bg-white min-h-screen pt-24">

      {/* 1. HERO SECTION */}
      <section className="py-10 md:py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-tight md:leading-[1.15]">
              {course.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed max-w-xl">
              {course.tagline}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-800 font-semibold">
                <Clock className="text-[#1E90FF] w-6 h-6" />
                <span>{course.hours}+ hrs of Intensive Training</span>
              </div>
              <div className="flex items-center gap-3 text-slate-800 font-semibold">
                <Users className="text-[#1E90FF] w-6 h-6" />
                <span>{course.students}+ Successful Career Transitions</span>
              </div>
            </div>
            <div className="flex text-[#1E90FF] gap-1 text-2xl pt-1">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
            </div>
          </div>

          <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl shadow-blue-200">
            {course.heroImage && (
              <Image
                src={urlFor(course.heroImage).width(1200).url()}
                alt={course.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.keyConcepts?.map((concept: any, i: number) => (
              <WhyChooseCard
                key={i}
                icon={concept.icon
                  ? <Image src={urlFor(concept.icon).width(80).url()} width={48} height={48} alt="" />
                  : <Monitor className="w-12 h-12 text-[#1E90FF]" />}
                title={concept.title}
                desc={concept.description ?? ''}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO IS THIS COURSE FOR */}
      <section className="relative overflow-visible pb-16">
        <div className="bg-gradient-to-r from-[#0A3D62] via-[#1B74B5] to-[#87CEFA] py-14 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Become a High-Paid Automation Engineer with Playwright & GenAI
              </h2>
              <div className="space-y-3 max-w-3xl">
                <p className="text-white text-lg leading-relaxed">
                  Master <span className="font-bold">Playwright Automation</span> Testing along with{" "}
                  <span className="font-bold">JavaScript, TypeScript, API Automation, and GenAI</span> to
                  confidently transition into a high-paying Automation Engineer role.
                </p>
                <p className="text-white text-lg leading-relaxed opacity-90">
                  This course is designed with{" "}
                  <span className="font-bold underline decoration-white underline-offset-4">industry-first practices</span>,
                  real-time projects, and hands-on learning to make you{" "}
                  <span className="font-bold">job-ready</span>, not just certificate-ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-14">
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Who Is This Course For?</h2>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-slate-800">This course is ideal for:</p>
              <div className="space-y-4">
                {course.whoFor?.map((item: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#1E90FF] mt-2 shrink-0" />
                    <p className="text-lg text-slate-800 leading-relaxed font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:-mt-52 z-20">
            <div className="bg-white rounded-[50px] p-8 md:p-10 shadow-2xl border border-slate-50">
              <div className="absolute -left-2 top-1/4 bottom-1/4 w-1 bg-[#1E90FF] blur-md opacity-40" />
              <div className="absolute -right-2 top-1/4 bottom-1/4 w-1 bg-[#1E90FF] blur-md opacity-40" />
              <div className="bg-black text-white text-center py-3 rounded-full font-bold text-lg mb-8">
                Register for this Course
              </div>
              <BookingForm courseSlug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM */}
      <section className="py-20 bg-[#0A3D62] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Image src="/A.svg" width={60} height={60} className="absolute top-10 right-[15%] rotate-12" alt="" />
          <Image src="/A.svg" width={80} height={80} className="absolute bottom-20 left-[10%] -rotate-12" alt="" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You&apos;ll Learn</h2>
            <div className="h-1.5 w-24 bg-[#1E90FF] mx-auto rounded-full" />
          </div>
          <div className="space-y-4">
            {course.curriculum?.map((module: any, i: number) => (
              <CurriculumAccordion key={i} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUTCOMES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">Outcome of This Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.outcomes?.map((outcome: string, i: number) => (
              <div key={i} className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-xl flex gap-5 items-start">
                <CheckCircle2 className="text-[#1E90FF] w-6 h-6 shrink-0 mt-1" />
                <p className="text-lg text-slate-800 font-semibold leading-relaxed">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HIGHLIGHTS & BATCH */}
      <section className="py-8 md:py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-14">Course Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {course.highlights?.map((h: any, i: number) => (
              <HighlightItem
                key={i}
                icon={h.icon
                  ? <Image src={urlFor(h.icon).width(80).url()} width={48} height={48} alt="" />
                  : <Monitor className="w-12 h-12" />}
                label={h.title}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 items-stretch">
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-2xl font-bold text-black">Course Duration</h3>
              <div className="flex-1 bg-[#1E90FF] text-white rounded-[40px] p-8 shadow-xl flex flex-col items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl font-bold">{course.duration ?? '12'}</span>
                <span className="text-lg font-semibold opacity-90">Months</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-2xl font-bold text-black">Batch Details</h3>
              <div className="flex-1 bg-[#1E90FF] text-white rounded-[40px] p-8 shadow-xl flex flex-col items-center justify-center">
                <ul className="text-xl font-semibold space-y-3">
                  {course.batchDetails?.map((batch: string, i: number) => <li key={i}>• {batch}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 my-12 text-center">
        <Link href="/contact">
          <button className="bg-[#163E72] hover:bg-[#0A3D62] text-white px-12 py-6 rounded-full font-black text-2xl transition-all shadow-2xl flex items-center gap-4 mx-auto active:scale-95">
            <Phone /> Talk to Expert Advisor
          </button>
        </Link>
      </section>

    </main>
  );
}

function WhyChooseCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-blue-50/50 p-8 rounded-[40px] text-center space-y-4 hover:shadow-xl transition-all border border-blue-100/50">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold text-black">{title}</h3>
      <p className="text-slate-700 font-semibold leading-relaxed">{desc}</p>
    </div>
  );
}

function HighlightItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="w-18 h-18 bg-blue-100/70 border border-blue-200 rounded-2xl flex items-center justify-center text-[#1E90FF] group-hover:bg-[#1E90FF] group-hover:text-white transition-all p-4">
        {icon}
      </div>
      <p className="font-semibold text-black text-center text-sm md:text-base px-4 leading-tight">{label}</p>
    </div>
  );
}