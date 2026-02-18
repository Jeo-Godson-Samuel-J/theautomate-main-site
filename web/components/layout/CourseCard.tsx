import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
    slug: string;
    title: string;
    image: string;
    learners: string;
    duration: string;
    description: string;
}

export default function CourseCard({ slug, title, image, learners, duration, description }: CourseCardProps) {
    return (
        <div className="bg-white rounded-[32px] shadow-lg border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 group">
            {/* Course Image Header */}
            <div className="relative h-40 w-full bg-slate-50 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-bold text-[#0A3D62] mb-2">{title}</h3>

                {/* Stars */}
                <div className="flex text-blue-500 mb-3 gap-0.5 text-xs">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Image src="/icons/clock.png" width={14} height={14} alt="Duration" />
                        <span className="text-[10px] text-slate-500 font-medium">{duration} hrs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Image src="/icons/millions.png" width={14} height={14} alt="Learners" />
                        <span className="text-[10px] text-slate-500 font-medium">{learners} Learners</span>
                    </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed mb-6 grow line-clamp-3">
                    {description}
                </p>

                <Link href={`/courses/${slug}`}>
                    <Button className='w-full bg-[#163E72] hover:bg-[#0166A7] text-white py-5 rounded-2xl text-sm font-bold transition-all shadow-md group-hover:shadow-lg'>
                        Learn More
                    </Button>
                </Link>

            </div>
        </div>
    );
}
