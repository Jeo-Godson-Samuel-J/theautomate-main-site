import { client, urlFor } from "@/lib/sanity.client";
import CourseCard from "@/components/layout/CourseCard";
export const revalidate = 60;


const COURSES_QUERY = `
*[_type == "course"]{
  _id,
  title,
  slug,
  heroImage,
  students,
  hours,
  tagline
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
                        // Filter out Playwright (it's featured)
                        const filtered = courses.filter((c: any) => c.slug.current !== 'playwright');

                        // Move Selenium to index 3 (2nd row, 1st item) if it exists
                        const seleniumIndex = filtered.findIndex((c: any) => c.title.toLowerCase().includes('selenium'));
                        const reordered = [...filtered];
                        if (seleniumIndex !== -1 && reordered.length > 3) {
                            const [selenium] = reordered.splice(seleniumIndex, 1);
                            reordered.splice(3, 0, selenium);
                        }
                        return reordered;
                    })().map((course: any) => (
                        <CourseCard
                            key={course._id}
                            slug={course.slug.current}
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
