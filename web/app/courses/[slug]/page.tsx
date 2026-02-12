import { client, urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Users,
  Clock,
  BarChart,
  BookOpen,
  Star,
  ChevronRight,
  PlayCircle
} from "lucide-react";

export const revalidate = 60;

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Highlight {
  icon?: SanityImage;
  title: string;
}

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
  keyConcepts[]{
    title,
    description,
    icon
  },
  whoFor,
  whatYouLearn,
  outcomes,
  highlights[]{
    title,
    icon
  },
  hours,
  students,
  projects
}
`;

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
    <main className="bg-white min-h-screen pt-24 pb-20">
      {/* HEADER SECTION */}
      <div className="bg-[#0A3D62] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <nav className="flex items-center gap-2 text-sm text-blue-200 opacity-80 mb-4">
              <span>Courses</span> <ChevronRight size={14} /> <span>{course.title}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-blue-100 opacity-90 max-w-2xl">
              {course.tagline}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="font-bold">{course.rating || "4.9"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-blue-300" />
                <span>{course.students}+ Successful Learners</span>
              </div>
            </div>
          </div>

          <div className="relative group aspect-video rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
            {course.heroImage && (
              <Image
                src={urlFor(course.heroImage).width(800).url()}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">

        {/* LEFT COLUMN - CONTENT */}
        <div className="lg:col-span-2 space-y-16">

          {/* DESCRIPTION */}
          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">About this course</h2>
            <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed">
              <PortableText value={course.description} />
            </div>
          </section>

          {/* WHAT YOU LEARN */}
          <section>
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-8 text-center">What You&apos;ll Master</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whatYouLearn?.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle2 className="text-[#1E90FF] shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* HIGHLIGHTS */}
          <section className="bg-[#0A3D62] text-white p-10 rounded-[40px] shadow-xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Course Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {course.highlights?.map((h: any, i: number) => (
                <div key={i} className="flex flex-col items-center text-center gap-4 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#1E90FF] transition-colors">
                    {h.icon && (
                      <Image src={urlFor(h.icon).width(40).url()} width={32} height={32} alt="" className="invert brightness-0" />
                    )}
                  </div>
                  <span className="font-semibold text-blue-50">{h.title}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-white border border-slate-200 rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 space-y-8">
            <div className="space-y-2">
              <p className="text-slate-500 font-medium">Course Investment</p>
              <h3 className="text-4xl font-bold text-[#0A3D62]">₹{course.price || "Contact Us"}</h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <SidebarStat icon={<Clock className="text-[#1E90FF]" />} label="Duration" value={`${course.hours} Hours`} />
              <SidebarStat icon={<BarChart className="text-[#1E90FF]" />} label="Level" value={course.level} />
              <SidebarStat icon={<BookOpen className="text-[#1E90FF]" />} label="Projects" value={`${course.projects} Real-world`} />
              <SidebarStat icon={<Users className="text-[#1E90FF]" />} label="Community" value="Lifetime Access" />
            </div>


            <Link href="/payment?course=custom" className="w-full">
              <button className="w-full bg-[#1E90FF] hover:bg-[#0A3D62] text-white py-5 rounded-2xl font-black text-xl transition-all shadow-lg shadow-blue-200 uppercase tracking-tight">
                Enroll Now
              </button>
            </Link>

            {/* INSTRUCTOR MINI CARD */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                {course.instructorImage && (
                  <Image
                    src={urlFor(course.instructorImage).width(120).url()}
                    width={60}
                    height={60}
                    className="rounded-2xl object-cover border-2 border-slate-100"
                    alt={course.instructorName}
                  />
                )}
                <div>
                  <p className="text-sm text-slate-500">Taught by</p>
                  <p className="font-bold text-[#0A3D62]">{course.instructorName}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SidebarStat({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-slate-600 font-medium">{label}</span>
      </div>
      <span className="font-bold text-[#0A3D62]">{value}</span>
    </div>
  );
}