import CourseHero from "@/sections/courses-section/CourseHero";
import CourseList from "@/sections/courses-section/CourseList";
import CTA from "@/components/layout/CTA";
import { client, urlFor } from "@/lib/sanity.client";

const FEATURED_COURSE_QUERY = `
*[_type == "course" && (slug.current == "playwright" || title match "Playwright")][0]{
  _id,
  title,
  slug,
  heroImage,
  students,
  hours,
  tagline
}
`;

export default async function CoursesPage() {
  const featured = await client.fetch(FEATURED_COURSE_QUERY);

  return (
    <main className="pt-20">
      {/* Standard space for Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CourseHero
          featuredCourse={
            featured
              ? {
                  slug: featured.slug.current,
                  title: featured.title,
                  image: featured.heroImage
                    ? urlFor(featured.heroImage).width(800).url()
                    : "/placeholder.png",
                  learners: featured.students || "0+",
                  duration: featured.hours || "0+",
                  description: featured.tagline,
                }
              : undefined
          }
        />

        <CourseList />
        <CTA
          title="Start Learning Today"
          description="Join the next wave of innovation. Your journey to mastering automation starts with a single click."
          buttonText="Contact Us"
        />
      </div>
    </main>
  );
}
