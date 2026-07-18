import { getCourses } from "@/lib/services/course.service";
import { urlFor } from "@/lib/sanity.client";
import HomeFeaturedCoursesCarousel, {
  type CourseCardData,
} from "./HomeFeaturedCoursesCarousel";

/**
 * Async server component.
 * Fetches courses, takes the first 3, normalises image URLs using urlFor(),
 * and hands the flat data off to the client carousel.
 */
export default async function HomeFeaturedCourses() {
  const courses = await getCourses().catch(() => []);

  const top3: CourseCardData[] = courses.slice(0, 3).map((c) => ({
    _id: c._id,
    title: c.title,
    // COURSES_QUERY aliases slug to a flat string — no .current needed
    slug: c.slug,
    image: c.heroImage ? urlFor(c.heroImage).width(800).height(500).fit("crop").url() : "/placeholder.png",
    tagline: c.tagline ?? "",
    hoverDescription: c.hoverDescription,
    rating: c.rating ?? 0,
    students: typeof c.students === "number" ? c.students : 0,
    duration: c.duration ?? "",
    price: c.price ?? 0,
    instructorName: c.instructorName ?? "",
    instructorImage: c.instructorImage
      ? urlFor(c.instructorImage).width(80).height(80).fit("crop").url()
      : "",
    level: c.level,
    _updatedAt: c._updatedAt,
    outcomes: c.outcomes,
    keyConcepts: c.keyConcepts,
    hours: c.hours,
  }));

  if (top3.length === 0) return null;

  return <HomeFeaturedCoursesCarousel courses={top3} />;
}
