import { client, urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CurriculumAccordion from "@/components/layout/CurriculumAccordion";
import {
  CheckCircle2,
  Users,
  Clock,
  BarChart,
  BookOpen,
  Star,
  ChevronRight,
  Phone,
  Monitor,
  Video,
  FileText,
  HelpCircle,
  Award,
  Calendar
} from "lucide-react";

export const revalidate = 60;

const COURSE_QUERY = `
*[_type == "course" && slug.current == $slug][0]{
  title,
  tagline,
  heroImage,
  rating,
  instructorName,
  instructorImage,
  price,
  duration,
  level,
  description,
  whoFor,
  curriculum[]{
    subheading,
    points,
    summary
  },

  careerOpportunities[]{
    role,
    description
  },
  outcomes,
  keyConcepts[]{
    title,
    description,
    icon
  },
  highlights[]{
    title,
    icon
  },
  hours,
  students,
  projects,
  batchDetails
}
`;

type CourseHighlight = {
  title: string;
  icon?: unknown;
};

type CourseKeyConcept = {
  title: string;
  description?: string;
  icon?: unknown;
};

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "course" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug: string) => ({ slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await client.fetch(COURSE_QUERY, { slug });

  if (!course) return notFound();

  return (
    <main className="bg-white min-h-screen pt-24">
      {/* 1. HERO SECTION (Screenshot 1) */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-black text-[#0A3D62] leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {course.tagline}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-slate-600 font-medium">
                <Clock className="text-[#1E90FF] w-5 h-5" />
                <span>{course.hours}+ hrs</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 font-medium">
                <Users className="text-[#1E90FF] w-5 h-5" />
                <span>{course.students}+ Successful Learners</span>
              </div>
            </div>
            <div className="flex text-blue-500 gap-1 text-2xl pt-2">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
            </div>

            <div className="flex items-center gap-4 pt-4">
              {/* Instructor Placeholder as per design */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100">
                <Image
                  src={course.instructorImage ? urlFor(course.instructorImage).width(96).height(96).url() : "/avatars/mentor.png"}
                  width={48}
                  height={48}
                  alt={course.instructorName || "Mentor"}
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-[#0A3D62]">By {course.instructorName || "Mr. Name"}</p>
            </div>
          </div>

          {/* Large Card Image (Screenshot 1) */}
          <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl shadow-blue-200 group">
            {course.heroImage && (
              <Image
                src={urlFor(course.heroImage).width(1200).url()}
                alt={course.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <h2 className="text-4xl font-bold text-white opacity-80">{course.title}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (Screenshot 1) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 md:mb-16">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {course.keyConcepts?.map((concept: CourseKeyConcept, i: number) => (
              <WhyChooseCard
                key={i}
                icon={concept.icon ? <Image src={urlFor(concept.icon).width(80).url()} width={40} height={40} alt="" /> : <Monitor className="w-10 h-10 text-[#1E90FF]" />}
                title={concept.title}
                desc={concept.description ?? ''}
              />
            )) || (
                <>
                  <WhyChooseCard
                    icon={<Monitor className="w-10 h-10 text-[#1E90FF]" />}
                    title="Comprehensive Curriculum"
                    desc="Courses covering all aspects of Automation Testing, from basics to advanced techniques."
                  />
                  <WhyChooseCard
                    icon={<Users className="w-10 h-10 text-[#1E90FF]" />}
                    title="Expert Instructors"
                    desc="Learn from industry experts with real-world experience."
                  />
                  <WhyChooseCard
                    icon={<Award className="w-10 h-10 text-[#1E90FF]" />}
                    title="Hands-On Experience"
                    desc="Practical skills through hands-on training and real-world projects."
                  />
                </>
              )}
          </div>
        </div>
      </section>
      {/* 3. WHO IS THIS COURSE FOR & REGISTRATION (Screenshot Reference) */}
      <section className="relative overflow-visible pb-20">
        {/* Blue Header Background (Matches Snippet top half) */}
        <div className="bg-gradient-to-r from-[#0A3D62] via-[#1B74B5] to-[#87CEFA] py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Become a High-Paid Automation Engineer with Playwright & GenAI
              </h2>
              <div className="space-y-4 max-w-3xl">
                <p className="text-white text-lg leading-relaxed">
                  Master <span className="font-bold">Playwright Automation</span> Testing along with <span className="font-bold">JavaScript, TypeScript, API Automation, and GenAI</span> to confidently transition into a high-paying Automation Engineer role.
                </p>
                <p className="text-white text-lg leading-relaxed opacity-90">
                  This course is designed with <span className="font-bold underline decoration-white underline-offset-4">industry-first practices</span>, real-time projects, and hands-on learning to make you <span className="font-bold">job-ready</span>, not just certificate-ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content & Overlapping Form */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-20">
          <div className="lg:col-span-7 space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 md:mb-16">Who Is This Course For?</h2>

            <div className="space-y-4">
              <p className="text-xl font-medium text-slate-900">
                This course is ideal for:
              </p>
              <div className="space-y-6">
                {course.whoFor?.map((item: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-2 h-2 rounded-sm bg-black mt-2.5 shrink-0" />
                    <p className="text-lg text-black leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-lg font-bold text-black pt-4 max-w-2xl">
              No prior automation experience is required — we start <span className="font-black">from the basics</span> and gradually build you up to industry standards.
            </p>
          </div>

          {/* Registration Form (Overlapping Card) */}
          <div className="lg:col-span-5 relative lg:-mt-64 z-20">
            <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50">
              <div className="bg-black text-white text-center py-4 rounded-full font-bold text-lg mb-10 tracking-wide">
                Register for this Course
              </div>

              <form className="space-y-5">
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Name*"
                    className="w-full px-8 py-4 rounded-full bg-white border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF]"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="E-mail*"
                    className="w-full px-8 py-4 rounded-full bg-white border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF]"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    placeholder="Phone Number*"
                    className="w-full px-8 py-4 rounded-full bg-white border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF]"
                  />
                </div>
                <div className="space-y-1">
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full px-8 py-4 rounded-[35px] bg-white border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-[#163E72] hover:bg-[#0A3D62] text-white py-5 rounded-full font-black text-xl transition-all shadow-xl mt-4 active:scale-95">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* WHAT YOU'LL LEARN SECTION */}
      <section className="py-24 bg-[#0A3D62] relative overflow-hidden">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[10%] w-12 h-12 opacity-40 rotate-12">
            <Image src="/A.svg" alt="" fill className="object-contain" />
          </div>
          <div className="absolute bottom-20 left-[5%] w-14 h-14 opacity-30 -rotate-12">
            <Image src="/A.svg" alt="" fill className="object-contain" />
          </div>
          {/* Add more icons as per snippet arrangement */}
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              What You&apos;ll Learn in This Course
            </h2>
            <div className="h-1.5 w-24 bg-[#1E90FF] mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            {course.curriculum?.map((module: any, i: number) => (
              <CurriculumAccordion key={i} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-[#0A3D62] text-center mb-16">Outcome of This Course</h2>
          <p className="text-center font-bold text-slate-700 mb-16">By the end of this course:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.outcomes?.map((outcome: string, i: number) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100 flex gap-6 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2.5 shrink-0" />
                <p className="text-lg text-slate-700 leading-relaxed font-bold">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COURSE HIGHLIGHTS (Screenshot 4) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-[#0A3D62] mb-20">Course Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {course.highlights?.map((h: CourseHighlight, i: number) => (
              <HighlightItem
                key={i}
                icon={h.icon ? <Image src={urlFor(h.icon).width(80).url()} width={48} height={48} alt="" /> : <Monitor className="w-12 h-12" />}
                label={h.title}
              />
            )) || (
                <>
                  <HighlightItem icon={<Monitor className="w-12 h-12" />} label="100% Practical Hands-On Sessions" />
                  <HighlightItem icon={<Users className="w-12 h-12" />} label="Live Workshop Sessions" />
                  <HighlightItem icon={<FileText className="w-12 h-12" />} label="Real-Time Project Experience" />
                  <HighlightItem icon={<Award className="w-12 h-12" />} label="15+ Years Industry Experience" />
                  <HighlightItem icon={<HelpCircle className="w-12 h-12" />} label="Dedicated Doubt Sessions" />
                  <HighlightItem icon={<Video className="w-12 h-12" />} label="Mock Interviews" />
                  <HighlightItem icon={<Users className="w-12 h-12" />} label="Interview & Resume Guidance" />
                  <HighlightItem icon={<Monitor className="w-12 h-12" />} label="Recorded Sessions" />
                </>
              )}
          </div>
        </div>
      </section>
      {/* 8. CAREER OPPORTUNITIES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0A3D62] mb-4">
              Career Opportunities After This Course
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              After completing this course, you can move into roles such as:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.careerOpportunities?.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
              >
                {/* Career Icon / Badge */}
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1E90FF] mb-6 group-hover:bg-[#1E90FF] group-hover:text-white transition-colors">
                  <Award size={32} />
                </div>

                <h3 className="text-xl font-black text-[#0A3D62] mb-3">
                  {item.role}
                </h3>

                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {item.description || "In-demand role in top-tier tech companies and global enterprises."}
                </p>
              </div>
            ))}
          </div>

          {/* Final Career Note */}
          <div className="mt-16 p-8 bg-[#0A3D62] rounded-[40px] text-center shadow-2xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E90FF] opacity-20 blur-[80px]" />

            <p className="relative z-10 text-white text-xl font-bold italic">
              "Automation expertise significantly increases your market demand and salary potential in the current tech landscape."
            </p>
          </div>
        </div>
      </section>

      {/* 7. DURATION & BATCH DETAILS (Screenshot 4) */}
      <section className="py-12 bg-white pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-[#0A3D62] text-center">Course Duration</h3>
              <div className="bg-[#1E90FF]/90 text-white rounded-[32px] p-16 text-center shadow-xl flex items-center justify-center">
                <span className="text-4xl font-bold">1.5 <br /> Months</span>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-[#0A3D62] text-center">Batch Details</h3>
              <div className="bg-[#1E90FF]/90 text-white rounded-[32px] p-10 shadow-xl min-h-[180px] flex flex-col items-center justify-center text-center space-y-4">
                <ul className="text-2xl font-medium space-y-2">
                  {course.batchDetails?.map((batch: string, i: number) => (
                    <li key={i}>• {batch}</li>
                  )) || (
                      <>
                        <li>• Weekday Batches</li>
                        <li>• Weekend Batches</li>
                      </>
                    )}
                </ul>
                <p className="text-sm opacity-90">Flexible schedules to support both working professionals and fresh learners.</p>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <Link href="/contact">
              <button className="bg-[#163E72] hover:bg-[#0A3D62] text-white px-12 py-5 rounded-full font-black text-2xl transition-all shadow-xl flex items-center gap-4 mx-auto group active:scale-95">
                <Phone className="group-hover:rotate-12 transition-transform" />
                Talk to Advisor
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main >
  );
}

function WhyChooseCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-blue-50/50 p-10 rounded-[40px] text-center space-y-6 hover:shadow-2xl hover:shadow-blue-100 transition-all border border-blue-50">
      <div className="flex justify-center mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-blue-100">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-black text-[#0A3D62]">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function HighlightItem({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-6 group">
      <div className="w-20 h-20 bg-blue-50/50 rounded-2xl flex items-center justify-center text-[#1E90FF] group-hover:bg-[#1E90FF] group-hover:text-white transition-all shadow-md">
        {icon}
      </div>
      <p className="font-black text-[#0A3D62] text-sm md:text-base max-w-[180px] mx-auto leading-tight">{label}</p>
    </div>
  );
}
