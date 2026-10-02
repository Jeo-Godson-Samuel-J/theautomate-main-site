import CourseCard from "@/components/layout/CourseCard";
import { getCourses } from "@/lib/services/course.service";
import { urlFor } from "@/lib/sanity.client";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Most Popular
            <span className="text-[#0166A7]"> Courses</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {courses.map((course, index) => (
            <CourseCard
              key={course._id}
              slug={course.slug}
              title={course.title}
              heroImageUrl={
                course.heroImage
                  ? urlFor(course.heroImage).width(400).url()
                  : "/placeholder.png"
              }
              tagline={course.tagline}
              instructorName={course.instructorName}
              rating={course.rating}
              duration={course.duration}
              hours={course.hours}
              students={course.students}
              price={course.price}
              level={course.level}
              updatedAt={course._updatedAt}
              outcomes={course.outcomes}
              keyConcepts={course.keyConcepts}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
