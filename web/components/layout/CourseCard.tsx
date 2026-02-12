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
        <div className="bg-white rounded-[40px] shadow-[#2B71B8] shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            {/* Course Image Header */}
            <div className="relative h-48 w-full bg-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-8 flex flex-col grow">
                <h3 className="text-xl font-bold text-black-400 mb-2">{title}</h3>

                {/* Stars */}
                <div className="flex text-blue-500 mb-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/clock.png" width={16} height={16} alt="Duration" />
                        <span className="text-xs text-gray-500">{duration} hrs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image src="/icons/millions.png" width={16} height={16} alt="Learners" />
                        <span className="text-xs text-gray-500">{learners} Successful Learners</span>
                    </div>
                </div>

                <p className="text-black-400 font-bold text-sm leading-relaxed mb-8 grow">
                    {description}
                </p>

                {/* Dynamic Link to the [slug] page */}


                <Link href={`/courses/${slug}`}>
                    <Button className='w-full bg-[#163E72] hover:bg-[#0166A7] text-white py-7 rounded-full text-lg font-bold transition-all'>Learn More</Button>
                </Link>

            </div>
        </div>
    );
}