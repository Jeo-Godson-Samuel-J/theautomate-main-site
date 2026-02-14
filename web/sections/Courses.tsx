
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/sanity.client';
import { POPULAR_COURSES_QUERY } from '@/lib/queries';
import { urlFor } from '@/lib/sanity.client';

interface Course {
    title: string;
    slug: string;
    tagline?: string;
    heroImage?: any;
    students?: string;
    hours?: string;
    rating?: number;
}

export default async function Courses() {
    const courses: Course[] = await client.fetch(POPULAR_COURSES_QUERY);

    const colors = ["bg-[#00AD00]", "bg-[#0A2540]", "bg-white"];

    return (
        <section className="py-10 md:py-20 px-6 bg-white">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 md:mb-16">Our Popular Courses</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {courses.map((course, i) => {
                    const bgColor = colors[i % colors.length];
                    const courseUrl = `/courses/${course.slug}`;

                    return (
                        <div key={course.slug} className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-gray-100">
                            <div className={`h-56 flex items-center justify-center p-8 ${bgColor}`}>
                                {course.heroImage && (
                                    <Image
                                        src={urlFor(course.heroImage).url()}
                                        alt={course.title}
                                        width={200}
                                        height={200}
                                        className="max-h-full object-contain"
                                    />
                                )}
                            </div>
                            <div className="p-8 text-black flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                                <div className="flex text-blue-500 mb-4">
                                    {"★".repeat(Math.round(course.rating || 5))}{"☆".repeat(5 - Math.round(course.rating || 5))}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                    <span>⏱ {course.hours ? `${course.hours}+ hrs` : 'N/A'}</span>
                                    <span>👥 {course.students || '0'} Successful Learners</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-8 flex-grow">
                                    {course.tagline || 'Master the latest tools and frameworks used by top industry professionals.'}
                                </p>
                                <Link href={courseUrl}>
                                    <Button className="w-full bg-brand-blue text-white py-3 rounded-full font-bold hover:bg-brand-dark transition">
                                        Learn more
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center mt-10 md:mt-16">
                <Link href="/courses">
                    <Button className="bg-brand-dark text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-brand-blue">See more</Button>
                </Link>
            </div>
        </section>
    );
}
