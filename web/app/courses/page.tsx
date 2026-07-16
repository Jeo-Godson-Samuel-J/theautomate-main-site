import CourseCard from "@/components/layout/CourseCard";
import { getCourses } from "@/lib/services/course.service";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl font-bold">
            Most Popular
            <span className="text-[#0166A7]"> Courses</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              // COURSES_QUERY returns slug as the raw Sanity object { current: string }.
              // Extract .current here — CourseCard expects a flat string.
              slug={course.slug.current}
              title={course.title}
              image={course.thumbnail ?? "/placeholder.png"}
              learners={course.students ?? "0+"}
              duration={course.duration ?? "—"}
              description={course.shortDescription ?? ""}
              rating={course.rating}
              instructorName={course.instructorName}
              instructorImage={course.instructorImage}
              price={course.price}
              modules={course.modules}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
