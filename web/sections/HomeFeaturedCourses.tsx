import { getCourses } from "@/lib/services/course.service";
import HomeFeaturedCoursesCarousel, {
  type CourseCardData,
} from "./HomeFeaturedCoursesCarousel";

/**
 * Async server component.
 * Fetches courses, takes the first 3, normalises the slug, and hands
 * the flat data off to the client carousel.  No Sanity logic lives in
 * the carousel — same split as Testimonials (server fetches → client animates).
 */
export default async function HomeFeaturedCourses() {
  const courses = await getCourses().catch(() => []);

  // Slice to first 3 as requested — carousel triples them internally
  const top3: CourseCardData[] = courses.slice(0, 3).map((c) => ({
    _id: c._id,
    title: c.title,
    // COURSES_QUERY returns slug as { current: string } — extract here
    slug: c.slug.current,
    thumbnail: c.thumbnail ?? "",
    shortDescription: c.shortDescription ?? "",
    rating: c.rating ?? 0,
    students: typeof c.students === "number" ? c.students : 0,
    duration: c.duration ?? "",
    price: c.price ?? 0,
    instructorName: c.instructorName ?? "",
    instructorImage: c.instructorImage ?? "",
  }));

  if (top3.length === 0) return null;

  return <HomeFeaturedCoursesCarousel courses={top3} />;
}
