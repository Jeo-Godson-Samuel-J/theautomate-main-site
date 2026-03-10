import CourseHero from '@/sections/courses-section/CourseHero';
import CourseList from '@/sections/courses-section/CourseList';
import CTA from '@/components/layout/CTA';
import { client, urlFor } from "@/lib/sanity.client";
import CourseUnique from '@/components/layout/CourseUnique';
import CaseStudiesPage from '../case-studies/page';

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
        <main className="pt-20"> {/* Standard space for Navbar */}
            <div className='mx-auto'>
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
                <CourseUnique />
                <CaseStudiesPage />
                <CTA
                    icon="/icons/consultation.png"
                    title="Need A Consultation?"
                    description="We are here to answer your questions"
                    buttonText="Contact Us"
                />
            </div>
        </main>
    );
}
