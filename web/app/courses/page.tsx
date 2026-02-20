import CourseHero from '@/sections/courses-section/CourseHero';
import CourseList from '@/sections/courses-section/CourseList';
import UniqueFeature from '@/sections/courses-section/UniqueFeature';
import BannerCTA from '@/components/layout/BannerCTA';
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
        <main className="pt-20 mx-auto max-w-7xl"> {/* Standard space for Navbar */}
            <CourseHero
                featuredCourse={featured ? {
                    slug: featured.slug.current,
                    title: featured.title,
                    image: featured.heroImage ? urlFor(featured.heroImage).width(800).url() : "/placeholder.png",
                    learners: featured.students || "0+",
                    duration: featured.hours || "0+",
                    description: featured.tagline
                } : undefined}
            />

            <CourseList />
            <UniqueFeature />
            <BannerCTA
                icon="/icons/consultation.png"
                title="Need A Consultation?"
                description="We are here to answer your questions"
                buttonText="Contact Us"
            />
        </main>
    );
}
