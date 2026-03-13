import { client, urlFor } from "@/lib/sanity.client";
import CourseCard from "@/components/layout/CourseCard";
export const revalidate = 60;


const COURSES_QUERY = `
*[_type == "course"]{
  _id,
  title,
  heroImage,
  students,
  hours,
  tagline,
  "slug": slug.current
}
`;

export default async function CourseList() {
    const courses = await client.fetch(COURSES_QUERY);

    return (
        <section className="py-8 px-6 md:py-20 bg-white">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Other Courses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {(() => {
                        const priority = [
                            { key: 'playwright', match: (c: any) => c.slug?.toLowerCase().includes('playwright') || c.title?.toLowerCase().includes('playwright') },
                            { key: 'genai', match: (c: any) => c.slug?.toLowerCase().includes('genai') || c.slug?.toLowerCase().includes('gen-ai') || c.title?.toLowerCase().includes('genai') || c.title?.toLowerCase().includes('gen ai') },
                            { key: 'selenium', match: (c: any) => c.slug?.toLowerCase().includes('selenium') || c.title?.toLowerCase().includes('selenium') },
                        ];

                        const sorted = [...courses].sort((a: any, b: any) => {
                            const aIndex = priority.findIndex(p => p.match(a));
                            const bIndex = priority.findIndex(p => p.match(b));

                            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                            if (aIndex !== -1) return -1;
                            if (bIndex !== -1) return 1;
                            return 0;
                        });

                        return sorted;
                    })().map((course: any) => (
                        <CourseCard
                            key={course._id}
                            slug={course.slug}
                            title={course.title}
                            image={
                                course.heroImage
                                    ? urlFor(course.heroImage).width(400).url()
                                    : "/placeholder.png"
                            }
                            learners={course.students || "0+"}
                            duration={course.hours || "0+"}
                            description={course.tagline}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
