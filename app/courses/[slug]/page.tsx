import React from 'react';

// This is a placeholder. In a real project, this would be a Sanity Fetch.
async function getCourseData(slug: string) {
    // Logic to fetch course by slug from Sanity will go here
    return { title: slug.toUpperCase(), description: "Detailed course information..." };
}

export default async function SingleCoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = await getCourseData(slug);

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl">
            <div className='mx-auto'>
                <h1 className="text-5xl font-bold text-[#163E72] mb-6">{course.title}</h1>
                <div className="bg-gray-100 p-10 rounded-[40px]">
                    <p className="text-xl text-gray-700">Detailed course content for {slug} will be injected here from Sanity CMS.</p>
                    {/* You will build the syllabus, pricing, and enrollment sections here */}
                </div>
            </div>
        </div>
    );
}