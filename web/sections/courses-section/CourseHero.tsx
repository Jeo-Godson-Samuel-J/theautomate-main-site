'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

interface FeaturedCourseData {
    slug: string;
    title: string;
    image: string;
    learners: string;
    duration: string;
    description: string;
    video?: string;
}

interface CourseHeroProps {
    featuredCourse?: FeaturedCourseData;
}

export default function CourseHero({ featuredCourse }: CourseHeroProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!featuredCourse) return null;

    const data = featuredCourse;

    return (
        <section className="py- px-6 bg-white">
            <div className='mx-auto'>
                <h1 className="text-4xl flex flex-col items-center md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent 
                    bg-gradient-to-r from-[#0A3D62] via-[#1E90FF] to-[#0A3D62] leading-[1.2] text-center mb-6">
                    Our Industry Leading Training <br className="hidden md:block" /> Courses
                </h1>
                <p className='text-slate-500 text-lg max-w-2xl mx-auto text-center mb-12'>
                    Master the art of automation with our industry-leading training courses! Designed and delivered by seasoned experts, our hands-on programs equip you with real-world skills to excel in automation.
                </p>

                <div className="bg-white rounded-[40px] w-full lg:w-[90%] mx-auto shadow-2xl shadow-blue-100 flex flex-col md:flex-row overflow-hidden border border-slate-50 p-2 md:p-3 group">
                    <div className="md:w-[45%] lg:w-[40%] relative aspect-video md:aspect-auto h-64 md:h-96 overflow-hidden rounded-3xl group">
                        {data.video ? (
                            <video
                                src={data.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        )}

                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500">
                            <span className="text-white/80 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                                Featured Program
                            </span>
                            <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-lg text-center px-4">
                                {data.title}
                            </h2>
                            <div className="w-12 h-1.5 bg-cyan-400 mt-4 rounded-full shadow-lg" />
                        </div>
                    </div>

                    <div className="md:w-[55%] lg:w-[60%] p-6 md:p-10 lg:p-14 flex flex-col justify-center">
                        <span className="bg-[#163E72] text-white text-[10px] md:text-xs px-4 py-1.5 rounded-full w-fit mb-6 font-semibold shadow-sm">
                            Industry Leading
                        </span>

                        <div className='flex flex-col gap-2 mb-6'>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1B262C]">
                                {data.title}
                            </h2>
                            <div className="flex text-blue-500 text-lg">★★★★★</div>
                        </div>

                        <div className="flex flex-row items-center gap-8 mb-8">
                            <div className="flex items-center text-sm md:text-base font-medium text-slate-500">
                                <Image src="/icons/timer.png" alt="Timer" width={20} height={20} className="opacity-70" />
                                <span className="ml-2 font-semibold text-[#1B262C]">{data.duration} hrs</span>
                            </div>
                            <div className="flex items-center text-sm md:text-base font-medium text-slate-500">
                                <Image src="/icons/learner.png" alt="Learner" width={20} height={20} className="opacity-70" />
                                <span className="ml-2 font-semibold text-[#1B262C]">{data.learners} Learners</span>
                            </div>
                        </div>

                        <div className="relative text-slate-600 mb-10">
                            <p className={`text-base md:text-lg leading-relaxed transition-all duration-200 ${!isExpanded ? 'line-clamp-3 md:line-clamp-none' : ''}`}>
                                {data.description}
                            </p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="md:hidden text-[#2B71B8] font-bold text-sm mt-2 flex items-center gap-1"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                                <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>↓</span>
                            </button>
                        </div>

                        <Link href={`/courses/${data.slug}`} className="w-full sm:w-fit">
                            <Button className="w-full sm:w-fit bg-[#163E72] hover:bg-[#0166A7] text-white px-12 py-7 rounded-2xl text-lg font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                                Start Learning Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
