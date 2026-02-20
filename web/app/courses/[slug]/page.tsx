import { client, urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
  whatYouLearn,
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
          <h2 className="text-3xl font-black text-[#0A3D62] text-center mb-16">Why Choose Us?</h2>
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

      {/* 3. WHO IS THIS COURSE FOR & REGISTRATION (Screenshot 2) */}
      <section className="py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-12">
            <h2 className="text-4xl font-black text-[#0A3D62]">Who Is This Course For?</h2>
            <p className="text-xl font-medium text-slate-700 italic border-l-4 border-[#1E90FF] pl-6">
              This course is ideal for:
            </p>
            <div className="space-y-6">
              {course.whoFor?.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-slate-900 mt-2.5 shrink-0" />
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-lg font-bold text-[#0A3D62] pt-4">
              No prior automation experience is required — we start from the basics and gradually build you up to industry standards.
            </p>
          </div>

          {/* Registration Form (Screenshot 2) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-100 border border-slate-100">
              <div className="bg-black text-white text-center py-4 rounded-full font-bold text-lg mb-8">
                Register for this Course
              </div>
              <form className="space-y-6">
                <input type="text" placeholder="Name*" className="w-full px-8 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1E90FF]" />
                <input type="email" placeholder="E-mail*" className="w-full px-8 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1E90FF]" />
                <input type="tel" placeholder="Phone Number*" className="w-full px-8 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1E90FF]" />
                <textarea rows={4} placeholder="Your Message" className="w-full px-8 py-4 rounded-[30px] bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1E90FF] resize-none"></textarea>
                <button className="w-full bg-[#163E72] hover:bg-[#0A3D62] text-white py-5 rounded-full font-black text-xl transition-all shadow-lg active:scale-95">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU'LL LEARN (Screenshot 3) */}
      <section className="py-24 bg-[#0A3D62] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-white text-4xl">^</div>
          <div className="absolute bottom-20 right-10 text-white text-4xl">^</div>
          <div className="absolute top-1/2 left-1/4 text-white text-4xl">^</div>
          <div className="absolute top-1/3 right-1/4 text-white text-4xl">^</div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-black text-white mb-20 tracking-tight">What You&apos;ll Learn in This Course</h2>
          <div className="space-y-4">
            {course.whatYouLearn?.map((item: string, i: number) => {
              const [title, ...desc] = item.split('\n');
              return (
                <div key={i} className="bg-white rounded-[32px] p-8 text-center shadow-xl hover:scale-[1.02] transition-transform">
                  <h3 className="text-xl font-bold text-[#0A3D62] mb-2">{title}</h3>
                  <p className="text-slate-600">{desc.join('\n')}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUTCOME OF THIS COURSE (Screenshot 4) */}
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
    </main>
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
