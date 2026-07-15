import { client } from "@/lib/sanity.client";
import { Course } from "@/lib/types/course";

const COURSE_FIELDS = `
  _id,
  title,
  tagline,
  "image": heroImage.asset->url,
  students,
  hours,
  "slug": slug.current,
  instructorName,
  instructorImage,
  price
`;

const PLAN_COURSES: Course[] = [
  {
    _id: "fallback-playwright",
    title: "Playwright Automation",
    tagline: "Master modern end-to-end testing with Playwright.",
    image: "/placeholder.png",
    students: "5,000+",
    hours: "40",
    slug: "playwright",
    instructorName: "Auto-Mate Academy",
    instructorImage: undefined,
    price: 14999,
  },
  {
    _id: "fallback-genai",
    title: "GenAI for QA Automation",
    tagline: "Leverage AI to automate testing and generate smarter workflows.",
    image: "/placeholder.png",
    students: "3,500+",
    hours: "32",
    slug: "genai-qa",
    instructorName: "Auto-Mate Academy",
    instructorImage: undefined,
    price: 15999,
  },
  {
    _id: "fallback-selenium",
    title: "Selenium Automation",
    tagline: "Build robust browser automation with Selenium and JavaScript.",
    image: "/placeholder.png",
    students: "4,200+",
    hours: "36",
    slug: "selenium",
    instructorName: "Auto-Mate Academy",
    instructorImage: undefined,
    price: 13999,
  },
];

export async function getCourses(planId?: string): Promise<Course[]> {
  try {
    const query = planId
      ? `*[_type == "course" && references($planId)] | order(displayOrder asc){${COURSE_FIELDS}}`
      : `*[_type == "course"] | order(displayOrder asc){${COURSE_FIELDS}}`;

    const courses = await client.fetch<Course[]>(query, { planId });

    if (planId && courses.length === 0) {
      return PLAN_COURSES;
    }

    return courses.length > 0 ? courses : PLAN_COURSES;
  } catch (error) {
    console.error("[getCourses] Sanity request failed", { planId, error });
    return PLAN_COURSES;
  }
}
