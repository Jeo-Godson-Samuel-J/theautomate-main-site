import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FeaturedCourseProps {
    slug: string;
    title: string;
    image: string;
    learners: string;
    duration: string;
    description: string;
}

export default function FeaturedCourse({ slug, title, image, learners, duration, description }: FeaturedCourseProps) {
    return (
        <section className="px-6 mb-12">
            <div className="bg-white rounded-[40px] w-full mx-auto shadow-2xl shadow-blue-50 flex flex-col md:flex-row overflow-hidden border border-slate-100 p-2 md:p-4 group">
                {/* Course Image */}
                <div className="md:w-[45%] lg:w-[40%] relative aspect-video md:aspect-auto h-64 md:h-auto overflow-hidden rounded-3xl">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#163E72] text-white text-[10px] md:text-xs px-4 py-1.5 rounded-full font-semibold shadow-lg">
                        Featured Course
                    </div>
                </div>

                {/* Course Content */}
                <div className="md:w-[55%] lg:w-[60%] p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A3D62]">
                            {title}
                        </h2>
                        <div className="flex text-blue-500 text-sm">
                            {[...Array(5)].map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 mb-6">
                        <div className="flex items-center text-sm md:text-base font-medium text-slate-500">
                            <Image src="/icons/clock.png" alt="Duration" width={18} height={18} className="mr-2" />
                            <span>{duration} hrs</span>
                        </div>
                        <div className="flex items-center text-sm md:text-base font-medium text-slate-500">
                            <Image src="/icons/millions.png" alt="Learners" width={18} height={18} className="mr-2" />
                            <span>{learners} Learners</span>
                        </div>
                    </div>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                        {description}
                    </p>

                    <Link href={`/courses/${slug}`} className="w-full sm:w-fit">
                        <Button className="w-full sm:w-fit bg-[#163E72] hover:bg-[#0166A7] text-white px-10 py-7 rounded-2xl text-lg font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
